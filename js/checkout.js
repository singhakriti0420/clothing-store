document.addEventListener("DOMContentLoaded", function () {

    let cart = [];

    try {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
        localStorage.removeItem("cart");
        cart = [];
    }

    const itemsContainer = document.getElementById("checkout-items");
    const totalDisplay = document.getElementById("checkout-total");
    const form = document.getElementById("checkout-form");

    // Safety check
    if (!itemsContainer || !totalDisplay || !form) {
        console.error("Checkout elements missing");
        return;
    }

    let total = 0;

    /* =========================
       EMPTY CART
    ========================= */

    if (cart.length === 0) {
        itemsContainer.innerHTML = "<p>Your cart is empty 🛒</p>";
        totalDisplay.innerText = "₹0";
        return;
    }

    /* =========================
       DISPLAY ITEMS
    ========================= */

    cart.forEach(item => {

        const price = parseFloat(item.price) || 0;
        const qty = item.qty || 1;

        const itemTotal = price * qty;
        total += itemTotal;

        const div = document.createElement("div");
        div.classList.add("checkout-item");

        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="checkout-info">
                <p>${item.name} (x${qty})</p>
                <p>₹${itemTotal.toFixed(2)}</p>
            </div>
        `;

        itemsContainer.appendChild(div);

    });

    /* =========================
       SHIPPING
    ========================= */

    const shipping = 50;
    total += shipping;

    totalDisplay.innerText = "₹" + total.toFixed(2);

    /* =========================
       ORDER SUBMIT
    ========================= */

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        // Optional: disable button to prevent double click
        const btn = form.querySelector("button");
        if (btn) btn.disabled = true;

        alert("Order placed successfully 🎉");

        localStorage.removeItem("cart");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);

    });

});