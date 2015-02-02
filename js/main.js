 var socket = io("https://www.supremote.com");
//var socket = io("http://localhost:9111");
var autoMode = false;

socket.on('connect', function(data) {
    // Once we're connected to supremote, request to join our remote's room.
    // Make sure the remote's development mode is enabled for this tutorial!
    socket.emit('join', 'traffic-light');
});

socket.on('join', function(data) {
    // If we could connect to our remote's room, this event is fired.
    // The <data> argument contains our remote's latest state.
    console.log(data);
    autoMode = data.autoMode;
    updateState();
});

socket.on('status', function(data) {
	// This event fires whenever the server needs to tell us something about this connection. It is important to listen on this event at least to ease debugging.
	console.log(data);
});

socket.on('update', function(data) {
    // This event gets fired every time we update a value on the remote.
    // It does not get fired when actions are triggered.
    autoMode = data.autoMode;
    updateState();
});

/*
 All the fields on the remote of type "action" fire their own events.
 To distinguish them from socket.io and supremote reserved event names, 
 all action event names are prefixed with a hash symbol (#).
*/

/*
 In each of the following listeners, we just call the turnOnLight function
 for the corresponging light.
*/
socket.on("#red", function(data) {
    turnOnLight("red");
});

socket.on("#yellow", function(data) {
    turnOnLight("yellow");
});

socket.on("#green", function(data) {
    turnOnLight("green");
});

// As an example, we bind the #refresh action to a window reload.

socket.on("#refresh", function(data) {
    window.location.reload();
});

function turnOffAllLights() {
	// Sets all the lights to a low opacity.
    
    $('#red').removeClass('on');
    $('#yellow').removeClass('on');
    $('#green').removeClass('on');

    $('#red').addClass('off');
    $('#yellow').addClass('off');
    $('#green').addClass('off');

}

function turnOnLight(lightName) {
	// Will only work if autoMode is disabled.
	if (!autoMode) {
	    var lightId = '#' + lightName;
	    turnOffAllLights();
	    $(lightId).removeClass('off');
	    $(lightId).addClass('on');
	}
}

function updateState() {
    if (autoMode) {
    	$('#autoMode').text("ON");
        
        // If autoMode is true, turn off all the lights and add the css classes necessary for the animation.
        turnOffAllLights();
        $('#red').addClass('red-animation');
        $('#green').addClass('green-animation');
        $('#yellow').addClass('yellow-animation');
    } else {
        $('#autoMode').text("OFF");
        // If autoMode is false, turn off all the lights and remove the css classes necessary for the animation.
        $('#red').removeClass('red-animation');
        $('#green').removeClass('green-animation');
        $('#yellow').removeClass('yellow-animation');
        turnOffAllLights();
    }
}
