/**
 * Content Workspace JavaScript
 * Rich editor for single post: edit title, content, CTA, hashtags,
 * preserve version history, approval workflow, critical claim warnings,
 * demo override modal with required reason, export single post, and duplicate.
 */

let currentPost = null;

document.addEventListener("DOMContentLoaded", () => {
  const contentId = document.getElementById("workspaceContentId").value;
  loadWorkspacePost(contentId);
  bindWorkspaceEvents();
});

function loadWorkspacePost(id) {
  currentPost = StorageService.getPostById(id);
  if (!currentPost) {
    App.toast("Post not found.", "danger");
    setTimeout(() => window.location.href = "/history/", 1500);
    return;
  }

  // Populate UI
  document.getElementById("postTitleHeading").textContent = currentPost.title || "Untitled Post";
  document.getElementById("postSourceLink").textContent = currentPost.sourceTitle || "Source Document";
  document.getElementById("postSourceLink").href = `/sources/`;

  const badgeEl = document.getElementById("postStatusBadge");
  badgeEl.textContent = currentPost.status;
  badgeEl.className = `badge ${getStatusBadgeClass(currentPost.status)}`;

  document.getElementById("postPlatformBadge").textContent = currentPost.platform;
  document.getElementById("postCreatedDate").textContent = formatDate(currentPost.createdAt);

  document.getElementById("postTitleInput").value = currentPost.title || "";
  document.getElementById("postContentInput").value = currentPost.content || "";
  document.getElementById("postCtaInput").value = currentPost.cta || "";
  document.getElementById("postHashtagsInput").value = currentPost.hashtags || "";

  // Evidence summary
  renderClaimsSummary(currentPost.claims || []);

  // Versions history
  renderVersionHistory(currentPost.versions || []);

  // Claim warning check
  checkUncertainClaims(currentPost.claims || []);
}

function renderClaimsSummary(claims) {
  const listEl = document.getElementById("workspaceClaimsList");
  const countEl = document.getElementById("claimsCountSummary");
  if (!listEl) return;

  if (countEl) countEl.textContent = `${claims.length} claims`;

  if (claims.length === 0) {
    listEl.innerHTML = `<div style="font-size: 0.85rem; color: var(--text-muted); padding: 0.5rem 0;">No factual claims identified for this post.</div>`;
    return;
  }

  let html = "";
  claims.forEach(c => {
    let badgeClass = "badge-supported";
    if (c.status === "Unsupported") badgeClass = "badge-unsupported";
    if (c.status === "Uncertain") badgeClass = "badge-uncertain";

    html += `
      <div style="padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); margin-bottom: 0.75rem; background: var(--bg-surface);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.35rem;">
          <span class="badge ${badgeClass}">${c.status}</span>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${c.passageId || 'Ref'}</span>
        </div>
        <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem;">
          "${escapeHtml(c.claim)}"
        </div>
        <div style="font-size: 0.75rem; color: var(--text-muted); font-style: italic;">
          Source: ${escapeHtml(c.excerpt || 'No passage linked')}
        </div>
      </div>
    `;
  });

  listEl.innerHTML = html;
}

function checkUncertainClaims(claims) {
  const warningBox = document.getElementById("workspaceClaimWarning");
  if (!warningBox) return;

  const hasIssues = claims.some(c => c.status === "Unsupported" || c.status === "Uncertain");
  if (hasIssues) {
    warningBox.style.display = "flex";
  } else {
    warningBox.style.display = "none";
  }
}

