// Define access token
mapboxgl.accessToken = 'pk.eyJ1IjoibWFobSIsImEiOiJjbHJiaTVkanowb3lzMndwcnYwN3ZleGJkIn0.6g4SedBzopOipcNKBKj3lg';


const map = new mapboxgl.Map({
    container: 'map', // container id in HTML
    style: 'mapbox://styles/mahm/cltrpoijj013901p5fpqob5wf',  // map style 
    center: [-79.39, 43.65],  // starting point, longitude/latitude
    zoom: 12.5 // starting zoom level
})


// STOPPED WORKING 
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

const button = document.getElementById('btn');

// fetch map data from website 
let restaurantsgeojson;

fetch('https://raw.githubusercontent.com/mahm44/ggr472-group-project/main/data/Restaurants.geojson')
    .then(response => response.json())
    .then(response => {
        console.log(response);
        restaurantsgeojson = response;
    })


map.on('load', () => {
    map.addSource('restaurants', {
        type: 'geojson', 
        data: restaurantsgeojson
    });
    
    // on inital display, show points w/ color corresponding to their rating 
    map.addLayer({
        'id': 'data-pts',
        'type': 'circle', 
        'source': 'restaurants', 
        'layout': {'visibility': 'none'}
    });

    // add map layers for checkboxes --> default visible, change once checkboxes are toggled 
    map.addLayer({
        'id': 'south-asian',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
            'circle-radius': 4,
            'circle-color': '#02555e', 
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'},
        'filter': ['any', 
        ['==', ['get', 'Cuisine'], 'Indian'],
        ['==', ['get', 'Cuisine'], 'Pakistani'], 
        ['==', ['get', 'Cuisine'], 'Bangladeshi ']],
        'layout': {'visibility': 'visible'}
    });

    map.addLayer({
        'id': 'east-asian',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
            'circle-radius': 4,
            'circle-color': '#55a69f', 
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'},
        'filter': ['any', 
        ['==', ['get', 'Cuisine'], 'Chinese'],
        ['==', ['get', 'Cuisine'], 'Japanese'], 
        ['==', ['get', 'Cuisine'], 'Korean']],
        'layout': {'visibility': 'visible'}
    });

    map.addLayer({
        'id': 'mid-east',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
            'circle-radius': 4,
            'circle-color': '#dd9984', 
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'},
        'filter': ['==', ['get', 'Cuisine'], 'Middle Eastern'],
        'layout': {'visibility': 'visible'}
    });

    map.addLayer({
        'id': 'carribean',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
            'circle-radius': 4,
            'circle-color': '#966552', 
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'},
        'filter': ['==', ['get', 'Cuisine'], 'Carribean'],
        'layout': {'visibility': 'visible'}
    });

    map.addLayer({
        'id': 'southeast-asian',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
            'circle-radius': 4,
            'circle-color': '#e7b24f', 
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'},
        'filter': ['any', 
        ['==', ['get', 'Cuisine'], 'Vietnamese'],
        ['==', ['get', 'Cuisine'], 'Thai'], 
        ['==', ['get', 'Cuisine'], 'Filipino']],
        'layout': {'visibility': 'visible'}
    });

    map.addLayer({
        'id': 'european',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
            'circle-radius': 4,
            'circle-color': '#7a8b9f', 
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'},
        'filter': ['any', 
        ['==', ['get', 'Cuisine'], 'Greek'],
        ['==', ['get', 'Cuisine'], 'French'], 
        ['==', ['get', 'Cuisine'], 'Italian '],
        ['==', ['get', 'Cuisine'], 'Hungarian'],
        ['==', ['get', 'Cuisine'], 'Portugese']],
        'layout': {'visibility': 'visible'}
    });

    map.addLayer({
        'id': 'central-american',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
            'circle-radius': 4,
            'circle-color': '#e0db2b', 
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'},
        'filter': ['==', ['get', 'Cuisine'], 'Mexican '],
        'layout': {'visibility': 'visible'}
    });

    map.addLayer({
        'id': 'religious',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
            'circle-radius': 4,
            'circle-color': '#314691', 
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'},
        'filter': ['==', ['get', 'Cuisine'], 'Jewish '],
        'layout': {'visibility': 'visible'}
    });

    //sentiment layers 
    map.addLayer({
        'id': 'pos',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
            'circle-radius': 4,
            'circle-color': '#c0e218', 
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'},
        'filter': ['all', 
            ['==', ['get', 'foodRating'], 'Positive'],
            ['==', ['get', 'serviceRating'], 'Positive'], 
            ['==', ['get', 'atmosphereRating'], 'Positive']],
        'layout': {'visibility': 'none'}
    });
// too many positive so doing any for these to get more results 
    map.addLayer({
        'id': 'neg',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
            'circle-radius': 4,
            'circle-color': '#c70039',
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'},
        'filter': ['any', 
            ['==', ['get', 'foodRating'], 'Negative'],
            ['==', ['get', 'serviceRating'], 'Negative'], 
            ['==', ['get', 'atmosphereRating'], 'Negative']],
        'layout': {'visibility': 'none'}
    });

    map.addLayer({
        'id': 'neu',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
            'circle-radius': 4,
            'circle-color': '#0099e5',
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'},
        'filter': ['any', 
            ['==', ['get', 'foodRating'], 'Neutral'],
            ['==', ['get', 'serviceRating'], 'Neutral'], 
            ['==', ['get', 'atmosphereRating'], 'Neutral']],
        'layout': {'visibility': 'none'}
    });
})

