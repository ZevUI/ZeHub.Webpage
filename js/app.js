const grid = document.getElementById("scriptGrid");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const filters = document.querySelectorAll(".filter");
const scriptCount = document.getElementById("scriptCount");
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

let activeFilter = "all";
let toastTimer;

scriptCount.textContent = scripts.length;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderScripts() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = scripts.filter(script => {
    const matchesFilter = activeFilter === "all" || script.category === activeFilter;
    const searchable = [
      script.name,
      script.description,
      script.category,
      ...(script.features || [])
    ].join(" ").toLowerCase();

    return matchesFilter && searchable.includes(query);
  });

  grid.innerHTML = filtered.map((script, index) => `
    <article class="script-card">
      <div class="card-top">
        <div class="game-icon">${escapeHtml(script.icon || script.name.charAt(0))}</div>
        <span class="status">${escapeHtml(script.status || "Live")}</span>
      </div>

      <h3>${escapeHtml(script.name)}</h3>
      <p>${escapeHtml(script.description)}</p>

      <div class="feature-list">
        ${(script.features || []).map(feature =>
          `<span class="feature">${escapeHtml(feature)}</span>`
        ).join("")}
      </div>

      <button class="copy-btn" data-index="${scripts.indexOf(script)}">
        Copy Loadstring
      </button>
    </article>
  `).join("");

  emptyState.hidden = filtered.length !== 0;

  grid.querySelectorAll(".copy-btn").forEach(button => {
    button.addEventListener("click", () => copyLoadstring(Number(button.dataset.index), button));
  });
}

async function copyLoadstring(index, button) {
  const script = scripts[index];
  if (!script) return;

  const value = script.loadstring.trim();

  if (!value || value.includes("ADD YOUR")) {
    showToast("Add the loadstring in js/scripts.js first.");
    return;
  }

  try {
    await navigator.clipboard.writeText(value);
    button.textContent = "✓ Copied";
    button.classList.add("copied");
    showToast(`${script.name} loadstring copied!`);

    setTimeout(() => {
      button.textContent = "Copy Loadstring";
      button.classList.remove("copied");
    }, 1600);
  } catch {
    // Fallback for browsers that block navigator.clipboard.
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      document.execCommand("copy");
      button.textContent = "✓ Copied";
      button.classList.add("copied");
      showToast(`${script.name} loadstring copied!`);
      setTimeout(() => {
        button.textContent = "Copy Loadstring";
        button.classList.remove("copied");
      }, 1600);
    } finally {
      textarea.remove();
    }
  }
}

function showToast(message) {
  clearTimeout(toastTimer);
  toastText.textContent = message;
  toast.classList.add("show");

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

searchInput.addEventListener("input", renderScripts);

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    filter.classList.add("active");
    activeFilter = filter.dataset.filter;
    renderScripts();
  });
});

renderScripts();
