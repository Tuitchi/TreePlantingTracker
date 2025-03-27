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
document.getElementById("openMapBtn").addEventListener("click", function() {
    document.getElementById("mapModal").classList.remove("hidden");
    initializeMap();
});

document.getElementById("closeMapBtn").addEventListener("click", function() {
    document.getElementById("mapModal").classList.add("hidden");
});

let selectedLocation = { lat: null, lng: null, name: "" };
function initializeMap() {
    let map = L.map("map").setView([10.3157, 123.8854], 10); // Default to Cebu

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    let marker;
    map.on("click", function(event) {
        if (marker) map.removeLayer(marker);
        marker = L.marker(event.latlng).addTo(map);

        // Reverse Geocode (Get Location Name)
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${event.latlng.lat}&lon=${event.latlng.lng}&format=json`)
            .then(response => response.json())
            .then(data => {
                selectedLocation = {
                    lat: event.latlng.lat,
                    lng: event.latlng.lng,
                    name: data.display_name || "Unknown Location"
                };
                document.getElementById("location").value = selectedLocation.name;
            });
    });

    document.getElementById("confirmLocation").addEventListener("click", function() {
        document.getElementById("mapModal").classList.add("hidden");
    });
}

document.getElementById("closeSuccess").addEventListener("click", function() {
    document.getElementById("successMessage").classList.add("hidden");
});
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
        updateAnalytics(); 
    };
});


document.addEventListener("DOMContentLoaded", function() {
    loadPlants();
    updateAnalytics();
});
function updateAnalytics() {
    let plants = JSON.parse(localStorage.getItem("plants")) || [];
    
    // Total Trees
    document.getElementById("totalTrees").textContent = plants.length;

    // Calculate Recently Planted Trees (Planted within the last 7 days)
    let today = new Date();
    let oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);

    let recentlyPlantedCount = plants.filter(plant => new Date(plant.date) >= oneWeekAgo).length;
    document.getElementById("recentlyPlanted").textContent = recentlyPlantedCount;

    let healthyCount = Math.floor(plants.length * 0.8);
    let needingCareCount = plants.length - healthyCount;

    document.getElementById("healthyTrees").textContent = healthyCount;
    document.getElementById("treesNeedingCare").textContent = needingCareCount;
}

