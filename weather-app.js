//c6e0884af486dcb5

var weatherWidget = {
};

weatherWidget.init = function() {
	//this code in here is used to initialize our application
	$('.user_input').on('submit', function(e){
		e.preventDefault();
		var usersCountry = $('input[name=country]').val();
		var usersCity = $('input[name=city]').val();
		weatherWidget.getData(usersCountry, usersCity);
		document.getElementById('loader').style.display='block';
	});
};

//When the page loads get some data
//Make an AJAX call to the wundergrounds API
weatherWidget.getData = function(usersCountry, usersCity) {
	apiURL = 'http://api.wunderground.com/api/c6e0884af486dcb5/conditions/q/' + usersCountry + '/' + usersCity + '.json';

	$.ajax({
		url: apiURL,
		method: 'GET',
		dataType: 'json',
	})
	.then(function(weatherData){
		console.log(weatherData.current_observation)
		var observation = weatherData.current_observation;
		if (typeof observation === 'undefined') {
			alert('Whoops. Something went wrong, please double check the spelling of your country and city');
		} else {
			weatherWidget.displayWeather(observation);
		}
	});
};

//when the data returns we want to display specific things (found on the html page) ('weather' is the data represented by observation above)
weatherWidget.displayWeather = function(weather) {
	console.log(weather);
	var city = weather.display_location.city;
	$('.city_name').text(city);
	var temp_c = weather.temp_c;
	console.log(temp_c);
	$('.temp_c').text(temp_c);
	var time = weather.local_time_rfc822;
	console.log(time);
	$('.date_time').text(time);
	var condition = weather.weather;
	$('.weather_string').text(condition);
	var icon = weather.icon_url;
	$('.weather_image').attr('src', icon);
	$('.weather .wrapper').addClass('slide-in');

	//smooth scroll plugin
	$.smoothScroll({
		scrollTarget: '.temp',
		speed: 400
	});

	document.getElementById('loader').style.display='none';
}

$(document).ajaxError(function(){
	$('.log').text('Whoops something went wrong, try again');
});

$(document).ready(function(){
  weatherWidget.init();
});