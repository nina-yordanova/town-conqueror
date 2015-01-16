$(function(){
  $( "#loginBtn" ).bind( "tap", submitLogin );

  function submitLogin( event ){
    localStorage.mail     = $('#mail').val();
    localStorage.username = $('#username').val();
    localStorage.password = $('#password').val();
    $.mobile.changePage("#home");
  }

  $( ".username" ).text( localStorage.username );
});