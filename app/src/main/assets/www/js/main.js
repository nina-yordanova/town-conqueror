$(function(){
  localStorage.username = "";
  $( "#loginBtn" ).bind( "tap", submitLogin );
  $( "#achievements, #my-places, #my-trips" ).bind( "tap", underConstruction);
  $( "input[name='location']" ).bind( "change", useLocation );
  if($("input[name='location']" ).val() == "currentLocation") {
    $(".selectedLocation").addClass('ui-state-disabled');
  }


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
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
  };
  function underConstruction () {
    alert('This page is under construction');
  };
  function useLocation () {
    if($(this).val() == "currentLocation") {
      $(".selectedLocation").addClass('ui-state-disabled');
    }
    else {
      $(".selectedLocation").removeClass('ui-state-disabled');
    }
  };
});