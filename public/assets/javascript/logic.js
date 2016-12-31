$( document ).ready(function() {
//=========================Start Materialize===============================

    
    // $("#div2").fadeToggle("slow");
    // $("#div3").fadeToggle(3000);

$(document).ready(function(){
  $('#effect').fadeIn(1500).delay(2500).fadeOut(1500);
  $('#effect2').delay(4500).fadeIn(1500).fadeOut(1500);
  $('#hike').delay(6500).fadeIn(1500).fadeOut(1500);
});

//Start Loading Images========================================
// function imageLoad(){
//   $("#hike").click(function() {
//     $(".image-div").each(function(index) {
//       $(this).delay(400*index).fadeIn(50);
//     });
//   });
// }


  //Document Ready with the Materialize triggers
//Parallax Trigger
$('.parallax').parallax();
// material select trigger
$('select').material_select();
// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
$('.modal-trigger').leanModal({
  dismissible: true, // Modal can be dismissed by clicking outside of the modal
  opacity: .5, // Opacity of modal background
  in_duration: 7000, // Transition in duration
  out_duration: 200, // Transition out duration
  starting_top: '4%', // Starting top style attribute
  ending_top: '10%', // Ending top style attribute
  }
); //END MATERIALIZE

//GLOBAL VARIABLES==============================================
  // Seat Geek
var URL = "";
var key = "&client_id=NTc2NDA5OHwxNDgyODM2MTgy";
var baseURL = "https://api.seatgeek.com/2/events?performers.slug="; 
var performer = "";
var zipCode;
var zipCodeArray = [];
var date;
var event;
var stadium;
var cityAndState;
var headerDisplay;
var headerDisplayArray = [];
 
// OpenWeather
var location = [];
var city;
var wind;
var humidity;
var temperature;
var weather;
var weatherArray = [];

//ON-CLICK EVENTS===============================================
  //On-click Event to trigger default display
$(document).on('click', '.headerNFL', function () {
  $("#buttonHolder").show();
  $("#dynamicDisplay").hide();
  $("#box").hide();
}); //End of Home Button On-click Event 

// On-click Event to trigger dynamic display
$(".teams").click(function() { 
  //Replaces Button Display w/ Accordion
  $("#buttonHolder").hide();
  $("#dynamicDisplay").show();
  $("#box").show();
  $(this).addClass("modal-trigger");
  $(this).attr("data-target","modal1");
  //$('#displayWeather').addClass('modal-trigger')
  //$('#displayWeather').attr("data-target","modal1");
   
  // See changes made the performer
  console.log($(this).attr('id'));
  performer = $(this).attr('id');
  // console.log(performer);

//API CALLS=====================================================
// Seat Geek URL to Call API 
URL = baseURL + performer + key; 
  //console.log(URL);

  // START OF SEAT GEEK API
  // ajax call for seat geek information
  $.ajax({url: URL, method: 'GET'})
    .done(function(response) {

    // This is going to display the results of the api call
    var results = response.events;
    console.log(results);
    // For loop to create display of ten events
      for(var i = 0; i < results.length; i++) {
        //Stores the zipcode of each event stadium
        zipCode = results[i].venue.display_location;
        zipCode;
        //Pushing zipcode events into an array for future use
        zipCodeArray.push(zipCode);
        // console log zipcode array
        console.log(zipCodeArray);

    // Store Response Globally For Future Use
    date         = results[i].datetime_local;
    event        = results[i].title;
    stadium      = results[i].venue.name;
    cityAndState = results[i].venue.display_location;

    // Push Results into One Variable
    headerDisplay = "Date:         " + date + 
                    "<br>Stadium:  " + stadium + 
                    "<br>Location: " + cityAndState;

    // Push single variable into an array
    headerDisplayArray.push(headerDisplay);
      // Console log events array
      console.log(headerDisplayArray);

// CONSOLE LOG EVERYTHING TO MAKE SURE IT'S WORKING
// console.log(results[i].title);
// console.log(results[i].datetime_local);
// console.log(results[i].venue.city);
// console.log(results[i].venue.name);
// console.log(results[i].venue.postal_code);
// console.log(results[i].venue.extended_address);
// console.log(results[i].venue.display_location);
// console.log(results[i].venue.slug);
// console.log(results[i].venue.state);
// console.log(results[i].venue.score);
// console.log(results[i].venue.timezone);
// console.log(results[i].short_title);
// console.log(results[i].datetime_utc);
// console.log(results[i].datetime_utc);
// console.log(results[i].stats.average_price);
// console.log(results[i].stats.lowest_price_good_deals);
// console.log(results[i].stats.highest_price);
// console.log(results[i].stats.lowest_price);
// console.log(results[i].performers[1].image);
// console.log(results[i].performers[1].divisions[0].display_name);
// console.log(results[i].performers[1].divisions[0].division_level);
// console.log(results[i].performers[1].divisions[1].display_name);
// console.log(results[i].performers[1].divisions[1].division_level);


  // END OF SEAT GEEK API
//===============================================================
  // START OF OPEN WEATHER API

//OpenWeatherMap API Key
var WeatherAPIkey = "08b0500863b3dfb3863a05215f613d59";

  //URL to query the database
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + zipCodeArray[i] + "&units=imperial&appid=" + WeatherAPIkey;

    //AJAX call to the OpenWeatherMap API
    $.ajax({url: queryURL, method: 'GET', async: false})

    // We store all of the retrieved data inside of an object called "response"
    .done(function(response) {

      // Log the queryURL & response
      console.log(queryURL);
      console.log(response);

    // Transfer Content to HTML
    city        = response.name;
    wind        = response.wind.speed;
    humidity    = response.main.humidity;
    temperature = response.main.temp;

    weather = " Current Weather in " + city + " - " + 
              " Temperature (F):   " + temperature  + 
              " Humidity:          " + humidity     +
              " Wind-Speed:        " + wind;

    //Console Log the weather
    //Console.log(weather);
    weatherArray.push(weather)
    // Log weather array
    console.log(weatherArray);
}); // End of .done function for Open Weather Api

//CREATE DISPLAY===========================================
// Item List 
var li = $("<li>");

//Event Header Div 
var eventHeader = $("<div>");
    eventHeader.attr("class", "eventHeaderDisplayed")
    eventHeader.text(event);

//Div w/ divHeader class is created for accordion
var divHeader = $("<div>");
  divHeader.attr("class", "collapsible-header");
  //Populate divHeader with API call results[date, event name & location]
  divHeader.html(headerDisplayArray[i]);

//BUTTONS
var searchButton = $('<button>').text('hh')
  divHeader.attr("class", "fixed-action-btn horizontal");
  searchButton.attr("class", "searchButtons");
  searchButton.attr("id", "displayWeather");

//Create Weather Button
var weatherButton = $('<button>').text('Forecast')
  divHeader.attr("class", "collapsible-header");
  weatherButton.attr("class", "searchButtons");
  weatherButton.attr("id", "displayWeather");
  //weatherButton.html(headerDisplayArray[i])

//Creating Yelp Search Button
var yelpButton = $('<button>').text('Yelp')
  divHeader.attr("class", "collapsible-header");
  yelpButton.attr("class", "searchButtons");

//Create Google Map Button
var mapButton = $('<button>').text('Google Maps')
  divHeader.attr("class", "collapsible-header");
  mapButton.attr("class", "searchButtons");
  mapButton.attr("id", "map");
  mapButton.attr("id", "displayMap");

  //divHeader.html(yelpButton, '<button>');

//Created div & divBody class for accordion
var divBody = $("<div>");
  divBody.attr("class", "collapsible-body");

//divText with no text is created
var divText = $("<p>").attr("class", "weather");
  //Insert weather results accordion's body div 
  divText.text(weatherArray[i]);

  //EVERYTHING IS POPULATED HERE
  li.append(eventHeader);
  //divHeader is attached to li
  li.append(divHeader);
  //li.append(yelpButton, weatherButton);
  li.append(weatherButton, yelpButton, mapButton);
  li.append(searchButton);
  //divBody is attached to li
  li.append(divBody);
  //p is attached to divBody
  divBody.append(divText);
  //li is attached to the html id tag dynamicDisplay
  $("#dynamicPanel").append(li);

//END OF DISPLAY CODE=========================================     
      }; // End of Seat Geek Api For-Loop
    }); // End of Seat Geek Api .done Function 
  }); // End On-click Function
}); // End Document Ready Function

