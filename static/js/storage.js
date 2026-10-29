/**
 * ContentFlow AI - Centralized LocalStorage Service
 * Handles persistence for sources, posts, versions, brand settings,
 * audit history, activity logs, preferences, and session guards.
 */

const STORAGE_KEYS = {
  SESSION: 'contentflow_demo_session',
  SOURCES: 'contentflow_sources',
  POSTS: 'contentflow_posts',
  BRAND: 'contentflow_brand',
  ACTIVITY: 'contentflow_activity',
  AUDIT: 'contentflow_audit',
  PREFERENCES: 'contentflow_preferences'
};

const StorageService = {
  // Initialize storage if empty or on reset
  init(forceReset = false) {
    if (forceReset || !localStorage.getItem(STORAGE_KEYS.SOURCES)) {
      localStorage.setItem(STORAGE_KEYS.SOURCES, JSON.stringify(DEMO_SOURCES));
    }
    if (forceReset || !localStorage.getItem(STORAGE_KEYS.POSTS)) {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(DEMO_POSTS));
    }
    if (forceReset || !localStorage.getItem(STORAGE_KEYS.BRAND)) {
      localStorage.setItem(STORAGE_KEYS.BRAND, JSON.stringify(DEMO_BRAND));
    }
    if (forceReset || !localStorage.getItem(STORAGE_KEYS.ACTIVITY)) {
      localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(DEMO_ACTIVITIES));
    }
    if (forceReset || !localStorage.getItem(STORAGE_KEYS.PREFERENCES)) {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(DEMO_PREFERENCES));
    }
    if (forceReset || !localStorage.getItem(STORAGE_KEYS.AUDIT)) {
      localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify([]));
    }
  },

  // Session
  getSession() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSION);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error("Error reading session:", e);
      return null;
    }
  },

  setSession(user) {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify({
      email: user.email || 'demo@contentflow.ai',
      name: user.name || 'Demo User',
      role: 'Growth Strategist & Editor',
      loginTime: new Date().toISOString()
    }));
  },

  clearSession() {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  isAuthenticated() {
    return !!this.getSession();
  },

  // Sources
  getSources() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.SOURCES)) || [];
    } catch (e) {
      return [];
    }
  },

  getSourceById(id) {
    const sources = this.getSources();
    return sources.find(s => s.id === id) || null;
  },

  saveSource(sourceData) {
    const sources = this.getSources();
    const existingIndex = sources.findIndex(s => s.id === sourceData.id);

    if (existingIndex >= 0) {
      sources[existingIndex] = { ...sources[existingIndex], ...sourceData, updatedAt: new Date().toISOString() };
      this.recordActivity(`Updated source: "${sourceData.title}"`, 'source', 'bi-pencil-square');
    } else {
      const newSource = {
        id: 'src-' + Date.now(),
        createdAt: new Date().toISOString(),
        wordCount: sourceData.content ? sourceData.content.trim().split(/\s+/).length : 0,
        excerpt: sourceData.content ? sourceData.content.slice(0, 180) + '...' : '',
        ...sourceData
      };
      sources.unshift(newSource);
      this.recordActivity(`Added new source: "${sourceData.title}"`, 'source', 'bi-file-earmark-plus');
    }

    localStorage.setItem(STORAGE_KEYS.SOURCES, JSON.stringify(sources));
    return sources;
  },

  deleteSource(id) {
    let sources = this.getSources();
    const target = sources.find(s => s.id === id);
    sources = sources.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SOURCES, JSON.stringify(sources));
    if (target) {
      this.recordActivity(`Deleted source: "${target.title}"`, 'source', 'bi-trash');
    }
    return sources;
  },

  // Posts
  getPosts() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS)) || [];
    } catch (e) {
      return [];
    }
  },

  getPostById(id) {
    const posts = this.getPosts();
    return posts.find(p => p.id === id) || null;
  },

  savePost(postData, preserveVersion = false) {
    const posts = this.getPosts();
    const index = posts.findIndex(p => p.id === postData.id);

    if (index >= 0) {
      const current = posts[index];
      const versions = current.versions || [];

      if (preserveVersion && current.content !== postData.content) {
        versions.unshift({
          version: versions.length + 1,
          content: current.content,
          updatedAt: new Date().toISOString()
        });
      }

      posts[index] = {
        ...current,
        ...postData,
        versions,
        updatedAt: new Date().toISOString()
      };
      this.recordActivity(`Updated post for ${postData.platform}: "${postData.title || 'Untitled'}"`, 'edit', 'bi-pencil');
    } else {
      const newPost = {
        id: 'post-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        status: postData.status || 'Draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        versions: [],
        claims: postData.claims || [],
        ...postData
      };
      posts.unshift(newPost);
      this.recordActivity(`Generated new ${postData.platform} post: "${postData.title || 'Untitled'}"`, 'generation', 'bi-stars');
    }

    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    return posts;
  },

  updatePostStatus(id, newStatus, reason = "") {
    const posts = this.getPosts();
    const post = posts.find(p => p.id === id);
    if (!post) return null;

    const oldStatus = post.status;
    post.status = newStatus;
    post.updatedAt = new Date().toISOString();

    if (reason) {
      this.recordAudit({
        postId: id,
        postTitle: post.title,
        fromStatus: oldStatus,
        toStatus: newStatus,
        reason: reason,
        timestamp: new Date().toISOString()
      });
    }

    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    this.recordActivity(`Changed status of "${post.title}" to ${newStatus}`, newStatus.toLowerCase(), 'bi-flag');
    return post;
  },

  updateClaim(postId, claimId, updatedClaim) {
    const posts = this.getPosts();
    const post = posts.find(p => p.id === postId);
    if (!post || !post.claims) return null;

    const cIndex = post.claims.findIndex(c => c.id === claimId);
    if (cIndex >= 0) {
      post.claims[cIndex] = { ...post.claims[cIndex], ...updatedClaim };
      post.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
      this.recordActivity(`Updated claim #${claimId} on "${post.title}" to ${updatedClaim.status || 'Reviewed'}`, 'evidence', 'bi-shield-check');
    }
    return post;
  },

  // Brand Settings
  getBrandSettings() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.BRAND)) || DEMO_BRAND;
    } catch (e) {
      return DEMO_BRAND;
    }
  },

  saveBrandSettings(brandData) {
    localStorage.setItem(STORAGE_KEYS.BRAND, JSON.stringify(brandData));
    this.recordActivity(`Updated Brand Voice & Guidelines profile`, 'settings', 'bi-palette');
    return brandData;
  },

  resetBrandSettings() {
    localStorage.setItem(STORAGE_KEYS.BRAND, JSON.stringify(DEMO_BRAND));
    this.recordActivity(`Reset Brand Settings to system default`, 'settings', 'bi-arrow-counterclockwise');
    return DEMO_BRAND;
  },

  // Activity Logs
  getActivities() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITY)) || [];
    } catch (e) {
      return [];
    }
  },

  recordActivity(action, type = 'general', icon = 'bi-bell') {
    const activities = this.getActivities();
    const newAct = {
      id: 'act-' + Date.now(),
      action,
      type,
      icon,
      timestamp: new Date().toISOString()
    };
    activities.unshift(newAct);
    // keep max 25
    if (activities.length > 25) activities.pop();
    localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(activities));
  },

  // Audit Overrides
  getAuditLogs() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIT)) || [];
    } catch (e) {
      return [];
    }
  },

  recordAudit(auditRecord) {
    const logs = this.getAuditLogs();
    logs.unshift({
      id: 'audit-' + Date.now(),
      ...auditRecord
    });
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(logs));
  },

  // Preferences (Theme, defaults)
  getPreferences() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.PREFERENCES)) || DEMO_PREFERENCES;
    } catch (e) {
      return DEMO_PREFERENCES;
    }
  },

  savePreferences(prefs) {
    const current = this.getPreferences();
    const updated = { ...current, ...prefs };
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
    return updated;
  },

  // Full reset
  resetAllDemoData() {
    this.init(true);
    this.recordActivity('Reset all demo data and restore initial showcase documents', 'system', 'bi-arrow-repeat');
  }
};

// Auto init on script load
StorageService.init();

