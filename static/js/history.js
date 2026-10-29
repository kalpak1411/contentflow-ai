/**
 * Content History JavaScript logic
 * Lists all generated posts from localStorage, filter by platform,
 * filter by status, search by keywords/title, sort by date,
 * duplicate post, and link to workspace.
 */

let allPosts = [];

document.addEventListener("DOMContentLoaded", () => {
  loadPostsHistory();
  bindHistoryEvents();

  // If status is in URL query (e.g. ?status=Needs Review)
  const params = new URLSearchParams(window.location.search);
  const statusParam = params.get("status");
  if (statusParam) {
    const filterEl = document.getElementById("historyStatusFilter");
    if (filterEl) {
      filterEl.value = statusParam;
      applyHistoryFilters();
    }
  }
});

function loadPostsHistory() {
  allPosts = StorageService.getPosts();
  renderHistoryTable(allPosts);
}

function renderHistoryTable(posts) {
  const container = document.getElementById("historyTableBody");
  const countBadge = document.getElementById("historyCountBadge");
  if (!container) return;

  if (countBadge) countBadge.textContent = `${posts.length} posts`;

  if (posts.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">
          <i class="bi bi-clock-history empty-icon"></i>
          <div class="empty-title">No matching content found</div>
          <p class="empty-description">Adjust your search filters or generate fresh social content from your library.</p>
          <a href="/create/" class="btn btn-primary btn-sm">Create New Content</a>
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
        <td style="max-width: 280px;">
          <a href="/content/${p.id}/" style="font-weight: 700; color: var(--text-primary); font-size: 0.95rem;">
            ${escapeHtml(p.title || 'Untitled Post')}
          </a>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">
            Source: ${escapeHtml(p.sourceTitle || 'Custom Source')}
          </div>
        </td>
        <td>
          <span class="badge badge-platform">${p.platform}</span>
        </td>
        <td>
          <span class="badge ${badgeClass}">${p.status}</span>
        </td>
        <td style="max-width: 320px; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          ${escapeHtml(p.content.replace(/\n+/g, ' '))}
        </td>
        <td style="font-size: 0.8rem; color: var(--text-muted);">
          ${formatDate(p.createdAt)}
        </td>
        <td>
          <div style="display: flex; gap: 0.35rem;">
            <a href="/content/${p.id}/" class="btn btn-secondary btn-sm" title="Edit in Workspace">
              <i class="bi bi-pencil"></i>
            </a>
            <a href="/content/${p.id}/evidence/" class="btn btn-secondary btn-sm" title="Review Source Evidence">
              <i class="bi bi-shield-check"></i>
            </a>
            <button type="button" class="btn btn-secondary btn-sm" onclick="duplicateHistoryPost('${p.id}')" title="Duplicate Post">
              <i class="bi bi-files"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  });

  container.innerHTML = html;
}

function bindHistoryEvents() {
  const searchInput = document.getElementById("historySearchInput");
  const platformFilter = document.getElementById("historyPlatformFilter");
  const statusFilter = document.getElementById("historyStatusFilter");
  const sortSelect = document.getElementById("historySortSelect");

  if (searchInput) searchInput.addEventListener("input", applyHistoryFilters);
  if (platformFilter) platformFilter.addEventListener("change", applyHistoryFilters);
  if (statusFilter) statusFilter.addEventListener("change", applyHistoryFilters);
  if (sortSelect) sortSelect.addEventListener("change", applyHistoryFilters);
}

function applyHistoryFilters() {
  const query = (document.getElementById("historySearchInput")?.value || "").toLowerCase().trim();
  const platform = document.getElementById("historyPlatformFilter")?.value || "ALL";
  const status = document.getElementById("historyStatusFilter")?.value || "ALL";
  const sort = document.getElementById("historySortSelect")?.value || "newest";

  let filtered = [...allPosts];

  if (query) {
    filtered = filtered.filter(p =>
      (p.title && p.title.toLowerCase().includes(query)) ||
      (p.content && p.content.toLowerCase().includes(query)) ||
      (p.sourceTitle && p.sourceTitle.toLowerCase().includes(query))
    );
  }

  if (platform !== "ALL") {
    filtered = filtered.filter(p => p.platform === platform);
  }

  if (status !== "ALL") {
    filtered = filtered.filter(p => p.status === status);
  }

  if (sort === "newest") {
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sort === "oldest") {
    filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  renderHistoryTable(filtered);
}

function duplicateHistoryPost(id) {
  const original = StorageService.getPostById(id);
  if (!original) return;

  const copy = {
    ...original,
    id: "post-" + Date.now(),
    title: `${original.title} (Copy)`,
    status: "Draft",
    versions: [],
    createdAt: new Date().toISOString()
  };

  StorageService.savePost(copy);
  allPosts = StorageService.getPosts();
  applyHistoryFilters();
  App.toast("Post duplicated.", "success");
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

