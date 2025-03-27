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
                <button onclick="deletePlant(${index})" class='text-red-500'>❌</button>
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
    
    let plants = JSON.parse(localStorage.getItem("plants")) || [];
    plants.push({ species, location, date });
    localStorage.setItem("plants", JSON.stringify(plants));
    
    document.getElementById("successMessage").classList.remove("hidden");
    document.getElementById("plantForm").reset();
    species.
    loadPlants();
});

document.addEventListener("DOMContentLoaded", loadPlants);