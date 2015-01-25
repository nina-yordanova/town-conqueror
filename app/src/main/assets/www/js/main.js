$(function(){
  localStorage.username = "";
 // localStorage.tripNam = localStorage.tripNam;
  console.log("in page ->"+localStorage.latitude +localStorage.longitude);
  $( "#loginBtn" ).bind( "tap", submitLogin );
  $( "input[name='location']" ).bind( "change", useLocation );
  if($("input[name='location']" ).val() == "currentLocation") {
    $(".selectedLocation").addClass('ui-state-disabled');
  }
  $( ".coordinates" ).text ("("+localStorage.latitude +" , "+localStorage.longitude+")");
  $( "#nextStep" ).bind( "tap", secondStep );
  $( "#makeTrip" ).find( "h1" ).text (localStorage.tripName);


  $( document ).on( "pageinit", "#map-page", function() {
      var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
      if ( navigator.geolocation ) {
          function success(pos) {
              // Location found, show map with these coordinates
              drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          }
          function fail(error) {
              drawMap(defaultLatLng);  // Failed to find location, show default map
          }
          // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
          navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
      } else {
          drawMap(defaultLatLng);  // No geolocation support, show default map
      }
      function drawMap(latlng) {
          var myOptions = {
              zoom: 10,
              center: latlng,
              mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
          // Add an overlay to the map of current lat/lng
          var marker = new google.maps.Marker({
              position: latlng,
              map: map,
              title: "Greetings!"
          });
      }
  });


  function submitLogin( event ){
    localStorage.mail     = $('#mail').val();
    localStorage.username = $('#username').val();
    localStorage.password = $('#password').val();
    if(localStorage.mail != "" && localStorage.username != "" && localStorage.password != ""){
      $.mobile.changePage("#home");
      if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(geolocationOnSuccess, geolocationOnError);
        $( ".username" ).text( localStorage.username );
      }
    }
    else {
      $( ".error" ).text( "All fields are required" );
    }
  };
  function geolocationOnSuccess (position) {
    localStorage.latitude = position.coords.latitude;
    localStorage.longitude = position.coords.longitude;
    $( ".place" ).text( position.coords.latitude+ ", " + position.coords.longitude);
  };
  function geolocationOnError (error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
  };
  function useLocation () {
    if($(this).val() == "currentLocation") {
      $(".selectedLocation").addClass('ui-state-disabled');
    }
    else {
      $(".selectedLocation").removeClass('ui-state-disabled');
    }
  };
  function secondStep () {
    localStorage.tripName = $("#tripName").val()== "" ? "New Trip" : $("#tripName").val();
    console.log("in second step ->"+localStorage.tripName);
    $.mobile.changePage("#secondStep");
  };
});