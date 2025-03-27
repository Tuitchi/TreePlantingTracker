const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "staff1", password: "staff123", role: "staff" }
];

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");
    const errorMessage = document.getElementById("errorMessage");
    
    let valid = true;
    
    if (usernameInput.value.trim() === "") {
        usernameError.classList.remove("hidden");
        valid = false;
    } else {
        usernameError.classList.add("hidden");
    }
    
    if (passwordInput.value.trim() === "") {
        passwordError.classList.remove("hidden");
        valid = false;
    } else {
        passwordError.classList.add("hidden");
    }
    
    if (!valid) return;
    
    const user = users.find(u => u.username === usernameInput.value && u.password === passwordInput.value);
    
    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = user.role === "admin" ? "admin_dashboard.html" : "staff_dashboard.html";
    } else {
        errorMessage.classList.remove("hidden");
    }
});