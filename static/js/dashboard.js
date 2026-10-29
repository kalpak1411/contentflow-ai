/**
 * Dashboard JavaScript logic
 * Calculates real-time statistics from localStorage, renders Chart.js charts,
 * lists recent activity, and displays quick action shortcuts.
 */

let platformChartInstance = null;
let statusChartInstance = null;

document.addEventListener("DOMContentLoaded", () => {
  renderDashboardData();
});

function renderDashboardData() {
  const sources = StorageService.getSources();
  const posts = StorageService.getPosts();
  const activities = StorageService.getActivities();

  // 1. Stats calculation
  const totalSources = sources.length;
  const totalPosts = posts.length;
  const reviewCount = posts.filter(p => p.status === "Needs Review").length;
  const approvedCount = posts.filter(p => p.status === "Approved").length;

  document.getElementById("statTotalSources").textContent = totalSources;
  document.getElementById("statTotalPosts").textContent = totalPosts;
  document.getElementById("statReviewPosts").textContent = reviewCount;
  document.getElementById("statApprovedPosts").textContent = approvedCount;

  // 2. Charts
  renderCharts(posts);

  // 3. Recent Sources (top 4)
  renderRecentSources(sources.slice(0, 4));

  // 4. Recent Generated Posts (top 5)
  renderRecentPosts(posts.slice(0, 5));

  // 5. Recent Activity
  renderActivities(activities.slice(0, 6));
}

function renderCharts(posts) {
  // Platform distribution
  const platformCounts = {
    "LinkedIn": 0,
    "Instagram": 0,
    "Instagram Reels": 0,
    "YouTube Shorts": 0,
    "Facebook": 0
  };

  const statusCounts = {
    "Approved": 0,
    "Needs Review": 0,
    "Draft": 0,
    "Rejected": 0
  };

  posts.forEach(p => {
    if (platformCounts[p.platform] !== undefined) {
      platformCounts[p.platform]++;
    }
    if (statusCounts[p.status] !== undefined) {
      statusCounts[p.status]++;
    }
  });

  // Render Platform Distribution Chart
  const platformCtx = document.getElementById("platformChart");
  if (platformCtx) {
    if (platformChartInstance) platformChartInstance.destroy();
    platformChartInstance = new Chart(platformCtx, {
      type: "doughnut",
      data: {
        labels: Object.keys(platformCounts),
        datasets: [{
          data: Object.values(platformCounts),
          backgroundColor: ["#0a66c2", "#e1306c", "#9333ea", "#ff0000", "#1877f2"],
          borderWidth: 2,
          borderColor: document.documentElement.getAttribute("data-theme") === "dark" ? "#111827" : "#ffffff"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" }
        }
      }
    });
  }

  // Render Status Distribution Chart
  const statusCtx = document.getElementById("statusChart");
  if (statusCtx) {
    if (statusChartInstance) statusChartInstance.destroy();
    statusChartInstance = new Chart(statusCtx, {
      type: "bar",
      data: {
        labels: Object.keys(statusCounts),
        datasets: [{
          label: "Posts",
          data: Object.values(statusCounts),
          backgroundColor: ["#10b981", "#f59e0b", "#64748b", "#ef4444"],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true, ticks: { precision: 0 } }
        }
      }
    });
  }
}

function renderRecentSources(sources) {
  const container = document.getElementById("recentSourcesList");
  if (!container) return;

  if (sources.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="bi bi-folder empty-icon"></i>
        <div class="empty-title">No sources added yet</div>
        <p class="empty-description">Add your first whitepaper or article in the Source Library.</p>
        <a href="/sources/" class="btn btn-primary btn-sm">Add Source</a>
      </div>
    `;
    return;
  }

  let html = `<div style="display: flex; flex-direction: column; gap: 0.75rem;">`;
  sources.forEach(s => {
    html += `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-surface);">
        <div>
          <div style="font-weight: 600; font-size: 0.9rem; color: var(--text-primary); margin-bottom: 0.2rem;">
            ${escapeHtml(s.title)}
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted); display: flex; gap: 0.75rem;">
            <span><i class="bi bi-tag"></i> ${s.type}</span>
            <span><i class="bi bi-card-text"></i> ${s.wordCount || 0} words</span>
          </div>
        </div>
        <a href="/create/?sourceId=${s.id}" class="btn btn-outline-primary btn-sm" title="Repurpose into social content">
          <i class="bi bi-stars"></i> Repurpose
        </a>
      </div>
    `;
  });
  html += `</div>`;
  container.innerHTML = html;
}

function renderRecentPosts(posts) {
  const container = document.getElementById("recentPostsTableBody");
  if (!container) return;

  if (posts.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="5" class="empty-state">
          <i class="bi bi-file-earmark-break empty-icon"></i>
          <div class="empty-title">No posts created yet</div>
          <p class="empty-description">Generate tailored content from any source document.</p>
          <a href="/create/" class="btn btn-primary btn-sm">Generate Post</a>
        </td>
      </tr>
    `;
    return;
  }

  let html = "";
  posts.forEach(p => {
    const badgeClass = getStatusBadgeClass(p.status);
    html += `
      <tr>
        <td>
          <a href="/content/${p.id}/" style="font-weight: 600; color: var(--text-primary);">
            ${escapeHtml(p.title || "Untitled Post")}
          </a>
          <div style="font-size: 0.75rem; color: var(--text-muted);">
            From: ${escapeHtml(p.sourceTitle || "Custom Source")}
          </div>
        </td>
        <td>
          <span class="badge badge-platform">${p.platform}</span>
        </td>
        <td>
          <span class="badge ${badgeClass}">${p.status}</span>
        </td>
        <td style="font-size: 0.8rem; color: var(--text-muted);">
          ${formatDate(p.createdAt)}
        </td>
        <td>
          <div style="display: flex; gap: 0.5rem;">
            <a href="/content/${p.id}/" class="btn btn-secondary btn-sm" title="Edit in Workspace">
              <i class="bi bi-pencil"></i> Edit
            </a>
            <a href="/content/${p.id}/evidence/" class="btn btn-outline-primary btn-sm" title="Review Source Evidence">
              <i class="bi bi-shield-check"></i> Evidence
            </a>
          </div>
        </td>
      </tr>
    `;
  });
  container.innerHTML = html;
}

function renderActivities(activities) {
  const container = document.getElementById("activityFeed");
  if (!container) return;

  if (activities.length === 0) {
    container.innerHTML = `<li style="font-size: 0.85rem; color: var(--text-muted);">No recorded activities yet.</li>`;
    return;
  }

  let html = "";
  activities.forEach(act => {
    html += `
      <li class="activity-item">
        <div class="activity-icon"><i class="bi ${act.icon || 'bi-bell'}"></i></div>
        <div>
          <div class="activity-text">${escapeHtml(act.action)}</div>
          <div class="activity-time">${formatDate(act.timestamp)}</div>
        </div>
      </li>
    `;
  });
  container.innerHTML = html;
}

function getStatusBadgeClass(status) {
  switch (status) {
    case "Approved": return "badge-approved";
    case "Needs Review": return "badge-review";
    case "Rejected": return "badge-rejected";
    default: return "badge-draft";
  }
}

function formatDate(iso) {
  if (!iso) return "Just now";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch (e) {
    return iso;
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[m]));
}

