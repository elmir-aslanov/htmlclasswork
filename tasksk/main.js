// helpers
function getUsers() {
    const raw = localStorage.getItem("users");
    return raw ? JSON.parse(raw) : [];
}

function setUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function showAlert(type, message) {
    const box = document.getElementById("alertBox");
    box.classList.remove("hidden");
    box.textContent = message;

    box.className = "mb-4 rounded-lg border px-4 py-3 text-sm";

    if (type === "error") {
        box.classList.add("border-red-200", "bg-red-50", "text-red-700");
    } else if (type === "warning") {
        box.classList.add("border-yellow-200", "bg-yellow-50", "text-yellow-800");
    } else {
        box.classList.add("border-green-200", "bg-green-50", "text-green-700");
    }
}

function hideAlert() {
    document.getElementById("alertBox").classList.add("hidden");
}

function setError(inputId, errorId, msg) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);

    if (msg) {
        input.classList.add("border-red-500");
        error.textContent = msg;
        error.classList.remove("hidden");
    } else {
        input.classList.remove("border-red-500");
        error.textContent = "";
        error.classList.add("hidden");
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// main
const form = document.getElementById("signupForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    hideAlert();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    setError("username", "usernameError", "");
    setError("email", "emailError", "");
    setError("password", "passwordError", "");

    let hasError = false;

    if (!username) {
        setError("username", "usernameError", "Username is required");
        hasError = true;
    }

    if (!email) {
        setError("email", "emailError", "Email is required");
        hasError = true;
    } else if (!isValidEmail(email)) {
        setError("email", "emailError", "Invalid email");
        hasError = true;
    }

    if (!password) {
        setError("password", "passwordError", "Password is required");
        hasError = true;
    }

    if (hasError) {
        showAlert("error", "Please fill all required fields");
        return;
    }

    const users = getUsers();

    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        setError("username", "usernameError", "Username already exists");
        showAlert("warning", "Username already exists");
        return;
    }

    if (users.some(u => u.email === email)) {
        setError("email", "emailError", "Email already exists");
        showAlert("warning", "Email already exists");
        return;
    }

    users.push({
        id: Date.now(),
        username,
        email,
        password
    });

    setUsers(users);
    showAlert("success", "Registration successful");

    setTimeout(() => {
        window.location.href = "./signin.html";
    }, 700);
});

// input listeners (SAFE – error verməz)
["username", "email", "password"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener("input", () => {
        hideAlert();
        setError(id, id + "Error", "");
    });
});