// checkbox filters 

const checkboxes = document.querySelectorAll('input[class="form-check-input me-1"]');
console.log(checkboxes)
//WHY NO WORK ON FIRST CHECK 

for (const checkbox of checkboxes) {
    checkbox.addEventListener('change', function () {
        console.log(checkbox)
        const layerID = this.parentNode.id;
        const layer = map.getLayer(layerID);
        checkbox.addEventListener('change', (e) => {
            map.setLayoutProperty(layerID, 'visibility', e.target.checked ? 'visible' : 'none')
        });
    });
}

const sentCheckboxes = document.querySelectorAll('input[class="form-check-input me-2"]');
console.log(sentCheckboxes);

for (const checkbox of sentCheckboxes) {
    checkbox.addEventListener('change', function () {
        console.log(checkbox)
        const layerID = this.parentNode.id;
        const layer = map.getLayer(layerID);
        checkbox.addEventListener('change', (e) => {
            map.setLayoutProperty(layerID, 'visibility', e.target.checked ? 'visible' : 'none')
        });
    });
}

// button 

let btnStatus = null;

button.addEventListener("click", function () {
    if (btnStatus !== true){
        priceLegend.style.display = 'block';
        cuisineLegend.style.display = 'none';
        for (const checkbox of checkboxes) {
                const layerID = this.parentNode.id;
                const layer = map.getLayer(layerID);
                map.setLayoutProperty(layerID, 'visibility', 'none')
        }
        for (const checkbox of sentCheckboxes) {
            const layerID = this.parentNode.id;
            const layer = map.getLayer(layerID);
            map.setLayoutProperty(layerID, 'visibility', 'visible')
        }
        btnStatus = true;
    }
    else{
        priceLegend.style.display = "none";
        cuisineLegend.style.display = 'block';
        for (const checkbox of sentCheckboxes) {
            const layerID = this.parentNode.id;
            const layer = map.getLayer(layerID);
            map.setLayoutProperty(layerID, 'visibility', 'none')
        }
        for (const checkbox of checkboxes) {
            const layerID = this.parentNode.id;
            const layer = map.getLayer(layerID);
            map.setLayoutProperty(layerID, 'visibility', 'visible')
        }
        btnStatus = false;
    }
    console.log(btnStatus);
});

// legends

const cuisineLegend = document.getElementById('cuisine-legend');

const cuiLegendLabels = [
    'South Asian', 'East Asian', 'Middle Eastern', 'Caribbean', 'Southeast Asian', 
    'European', 'Central American', 'Religious'
];

