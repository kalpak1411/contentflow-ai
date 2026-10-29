/**
 * Exports JavaScript logic
 * Real CSV and JSON downloads via browser Blob API.
 * Formula injection escaping, counts selected records before export,
 * filter between Approved only vs All / Drafts.
 */

document.addEventListener("DOMContentLoaded", () => {
  updateExportStats();
  bindExportEvents();
});

function updateExportStats() {
  const posts = StorageService.getPosts();
  const approved = posts.filter(p => p.status === "Approved");
  const drafts = posts.filter(p => p.status !== "Approved");

  document.getElementById("exportStatApproved").textContent = approved.length;
  document.getElementById("exportStatTotal").textContent = posts.length;
  document.getElementById("exportStatDrafts").textContent = drafts.length;

  updateSelectedCount();
}

function updateSelectedCount() {
  const posts = StorageService.getPosts();
  const scope = document.querySelector("input[name='exportScope']:checked")?.value || "approved";

  let count = 0;
  if (scope === "approved") {
    count = posts.filter(p => p.status === "Approved").length;
  } else if (scope === "drafts") {
    count = posts.filter(p => p.status !== "Approved").length;
  } else {
    count = posts.length;
  }

  document.getElementById("exportCountPreview").textContent = `${count} post(s) selected for download`;
  return count;
}

function bindExportEvents() {
  const radios = document.querySelectorAll("input[name='exportScope']");
  radios.forEach(r => r.addEventListener("change", updateSelectedCount));

  const csvBtn = document.getElementById("downloadCsvBtn");
  const jsonBtn = document.getElementById("downloadJsonBtn");

  if (csvBtn) {
    csvBtn.addEventListener("click", () => triggerExport("csv"));
  }
  if (jsonBtn) {
    jsonBtn.addEventListener("click", () => triggerExport("json"));
  }
}

function triggerExport(format) {
  const posts = StorageService.getPosts();
  const scope = document.querySelector("input[name='exportScope']:checked")?.value || "approved";

  let targetPosts = [];
  if (scope === "approved") {
    targetPosts = posts.filter(p => p.status === "Approved");
  } else if (scope === "drafts") {
    targetPosts = posts.filter(p => p.status !== "Approved");
  } else {
    targetPosts = [...posts];
  }

  if (targetPosts.length === 0) {
    App.toast("No records match the selected export scope.", "warning");
    return;
  }

  if (format === "csv") {
    downloadCsv(targetPosts);
  } else {
    downloadJson(targetPosts);
  }
}

/**
 * Escapes values for CSV and protects against formula injection
 * (=, +, -, @ prefix)
 */
function sanitizeCsvValue(val) {
  if (val === null || val === undefined) return '""';
  let str = String(val).replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Formula injection defense: prepend single quote if starts with formula trigger
  if (/^[=\+\-@\t\r]/.test(str)) {
    str = "'" + str;
  }

  // Escape inner double quotes
  str = str.replace(/"/g, '""');
  return `"${str}"`;
}

function downloadCsv(posts) {
  const headers = ["Source Title", "Platform", "Content", "CTA", "Hashtags", "Approval Status", "Creation Date"];

  const rows = [headers.join(",")];

  posts.forEach(p => {
    const row = [
      sanitizeCsvValue(p.sourceTitle),
      sanitizeCsvValue(p.platform),
      sanitizeCsvValue(p.content),
      sanitizeCsvValue(p.cta),
      sanitizeCsvValue(p.hashtags),
      sanitizeCsvValue(p.status),
      sanitizeCsvValue(p.createdAt)
    ];
    rows.push(row.join(","));
  });

  const csvString = "\uFEFF" + rows.join("\n"); // Prepend UTF-8 BOM for Excel
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `contentflow-export-${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  StorageService.recordActivity(`Exported ${posts.length} posts to CSV`, "export", "bi-file-earmark-spreadsheet");
  App.toast(`Initiated CSV download for ${posts.length} records.`, "success");
}

function downloadJson(posts) {
  const sanitizedPosts = posts.map(p => ({
    id: p.id,
    sourceTitle: p.sourceTitle,
    platform: p.platform,
    title: p.title,
    content: p.content,
    cta: p.cta,
    hashtags: p.hashtags,
    status: p.status,
    claims: p.claims || [],
    createdAt: p.createdAt
  }));

  const jsonString = JSON.stringify(sanitizedPosts, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `contentflow-export-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  StorageService.recordActivity(`Exported ${posts.length} posts to JSON`, "export", "bi-file-earmark-code");
  App.toast(`Initiated JSON download for ${posts.length} records.`, "success");
}

