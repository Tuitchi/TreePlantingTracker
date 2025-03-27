
function filterTable() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let rows = document.getElementById("plantList").getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName("td");
        let match = false;

        for (let j = 0; j < cells.length - 1; j++) { 
            if (cells[j].innerText.toLowerCase().includes(input)) {
                match = true;
                break;
            }
        }

        rows[i].style.display = match ? "" : "none";
    }
}
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
        window.location.href = user.role === "admin" ? "/admin-dashboard.html" : "/staff_dashboard.html";
    } else {
        errorMessage.classList.remove("hidden");
    }
});
// Show the loader for at least 5 seconds
