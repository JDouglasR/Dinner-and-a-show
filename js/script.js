$(document).ready(function () {

	// Global Variables
	var songKickKey = "1GlKTntzLGzcOL9Q";
    var eventArr = [];
	
	// This uses the texbox input to search for an aritst by name
	getArtist = () => {
		var artistName = $("#artistInput").val();      
	
		$.ajax({
			url: "https://api.songkick.com/api/3.0/search/artists.json?apikey=" + songKickKey + "&query=" + artistName,
			method: "GET",
		}).then(function(responseArtist) {
			console.log(responseArtist);

			// This pulls the artist's ID number from the returned object.
			var artistID = responseArtist.resultsPage.results.artist[0].id;

			// This calls the function to find events using the artist's ID.
			getArtistEvents(artistID);

		});
	
	}

	// This uses the artist's ID to search for the artist's concert calendar.
	getArtistEvents = (id) => {
		$.ajax({
			url: "https://api.songkick.com/api/3.0/artists/" + id + "/calendar.json?apikey=" + songKickKey,
			method: "GET",
            error: function() {
                $("#emptyInputError").removeClass("hide");
            }
		}).then(function(responseArtistCalendar) {
            console.log(responseArtistCalendar);
            
            $("#emptyInputError").addClass("hide")

			// This puts the artist's events into an array.
			eventArr = responseArtistCalendar.resultsPage.results.event;
			
			// This puts the event's name and info into variables.
			var eventName = responseArtistCalendar.resultsPage.results.event[0].displayName;
			var eventAge = responseArtistCalendar.resultsPage.results.event[0].ageRestriction;
			var eventLocation = responseArtistCalendar.resultsPage.results.event[0].location.city;
		
			// For loop to cycle through the array of events.
			for (var i = 0; i < eventArr.length; i++){
				
				// This finds the artist's ID for each event in the loop.
				eventArtist = responseArtistCalendar.resultsPage.results.event[i].performance[0].artist.id;
				
				// This sets each event name to a variable.
				eventName = eventArr[i].displayName;
				
				// This sets each event's age restriction to a variable.
				eventAge = eventArr[i].ageRestriction;
				
				// This sets each event's city to a variable.
				eventLocation = eventArr[i].location.city;
				
				// This puts the event's latitutude location into a variable.
				eventLat = responseArtistCalendar.resultsPage.results.event[0].location.lat;
				
				// This puts the event's longitude location into a variable.
                eventLng = responseArtistCalendar.resultsPage.results.event[0].location.lng;
                
                eventURI = responseArtistCalendar.resultsPage.results.event[i].uri;

				// If statement to check condition of age restriction and return an answer if null.
				if (!eventAge) {
					eventAge = "None."
				} else {
					eventAge = eventArr[i].ageRestriction;
				}

				// This dynamically sets each event to a separate div in the HTML.
				//<img src="http://images.sk-static.com/images/media/profile_images/artists/${eventArtist}/huge_avatar" height="100px" width="100px">;
				$(`<div class="col-sm">
						<div class="w-300 mw-full"> <!-- w-400 = width: 40rem (400px), mw-full = max-width: 100% -->
					  	<div class="card">
								<h2 class="card-title event-name">
								  ${eventName}
								</h2>
								<p class="text-muted event-details">
									${eventLocation}
									<br>
									Age Restriction: ${eventAge}
                                </p>
                                <h6><a href="${eventURI}">View On Songkick</a></h6>
								<div class="text-right"> <!-- text-right = text-align: right -->
                                    <a class="btn eventBtn" type="button" href="#eventInfoModal" data-index="${i}">Get Info</a>
								</div>
						  </div>
						</div>
					</div>`).appendTo("#event-listings");
			}
		});
	}

	// This uses the texbox input to search for an city by name. 
	getCity = () => {
		var cityName = $("#locationInput").val();      
	
		$.ajax({
			url: "https://api.songkick.com/api/3.0/search/locations.json?query=" + cityName + "&apikey=" + songKickKey,
			method: "GET",
		}).then(function (responseCity) {
			console.log(responseCity);

			// This pulls the city's ID number from the returned object.
			var cityID = responseCity.resultsPage.results.location[0].metroArea.id;

			getCityEvents(cityID);

		});
	}
	
	// This uses the city's ID to search for the city's event calendar.
	getCityEvents = (id) => {
		$.ajax({
			url: "https://api.songkick.com/api/3.0/metro_areas/" + id + "/calendar.json?apikey=" + songKickKey,
            method: "GET",
            error: function() {
                $("#emptyInputError").removeClass("hide");
            }
		}).then(function(responseCityCalendar) {
            console.log(responseCityCalendar);
            
            $("#emptyInputError").addClass("hide");

			// This puts the city's events array into a variable.
			eventArr = responseCityCalendar.resultsPage.results.event;

			// This puts an events name and info into variables.
			var eventName = responseCityCalendar.resultsPage.results.event[0].displayName;
			var eventAge = responseCityCalendar.resultsPage.results.event[0].ageRestriction;
			var eventLocation = responseCityCalendar.resultsPage.results.event[0].location.city;
			
			// This is an empty variable that will hold a specific event from the array.			
			var eventName;
			
			// For loop to cycle through the array of events.
			for (var i = 0; i < eventArr.length; i++){
				
				// This finds the artist's ID for each event in the loop to display a picture.
				eventArtist = responseCityCalendar.resultsPage.results.event[i].performance[0].artist.id;
				
				// This sets each event name to a variable.
				eventName = eventArr[i].displayName;

				// This sets each event's age restriction to a variable
				eventAge = eventArr[i].ageRestriction;

				// This sets each event's city name to a variable.
				eventLocation = eventArr[i].location.city;

				// This puts an events latitude into a variable.
				eventLat = responseCityCalendar.resultsPage.results.event[i].location.lat;

				// This puts an events longitude into a variable.
                eventLng = responseCityCalendar.resultsPage.results.event[i].location.lng;
                
                eventURI = responseCityCalendar.resultsPage.results.event[i].uri;
				
				// If statement to check condition of age restriction and return an answer if null.
				if (!eventAge) {
					eventAge = "None."
				} else {
					eventAge = eventArr[i].ageRestriction;
				}
				// This dynamically sets each event to a separate div in the HTML.
				$(`<div class="col-sm">
						<div class="w-300 mw-full"> <!-- w-400 = width: 40rem (400px), mw-full = max-width: 100% -->
					  	<div class="card">
								<h2 class="card-title event-name">
								  ${eventName}
								</h2>
								<p class="text-muted event-details">
									${eventLocation}
									<br>
								  Age Restriction: ${eventAge}
                                </p>
                                <h6><a target="_blank" href="${eventURI}">View On Songkick</a></h6>
								<div class="text-right"> <!-- text-right = text-align: right -->
                                    <a class="btn eventBtn" type="button" href="#eventInfoModal" data-index="${i}">Get Info</a>
                                </div>
						  </div>
						</div>
                    </div>`).appendTo("#event-listings");
			}
        });    
	}

	
	getCityId = (lat, long) => {
		$.ajax({
			url: "https://developers.zomato.com/api/v2.1/cities?lat=" + songKLat + "&lon=" + songKLong,
			method: "GET",
			headers: {'user-key': '4715989bdd71056d9e7eafc7a7e0536b'}
		}).then(function(cityIdResponse) {
			console.log(cityIdResponse);
			var zomatoCityId = response.location_suggestions[0].id;
		});
		
	};

	var lat;
	var lng;
  
	function drawMap(lat, lng) {
		// The location of the Venue
		var hlywdbwl = new google.maps.LatLng(lat, lng);
		// songkick will
		var map = new google.maps.Map(document.getElementById('map'), { zoom: 12, center: hlywdbwl });
		
		var pos = new google.maps.LatLng(lat, lng);
		var marker = new google.maps.Marker({ position: pos, map: map });
	}




	$("#searchBtnArtist").on("click", function() {
		$("#eventsCards").removeClass("hide");
		$("#event-listings").empty();
        $("#eventsCard").removeClass("hide");
		getArtist();
	});

	$("#searchBtnCity").on("click", function() {
		$("#eventsCards").removeClass("hide");
		$("#event-listings").empty();
		$("#eventsCard").removeClass("hide");
		getCity();
    });

	$(document).on('click', '.eventBtn', function() {
		$("#eventModalName").text(eventArr[parseInt($(this).attr("data-index"))].displayName);
		lat = eventArr[parseInt($(this).attr("data-index"))].location.lat;
		lng = eventArr[parseInt($(this).attr("data-index"))].location.lng;
		console.log(lat);
		console.log(lng);
		drawMap(lat, lng);
		$.ajax({
			url: "https://developers.zomato.com/api/v2.1/cities?lat=" + lat + "&lon=" + lng,
			method: "GET",
			headers: {'user-key': '4715989bdd71056d9e7eafc7a7e0536b'}
		}).then(function(cityIdResponse) {
			console.log(cityIdResponse);
			var zomatoCityId = cityIdResponse.location_suggestions[0].id;
			$("#zomatoWidget").attr("src", `https://www.zomato.com/widgets/res_search_widget.php?lat=${lat}&lon=${lng}&theme=dark&hideCitySearch=on&hideResSearch=on&widgetType=large&sort=distance`)
		});
		$("#pwrdBySongKick").attr("href", eventArr[$(this).attr("data-index")].uri)
	})
});