const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
    window.location.href = "./signin.html";
}


const user = JSON.parse(currentUser);

const welcomeText = document.getElementById("welcomeText");
welcomeText.textContent = `Welcome ${user.username}`;

const userInfo = document.getElementById("userInfo");
userInfo.textContent = user.email;

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "./signin.html";
});
