/**
 * Sources Library JavaScript
 * Search, filter by category/type, sort by date, preview source text,
 * add source via text or .txt file, edit metadata, delete source,
 * detect duplicates, and link directly to content generator.
 */

let currentSources = [];

document.addEventListener("DOMContentLoaded", () => {
  loadSources();
  bindSourceEvents();

  // If URL has ?action=add, automatically open modal
  const params = new URLSearchParams(window.location.search);
  if (params.get("action") === "add") {
    openAddSourceModal();
  }
});

function loadSources() {
  currentSources = StorageService.getSources();
  renderSourcesList(currentSources);
}

function renderSourcesList(sources) {
  const container = document.getElementById("sourcesContainer");
  const countBadge = document.getElementById("sourcesCountBadge");
  if (!container) return;

  if (countBadge) countBadge.textContent = `${sources.length} sources`;

  if (sources.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <i class="bi bi-folder-x empty-icon"></i>
        <div class="empty-title">No sources found</div>
        <p class="empty-description">Try adjusting your search terms or add a new source document to begin generating social content.</p>
        <button type="button" class="btn btn-primary" onclick="openAddSourceModal()">
          <i class="bi bi-plus-lg"></i> Add New Source
        </button>
      </div>
    `;
    return;
  }

  let html = "";
  sources.forEach(src => {
    html += `
      <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
            <span class="badge badge-platform">${src.type || 'Document'}</span>
            <span style="font-size: 0.75rem; color: var(--text-muted);">${formatDate(src.createdAt)}</span>
          </div>

          <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem; line-height: 1.35;">
            ${escapeHtml(src.title)}
          </h3>

          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
            ${escapeHtml(src.excerpt || src.content || '')}
          </p>

          <div style="display: flex; align-items: center; gap: 1rem; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 1.25rem;">
            <span><i class="bi bi-card-text"></i> ${src.wordCount || 0} words</span>
            ${src.url ? `<span title="${escapeHtml(src.url)}"><i class="bi bi-link-45deg"></i> Linked URL</span>` : ''}
          </div>
        </div>

        <div style="display: flex; gap: 0.5rem; border-top: 1px solid var(--border-color); padding-top: 1rem; flex-wrap: wrap;">
          <a href="/create/?sourceId=${src.id}" class="btn btn-primary btn-sm" style="flex: 1;" title="Use this source to generate social posts">
            <i class="bi bi-stars"></i> Generate
          </a>
          <button type="button" class="btn btn-secondary btn-sm" onclick="previewSource('${src.id}')" title="Read full text">
            <i class="bi bi-eye"></i> View
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="openEditSourceModal('${src.id}')" title="Edit Source Details">
            <i class="bi bi-pencil"></i>
          </button>
          <button type="button" class="btn btn-secondary btn-sm" style="color: var(--danger);" onclick="confirmDeleteSource('${src.id}')" title="Delete Source">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function bindSourceEvents() {
  const searchInput = document.getElementById("sourceSearchInput");
  const typeFilter = document.getElementById("sourceTypeFilter");
  const sortSelect = document.getElementById("sourceSortSelect");

  function applyFilters() {
    let result = [...currentSources];
    const query = (searchInput ? searchInput.value : "").toLowerCase().trim();
    const type = typeFilter ? typeFilter.value : "ALL";
    const sort = sortSelect ? sortSelect.value : "newest";

    if (query) {
      result = result.filter(s =>
        s.title.toLowerCase().includes(query) ||
        (s.content && s.content.toLowerCase().includes(query)) ||
        (s.type && s.type.toLowerCase().includes(query))
      );
    }

    if (type !== "ALL") {
      result = result.filter(s => s.type === type);
    }

    if (sort === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === "oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sort === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    renderSourcesList(result);
  }

  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (typeFilter) typeFilter.addEventListener("change", applyFilters);
  if (sortSelect) sortSelect.addEventListener("change", applyFilters);

  // File import (.txt)
  const fileInput = document.getElementById("sourceFileInput");
  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.name.endsWith(".txt")) {
        App.toast("Please upload a .txt text file.", "warning");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        document.getElementById("sourceContentInput").value = event.target.result;
        if (!document.getElementById("sourceTitleInput").value) {
          document.getElementById("sourceTitleInput").value = file.name.replace(/\.[^/.]+$/, "");
        }
        App.toast(`Loaded file: ${file.name}`, "info");
      };
      reader.readAsText(file);
    });
  }

  // Add / Edit Form Submit
  const form = document.getElementById("sourceModalForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      saveSourceFromModal();
    });
  }
}

