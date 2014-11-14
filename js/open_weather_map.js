var OpenWeatherMapApi = function() {



  this.getWeatherConditions = function(lat, lon, dt, onSuccess) {

    var utcDt = dt.getTime() / 1000;
    var utcCurrent = (new Date()).getTime() / 1000;

    if (utcDt - utcCurrent < 1800) {
      var url = 'http://api.openweathermap.org/data/2.5/weather?'
        + 'lat=' + lat
        + '&lon=' + lon;
      $.getJSON(url, function(data) {

        // convert data to standard format

        var conditions = {
          id: data.id,
          name: data.name,
          icon: 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png',
          temp: data.main.temp,
          pressure: data.main.presure,
          windSpeed: data.wind.speed,
          windGust: data.wind.gust,
          cloudiness: data.clouds.all,
          sunrise: new Date(data.sys.sunrise * 1000),
          sunset: new Date(data.sys.sunset * 1000),
          asFor: new Date(data.dt * 1000)
        };

        if (data.rain !== undefined) {
          conditions.rain = data.rain['3h'];
        } else {
          conditions.rain = 0;
        }

        if (data.snow !== undefined) {
          conditions.snow = data.snow['3h'];
        } else {
          conditions.snow = 0;
        }


        onSuccess(conditions);
      });
    } else {
      url = 'http://api.openweathermap.org/data/2.5/forecast?'
        + 'lat=' + lat
        + '&lon=' + lon;

      $.getJSON(url, function(data) {
        $.each(data.list, function(index, value) {

          if (value.dt < utcDt && utcDt < (value.dt + (3 * 3600))) {
            conditions = {
              id: data.city.id,
              name: data.city.name,
              icon: 'http://openweathermap.org/img/w/' + value.weather[0].icon + '.png',
              temp: value.main.temp,
              pressure: value.main.pressure,
              windSpeed: value.wind.seed,
              windGust: value.wind.gust,
              cloudiness: value.clouds.all,
              sunrise: new Date(), //TODO
              sunset: new Date(), //TODO
              asFor: new Date(value.dt * 1000)
            };

            if (value.rain !== undefined) {
              conditions.rain = value.rain['3h'];
            } else {
              conditions.rain = 0;
            }


            if (value.snow !== undefined) {
              conditions.snow = value.snow['3h'];
            } else {
              conditions.snow = 0;
            }

            onSuccess(conditions);
            return;
          }
        });
      });
    }

  };
}