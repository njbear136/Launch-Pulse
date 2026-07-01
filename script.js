const API_URL = "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10&mode=detailed";
const container = document.getElementById("launch-container");
const status = document.getElementById("status");


async function fetchLaunches() {
    try{
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('API error: ${response.status}');
        const data= await response.json();
        displayLaunches(data.results);
    } catch (error) {
        status.textContent = "Couldn't load launches. Try refreshing in a bit.";
        console.error(error);
    }  
}

function displayLaunches(launches) {
    status.textContent = 'Showing ${lauches.length} upcoming launches';
    container.innerHTML = "";//clear "loading" state

    launches.forEach((launch) => {
        const card = document.createElement("div");
        card.className = "launch-card";

        const launchDate = new Date(launch.net);
        const formattedDate = launchDate.toLocaleString(undefined, {
            dataStyle: "medium",
            timeStyle: "short",
        });

        card.innerHTML = `
        <h2>${launch.name}</h2>
        <p class="agency">${launch.launch_service_provider.name}</p>
        <p class="date">${formattedDate}</p>
        <p class="location">${launch.pad.location.name}</p>
        <p class="countdown" data-launch-time="${launch.net}">Calculating...</p>
        `;

        container.appendChild(card);
    });
}

fetchLaunches();