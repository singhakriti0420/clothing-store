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

<script>
document.addEventListener("DOMContentLoaded", function () {

    fetch("http://127.0.0.1:8000/api/products/")
        .then(res => res.json())
        .then(data => {

            const container = document.getElementById("product-container");
            container.innerHTML = "";

            data.forEach(product => {

                container.innerHTML += `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>₹${product.price}</p>
                        <small>${product.category}</small>
                    </div>
                `;

            });

        })
        .catch(err => {
            console.log("Product load error:", err);
        });

});
</script>