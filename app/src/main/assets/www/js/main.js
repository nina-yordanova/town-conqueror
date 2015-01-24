$(function(){
  localStorage.username = "";
  $( "#loginBtn" ).bind( "tap", submitLogin );
  $( "input[name='location']" ).bind( "change", useLocation );
  if($("input[name='location']" ).val() == "currentLocation") {
    $(".selectedLocation").addClass('ui-state-disabled');
  }
  $( ".coordinates" ).text ("("+localStorage.latitude +" , "+localStorage.longitude+")");
  

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
});