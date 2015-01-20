$(function(){
  localStorage.username = "";
  $( "#loginBtn" ).bind( "tap", submitLogin );
  $( "#achievements, #my-places, #my-trips" ).bind( "tap", underConstruction);
  $( "#new-trip" ).bind( "tap", newTripBtn);


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
    $( ".place" ).text( position.coords.latitude+ ", " + position.coords.longitude);
  };
  function geolocationOnError (error) {
    alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
  };
  function underConstruction () {
    alert('This page is under construction');
  };
  function newTripBtn( event ){
    $.mobile.changePage("#newTrip");
  };
});