const grid = document.getElementById("scriptGrid");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const filters = document.querySelectorAll(".filter");
const scriptCount = document.getElementById("scriptCount");
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

let activeFilter = "all";
let toastTimer;

scriptCount.textContent = scripts.length;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderScripts() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = scripts.filter(script => {
    const matchesFilter = activeFilter === "all" || script.category === activeFilter;
    const searchable = [
      script.name, script.game, script.description, script.category,
      script.status, script.version, script.compatibility, ...(script.features || [])
    ].join(" ").toLowerCase();
    return matchesFilter && searchable.includes(query);
  });

  grid.innerHTML = filtered.map(script => {
    const index = scripts.indexOf(script);
    const featurePreview = script.features.slice(0, 8).map(feature =>
      `<span class="feature">${escapeHtml(feature)}</span>`).join("");

    return `
      <article class="script-card">
        <div class="card-top">
          <div class="game-icon">${escapeHtml(script.icon)}</div>
          <span class="status">${escapeHtml(script.status)}</span>
        </div>
        <div class="card-title-row">
          <div><h3>${escapeHtml(script.name)}</h3><span class="version">${escapeHtml(script.version)}</span></div>
        </div>
        <p class="description">${escapeHtml(script.description)}</p>

        <div class="meta-row">
          <span>↻ ${escapeHtml(script.updated)}</span>
          <span>◉ ${escapeHtml(script.compatibility)}</span>
        </div>

        <div class="feature-list">${featurePreview}<span class="feature more">+${script.features.length - 8} more</span></div>

        <div class="card-actions">
          <button class="primary-btn copy-btn" data-index="${index}">Copy Loadstring</button>
          <button class="secondary-btn details-btn" data-index="${index}">View Details</button>
        </div>
      </article>
    `;
  }).join("");

  emptyState.hidden = filtered.length !== 0;

  grid.querySelectorAll(".copy-btn").forEach(button =>
    button.addEventListener("click", () => copyLoadstring(Number(button.dataset.index), button))
  );
  grid.querySelectorAll(".details-btn").forEach(button =>
    button.addEventListener("click", () => openDetails(Number(button.dataset.index)))
  );
}

async function copyLoadstring(index, button) {
  const script = scripts[index];
  if (!script) return;

  const value = script.loadstring.trim();
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  button.textContent = "✓ Copied";
  button.classList.add("copied");
  showToast(`${script.name} loadstring copied!`);

  setTimeout(() => {
    button.textContent = "Copy Loadstring";
    button.classList.remove("copied");
  }, 1600);
}

function openDetails(index) {
  const script = scripts[index];
  if (!script) return;

  modalContent.innerHTML = `
    <div class="modal-icon">${escapeHtml(script.icon)}</div>
    <div class="eyebrow"><span></span> ${escapeHtml(script.status.toUpperCase())}</div>
    <h2 id="modalTitle">${escapeHtml(script.name)}</h2>
    <p>${escapeHtml(script.description)}</p>
    <div class="modal-meta">
      <span>Version ${escapeHtml(script.version)}</span>
      <span>Updated ${escapeHtml(script.updated)}</span>
      <span>${escapeHtml(script.compatibility)}</span>
    </div>
    <h3>Main Features</h3>
    <div class="feature-list large">${script.features.map(f => `<span class="feature">${escapeHtml(f)}</span>`).join("")}</div>
    <button class="primary-btn wide modal-copy" data-index="${index}">Copy Loadstring</button>
  `;

  modalBackdrop.hidden = false;
  document.body.classList.add("modal-open");
  modalContent.querySelector(".modal-copy").addEventListener("click", e =>
    copyLoadstring(index, e.currentTarget)
  );
}

function closeModal() {
  modalBackdrop.hidden = true;
  document.body.classList.remove("modal-open");
}

function showToast(message) {
  clearTimeout(toastTimer);
  toastText.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

searchInput.addEventListener("input", renderScripts);

filters.forEach(filter => filter.addEventListener("click", () => {
  filters.forEach(item => item.classList.remove("active"));
  filter.classList.add("active");
  activeFilter = filter.dataset.filter;
  renderScripts();
}));

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", e => {
  if (e.target === modalBackdrop) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

renderScripts();