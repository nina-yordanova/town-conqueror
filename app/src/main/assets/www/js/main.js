$(function(){
  var map;
  var infowindow;
  var markerImage = 'img/icon.png';
  var centerImage = 'img/centerIcon.png';
  localStorage.username = "";
  localStorage.tripName = localStorage.tripName || "";
  $( "#loginBtn" ).bind( "tap", submitLogin );
  $( "input[name='location']" ).bind( "change", useLocation );
  if($("input[name='location']" ).val() == "currentLocation") {
    $(".selectedLocation").addClass('ui-state-disabled');
  }
  $( ".coordinates" ).text ("("+localStorage.latitude +" , "+localStorage.longitude+")");
  $( "#nextStep" ).bind( "tap", secondStep );saveTrip
  $( "#saveTrip" ).bind( "tap", saveTrip );

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
    $( ".tripTitle" ).text (localStorage.tripName);
    $.mobile.changePage("#secondStep");
  };
  var categories = "[";
  function saveTrip() {
    categories +=  $( ".categoryCheckbox:checked" )
                  .map(function() {
                    return "'" + this.id + "'";
                  }).get().join();
    categories += "]";
    localStorage.categories =  categories;
    //alert(localStorage.categories);
    $.mobile.changePage("#makeTrip");
  }

  function initialize() {

    var center = new google.maps.LatLng(localStorage.latitude,localStorage.longitude);
    var mapProp = {
      center:center,
      zoom:12,
      panControl: false,
      zoomControl: true,
      scaleControl: true,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    var centerMarker = new google.maps.Marker({
          position: center,
          map: map,
          icon:centerImage
      });

    var request = {
      location: center,
      radius: 3000,
      types: ['museum','park']
    };
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: markerImage
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }
  google.maps.event.addDomListener(window, 'load', initialize);

});