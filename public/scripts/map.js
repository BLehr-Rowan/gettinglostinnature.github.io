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

    let params = new URLSearchParams(window.location.search);
    let x1 = params.get("x1");
    let y1 = params.get("y1");
    let x2 = params.get("x2");
    let y2 = params.get("y2");

    if (x1 !== null && x1 !== undefined && !isNaN(x1) &&
        y1 !== null && y1 !== undefined && !isNaN(y1)) {
        const point1 = new google.maps.LatLng(x1, y1);
        addMarker(point1);
        points.push(point1);
    }

    if (x2 !== null && x2 !== undefined && !isNaN(x2) &&
        y2 !== null && y2 !== undefined && !isNaN(y2)) {
        const point2 = new google.maps.LatLng(x2, y2);
        addMarker(point2);
        points.push(point2);
    }

    if (markers.length === 2) {
        calculateAndDisplayRoute(points[0], points[1]);
        calculateDistanceAndDisplayFacts(points[0], points[1]);
    }

    // Add a click listener to the map
    map.addListener("click", (event) => {
        if (markers.length < 2) {
            addMarker(event.latLng);
            points.push(event.latLng);

            // Once two points are selected, calculate and display the route and facts
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
    const distance = R * c; // Distance in miles

    // Calculate walking time in minutes
    const walkingSpeed = 4; // Average walking speed in miles per hour
    const walkingTimeHours = distance / walkingSpeed; // Time in hours
    const walkingTimeMinutes = walkingTimeHours * 60; // Time in minutes

    let timeText;
    if (walkingTimeMinutes < 1) {
        const walkingTimeSeconds = Math.round(walkingTimeMinutes * 60);
        timeText = `Walking Time: ${walkingTimeSeconds} seconds`;
    } else if (walkingTimeMinutes < 60) {
        timeText = `Walking Time: ${walkingTimeMinutes.toFixed(0)} minutes`;
    } else {
        const hours = Math.floor(walkingTimeMinutes / 60);
        const minutes = Math.round(walkingTimeMinutes % 60);
        timeText = `Walking Time: ${hours} hour${hours > 1 ? "s" : ""} and ${minutes} minute${minutes !== 1 ? "s" : ""}`;
    }

    // Update the sidebar
    document.getElementById("distance-info").textContent = `Distance: ${distance.toFixed(2)} miles`;
    document.getElementById("additional-info").textContent = timeText; // Update walking time info
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

function setPointValues() {
    document.getElementById("x1").value = points[0].lat();
    document.getElementById("y1").value = points[0].lng();
    document.getElementById("x2").value = points[1].lat();
    document.getElementById("y2").value = points[1].lng();
}
