// Define access token
mapboxgl.accessToken = 'pk.eyJ1IjoibWFobSIsImEiOiJjbHJiaTVkanowb3lzMndwcnYwN3ZleGJkIn0.6g4SedBzopOipcNKBKj3lg';

const map = new mapboxgl.Map({
    container: 'map', // container id in HTML
    style: 'mapbox://styles/mahm/cltrpoijj013901p5fpqob5wf',  // map style 
    center: [-79.39, 43.65],  // starting point, longitude/latitude
    zoom: 12 // starting zoom level
});

//Add search control to map overlay
//Requires plugin as source in HTML body
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        countries: "ca" //Try searching for places inside and outside of canada to test the geocoder
    })
);

//Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Add fullscreen option to the map
map.addControl(new mapboxgl.FullscreenControl());

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


/*--------------------------------------------------------------------
Step 2: VIEW GEOJSON POINT DATA ON MAP
--------------------------------------------------------------------*/
//HINT: Create an empty variable
//      Use the fetch method to access the GeoJSON from your online repository
//      Convert the response to JSON format and then store the response in your new variable
let pointsgeojson;

// Fetch GeoJSON from URL
fetch('https://raw.githubusercontent.com/smith-lg/ggr472-lab4/main/data/pedcyc_collision_06-21.geojson')

.then(response => response.json())
.then(response => {
    console.log(response); 
    pointsgeojson = response; 
});

// Add Source
map.on('load', () => {
    map.addSource('restaurants', {
        type: 'geojson', 
        data: restaurantsgeojson
    });

    // Add Layer & Make Points White Coloured
    map.addLayer({
        'id': 'data-pts',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
          'circle-radius': ['/', ['get', 'capacity'], 0.2],
          'circle-color': '#FFFFFF'
        }
      });



/*--------------------------------------------------------------------
    Step 3: CREATE BOUNDING BOX AND HEXGRID
--------------------------------------------------------------------*/
//HINT: All code to create and view the hexgrid will go inside a map load event handler
//      First create a bounding box around the collision point data then store as a feature collection variable
//      Access and store the bounding box coordinates as an array variable
//      Use bounding box coordinates as argument in the turf hexgrid function

    let bboxgeojson;

    // Turf Envelop Geojson
    let bbox = turf.envelope(restaurantsgeojson);

    bboxgeojson = {
        'type': 'FeatureCollection',
        'features': [bbox]
    };

    // Add Source
    map.addSource('collisons-bbox', {
        type: 'geojson', 
        data: bboxgeojson
    });

    // Add Layer & Make Colour White
    map.addLayer({
        'id': 'bounding-box-fill', 
        'type': 'line', 
        'source': 'collisons-bbox', 
        'paint': {
            'line-color': '#FFFFFF'
          }
    });


/*--------------------------------------------------------------------
Step 4: AGGREGATE COLLISIONS BY HEXGRID
--------------------------------------------------------------------*/
//HINT: Use Turf collect function to collect all '_id' properties from the collision points data for each heaxagon
//      View the collect output in the console. Where there are no intersecting points in polygons, arrays will be empty

    // Bbox Coordinates
    let bboxcoords = [bbox.geometry.coordinates[0][0][0], 
                    bbox.geometry.coordinates[0][0][1], 
                    bbox.geometry.coordinates[0][2][0], 
                    bbox.geometry.coordinates[0][2][1]]
    
    let hexgeojson = turf.hexGrid(bboxcoords, 0.5, {units: 'kilometers'});

    // Add Hexgrid Source
    map.addSource('hexgrid', {
        type: 'geojson', 
        data: hexgeojson
    });


    // Turf Collect
    let collishex = turf.collect(hexgeojson, pointsgeojson, '_id', 'values');

    let maxcollis = 0;

    collishex.features.forEach((feature) => {
        
        feature.properties.COUNT = feature.properties.values.length;
        if (feature.properties.COUNT > maxcollis) {
            console.log(feature);
            
            maxcollis = feature.properties.COUNT
        }
    });


    // Add Source
    map.addSource('collis-hex', {
        type: 'geojson', 
        data: collishex
    });

    // Add Layer and Adjust Colour Accordingly using an Expression
    map.addLayer({
        'id': 'collishex-layer', 
        'type': 'fill', 
        'source': 'collis-hex',
        'paint' : {
            'fill-color': [
                // Colours depending on Variable
                'step', ['get', 'COUNT'], '#800026',
                    5, '#bd0026', 
                    10, '#e31a1c',
                    15, '#fc4e2a', 
                    20, '#fd8d3c'
                ],
            'fill-opacity': 0.5
        }
    });

})
