let buttons = document.querySelectorAll(".filter-buttons button");
let cards = document.querySelectorAll(".article-card");

let url = new URLSearchParams(window.location.search);
let category = url.get("category") || "all";
let searchWord = (url.get("q") || "").toLowerCase();

function showArticles() {
  let found = 0;
  for (let button of buttons) {
    button.classList.toggle("active", button.dataset.filter === category);
  }

  for (let card of cards) {
    let rightCategory =
      category === "all" || card.dataset.category === category;
    let hasWord = card.textContent.toLowerCase().includes(searchWord);

    if (rightCategory && hasWord) {
      card.style.display = "block";
      found = found + 1;
    } else {
      card.style.display = "none";
    }
  }

  let message = document.getElementById("no-results");
  if (message) {
    message.hidden = found > 0;
  }
}

for (let button of buttons) {
  button.addEventListener("click", function () {
    category = button.dataset.filter;
    showArticles();
  });
}

showArticles();

const menuToggle = document.getElementById("menuToggle");
const navbar = document.querySelector(".navbar");

if (menuToggle && navbar) {
  menuToggle.addEventListener("click", function () {
    navbar.classList.toggle("open");
  });
}
