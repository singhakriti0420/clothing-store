let products = [];

/* =========================
   GET CATEGORY FROM URL
========================= */

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

/* =========================
   BUILD API URL
========================= */

let apiUrl = "http://127.0.0.1:8000/api/products/";

if (category) {
    apiUrl += `?category=${category}`;
}

/* =========================
   FETCH PRODUCTS FROM DJANGO
========================= */



   fetch(apiUrl)
.then(response => response.json())
.then(data => {

    // 🔥 detect page
    const isHomePage =
        window.location.href.includes("index.html") ||
        window.location.pathname === "/";

    // 🔥 limit only on home
    const limitedData = isHomePage ? data.slice(0, 4) : data;

    // ✅ USE limitedData (IMPORTANT FIX)
    products = limitedData.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        img: item.image,
        desc: item.description
    }));

    console.log("Products loaded:", products);

    renderProducts();
})
.catch(error => console.error(error));


/* =========================
   PRODUCT DETAIL PAGE
========================= */

function openDetail(id) {
    window.location.href = `product-detail.html?id=${id}`;
}


/* =========================
   CART FUNCTION
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
});