function openAddSourceModal() {
  document.getElementById("sourceModalTitle").textContent = "Add Source Document";
  document.getElementById("sourceIdInput").value = "";
  document.getElementById("sourceTitleInput").value = "";
  document.getElementById("sourceTypeSelect").value = "Blog Post";
  document.getElementById("sourceUrlInput").value = "";
  document.getElementById("sourceContentInput").value = "";
  document.getElementById("sourceModalBackdrop").classList.add("show");
}

function openEditSourceModal(id) {
  const src = StorageService.getSourceById(id);
  if (!src) return;

  document.getElementById("sourceModalTitle").textContent = "Edit Source Document";
  document.getElementById("sourceIdInput").value = src.id;
  document.getElementById("sourceTitleInput").value = src.title;
  document.getElementById("sourceTypeSelect").value = src.type || "Blog Post";
  document.getElementById("sourceUrlInput").value = src.url || "";
  document.getElementById("sourceContentInput").value = src.content || "";
  document.getElementById("sourceModalBackdrop").classList.add("show");
}

function closeSourceModal() {
  document.getElementById("sourceModalBackdrop").classList.remove("show");
}

function saveSourceFromModal() {
  const id = document.getElementById("sourceIdInput").value;
  const title = document.getElementById("sourceTitleInput").value.trim();
  const type = document.getElementById("sourceTypeSelect").value;
  const url = document.getElementById("sourceUrlInput").value.trim();
  const content = document.getElementById("sourceContentInput").value.trim();

  if (!title) {
    App.toast("Source title is required.", "danger");
    return;
  }
  if (!content) {
    App.toast("Source content body cannot be empty.", "danger");
    return;
  }

  // Duplicate title check
  const sources = StorageService.getSources();
  const isDuplicate = sources.some(s => s.title.toLowerCase() === title.toLowerCase() && s.id !== id);
  if (isDuplicate) {
    App.toast("A source with this exact title already exists.", "warning");
    return;
  }

  const payload = {
    title,
    type,
    url,
    content
  };
  if (id) payload.id = id;

  StorageService.saveSource(payload);
  closeSourceModal();
  loadSources();
  App.toast(id ? "Source document updated." : "New source document added.", "success");
}

function confirmDeleteSource(id) {
  const src = StorageService.getSourceById(id);
  if (!src) return;

  App.confirm(
    "Delete Source Document?",
    `Are you sure you want to delete "${src.title}"? Generated posts linked to this source will remain in your workspace.`,
    () => {
      StorageService.deleteSource(id);
      loadSources();
      App.toast("Source deleted successfully.", "success");
    }
  );
}

function previewSource(id) {
  const src = StorageService.getSourceById(id);
  if (!src) return;

  document.getElementById("previewModalTitle").textContent = src.title;
  document.getElementById("previewModalMeta").innerHTML = `
    <span class="badge badge-platform">${src.type}</span>
    <span><i class="bi bi-clock"></i> Added ${formatDate(src.createdAt)}</span>
    <span><i class="bi bi-card-text"></i> ${src.wordCount || 0} words</span>
    ${src.url ? `<span><i class="bi bi-link-45deg"></i> <a href="${src.url}" target="_blank" rel="noopener">${src.url}</a></span>` : ''}
  `;
  document.getElementById("previewModalContent").textContent = src.content;
  document.getElementById("previewModalGenerateLink").href = `/create/?sourceId=${src.id}`;
  document.getElementById("previewModalBackdrop").classList.add("show");
}

function closePreviewModal() {
  document.getElementById("previewModalBackdrop").classList.remove("show");
}

function simulateUrlExtraction() {
  const url = document.getElementById("sourceUrlInput").value.trim();
  if (!url) {
    App.toast("Please enter a URL first.", "warning");
    return;
  }
  App.toast("Notice: Live URL extraction is disabled in demo mode. Simulated extraction completed with dummy draft structure.", "info");
  if (!document.getElementById("sourceTitleInput").value) {
    document.getElementById("sourceTitleInput").value = "Simulated Article: " + url.replace(/^https?:\/\//, "");
  }
}

function formatDate(iso) {
  if (!iso) return "N/A";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
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

