$( document ).ready(function() {
  $('#effect').delay(500).fadeIn(1000).delay(1000).fadeOut(1000);
  $('#effect2').delay(4000).fadeIn(1000).fadeOut(1000);
  $('#agree').delay(6500).fadeIn(1000);

  // Seat Geek Global variables
  var URL = "";
  var baseURL = "https://api.seatgeek.com/2/events?performers.slug="; 
  var key = "&client_id=NTc2NDA5OHwxNDgyODM2MTgy";
  var performer = "";
  var zipCode;
  var zipCodeArray = [];
  var date;
  var event;
  var stadium;
  var cityAndState;
  var headerDisplay;
  var headerDisplayArray = [];
 
  // OpenWeather Global variables
  var location = [];
  var city;
  var windSpeed;
  var humidity;
  var temperature;
  var weather;
  var weatherArray = [];

 // On click event to trigger default display
   $(document).on('click', '.headerNFL', function () {
    $("#buttonHolder").show();
    $("#dynamicDisplay").hide();
    $("#box").hide();
  }); // End of on click event for home button



  // On click event to trigger dynamic display
  $( ".teams" ).click(function() { 
    // This replaces the display of buttons with the accordion
    $("#buttonHolder").hide();
    $("#dynamicDisplay").show();
    $("#box").show();
    $(this).addClass("modal-trigger");
    $(this).attr("data-target","modal1");

     
    // See changes made the performer
    console.log($(this).attr('id'));
    performer = $(this).attr('id');
    console.log(performer);

    // This is the url that will be calling seat geek api
    URL = baseURL + performer + key; 
    console.log(URL);

      // START OF SEAT GEEK API
      // ajax call for seat geek information
      $.ajax({url: URL, method: 'GET'})

      // Start of . done
      .done(function(response) {


      // This is going to display the results of the api call
      var results = response.events;
      console.log(results);

      // For loop that creates a display of ten events
      for(var i = 0; i < results.length; i++) {

        // This is storing the zipcode of each event stadium
        zipCode = results[i].venue.display_location;
        zipCode;
        // Pushing all the zipcode events into an array for future use
        zipCodeArray.push(zipCode);

        // console log the zipcode array
        console.log(zipCodeArray);

        // Store information globally for future use
        date = results[i].datetime_local;
        event = results[i].title;
        stadium = results[i].venue.name;
        cityAndState = results[i].venue.display_location;

        // Push info to one variable
        headerDisplay = "Date: " + date + "<br>Stadium: " + stadium + "<br>Location: " +cityAndState;


        // Push single variable into an array
        headerDisplayArray.push(headerDisplay);

        // Console log the array
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
// ----------------------------------------------------------------------------------------------------
      // START OF OPEN WEATHER API

      // This is our API Key
      var WeatherAPIkey = "08b0500863b3dfb3863a05215f613d59";

      // Here we are building the URL we need to query the database
      var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + zipCodeArray[i] + "&units=imperial&appid=" + WeatherAPIkey;

        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax({url: queryURL, method: 'GET', async: false})

        // We store all of the retrieved data inside of an object called "response"
        .done(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
        city = response.name;
        windSpeed = response.wind.speed;
        humidity = response.main.humidity;
        temperature = response.main.temp;

        weather = "city: " + city + " windSpeed: " + windSpeed + " humidity: " + humidity + " temperature: " + temperature;

        // Log the weather in the console as well
        console.log(weather);
        

        weatherArray.push(weather)

        // Log the array
        console.log(weatherArray);

        }); // End of .done function for Open Weather Api


// CREATING THE DISPLAY -----------------------------------------------------------------
          // List item created
          var li = $("<li>");

          //div with eventHeader

          var eventHeader = $("<div>");
          eventHeader.attr("class", "eventHeaderDisplayed")
          eventHeader.text(event);
          // div with divHeader class is created for accordion
          var divHeader = $("<div>");
          divHeader.attr("class", "collapsible-header");

          // divHeader is populated with information from api call including
          // date, event name, and location
          divHeader.html(headerDisplayArray[i]);

          // div with divBody class is created for accordion
          var divBody = $("<div>");
          divBody.attr("class", "collapsible-body");

          // divText with no text is created
          var divText = $("<p>");
          
          // Here we are inserting the weather information into the body div of the accordion
          divText.text(weatherArray[i]);


          // EVERYTHING IS BEING POPULATED HERE
          li.append(eventHeader);
          // divHeader is attached to li
          li.append(divHeader);

          // divBody is attached to li
          li.append(divBody);

          // p is attached to divBody
          divBody.append(divText);

          // li is attached to the html id tag dynamicDisplay
          $("#dynamicPanel").append(li);
// END OF CREATING THE DISPLAY ---------------------------------------------------------------      


      }; // End of for loop for Seat Geek Api


    }); // End of .done function for Seat Geek Api
     

  }); // This is the end of the on click function


}); // This is the end of the document ready function

//Start images loading
function imageLoad(){
$( "#agree" ).click(function() {
  $(".image-div").each(function(index) {
    $(this).delay(400*index).fadeIn(50);
});

});
}

// firechat
 var config = {
        apiKey: "AIzaSyDFlsisAa2yeDhRjSPdoC6Ez0UjOrSf9sc",
        authDomain: "firechat-demo-app.firebaseapp.com",
        databaseURL: "https://firechat-demo-app.firebaseio.com"
      };
      firebase.initializeApp(config);

      // Get a reference to the Firebase Realtime Database
      var chatRef = firebase.database().ref();

      // Create an instance of Firechat
      var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));

      // Listen for authentication state changes
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // If the user is logged in, set them as the Firechat user
          chat.setUser(user.uid, "Anonymous" + user.uid.substr(10, 8));
        } else {
          // If the user is not logged in, sign them in anonymously
          firebase.auth().signInAnonymously().catch(function(error) {
            console.log("Error signing user in anonymously:", error);
          });
        }
      });

$( document ).ready(function() {
  // Handler for .ready() called.
    $('#modal1').openModal();
    imageLoad();


});