function renderVersionHistory(versions) {
  const container = document.getElementById("versionsContainer");
  if (!container) return;

  if (versions.length === 0) {
    container.innerHTML = `<div style="font-size: 0.85rem; color: var(--text-muted);">No prior revisions saved yet.</div>`;
    return;
  }

  let html = "";
  versions.forEach(v => {
    html += `
      <div style="padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); margin-bottom: 0.5rem; background: var(--bg-surface);">
        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.25rem;">
          <strong>Version ${v.version}</strong>
          <span>${formatDate(v.updatedAt)}</span>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-secondary); max-height: 60px; overflow: hidden; text-overflow: ellipsis; white-space: pre-wrap;">
          ${escapeHtml(v.content)}
        </div>
        <button type="button" class="btn btn-secondary btn-sm" style="margin-top: 0.4rem; padding: 0.2rem 0.5rem; font-size: 0.75rem;" onclick="restoreVersion('${v.version}')">
          <i class="bi bi-arrow-counterclockwise"></i> Restore
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
}

function restoreVersion(vNum) {
  const target = currentPost.versions.find(v => String(v.version) === String(vNum));
  if (!target) return;

  document.getElementById("postContentInput").value = target.content;
  App.toast(`Restored Version ${vNum} text into editor. Remember to click Save.`, "info");
}

function bindWorkspaceEvents() {
  // Save Changes
  const saveBtn = document.getElementById("savePostBtn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      savePostEdits(true);
    });
  }

  // Regenerate Post content
  const regenBtn = document.getElementById("regeneratePostBtn");
  if (regenBtn) {
    regenBtn.addEventListener("click", () => {
      App.confirm(
        "Regenerate Content?",
        "This will generate a fresh revision using your active brand guidelines while preserving the current text in Version History.",
        () => {
          regeneratePostContent();
        }
      );
    });
  }

  // Duplicate Post
  const dupBtn = document.getElementById("duplicatePostBtn");
  if (dupBtn) {
    dupBtn.addEventListener("click", () => {
      const duplicated = {
        ...currentPost,
        id: "post-" + Date.now(),
        title: `${currentPost.title} (Copy)`,
        status: "Draft",
        versions: [],
        createdAt: new Date().toISOString()
      };
      StorageService.savePost(duplicated);
      App.toast("Post duplicated successfully! Redirecting...", "success");
      setTimeout(() => window.location.href = `/content/${duplicated.id}/`, 1000);
    });
  }

  // Approve button
  const approveBtn = document.getElementById("approvePostBtn");
  if (approveBtn) {
    approveBtn.addEventListener("click", () => {
      const claims = currentPost.claims || [];
      const hasUnresolved = claims.some(c => c.status === "Unsupported" || c.status === "Uncertain");

      if (hasUnresolved) {
        // Show demo override modal
        openOverrideModal("Approved");
      } else {
        StorageService.updatePostStatus(currentPost.id, "Approved");
        loadWorkspacePost(currentPost.id);
        App.toast("Post marked as Approved!", "success");
      }
    });
  }

  // Reject button
  const rejectBtn = document.getElementById("rejectPostBtn");
  if (rejectBtn) {
    rejectBtn.addEventListener("click", () => {
      App.confirm("Reject Post?", "Mark this generated content as Rejected?", () => {
        StorageService.updatePostStatus(currentPost.id, "Rejected");
        loadWorkspacePost(currentPost.id);
        App.toast("Post marked as Rejected.", "warning");
      });
    });
  }

  // Export single post
  const exportBtn = document.getElementById("exportPostBtn");
  if (exportBtn) {
    exportBtn.addEventListener("click", exportSinglePost);
  }

  // Override Form submission
  const overrideForm = document.getElementById("overrideForm");
  if (overrideForm) {
    overrideForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const reason = document.getElementById("overrideReasonInput").value.trim();
      const targetStatus = document.getElementById("overrideTargetStatus").value;

      if (!reason) {
        App.toast("Please enter a mandatory override justification.", "danger");
        return;
      }

      StorageService.updatePostStatus(currentPost.id, targetStatus, reason);
      closeOverrideModal();
      loadWorkspacePost(currentPost.id);
      App.toast(`Status updated to ${targetStatus} with recorded audit override.`, "success");
    });
  }
}

function savePostEdits(preserveVersion = true) {
  const newTitle = document.getElementById("postTitleInput").value.trim();
  const newContent = document.getElementById("postContentInput").value.trim();
  const newCta = document.getElementById("postCtaInput").value.trim();
  const newTags = document.getElementById("postHashtagsInput").value.trim();

  if (!newTitle || !newContent) {
    App.toast("Title and Content body cannot be empty.", "danger");
    return;
  }

  StorageService.savePost({
    id: currentPost.id,
    title: newTitle,
    content: newContent,
    cta: newCta,
    hashtags: newTags
  }, preserveVersion);

  loadWorkspacePost(currentPost.id);
  App.toast("Post changes saved successfully.", "success");
}

function regeneratePostContent() {
  // Preserve current version first
  savePostEdits(true);

  // Read source text
  const source = StorageService.getSourceById(currentPost.sourceId) || { content: currentPost.content, title: currentPost.sourceTitle };
  const sentences = source.content.split(/(?<=[.?!])\s+/).filter(s => s.length > 20);
  const brand = StorageService.getBrandSettings();

  const freshSnippet = sentences[Math.floor(Math.random() * sentences.length)] || "Empirical verification delivers operational resilience.";

  let updatedContent = "";
  if (currentPost.platform === "LinkedIn") {
    updatedContent = `Key takeaway for modern leaders:\n\n💡 "${freshSnippet}"\n\nWhen scaling organizations, factual clarity always outperforms superficial hype.\n\n${brand.writingGuidelines || 'Always measure business outcomes against proven benchmarks.'}\n\nWhat has your experience shown?`;
  } else {
    updatedContent = `Here is our updated perspective on ${currentPost.title}:\n\n"${freshSnippet}"\n\nSave this for your upcoming review meeting!`;
  }

  document.getElementById("postContentInput").value = updatedContent;
  savePostEdits(true);
  App.toast("Regenerated new variation and saved previous copy to version history.", "success");
}

function openOverrideModal(targetStatus) {
  document.getElementById("overrideTargetStatus").value = targetStatus;
  document.getElementById("overrideReasonInput").value = "";
  document.getElementById("overrideModalBackdrop").classList.add("show");
}

function closeOverrideModal() {
  document.getElementById("overrideModalBackdrop").classList.remove("show");
}

function exportSinglePost() {
  const jsonContent = JSON.stringify(currentPost, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `contentflow-${currentPost.id}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  App.toast("Post JSON downloaded successfully.", "success");
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
  if (!iso) return "N/A";
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