const cuiLegendColors = [
    '#02555e', '#55a69f', '#dd9984', '#966552', '#e7b24f', '#7a8b9f', '#e0db2b', '#314691'
];

// create labels for legend item 
cuiLegendLabels.forEach((label, i) => {
    const colour = cuiLegendColors[i];

    const item = document.createElement('div'); //each layer gets a 'row' - this isn't in the legend yet, we do this later
    const key = document.createElement('span'); //add a 'key' to the row. A key will be the colour circle

    key.className = 'legend-key'; //the key will take on the shape and style properties defined in css
    key.style.backgroundColor = colour; // the background color is retreived from teh layers array

    const value = document.createElement('span'); //add a value variable to the 'row' in the legend
    value.innerHTML = `${label}`; //give the value variable text based on the label

    item.appendChild(key); //add the key (colour cirlce) to the legend row
    item.appendChild(value); //add the value to the legend row

    cuisineLegend.appendChild(item); //add row to the legend
});

const priceLegend = document.getElementById('expense-legend');
const priceLegendLabels = [
    "0", "1", "2", "3", "4"
];
const priceLegendColors = [
    '#800026', '#bd0026', '#e31a1c', '#fc4e2a', '#fd8d3c'
];

// create labels for legend item 
priceLegendLabels.forEach((label, i) => {
    const colour = priceLegendColors[i];

    const item = document.createElement('div'); //each layer gets a 'row' - this isn't in the legend yet, we do this later
    const key = document.createElement('span'); //add a 'key' to the row. A key will be the colour circle

    key.className = 'legend-key'; //the key will take on the shape and style properties defined in css
    key.style.backgroundColor = colour; // the background color is retreived from teh layers array

    const value = document.createElement('span'); //add a value variable to the 'row' in the legend
    value.innerHTML = `${label}`; //give the value variable text based on the label

    item.appendChild(key); //add the key (colour cirlce) to the legend row
    item.appendChild(value); //add the value to the legend row

    priceLegend.appendChild(item); //add row to the legend
});

// mouse clicks 

const mapLayers = ['south-asian', 'east-asian', 'mid-east', 'caribbean', 'southeast-asian', 
'european', 'central-american', 'religious'];

mapLayers.forEach(layer => {
    map.on('mouseenter', layer, () => {
        map.getCanvas().style.cursor = 'pointer'; //Switch cursor to pointer when mouse is over 
    });
    
    map.on('mouseleave', layer, () => {
        map.getCanvas().style.cursor = ''; //Switch cursor back when mouse leaves 
    });
    map.on('click', layer, (e) => {
        new mapboxgl.Popup() // upon clicking, declare a popup object 
            .setLngLat(e.lngLat) // method uses coordinates of mouse click to display popup at 
            .setHTML("<b>Restaurant:</b> " + e.features[0].properties.Name + "<br>" + "<b>Food: </b>" + e.features[0].properties.foodRating + "<br>" + "<b>Service: </b> " + e.features[0].properties.serviceRating + "<br>" + "<b>Atmosphere: </b> " + e.features[0].properties.atmosphereRating + "<br>" + "<b>Price: </b>" + e.features[0].properties.priceRating)
            .addTo(map); //Show popup on map
    });
});

// different pop ups for sentiment map layers 
const sentMapLayers = ['pos', 'neg', 'neu'];

sentMapLayers.forEach(layer => {
    map.on('mouseenter', layer, () => {
        map.getCanvas().style.cursor = 'pointer'; //Switch cursor to pointer when mouse is over 
    });
    
    map.on('mouseleave', layer, () => {
        map.getCanvas().style.cursor = ''; //Switch cursor back when mouse leaves 
    });
    map.on('click', layer, (e) => {
        new mapboxgl.Popup() // upon clicking, declare a popup object 
            .setLngLat(e.lngLat) // method uses coordinates of mouse click to display popup at 
            .setHTML("<b>Restaurant:</b> " + e.features[0].properties.Name + "<br>" + "<b>Cuisine: </b>" + e.features[0].properties.Cuisine)
            .addTo(map); //Show popup on map
    });
});

