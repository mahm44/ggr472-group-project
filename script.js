// Define access token
mapboxgl.accessToken = 'pk.eyJ1IjoibWFobSIsImEiOiJjbHJiaTVkanowb3lzMndwcnYwN3ZleGJkIn0.6g4SedBzopOipcNKBKj3lg';

const map = new mapboxgl.Map({
    container: 'map', // container id in HTML
    style: 'mapbox://styles/mahm/cltrpoijj013901p5fpqob5wf',  // map style 
    center: [-79.39, 43.65],  // starting point, longitude/latitude
    zoom: 12 // starting zoom level
});


// fetch map data from website 
let restaurantsgeojson;

fetch('https://raw.githubusercontent.com/mahm44/ggr472-group-project/main/data/Restaurants.geojson')
    .then(response => response.json())
    .then(response => {
        console.log(response);
        restaurantsgeojson = response;
    })


map.on('load', () => {
    map.addSource('restaurant-data', {
        type: 'geojson', 
        data: restaurantsgeojson
    });
    
    // on inital display, show points w/ color corresponding to their rating 
    map.addLayer({
        'id': 'data-pts',
        'type': 'circle', 
        'source': 'restaurant-data'
    });
})

console.log(map);

// checkbox filter checks 
// get the current status of all the checkboxes 
const checks = document.getElementById('cuisine-check');

checks.addEventListener('change', function () {
    // check status of what changed; if currently visible, make not visible and vice versa 

    if (checks.ariaChecked){
        // i guess????????
        // change to array to check all values at once???? idk what checks is taking in rn 
        map.setFilter('data-pts', ['==', ['get', 'Cusisine'], checks.ariaValueText])
    }
})