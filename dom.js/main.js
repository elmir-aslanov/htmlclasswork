const form = document.getElementById("signupForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // 1. Boş sahə yoxlaması
    if (!username || !email || !password) {
        showError("Bütün sahələr doldurulmalıdır.");
        return;
    }

    // 2. LocalStorage-dan users oxu
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // 3. Username və ya email təkrarı
    const userExists = users.some(
        (user) => user.username === username || user.email === email
    );

    if (userExists) {
        showError("Bu username və ya email artıq mövcuddur.");
        return;
    }

    // 4. Yeni user yarat
    const newUser = {
        username,
        email,
        password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // 5. Login səhifəsinə yönləndir
    window.location.href = "login.html";
});

function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.remove("hidden");
}