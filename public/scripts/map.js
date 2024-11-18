let map;
let directionsService;
let directionsRenderer;
let markers = [];
let points = [];

function initMap() {
    // Centered at Rowan University
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: 39.71037, lng: -75.11931 } // Rowan University coordinates
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Add a click listener to the map
    map.addListener("click", (event) => {
        if (markers.length < 2) {
            addMarker(event.latLng);
            points.push(event.latLng);

            // Once two points are selected, calculating and display the route and facts
            if (markers.length === 2) {
                calculateAndDisplayRoute(points[0], points[1]);
                calculateDistanceAndDisplayFacts(points[0], points[1]);
            }
        } else {
            // Reset if two points are already selected
            resetMap();
        }
    });
}

function addMarker(location) {
    let marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
}

function calculateAndDisplayRoute(origin, destination) {
    let request = {
        origin: origin,
        destination: destination,
        travelMode: "WALKING"
    };
    directionsService.route(request, (result, status) => {
        if (status === "OK") {
            directionsRenderer.setDirections(result);
        } else {
            window.alert("Directions request failed due to " + status);
        }
    });
}

function calculateDistanceAndDisplayFacts(pointA, pointB) {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const R = 3958.8; // Radius of Earth in miles

    const lat1 = pointA.lat();
    const lon1 = pointA.lng();
    const lat2 = pointB.lat();
    const lon2 = pointB.lng();

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    // Update the sidebar
    document.getElementById("distance-info").textContent = `Distance: ${distance.toFixed(2)} miles`;
    document.getElementById("additional-info").textContent = "Elevation gain and other details coming soon!";
    showSidebar();
}

function showSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.add("visible");
}

function closeSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.remove("visible");
}

function resetMap() {
    // Clear markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    points = [];
    // Clear directions
    directionsRenderer.set("directions", null);
    // Hide sidebar
    closeSidebar();
}
