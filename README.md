# GGR472 Group Project: Toronto Culinary Tourism Map
This repository contains the code and resources used to make our Toronto Culinary Tourism Map, a web map that highlights the diverse culinary landscape of downtown Toronto.

## Repository Contents
**index.html:** This HTML file renders the map, includes links to plugins used, and contains div tags for the different filters and legends used in the map.

**about.html:** This HTML file creates the 'About Us' page of the map, including brief descriptions of each group member.

**resources.html:** This HTML file creates the 'Additional Resources' page of the map, including brief context about culinary tourism and links to several resources we used while researching the topic.

**style.css:** This CSS file positions the map on the web page and formats the different buttons and legends included on the map.

**script.js:** This JavaScript file contains code that enables the different functionalities used in the map - such as the zoom controls, geocoder, checkboxes, price hexgrid, filter buttons, and the distance buffer.

## Data Contents
**Restaurants.geojson:** The restaurant data we extracted and formatted from Google Maps reviews is stored in this GeoJSON file. This dataset is what we used to create the final map.

## Instructions for Using the Map
Our Toronto Culinary Tourism Map highlights the diversity of cuisines and restaurants in Downtown Toronto. The web map has a number of interactive elements that tourists can explore to help them make a decision about which restaurant to visit. To the upper right of the page, there is a geocoded search bar, set to only show locations within Canada. Beneath the search bar, there are buttons that enable zoom controls and full screen mode. 

To the upper left of the page, there is a 'Change Filter Mode' button, which allows users to switch between the 'Cuisine Filters' and 'Sentiment Filters' modes. 'Cuisine Filters' mode displays included restaurant points by cuisine, classified according to eight subcategories. Users can toggle checkboxes on or off depending on which subcategories of restaurants they want to view.

'Sentiment Filters' mode displays the same restaurant points, but this time classified according to average 'Positive', 'Negative', or 'Neutral' sentiment. Users can toggle checkboxes on or off according to these three sentiments, depending on which they want to view. On the same mode, there is also an 'Expensiveness' hexgrid layer that lets users visualize areas downtown that are more or less expensive, based on the average price rating of restaurants found there. 

Below the 'Change Filter Mode' button, there is also a 'Toggle Buffer Mode' button. Enabling this button will give users the option to drop a 0.5-km radius buffer anywhere they click on the map, generating a list of restaurants that are located within that area.

Additionally, clicking on the restaurant points for either of the filter layers will show a pop-up, providing more information about each restaurant. The pop-ups for the 'Cuisine Filters' mode shows the restaurant name, food sentiment, service sentiment, atmosphere sentiment, price rating, and cuisine. The pop-ups for the 'Sentiment Filters' mode shows the restaurant name, cuisine, and price rating. 

## Authors and Acknowledgment
This web map was created by Maryam Ahmad, Chris Yeung, and Kaylee Hartigan-Go. We would like to thank Professor Lindsey Smith for her invaluable guidance and support throughout this project.
