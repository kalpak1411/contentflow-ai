/**
 * Evidence & Fact Check JavaScript
 * Shows factual claims for post, supporting passage ID & source excerpt,
 * status counts (Supported, Unsupported, Uncertain), claim inspection modal,
 * edit claim status / reviewer notes, and local audit override logging.
 */

let currentPost = null;
let currentSource = null;

document.addEventListener("DOMContentLoaded", () => {
  const contentId = document.getElementById("evidenceContentId").value;
  loadEvidencePost(contentId);
});

function loadEvidencePost(id) {
  currentPost = StorageService.getPostById(id);
  if (!currentPost) {
    App.toast("Post not found.", "danger");
    setTimeout(() => window.location.href = "/history/", 1500);
    return;
  }

  currentSource = StorageService.getSourceById(currentPost.sourceId);

  // Meta headers
  document.getElementById("evidencePostTitle").textContent = currentPost.title || "Untitled Post";
  document.getElementById("evidencePostPlatform").textContent = currentPost.platform;
  document.getElementById("evidenceSourceTitle").textContent = currentPost.sourceTitle || (currentSource ? currentSource.title : "External Doc");
  document.getElementById("evidenceBackLink").href = `/content/${currentPost.id}/`;

  renderEvidenceClaims();
}

function renderEvidenceClaims() {
  const claims = currentPost.claims || [];
  const container = document.getElementById("claimsTableBody");
  if (!container) return;

  // Counts
  let supportedCount = 0;
  let unsupportedCount = 0;
  let uncertainCount = 0;

  claims.forEach(c => {
    if (c.status === "Supported") supportedCount++;
    else if (c.status === "Unsupported") unsupportedCount++;
    else if (c.status === "Uncertain") uncertainCount++;
  });

  document.getElementById("countSupported").textContent = supportedCount;
  document.getElementById("countUnsupported").textContent = unsupportedCount;
  document.getElementById("countUncertain").textContent = uncertainCount;

  if (claims.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="5" class="empty-state">
          <i class="bi bi-shield-check empty-icon"></i>
          <div class="empty-title">No specific claims identified</div>
          <p class="empty-description">All content in this post is descriptive or thematic without discrete numerical statements.</p>
        </td>
      </tr>
    `;
    return;
  }

  let html = "";
  claims.forEach(c => {
    let badgeClass = "badge-supported";
    if (c.status === "Unsupported") badgeClass = "badge-unsupported";
    if (c.status === "Uncertain") badgeClass = "badge-uncertain";

    html += `
      <tr>
        <td style="font-weight: 600; color: var(--text-primary); max-width: 240px;">
          "${escapeHtml(c.claim)}"
        </td>
        <td>
          <span class="badge ${badgeClass}">${c.status}</span>
        </td>
        <td style="font-size: 0.85rem; color: var(--text-secondary); max-width: 280px; font-style: italic;">
          ${c.excerpt ? `"${escapeHtml(c.excerpt)}"` : '<span style="color:var(--text-muted);">No matching passage located</span>'}
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem; font-style: normal;">
            Passage Ref: ${c.passageId || 'P-Gen'}
          </div>
        </td>
        <td style="font-size: 0.8rem; color: var(--text-muted); max-width: 200px;">
          ${escapeHtml(c.notes || 'Automated verification check')}
        </td>
        <td>
          <button type="button" class="btn btn-secondary btn-sm" onclick="openClaimReviewModal('${c.id}')" title="Review & Update Assessment">
            <i class="bi bi-pencil-square"></i> Review
          </button>
        </td>
      </tr>
    `;
  });

  container.innerHTML = html;
}

function openClaimReviewModal(claimId) {
  const claim = (currentPost.claims || []).find(c => c.id === claimId);
  if (!claim) return;

  document.getElementById("reviewClaimId").value = claim.id;
  document.getElementById("reviewClaimText").textContent = `"${claim.claim}"`;
  document.getElementById("reviewPassageRef").textContent = claim.passageId || "P-Unassigned";
  document.getElementById("reviewExcerptText").value = claim.excerpt || "";
  document.getElementById("reviewStatusSelect").value = claim.status || "Supported";
  document.getElementById("reviewNotesInput").value = claim.notes || "";

  document.getElementById("claimReviewModalBackdrop").classList.add("show");
}

function closeClaimReviewModal() {
  document.getElementById("claimReviewModalBackdrop").classList.remove("show");
}

function saveClaimReview() {
  const claimId = document.getElementById("reviewClaimId").value;
  const status = document.getElementById("reviewStatusSelect").value;
  const excerpt = document.getElementById("reviewExcerptText").value.trim();
  const notes = document.getElementById("reviewNotesInput").value.trim();

  StorageService.updateClaim(currentPost.id, claimId, {
    status,
    excerpt,
    notes
  });

  closeClaimReviewModal();
  loadEvidencePost(currentPost.id);
  App.toast("Claim review updated successfully.", "success");
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

