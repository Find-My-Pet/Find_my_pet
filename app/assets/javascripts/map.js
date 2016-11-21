const info =
`<div id = content>
  <div id = "photo" style="float: left">
    <img src="https://www.dogstrust.org.uk/sponsor/_dogs/digby-assets/v800_digby01.jpg" alt="dog" height="160" width="120">
  </div>
  <div id="pet-info" style="float: right; padding: 1em;">
    <h2>Dog Name</h2>
    <h5>Type</h5>
    <p>lost on: 1990-01-01<p>
    <p></p>
  </div>

</div>`;

var mapstyle = [
{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"hue":"#ff0000"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#ff0000"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#ff0000"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"hue":"#ff0000"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"weight":"0.90"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ababab"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"weight":"0.30"},{"visibility":"off"},{"hue":"#ff0000"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#ff0000"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#ff0000"},{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#838383"},{"visibility":"on"}]}
];

$( document ).ready(function() {
  var styledMap = new google.maps.StyledMapType(mapstyle, {name: "styled map"});
  var map; // define the global map

  map = initMap();
  map.mapTypes.set("map_style", styledMap);
  map.setMapTypeId("map_style");
  window.globals = {};

  globals.heatmap = new google.maps.visualization.HeatmapLayer({
    radius: 15
  });
  // Get all the lost pets
  getLostPets();




  $('#filter_button').on('click', function(){
    filterPetsByType(globals.pets, "Dog");
  });


});

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.28200018372185, lng: -123.10863018035889},
    zoom: 14,
    mapTypeId: 'roadmap',
    streetViewControl: false,
  });

  google.maps.event.addListener(map, 'click', function(event) {
    closeAllInfoWindows();
    addMarker(event.latLng, map);
    $('#pet_last_seen_at').val(event.latLng)
    $('#sighting_last_seen_at').val(event.latLng)
  });

  // ##### TO BE ADDED TO 'PET DIVS' TO GET SIGHTINGS FOR HEATMAP ###########
  // google.maps.event.addDomListener(getSightings, 'click', function() {
  // globals.heatmap.setMap(null);
  // getSightingsOfaPet('-THE-PET-ID-', globals.heatmap);
  //});



  // var infoWindow = new google.maps.InfoWindow({map: map});

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  var geoloccontrol = new klokantech.GeolocationControl(map, 15);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var getPetsListener = map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
    if (!$('#show-map').html() && !$('#sightings-map').html() ){
      getPetsInView(map.getBounds());
    }
  });

  if ($('#show-map').html()) {
    var slugArr = /(\d+)$/.exec(document.URL);
    getSightingsOfaPet(slugArr[0]);
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    //google.maps.event.removeListener(getPetsListener);
    // myPet = window.globals.allpets.filter(function(data){ return window.globals.allpets.id == slugArr[0] });
    // console.log(myPet.id);
    // map.panTo({lat: })

  }


  searchBox.addListener('places_changed', function() {
         var places = searchBox.getPlaces();

         if (places.length == 0) {
           return;
         }

         // Clear out the old markers.
         markers.forEach(function(marker) {
           marker.setMap(null);
         });
         markers = [];

         // For each place, get the icon, name and location.
         var bounds = new google.maps.LatLngBounds();
         places.forEach(function(place) {
           if (!place.geometry) {
             console.log("Returned place contains no geometry");
             return;
           }
           var icon = {
             url: place.icon,
             size: new google.maps.Size(71, 71),
             origin: new google.maps.Point(0, 0),
             anchor: new google.maps.Point(17, 34),
             scaledSize: new google.maps.Size(25, 25)
           };

           // Create a marker for each place.
           markers.push(new google.maps.Marker({
             map: map,
             icon: icon,
             title: place.name,
             position: place.geometry.location
           }));

           if (place.geometry.viewport) {
             // Only geocodes have viewport.
             bounds.union(place.geometry.viewport);
           } else {
             bounds.extend(place.geometry.location);
           }
         });
         map.fitBounds(bounds);
       });



        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            window.globals.location = pos;
            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
              if (!$('#show-map').html() && !$('#sightings-map').html()){
                map.setCenter(pos);
                // addMarker(pos, map);
              } else {
                var slugArr = /(\d+)$/.exec(document.URL);
                var myPet = window.globals.allpets.filter(function(data){ return data.id == slugArr[0] });

                var pos = {lat: myPet[0].lat, lng: myPet[0].lng}
                map.setCenter(pos);
                addMarker(pos, map);
              }

            // getCloseLostPets();
            $('#pet_last_seen_at').val(`(${pos.lat}, ${pos.lng})`)
            $('#sighting_last_seen_at').val(`(${pos.lat}, ${pos.lng})`)
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

  return map;
}

var markers = [];
var infoWindows = [];


