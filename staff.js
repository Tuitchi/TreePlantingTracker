document.addEventListener("DOMContentLoaded", loadStaff);

// Handle Add Staff
document.getElementById("staffForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const staffName = document.getElementById("staffName").value.trim();
    const staffPassword = document.getElementById("staffPassword").value.trim();

    if (staffName === "" || staffPassword === "") {
        alert("Please fill in all fields.");
        return;
    }

    let staff = JSON.parse(localStorage.getItem("staff")) || [];

    if (staff.some(s => s.username === staffName)) {
        alert("Username already exists!");
        return;
    }

    staff.push({ username: staffName, password: staffPassword, role: "staff" });
    localStorage.setItem("staff", JSON.stringify(staff));

    document.getElementById("staffForm").reset();
    loadStaff();
    showToast("Staff added successfully!", "bg-green-500");
});

// Load Staff List
function loadStaff() {
    const staffList = document.getElementById("staffList");
    staffList.innerHTML = "";

    let staff = JSON.parse(localStorage.getItem("staff")) || [];

    staff.forEach((s, index) => {
        const row = `
            <tr>
                <td class="border border-gray-300 p-2">${s.username}</td>
                <td class="border border-gray-300 p-2">${s.role}</td>
                <td class="border border-gray-300 p-2">
                    <button onclick="deleteStaff(${index})"
                        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                        Delete
                    </button>
                </td>
            </tr>`;
        staffList.innerHTML += row;
    });
}

// Delete Staff
function deleteStaff(index) {
    let staff = JSON.parse(localStorage.getItem("staff")) || [];
    staff.splice(index, 1);
    localStorage.setItem("staff", JSON.stringify(staff));
    loadStaff();
    showToast("Staff deleted successfully!", "bg-red-500");
}

// Show Toast Notification
function showToast(message, bgColor) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = `fixed top-5 right-5 p-4 text-white rounded shadow-lg ${bgColor}`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}
