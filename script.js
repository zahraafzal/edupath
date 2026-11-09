
const buttons = document.querySelectorAll(".filter-buttons button");
const cards = document.querySelectorAll(".articles-grid .article-card[data-category]");
const params = new URLSearchParams(window.location.search);

const validCategories = Array.from(buttons).map((b) => b.dataset.filter);
let category = params.get("category") || "all";
if (!validCategories.includes(category)) category = "all";
let searchWord = (params.get("q") || "").trim().toLowerCase();
document.querySelectorAll('.search-box input[name="q"]').forEach((input) => {
  if (searchWord) input.value = params.get("q").trim();
});

function showArticles() {
  if (!cards.length) 

  let found = 0;
  buttons.forEach((button) => {
    const active = button.dataset.filter === category;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active);
  });

  cards.forEach((card) => {
    const rightCategory = category === "all" || card.dataset.category === category;
    const hasWord = !searchWord || card.textContent.toLowerCase().includes(searchWord);
    const show = rightCategory && hasWord;
    card.hidden = !show;
    if (show) found++;
  });

  const message = document.getElementById("no-results");
  if (message) message.hidden = found > 0;

  const count = document.getElementById("results-count");
  if (count) {
    count.textContent = searchWord
      ? `${found} article${found === 1 ? "" : "s"} found for "${params.get("q").trim()}"`
      : "";
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    category = button.dataset.filter;
    const newParams = new URLSearchParams();
    if (category !== "all") newParams.set("category", category);
    if (searchWord) newParams.set("q", params.get("q").trim());
    const qs = newParams.toString();
    history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
    showArticles();
  });
});

showArticles();

const menuToggle = document.getElementById("menuToggle");
const navbar = document.querySelector(".navbar");

function setMenu(open) {
  navbar.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", open);
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuToggle.textContent = open ? "✕" : "☰";
}

if (menuToggle && navbar) {
  menuToggle.addEventListener("click", () => setMenu(!navbar.classList.contains("open")));
  navbar.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navbar.classList.contains("open")) setMenu(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) setMenu(false);
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".navbar a").forEach((link) => {
  const target = link.getAttribute("href").split("/").pop();
  if (target === currentPage || (currentPage.startsWith("how-") || currentPage.startsWith("choosing-") || currentPage.startsWith("time-")) && target === "blog.html") {
    link.setAttribute("aria-current", "page");
  }
});

if (params.get("sent") === "1") {
  const ok = document.getElementById("form-success");
  if (ok) ok.hidden = false;
}
if (params.get("subscribed") === "1") {
  const form = document.querySelector(".newsletter-form");
  if (form) form.insertAdjacentHTML("afterend", '<p class="form-success" role="status">Thanks for subscribing!</p>');
}
