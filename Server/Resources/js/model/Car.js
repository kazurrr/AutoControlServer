if (!autoControl.car)
    autoControl.car = {};

autoControl.car = {
    initModule: function () {
        console.log(this);
    },

    newCar: function (car) {
        var newMarker = new google.maps.Marker({
            position: {lat: car.Lat, lng: car.Lon},
            // animation: google.maps.Animation.DROP,
            map: autoControl.map.services.map,
            CarId: car.CarId,
            carInfo: car,
            icon: autoControl.map.data.markerImage
        });

        google.maps.event.addListener(newMarker, 'click', function () {
            autoControl.map.services.infoWindow.setContent(autoControl.car.renderInfoContent(this));
            autoControl.map.services.infoWindow.open(
                autoControl.map.services.map,
                newMarker
            );
        });

        return newMarker;
    },

    renderInfoContent: function (car) {
        return '' +
            '<div id="content">' +
            '   <div id="siteNotice">' +
            '   </div>' +
            '   <h6 id="firstHeading" class="firstHeading">' +
                    car.carInfo.Brand + ' ' + car.carInfo.Model + ' ' + car.carInfo.VIN +
            '   </h6>' +
            '   <div id="bodyContent">' +
            '       <p>Prędkość: ' + car.carInfo.Speed + 'km/h</p>' +
            '       <p>Obroty: ' + car.carInfo.Rpm + 'rpm</p>' +
            '       <p>Obciążenie silnika: ' + car.carInfo.EngineLoad + '%</p>' +
            '       <p><a onclick="autoControl.modalWindow.event.openModalWithCarErrors(' + car.carInfo.CarId + ')">Błędy pojazdu</a></p>' +
            '   </div>' +
            '</div>';
    }
};