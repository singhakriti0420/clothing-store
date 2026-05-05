let products = [];

const BACKEND_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8000"
    : "https://clothing-store-1-oztb.onrender.com";

const localProductImageMap = {
  "Classic Black T-Shirt": "images/blacktee1.png",
  "White Casual Shirt": "images/whitetee.png",
  "Navy Blue Hoodie": "images/hoodie.png",
  "Black Denim Jeans": "images/blacktee1.png",
  "Women's White T-Shirt": "images/whitetee.png",
  "Women's Pink Hoodie": "images/hoodie.png",
  "Women's Black Dress": "images/red-removebg-preview.png",
  "Women's Blue Jeans": "images/whitetee.png",
  "Oversized Brown T-Shirt": "images/brown.png",
  "Oversized Gray Hoodie": "images/graphictee.png",
  "Oversized Black Sweater": "images/blacktee1.png",
  "Oversized Beige Shirt": "images/loose shirt.png"
};

function getLocalImage(name) {
  return localProductImageMap[name] || "images/blacktee1.png";
}

/* =========================
   GET CATEGORY FROM URL
========================= */

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

/* =========================
   BUILD API URL
========================= */

let apiUrl = `${BACKEND_URL}/api/products/`;

if (category) {
  apiUrl += `?category=${category}`;
}

/* =========================
   FETCH PRODUCTS
========================= */

async function loadProducts() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();

    const isHomePage =
      window.location.href.includes("index.html") ||
      window.location.pathname === "/";

    const limitedData = isHomePage ? data.slice(0, 4) : data;

    products = limitedData.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.image || getLocalImage(item.name),
      desc: item.description
    }));

    console.log("Products loaded:", products);

    renderProducts();
  } catch (error) {
    console.error("Failed to load products:", error);
  }
}

function renderProducts() {
  const container = document.getElementById("product-container");
  if (!container) return;

  container.innerHTML = products.map(product => `
    <div class="product-card" onclick="openDetail(${product.id})">
      <img
        src="${product.img}"
        alt="${product.name}"
        onerror="this.onerror=null;this.src='images/blacktee1.png';"
      >
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <div class="product-actions">
        <button class="add-btn" onclick="addToCart(${product.id}, event)">Add to Cart</button>
        <button class="fav-btn" onclick="toggleFav(event, ${product.id})">
          <i class="fa-regular fa-heart fav-icon" data-id="${product.id}"></i>
        </button>
      </div>
    </div>
  `).join("");

  checkFavIcons();
}

/* =========================
   PRODUCT DETAIL PAGE
========================= */

function openDetail(id) {
  window.location.href = `product-detail.html?id=${id}`;
}

/* =========================
   CART
========================= */

function addToCart(id, event) {
  if (event) event.stopPropagation();

  const product = products.find(p => p.id == id);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id == id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  alert("Added To Cart 🛒");
}

/* =========================
   FAVOURITES
========================= */

function toggleFav(event, id) {
  event.stopPropagation();

  const product = products.find(p => p.id === id);
  if (!product) return;

  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  const index = favourites.findIndex(item => item.id === id);

  const favIcon = event.target;

  if (index === -1) {
    favourites.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img
    });

    favIcon.classList.remove("fa-regular");
    favIcon.classList.add("fa-solid");
    favIcon.style.color = "red";
  } else {
    favourites.splice(index, 1);

    favIcon.classList.remove("fa-solid");
    favIcon.classList.add("fa-regular");
    favIcon.style.color = "white";
  }

  localStorage.setItem("favourites", JSON.stringify(favourites));

  updateFavCount();
}

/* =========================
   COUNTS
========================= */

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((sum, item) => sum + item.qty, 0);

  const cartCount = document.getElementById("cart-count");

  if (cartCount) cartCount.innerText = total;
}

function updateFavCount() {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  const favCount = document.getElementById("fav-count");

  if (favCount) favCount.innerText = favourites.length;
}

/* =========================
   CHECK FAV ICONS
========================= */

function checkFavIcons() {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  document.querySelectorAll(".fav-icon").forEach(icon => {
    const id = icon.getAttribute("data-id");

    const exists = favourites.find(item => item.id == id);

    if (exists) {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");
      icon.style.color = "red";
    } else {
      icon.classList.remove("fa-solid");
      icon.classList.add("fa-regular");
      icon.style.color = "white";
    }
  });
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  updateFavCount();
  updateCartCount();
  loadProducts();
});