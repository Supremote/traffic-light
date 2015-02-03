var socket = io("https://www.supremote.com");


function turnOffAllLights() {
   $('#red').removeClass('on');
   $('#yellow').removeClass('on');
   $('#green').removeClass('on');

   $('#red').addClass('off');
   $('#yellow').addClass('off');
   $('#green').addClass('off');
}

function turnOnLight(lightName) {
    var lightId = '#' + lightName;
    turnOffAllLights();
    $(lightId).removeClass('off');
    $(lightId).addClass('on');
}