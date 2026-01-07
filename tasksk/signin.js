function getUsers() {
    const data = localStorage.getItem("users");
    return data ? JSON.parse(data) : [];
}

function setFieldError(errorId, message) {
    const el = document.getElementById(errorId);
    if (!el) return;

    if (message) {
        el.textContent = message;
        el.classList.remove("hidden");
    } else {
        el.textContent = "";
        el.classList.add("hidden");
    }
}

document.getElementById("signinForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const login = document.getElementById("login").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    
    setFieldError("loginError", "");
    setFieldError("passwordError", "");

    let hasError = false;

    
    if (!login) {
        setFieldError("loginError", "Username or email is required");
        hasError = true;
    }

    if (!password) {
        setFieldError("passwordError", "Password is required");
        hasError = true;
    }

    if (hasError) return;

    const users = getUsers();

    const user = users.find(
        (u) =>
            u.username.toLowerCase() === login ||
            u.email.toLowerCase() === login
    );

    
    if (!user || user.password !== password) {
        setFieldError(
            "passwordError",
            "Username/email or password is incorrect!"
        );
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "./home.html";
});


["login", "password"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener("input", () => {
        setFieldError("loginError", "");
        setFieldError("passwordError", "");
    });
});
