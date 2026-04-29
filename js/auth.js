/* ================= AUTH SYSTEM ================= */

// LOGOUT
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "signin.html";
}

// SIGNUP
function signup() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("Fill all fields");
    return false;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(user => user.email === email)) {
    alert("User already exists");
    return false;
  }

  const newUser = { name, email, password };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // 🔥 Auto login after signup
  localStorage.setItem("loggedInUser", JSON.stringify(newUser));

  alert("Signup successful 🎉");
  window.location.href = "index.html";

  return false;
}

// SIGNIN
function signin() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const valid = users.find(user =>
    user.email === email && user.password === password
  );

  if (!valid) {
    alert("Invalid email or password ❌");
    return false;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(valid));

  alert("Login successful ✅");
  window.location.href = "index.html";

  return false;
}