// coords in the form: {lat:123.4141, lng: 30.321}
// map is current map
// info in the form: {`<div>abc</div>...`}
function addInfoWindow(coords, map, info, type){
// init icons, should be defiend outside of add info window block
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
var icons = {
  parking: {
    icon: iconBase + 'parking_lot_maps.png'
  },
  library: {
    icon: iconBase + 'library_maps.png'
  },
  info: {
    icon: iconBase + 'info-i_maps.png'
  }
};

  // Creae a infor window on the map with given coords
  var infowindow = new google.maps.InfoWindow({
    content: info,
    position: coords
  });
  // add info window to the inforWindows array
	infoWindows.push(infowindow);
  // Leave a marker at the same location
  var marker = new google.maps.Marker({
    position: coords,
    map: map,
    icon: icons[type].icon
  });

  // Click on marker will pop up info
  marker.addListener('click', function() {
    closeAllInfoWindows();
    infowindow.open(map, marker);
  });
}

function addMarker(location, map, label) {
  var marker = new google.maps.Marker({
    position: location,
    label: label,
    map: map
  });
  markers.push(marker);
// markers[markers.length - 1] is the location we want to submit on the form
// console.log(markers[markers.length - 1]);
  if (markers.length > 1) {
    removeLastMarker()
  }
}

// Add a marker on lost pet
function addLostPetsMarker(location, map) {
  var marker = new google.maps.Marker({
    position: location,
    // label: label,
    map: map,
    icon: 'assets/icon_report_lost_red.png'
  });
  markers.push(marker);
}

// Add a marker on sighting
function addSightingsMarker(data, map) {
  if ($('#show-map').html()){

    var heatmapData = [];
    for (var i=0; i < data.length; i++){
      heatmapData.push({
                  location: new google.maps.LatLng(data[i].lat, data[i].lng),
                  weight: 20
                });
    }
    globals.heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      radius: 15
    });
    globals.heatmap.setMap(map);
  } else if ($('#sightings-map').html()) {
    for (var i=0; i < data.length; i++){
    console.log('here');
      var marker = new google.maps.Marker({
      position: {lat:data[i].lat, lng:data[i].lng},
      map: map,
      icon: 'assets/icon_report_found_green_active.png'
      });
      markers.push(marker);
    }
  }
}



var removeLastMarker = function() {
  markers[markers.length - 2].setMap(null)
}

var closeAllInfoWindows = function() {
  for (var i=0;i<infoWindows.length;i++) {
     infoWindows[i].close();
  }
}

var getLostPets = function(){
  // Get all the lost pets and draw markers on the map
  $.get('/api/v1/pets', (data) => {
    window.globals.allpets = data;
    // console.log(globals.pets);
    if (!$('#show-map').html() && !$('#sightings-map').html()){
      for (var i=0; i < data.length; i++){
        addLostPetsMarker({lat:data[i].lat, lng: data[i].lng}, map, data[i].name);
      }
    }
    if ($('#sightings-map').html()){
      console.log(window.globals.allpets);
      for(var i = 0; i<window.globals.allpets.length; i++) {
        getSightingsOfaPet(window.globals.allpets[i].id);
      }
    }
  });
}

// get all the pet close to user( currently not supported by current api controller)
var getCloseLostPets = function(){
  // Get all the lost pets and draw markers on the map
  $.get('/api/v1/pets',
    {user_lat: globals.location.lat, user_lng: globals.location.lng},
    (data) => {
    window.globals.pets = data;
    console.log(data)

      for (var i=0; i < data.length; i++){
        addLostPetsMarker({lat:data[i].lat, lng: data[i].lng}, map, data[i].name);
      }

  });
}

// this will show all pets in the view, supported by current api
var getPetsInView = function(bounds){
  // Get all the lost pets and draw markers on the map
  // var bounds = map.getBounds();
  var ne = bounds.getNorthEast();
  var sw = bounds.getSouthWest();
  $.get('/api/v1/pets',
    {top: ne.lat,
     bottom: sw.lat,
     left: sw.lng,
     right: ne.lng},
    (data) => {
    window.globals.pets = data;
    for (var i=0; i < data.length; i++){

      addLostPetsMarker({lat:data[i].lat, lng: data[i].lng}, map, data[i].name);
    }
  });
}

// Get all the sightings by pet id
var getSightingsOfaPet = function(pet_id){
  // Get all the lost pets and draw markers on the map
  $.ajax({
    url: "/api/v1/sightings",
    type: "get", //send it through get method
    data:{id: pet_id},
    success: function(data) {
      window.globals.sightings = data;``
      addSightingsMarker(data, map);
    },
    error: function(xhr) {
      alert('No data');
    }

  });
}

// Returns the pets with the category given
// example:
//  $('#filter_button').on('click', function(){
//   var pets = getPetsByType(globals.pets, "Dog", map);
//  });
function getPetsByType(pets_data, type, map) {
  var pets = pets_data;
  return pets.filter(
      function(data){ return pets.pet_type == type }
  );
}
