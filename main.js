'use strict';
$(document).ready(init);

function init() {
  var e;
 var autoLocatePromise = $.ajax("http://api.wunderground.com/api/a741b0d8e5cdb448/geolookup/q/autoip.json");
  autoLocatePromise.success(function(data) {
  var city = data.location.city;
  var state = data.location.state;
  var location = state + '/' + city;
  goClicked(location, e);

  $('#go').click(goClicked);
  $('input').keypress(inputKeypress); 
  })
}


function inputKeypress(e) {
  if (e.which === 13) {
    goClicked(e);
  }
}

function goClicked(location, e) {
  var city, state;
  if ($('.location').val()) {
    location = $('.location').val()
    if (/\d/.test(location) === false) {
      var locationArr = location.split(',');
      city = locationArr[0];
      state = locationArr[1];
      location = state + "/" + city; 
    }
  }
  var currentPromise = $.ajax("http://api.wunderground.com/api/a741b0d8e5cdb448/conditions/q/" + location + ".json");
  currentPromise.success(function(data) {
    var F = data.current_observation.heat_index_f;
    var icon_url = data.current_observation.icon_url;
    var icon = data.current_observation.icon;
    city = data.current_observation.display_location.city;
    state = data.current_observation.display_location.state;
    if (icon = 'clear') {
    $('.currentInfo').addClass('sunny');
    }
    if ( F !== 'NA'){
      $('.dispTempF').text(F + '° Farenheight').css('background','white');
    } else {
      $('.dispTempF').text(data.current_observation.feelslike_f + '° Farenheight').css('background','white');
    }
      $('.icon').empty().prepend("<img src='" + icon_url + "'>");
      $('#location').text(city + ',' + state);
      var $radar = $('.radar');
      $radar.append("<img src='http://api.wunderground.com/api/a741b0d8e5cdb448/animatedradar/q/" + state + '/' + city + ".gif?newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50' id='radar'>" );
  });
  currentPromise.fail(function(error) {
    console.log('error:', error);
  });

  var forecastPromise = $.ajax("http://api.wunderground.com/api/a741b0d8e5cdb448/forecast/q/" + location + ".json");
  forecastPromise.success(function(data) {
    console.log(data);
  })

}
