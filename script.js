
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
  if (!cards.length) return;

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

function showFormMessage(form, text, isError) {
  let box = form.querySelector(".form-message");
  if (!box) {
    box = document.createElement("p");
    box.className = "form-message";
    box.setAttribute("role", "status");
    form.insertAdjacentElement("afterend", box);
  }
  box.className = isError ? "form-message form-error" : "form-message form-success";
  box.textContent = text;
}

document.querySelectorAll(".contact-form, .newsletter-form").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const buttonText = button.textContent;
    button.disabled = true;
    button.textContent = "Sending...";

    try {
      const response = await fetch(form.action.replace("formsubmit.co/", "formsubmit.co/ajax/"), {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const result = await response.json();
      if (!response.ok || result.success === "false") throw new Error(result.message);

      form.reset();
      showFormMessage(
        form,
        form.classList.contains("newsletter-form")
          ? "Thanks for subscribing!"
          : "Thank you! Your message has been sent. We will reply within 2–3 working days.",
        false
      );
    } catch (error) {
      showFormMessage(form, "Sorry, something went wrong. Please try again or email us directly.", true);
    } finally {
      button.disabled = false;
      button.textContent = buttonText;
    }
  });
});
