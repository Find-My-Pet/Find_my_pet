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
]

$( document ).ready(function() {
  var styledMap = new google.maps.StyledMapType(mapstyle, {name: "styled map"});
  var map; // define the global map
  map = initMap();
  map.mapTypes.set("map_style", styledMap);
  map.setMapTypeId("map_style");
  
  var pets = getLostPets();
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
  });

  var infoWindow = new google.maps.InfoWindow({map: map});
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  var geoloccontrol = new klokantech.GeolocationControl(map, 15);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

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

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
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

function addLostPetsMarker(location, map, label) {
  var marker = new google.maps.Marker({
    position: location,
    label: label,
    map: map
  });
  markers.push(marker);
}

var removeLastMarker = function() {
	for (var i = 0; i < markers.length - 1; i++) {
  	markers[i].setMap(null)
  }
}

var closeAllInfoWindows = function() {
  for (var i=0;i<infoWindows.length;i++) {
     infoWindows[i].close();
  }
}

var getLostPets = function(){
  // Get all the lost pets and draw markers on the map
  $.get('/api/v1/pets', (data) => {
    for (var i=0; i < data.length; i++){
      console.log(data[i]);
      addLostPetsMarker({lat:data[i].lat, lng: data[i].lng}, map, data[i].name);
    }
  });
}





























