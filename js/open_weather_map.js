var OpenWeatherMapApi = function() {



  this.getCurrentWeatherConditions = function(lat, lon, onSuccess) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?'
      + 'lat=' + lat
      + '&lon=' + lon;
    $.getJSON(url, function(data) {

      // convert data to standard format

     var xLat = lat;
     var xLon = lon;
     var xUrl = url;
     var conditions = {
          name: data.name,
          icon: 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png',
          temp: data.main.temp,
          pressure: data.main.presure,
          windSpeed: data.wind.speed,
          windGust: data.wind.gust,
          cloudiness: data.clouds.all
      };

      if (data.rain !== undefined) {
        conditions.rain = data.rain['3h'];
      }

      if (data.snow !== undefined) {
        conditions.snow = data.snow['3h'];
      }

      onSuccess(conditions);
    });
  };
}