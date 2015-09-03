'use strict';
$(document).ready(init);
function init() {
  $('#go').click(goClicked);
}
var results;
function goClicked(e) {
  var state = $("stateName");
  var city = $("")
  var promise = $.getJSON("http://api.wunderground.com/api/d9e83152e7e5e110/geolookup/conditions/forecast/q/Australia/Sydney.json");
  promise.success(function(data) {
    console.log('success data:', data);
    results = data;

    
  });
  promise.fail(function(error) {
    console.log('error:', error);
  });
}
function getResults() {
  console.log(results);
}
Add Comment