/**
 * Generator JavaScript logic
 * Step-by-step interactive wizard:
 * Step 1: Source Selection
 * Step 2: Multi-Platform Selection
 * Step 3: Content Tone & Settings (Brand profile, CTA, audience)
 * Step 4: Simulated AI Generation Engine (Template-based local heuristics)
 */

let selectedSource = null;
let currentStep = 1;

document.addEventListener("DOMContentLoaded", () => {
  initGenerator();
});

function initGenerator() {
  renderSourceOptions();
  loadBrandDefaultsIntoSettings();
  bindWizardEvents();

  // If sourceId is in URL, auto-select it
  const params = new URLSearchParams(window.location.search);
  const preSelectedId = params.get("sourceId");
  if (preSelectedId) {
    selectSourceById(preSelectedId);
  }
}

function renderSourceOptions() {
  const container = document.getElementById("sourceSelectionGrid");
  const sources = StorageService.getSources();
  if (!container) return;

  if (sources.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <i class="bi bi-folder-x empty-icon"></i>
        <div class="empty-title">No sources available</div>
        <p class="empty-description">Add a source document to begin generating social posts.</p>
        <a href="/sources/?action=add" class="btn btn-primary btn-sm">Add Source First</a>
      </div>
    `;
    return;
  }

  let html = "";
  sources.forEach(src => {
    html += `
      <div class="card source-pick-card" id="sourceCard-${src.id}" onclick="selectSourceById('${src.id}')" style="cursor: pointer; transition: all 0.2s ease;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
          <span class="badge badge-platform">${src.type}</span>
          <span style="font-size: 0.75rem; color: var(--text-muted);"><i class="bi bi-card-text"></i> ${src.wordCount || 0} words</span>
        </div>
        <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem; line-height: 1.35;">
          ${escapeHtml(src.title)}
        </h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${escapeHtml(src.excerpt || src.content || '')}
        </p>
      </div>
    `;
  });

  container.innerHTML = html;
}

function selectSourceById(id) {
  const src = StorageService.getSourceById(id);
  if (!src) return;

  selectedSource = src;

  // Visual selection toggle
  document.querySelectorAll(".source-pick-card").forEach(el => {
    el.style.borderColor = "var(--border-color)";
    el.style.backgroundColor = "var(--bg-surface)";
  });

  const card = document.getElementById(`sourceCard-${id}`);
  if (card) {
    card.style.borderColor = "var(--primary)";
    card.style.backgroundColor = "var(--primary-light)";
  }

  // Update preview bar
  const previewBox = document.getElementById("selectedSourcePreview");
  if (previewBox) {
    previewBox.style.display = "block";
    document.getElementById("previewSourceTitle").textContent = src.title;
    document.getElementById("previewSourceMeta").textContent = `${src.type} • ${src.wordCount || 0} words`;
  }

  // Enable continue button
  const nextBtn = document.getElementById("step1NextBtn");
  if (nextBtn) nextBtn.removeAttribute("disabled");
}

function loadBrandDefaultsIntoSettings() {
  const brand = StorageService.getBrandSettings();
  if (!brand) return;

  const brandNameEl = document.getElementById("brandNameDisplay");
  if (brandNameEl) brandNameEl.textContent = brand.brandName || "Active Brand Profile";

  const audienceInput = document.getElementById("settingAudience");
  if (audienceInput) audienceInput.value = brand.targetAudience || "B2B Leaders & Practitioners";

  const ctaInput = document.getElementById("settingCta");
  if (ctaInput) ctaInput.value = brand.defaultCta || "Read the full case study on our website.";

  const toneSelect = document.getElementById("settingTone");
  if (toneSelect && brand.preferredTone) {
    // If tone contains authoritative
    if (brand.preferredTone.toLowerCase().includes("authoritative")) toneSelect.value = "authoritative";
  }
}

function bindWizardEvents() {
  // Step Navigation Buttons
  const step1Next = document.getElementById("step1NextBtn");
  if (step1Next) {
    step1Next.addEventListener("click", () => goToStep(2));
  }

  const step2Back = document.getElementById("step2BackBtn");
  const step2Next = document.getElementById("step2NextBtn");
  if (step2Back) step2Back.addEventListener("click", () => goToStep(1));
  if (step2Next) {
    step2Next.addEventListener("click", () => {
      const selectedPlatforms = getSelectedPlatforms();
      if (selectedPlatforms.length === 0) {
        App.toast("Please select at least one platform.", "warning");
        return;
      }
      goToStep(3);
    });
  }

  const step3Back = document.getElementById("step3BackBtn");
  const generateBtn = document.getElementById("generateContentBtn");
  if (step3Back) step3Back.addEventListener("click", () => goToStep(2));
  if (generateBtn) {
    generateBtn.addEventListener("click", runSimulatedGeneration);
  }
}

function goToStep(stepNum) {
  currentStep = stepNum;

  // Step indicator states
  for (let i = 1; i <= 4; i++) {
    const tab = document.getElementById(`stepTab-${i}`);
    const pane = document.getElementById(`stepPane-${i}`);
    if (tab && pane) {
      if (i === stepNum) {
        tab.classList.add("active");
        pane.style.display = "block";
      } else {
        tab.classList.remove("active");
        pane.style.display = "none";
      }
    }
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getSelectedPlatforms() {
  const checkboxes = document.querySelectorAll("input[name='platformSelect']:checked");
  return Array.from(checkboxes).map(cb => cb.value);
}

/**
 * Simulated AI Generation Engine (Template-based local heuristics)
 * Extracts key sentences, numbers, facts, applies platform constraints,
 * creates verifiable claims, and saves posts to localStorage.
 */
function runSimulatedGeneration() {
  if (!selectedSource) {
    App.toast("No source document selected.", "danger");
    goToStep(1);
    return;
  }

  const platforms = getSelectedPlatforms();
  if (platforms.length === 0) {
    App.toast("Please select at least one platform.", "warning");
    goToStep(2);
    return;
  }

  goToStep(4);

  // Show processing animation
  const loadingContainer = document.getElementById("generationLoadingState");
  const resultsContainer = document.getElementById("generationResultsState");
  if (loadingContainer) loadingContainer.style.display = "block";
  if (resultsContainer) resultsContainer.style.display = "none";

  const brand = StorageService.getBrandSettings();
  const tone = document.getElementById("settingTone").value;
  const audience = document.getElementById("settingAudience").value;
  const cta = document.getElementById("settingCta").value;
  const lengthMode = document.getElementById("settingLength").value;

  // Extract sentences from source text
  const rawSentences = selectedSource.content
    .split(/(?<=[.?!])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 20);

  // Heuristic: identify sentences containing numbers or statistics
  const statSentences = rawSentences.filter(s => /\d+%|\d+x|\d+ms|\$\d+|\b\d+\b/.test(s));

  setTimeout(() => {
    const generatedPosts = [];

    platforms.forEach(platform => {
      const post = buildPlatformSpecificPost({
        source: selectedSource,
        platform,
        sentences: rawSentences,
        stats: statSentences,
        brand,
        tone,
        audience,
        cta,
        lengthMode
      });

      // Save to storage
      StorageService.savePost(post);
      generatedPosts.push(post);
    });

    if (loadingContainer) loadingContainer.style.display = "none";
    if (resultsContainer) resultsContainer.style.display = "block";

    renderGeneratedResults(generatedPosts);
    App.toast(`Generated ${generatedPosts.length} social posts successfully!`, "success");
  }, 1200);
}

function buildPlatformSpecificPost(opts) {
  const { source, platform, sentences, stats, brand, tone, audience, cta } = opts;

  let title = "";
  let content = "";
  let hashtags = "";
  let defaultStatus = "Needs Review";
  const claims = [];

  const mainStat = stats.length > 0 ? stats[0] : (sentences[1] || source.excerpt);
  const secondarySentence = sentences.length > 2 ? sentences[2] : (sentences[0] || "");

  // Extract claim from mainStat
  if (mainStat) {
    claims.push({
      id: "cl-gen-" + Math.floor(Math.random() * 10000),
      claim: mainStat.slice(0, 90) + (mainStat.length > 90 ? "..." : ""),
      excerpt: mainStat,
      status: "Supported",
      passageId: "Passage 1",
      notes: "Extracted directly from source document text."
    });
  }

  // Brand hashtags & clean tags
  const defaultTags = (brand && brand.hashtagPreferences)
    ? brand.hashtagPreferences
    : "#TechInnovation #Strategy #Leadership";

  if (platform === "LinkedIn") {
    title = `Why ${source.title.slice(0, 48)} Matters For ${audience}`;
    content = `In today's fast-moving landscape, traditional workflows are falling short.\n\nHere is what our latest analysis revealed:\n\n📌 "${mainStat}"\n\n${secondarySentence}\n\nTo build sustainable advantage, leaders must shift focus from reactive maintenance to automated, verifiable systems.\n\nHow is your organization adapting this quarter? Let's discuss in the comments below. 👇`;
    hashtags = defaultTags;
  } else if (platform === "Instagram") {
    title = `Swipe for Key Takeaways: ${source.title.slice(0, 36)}`;
    content = `Swipe through for the 3 biggest findings from our latest deep dive! 📊✨\n\nSlide 1: The Core Problem\nSlide 2: "${mainStat}"\nSlide 3: Strategic Action Plan\n\nSave this post to reference during your next team planning session! 📌`;
    hashtags = defaultTags + " #Infographic #TechTips #B2B";
  } else if (platform === "Instagram Reels") {
    title = `Shorts/Reels Hook: ${source.title.slice(0, 32)}`;
    content = `[Visual: Quick zoom into data graph]\nAudio: Upbeat trending sound\n\n"If you think your team is prepared for this year's changes, look at this:"\n\n👉 "${mainStat}"\n\n"Here is what smart teams are doing right now to stay ahead:"\n\nDrop a comment if you want our full playbook! 🚀`;
    hashtags = "#ReelsViral #TechInsights #WorkplaceTips";
  } else if (platform === "YouTube Shorts") {
    title = `Watch This Before Planning Your Next Strategy: ${source.title.slice(0, 30)}`;
    content = `[0:00 - Fast Hook]: "Here is the number one metric most leaders are ignoring right now."\n[0:08 - The Reveal]: "${mainStat}"\n[0:25 - Breakdown]: "${secondarySentence}"\n[0:45 - Conclusion]: "Keep this in mind before your next rollout."`;
    hashtags = "#Shorts #TechBreakdown #Insights";
  } else if (platform === "Facebook") {
    title = `Key Takeaways from ${source.title.slice(0, 40)}`;
    content = `We just published our complete breakdown on ${source.title}.\n\nA major highlight:\n"${mainStat}"\n\n${secondarySentence}\n\nCheck out the full breakdown and share your thoughts with our community!`;
    hashtags = "#BusinessInsights #Strategy #Innovation";
  }

  return {
    sourceId: source.id,
    sourceTitle: source.title,
    platform,
    title,
    content,
    cta: cta || "Visit our website for full insights.",
    hashtags,
    status: defaultStatus,
    claims
  };
}

function renderGeneratedResults(posts) {
  const container = document.getElementById("generatedResultsList");
  if (!container) return;

  let html = "";
  posts.forEach(p => {
    html += `
      <div class="card" style="margin-bottom: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <span class="badge badge-platform">${p.platform}</span>
          <span class="badge badge-review"><i class="bi bi-clock"></i> ${p.status}</span>
        </div>
        <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
          ${escapeHtml(p.title)}
        </h4>
        <div style="background: var(--bg-body); padding: 1rem; border-radius: var(--radius-md); font-size: 0.9rem; line-height: 1.6; white-space: pre-wrap; color: var(--text-secondary); margin-bottom: 1rem; border: 1px solid var(--border-color);">
          ${escapeHtml(p.content)}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div style="font-size: 0.8rem; color: var(--text-muted);">
            <i class="bi bi-shield-check text-success"></i> ${p.claims.length} verified claim(s) attached
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <a href="/content/${p.id}/" class="btn btn-primary btn-sm">
              <i class="bi bi-pencil-square"></i> Open in Workspace
            </a>
            <a href="/content/${p.id}/evidence/" class="btn btn-secondary btn-sm">
              <i class="bi bi-shield-check"></i> Check Claims
            </a>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
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

