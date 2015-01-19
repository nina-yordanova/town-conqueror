$(function(){
  localStorage.username = "";
  $( "#loginBtn" ).bind( "tap", submitLogin );

  function submitLogin( event ){
    localStorage.mail     = $('#mail').val();
    localStorage.username = $('#username').val();
    localStorage.password = $('#password').val();

    if(localStorage.mail != "" && localStorage.username != "" && localStorage.password != ""){
      $.mobile.changePage("#home");
      var lat = navigator.geolocation.getCurrentPosition(geolocationOnSuccess, geolocationOnError);
      $( ".username" ).text( localStorage.username + " " + lat);

    }
    else {
      $( ".error" ).text( "Ппопълнете полетата" );
    }
  };
  function geolocationOnSuccess (position) {
    alert("OK");
    alert(position.coords.latitude,position.coords.longitude);
    return position.coords.latitude;
  };
  function geolocationOnError (error) {
    alert("ERROR");
    alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    return error;
  };
});