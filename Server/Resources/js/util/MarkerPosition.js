function MoveMarker(marker, newPosition) {
    var delayValue = 5;
    var delayNumber = 50;
    var iterCounter = 0;
    var deltaLat = null;
    var deltaLng = null;

    function moveMarkerStep() {
        var latlng = new google.maps.LatLng(marker.getPosition().lat() - deltaLat,
            marker.getPosition().lng() - deltaLng);
        marker.setPosition(latlng);

        if (iterCounter != delayNumber) {
            iterCounter++;
            setTimeout(moveMarkerStep, delayValue);
        }
    }

    var currentPosition = marker.getPosition();

    iterCounter = 0;
    deltaLat = (currentPosition.lat() - newPosition.lat()) / delayNumber;
    deltaLng = (currentPosition.lng() - newPosition.lng()) / delayNumber;

    moveMarkerStep();
}