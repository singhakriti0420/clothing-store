const localProductImageMap = {
    "Classic Black T-Shirt": "images/blacktee1.png.png",
    "White Casual Shirt": "images/whitetee.png",
    "Navy Blue Hoodie": "images/hoodie.png",
    "Black Denim Jeans": "images/blacktee1.png.png",
    "Women's White T-Shirt": "images/whitetee.png",
    "Women's Pink Hoodie": "images/hoodie.png",
    "Women's Black Dress": "images/red-removebg-preview.png",
    "Women's Blue Jeans": "images/whitetee.png",
    "Oversized Brown T-Shirt": "images/brown.png",
    "Oversized Gray Hoodie": "images/graphictee.png",
    "Oversized Black Sweater": "images/blacktee1.png.png",
    "Oversized Beige Shirt": "images/loose shirt.png"
};

function getLocalImage(name) {
    return localProductImageMap[name] || "images/blacktee1.png.png";
}

document.addEventListener("DOMContentLoaded", async () => {

  if (!window.location.href.includes("product-detail.html")) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    showError("Invalid product.");
    return;
  }

  try {
    // ✅ Fetch single product
    const res = await fetch(`http://127.0.0.1:8000/api/products/${id}/`);
    const data = await res.json();

    const product = {
      id: data.id,
      name: data.name,
      price: data.price,
      img: data.image || getLocalImage(data.name),
      desc: data.description
    };

    renderProduct(product);

  } catch (err) {
    console.error(err);
    showError("Failed to load product.");
  }

});


/* =========================
   RENDER PRODUCT
========================= */

function renderProduct(product) {

  const img = document.getElementById("detail-img");
  if (img) {
    img.src = product.img;
    img.alt = product.name;
  }

  const name = document.getElementById("detail-name");
  if (name) name.innerText = product.name;

  const price = document.getElementById("detail-price");
  if (price) {
    price.innerText = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR"
    }).format(product.price);
  }

  const desc = document.getElementById("detail-desc");
  if (desc) desc.innerText = product.desc;

  // Add to cart
  const addBtn = document.getElementById("detail-add-btn");
  if (addBtn) {
    addBtn.onclick = () => addToCartFromDetail(product);
  }

  // Favourite
  const favBtn = document.getElementById("detail-fav-btn");
  if (favBtn) {
    favBtn.onclick = () => toggleFavourite(product);
  }
}


/* =========================
   ERROR UI
========================= */

function showError(msg) {
  const page = document.querySelector(".product-detail-page");
  if (page) page.innerHTML = `<p>${msg}</p>`;
}


/* =========================
   SIZE SELECTION
========================= */

function selectSize(el) {
  document.querySelectorAll(".sizes span").forEach(s =>
    s.classList.remove("selected")
  );
  el.classList.add("selected");
}


/* =========================
   QUANTITY
========================= */

function changeQtyDetail(delta) {
  const qtyEl = document.getElementById("detail-qty");
  let qty = parseInt(qtyEl.innerText);
  qty = Math.max(1, qty + delta);
  qtyEl.innerText = qty;
}


/* =========================
   ADD TO CART
========================= */

function addToCartFromDetail(product) {

  const qty = parseInt(document.getElementById("detail-qty").innerText);
  const sizeEl = document.querySelector(".sizes span.selected");
  const size = sizeEl ? sizeEl.innerText : null;

  if (!size) {
    alert("Please select a size before adding to bag.");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item =>
    item.id === product.id && item.size === size
  );

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      ...product,
      qty,
      size
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to bag 🛒");
}


/* =========================
   FAVOURITES
========================= */

function toggleFavourite(product) {

  const favIcon = document.getElementById("fav-icon");

  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  const index = favourites.findIndex(item => item.id === product.id);

  if (index === -1) {
    favourites.push(product);
    favIcon.classList.remove("fa-regular");
    favIcon.classList.add("fa-solid");
    alert("Added to favourites ❤️");
  } else {
    favourites.splice(index, 1);
    favIcon.classList.remove("fa-solid");
    favIcon.classList.add("fa-regular");
    alert("Removed from favourites");
  }

  localStorage.setItem("favourites", JSON.stringify(favourites));
}