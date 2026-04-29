document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       LOAD USER DATA
    ========================= */

    let user = null;

    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch (e) {
        console.error("Invalid user data in localStorage");
        localStorage.removeItem("user");
    }

    // If user not logged in → redirect
    if (!user || !user.name || !user.email) {
        window.location.href = "login.html";
        return;
    }

    /* =========================
       DISPLAY USER INFO
    ========================= */

    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    setText("profile-name", user.name);
    setText("profile-name2", user.name);
    setText("profile-email", user.email);
    setText("profile-email2", user.email);


    /* =========================
       LOGOUT FUNCTION
    ========================= */

    function logout() {
        localStorage.removeItem("user");
        window.location.href = "login.html";
    }

    /* =========================
       LOGOUT BUTTONS
    ========================= */

    ["logout-button", "logout-btn"].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener("click", logout);
    });

});