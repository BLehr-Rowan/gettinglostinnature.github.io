let map;
let directionsService;
let directionsRenderer;
let markers = [];
let points = [];

function initMap()
{
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: { lat: 43.65107, lng: -79.347015 } // Centered in Toronto
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Add a click listener to the map
    map.addListener("click", (event) => {
        if(markers.length < 2)
        {
            addMarker(event.latLng);
            points.push(event.latLng);
            // Once two points are selected, calculate and display the route
            if(markers.length === 2)
            {
                calculateAndDisplayRoute(points[0], points[1]);
                addTrail(points[0].lat(), points[0].lng(), points[1].lat(), points[1].lng());
            }
        }
        else
        {
            // Reset if two points are already selected
            resetMap();
        }
    });
}

function addMarker(location)
{
    let marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
}
function calculateAndDisplayRoute(origin, destination)
{
    let request = {
        origin: origin,
        destination: destination,
        travelMode: "WALKING"
    };
    directionsService.route(request, (result, status) => {
        if (status === "OK")
        {
            directionsRenderer.setDirections(result);
        }
        else
        {
            window.alert("Directions request failed due to " + status);
        }
    });
}
function resetMap() {
    // Clear markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    points = [];
    // Clear directions
    directionsRenderer.set("directions", null);
}
function addTrail(x1, y1, x2, y2)
{
//     let form = document.getElementById("addTrail");
//     form.x1.value = x1;
//     form.y1.value = y1;
//     form.x2.value = x2;
//     form.y2.value = y2;
//     form.submit();
    window.location.href = `/addTrail?x1=${x1}&y1=${y1}&x2=${x2}&y2=${y2}`;
}
