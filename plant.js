function loadPlants() {
    const plantList = document.getElementById("plantList");
    plantList.innerHTML = "";
    
    let plants = JSON.parse(localStorage.getItem("plants")) || [];
    
    plants.forEach((plant, index) => {
        const row = document.createElement("tr");
        row.classList.add("bg-green-50");
        row.innerHTML = `

            <td class="border border-green-600 p-2 text-center">
                        <img src="${plant.image}" alt="Tree" class="w-12 h-12 object-cover rounded-md">
                    </td>
            <td class="border border-green-600 p-2">${plant.species}</td>
            <td class="border border-green-600 p-2">${plant.location}</td>
            <td class="border border-green-600 p-2">${plant.date}</td>
            <td class="border border-green-600 p-2 text-center">
                <button onclick="deletePlant(${index})" class='text-white bg-red-600 py-1 px-3 rounded'>Delete</button>
            </td>
        `;
        plantList.appendChild(row);
    });
}

function deletePlant(index) {
    let plants = JSON.parse(localStorage.getItem("plants")) || [];
    plants.splice(index, 1);
    localStorage.setItem("plants", JSON.stringify(plants));
    loadPlants();
}

document.getElementById("plantForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const species = document.getElementById("species").value;
    const location = document.getElementById("location").value;
    const date = document.getElementById("date").value;
    const imageInput = document.getElementById("img").files[0];
    
    if (!imageInput) {
        alert("Please select an image.");
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(imageInput);
    reader.onload = function() {
        let plants = JSON.parse(localStorage.getItem("plants")) || [];
        plants.push({ species, location, date, image: reader.result });
        localStorage.setItem("plants", JSON.stringify(plants));
        
        document.getElementById("successMessage").classList.remove("hidden");
        document.getElementById("plantForm").reset();
        loadPlants();
        showToast("Tree added successfully!", "bg-green-500");
    };
});

document.addEventListener("DOMContentLoaded", loadPlants);
function showToast(message, bgColor) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = `fixed bottom-5 right-5 p-4 text-white rounded shadow-lg ${bgColor}`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}