//Start Loading Images========================================
function imageLoad(){
  $("#hike").click(function() {
    $(".image-div").each(function(index) {
      $(this).delay(400*index).fadeIn(50);
    });
  });
}



   

// $(document).on("click", ".display-map", function() {
//     openDisplay("maps-modal");
//     itemNo = $(this).data("itemno");
//     itemName = $(results).find("Title").eq(itemNo).text();
//     addFavorite();
// });

// $( "#displayMap" ).click(function() {
//   $(this).slideUp();
// });

// $(".collapsible-header").click(function() {
//   console.log('HERE I AM');
//   $( "p").show();
//   $(this).slideDown();
// });

//FIRECHAT======================================================
var config = {
  apiKey: "AIzaSyDFlsisAa2yeDhRjSPdoC6Ez0UjOrSf9sc",
  authDomain: "firechat-demo-app.firebaseapp.com",
  databaseURL: "https://firechat-demo-app.firebaseio.com"
};
  firebase.initializeApp(config);

//Reference for Firebase Realtime Database
var chatRef = firebase.database().ref();

// Create an instance of Firechat
var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));

// Listen for authentication state changes
firebase.auth().onAuthStateChanged(function(user){
  if (user){
    // If the user is logged in, set them as the Firechat user
    chat.setUser(user.uid, "Anonymous" + user.uid.substr(10, 8));
  } else{
    // If the user is not logged in, sign them in anonymously
    firebase.auth().signInAnonymously().catch(function(error) {
    console.log("Error signing user in anonymously:", error);
    });
  }
});

