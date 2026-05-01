document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     LOAD USER
  ========================= */

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    console.error("Invalid user data");
    localStorage.removeItem("user");
  }

  const username = document.getElementById("username");

  if (username && user) {
    username.innerText = user.name || "User";
  }

  /* =========================
     UPDATE COUNTS
  ========================= */

  if (typeof updateCartCount === "function") updateCartCount();
  if (typeof updateFavCount === "function") updateFavCount();
  if (typeof checkFavIcons === "function") checkFavIcons();

  /* =========================
     SEARCH HANDLING
  ========================= */

  const params = new URLSearchParams(window.location.search);
  const searchQuery = params.get("search");

  if (searchQuery) {

    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.value = searchQuery;

    // Delay search until products render
    setTimeout(() => {

      let productCards = document.querySelectorAll(".product-card");

      productCards.forEach(product => {

        let text = product.innerText.toLowerCase();

        if (text.includes(searchQuery.toLowerCase())) {
          product.style.display = "";
        } else {
          product.style.display = "none";
        }

      });

    }, 500); // wait for API load

  }

});


/* =========================
   SIZE SELECT
========================= */

function selectSize(el) {

  document.querySelectorAll(".sizes span")
    .forEach(s => s.classList.remove("active"));

  el.classList.add("active");

}


/* =========================
   NAVBAR USER LOAD
========================= */

function loadNavbarUser() {

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    localStorage.removeItem("user");
  }

  const navUser = document.getElementById("nav-user");

  if (user && navUser) {
    navUser.innerText = user.name;
  }

}

window.addEventListener("DOMContentLoaded", function () {
  const username = document.getElementById("username");
  if (username) {
    const user = JSON.parse(localStorage.getItem("user"));
    username.innerText = user?.name || "Guest";
  }
});