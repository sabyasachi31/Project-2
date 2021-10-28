// Creating map object
/*var myMap = L.map("map-id", {
    center: [41.878, -87.629],
    zoom: 11
  });*/
  
  // Adding tile layer
 var baseLayer = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "streets-v9",
    accessToken: API_KEY
  });


 // Load data from hours-of-tv-watched.csv
d3.csv("./Data/combo-michelin-restaurants-stars.csv").then(function(data) {

    console.log(data[0]);
    console.log(data.length);
    var resMarkers = [];

    for (var i = 0; i < data.length; i++) {
        var location=[data[i].latitude, data[i].longitude];
        // loop through the cities array, create a new marker, push it to the cityMarkers array
        resMarkers.push(
          L.marker(location).bindPopup("<h1>" + data[i].name + "</h1>")
        );
      };
      //console.log(resMarkers);
      

    /*var res_data={ 
        "names":data.map(data => data.name), 
        "latitudes":data.map(data => data.latitude), 
        "longitudes":data.map(data => data.longitude),
        "cities":data.map(data => data.city),
        "regions":data.map(data => data.region),
        "zipcodes":data.map(data => data.zipCode),
        "cuisines":data.map(data => data.cuisine),
        "prices":data.map(data => data.price),
        "urls":data.map(data => data.url),
        "stars" :data.map(data => data.Stars)
   };
   console.log(res_data);*/
   var resLayer = L.layerGroup(resMarkers);
   var overlayMaps = {
     Restaurants: resLayer
   };
   
   var myMap = L.map("map-id", {
    center: [41.878, -87.629],
    zoom: 11,
    layers: [baseLayer, resLayer]
  });

  // L.control.layers(baseLayer, overlayMaps).addTo(myMap);

  });




