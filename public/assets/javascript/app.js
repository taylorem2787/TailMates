$(".teams").on("click", function () {
  console.log($(this).attr('id'));
});
// ----------------------------------------------------------------------------------
// Start of Yelp Api

$("#submit").on("click", function() {
var yelpTerms = $("#input1").val().trim();
var yelpAddress = $("#input2").val().trim();
var zipcode = ""; // This is going to be a variable coming from the Seat Geek Api
var auth = {
	consumerKey: 'ifv5tpA7yPYADs-VuQGc4Q', 
    consumerSecret: 'G7ILGwEDy2tS5c34Q0TEiOAw9Xc',
    accessToken: 'VLZiKntkfQfM-t0wqNgHzFZvTs9lLcp3',
    accessTokenSecret: 'aoa5d5L1QxtgPfUqZfn7JZqvrI8',
    serviceProvider: {
    signatureMethod: "HMAC-SHA1"
	}
};

	var terms = yelpTerms;
	var near = yelpAddress;
	var limit = 12;
  var image_url = 'image_url';
  var rating_img_url_large = 'rating_img_url_large';
  var phone = 'phone';
  var yelpUrl = 'url';

var accessor = {
  consumerSecret: auth.consumerSecret,
  tokenSecret: auth.accessTokenSecret
};

    parameters = [];
    parameters.push(['url', yelpUrl]);
    parameters.push(['term', terms]);
    parameters.push(['location', near]);
    parameters.push(['limit', limit]);
    parameters.push(['image_url', image_url]);
    parameters.push(['rating_img_url_large', rating_img_url_large]);
    parameters.push(['phone', phone]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

var message = {
  'action': 'http://api.yelp.com/v2/search',
  'method': 'GET',
  'parameters': parameters
};

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);
    var parameterMap = OAuth.getParameterMap(message.parameters);
    parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);



$.ajax({'url': message.action,    
  'method': 'GET',
  'data': parameterMap,
  'cache': true,
  'dataType': 'jsonp',
  'jsonpCallback': 'cb',}).done(function(response) {
		

		console.log($.ajax({'url': message.action,    
    'method': 'GET',
    'data': parameterMap,
    'cache': true,
    'dataType': 'jsonp',
    'jsonpCallback': 'cb',}));
		console.log(response);
	});
});

// End of Yelp Api
// ----------------------------------------------------------------------------------
// Start of Google map Api

  // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

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
// End of Google map Api
// ----------------------------------------------------------------------------------