// Handler for .ready() called.
$(document).ready(function(){
  $('#modal1').openModal();
  imageLoad();
});

//GOOGLE MAPS===================================================
var map;
var infoWindow;
var service;

function initMap() {
  map = new google.maps.Map(document.getElementById('#map'), {
    center: {lat: 38.982409, lng: -76.957849},
    zoom: 15,
    styles: [{
      stylers: [{ visibility: 'simplified' }]
    }, {
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }]
  });
    
  infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);

  // The idle event is a debounced event, so we can query & listen without
  // throwing too many requests at the server.
  map.addListener('idle', performSearch);
}

function performSearch() {
  var request = {
    bounds: map.getBounds(),
    keyword: 'best view'
  };
  service.radarSearch(request, callback);
}

function callback(results, status) {
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    console.error(status);
    return;
  }
  for (var i = 0, result; result = results[i]; i++) {
    addMarker(result);
  }
}

function addMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbURAkGGi6MRljypN4iruAV6qotB1JXzVjrnVT03FPcbdhVuepsg',
      anchor: new google.maps.Point(30, 30),
      scaledSize: new google.maps.Size(30, 30)
    }
  });

  google.maps.event.addListener(marker, 'click', function() {
    service.getDetails(place, function(result, status) {
      
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);

        return;
      }
       
      infoWindow.setContent("<strong>Name: </strong>"+result.name+"<br><strong>Address: </strong>"+result.adr_address+"<br> <strong>website: </strong><a href="+result.website+">"+result.website+"</a><br><strong>Phone#:</strong> "+result.formatted_phone_number);
        $('div:nth-child(1)').css('color', 'blue');

     
      infoWindow.open(map, marker);
      // for (var i = 0; i < resul; i++) {
      //   console.log(result);
      // }
      console.log(result);
      console.log(result.vicinity);
      console.log(result.website);
      console.log(result.adr_address);

});
});
}

 var map;
      var home;
      var markersArray = [];

      function initialize() {
           home = new google.maps.LatLng('12.9833','77.5833');   
           var opts = {
                zoom: 8,
                center: home,
                mapTypeId: google.maps.MapTypeId.ROADMAP
           };

           map = new google.maps.Map(document.getElementById('map_canvas'), opts);
           google.maps.event.addListener(map, "click", function(event) {
                  showMarker(event.latLng);
               });    

      }

      function loadMap(lat,lng)
           {
               var location= new google.maps.LatLng(lat, lng);
               map.setCenter(location);
               document.getElementById("lat").innerHTML = location.lat();
               document.getElementById("lng").innerHTML = location.lng();
           }

        function showMarker(location) {    
               deleteOverlays();               
               var marker = new google.maps.Marker({
                   position: location,
                   map: map
               });
               markersArray.push(marker);
               document.getElementById("lat").innerHTML = location.lat();
               document.getElementById("lng").innerHTML = location.lng();
        }


       function deleteOverlays() {
            if (markersArray) {
                for (i=0; i < markersArray.length; i++) {
                    markersArray[i].setMap(null);
                }
            markersArray.length = 0;
            }
        }

      google.maps.event.addDomListener(window, 'load', initialize);


$(document).ready(function(){
  function initialize() {
    var mapOptions = {
      center: { lat: 0, lng: 0 },
      zoom: 8
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}
    $('#show-map').on('click',initialize)
});
