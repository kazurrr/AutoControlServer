if (!autoControl.map)
    autoControl.map = {};

autoControl.map = {
    jsMap: {
        map: document.getElementById('map')
    },

    jqueryMap: {
        mapWrapper: $('#map-wrapper'),
        map: $('#map')
    },

    services: {
        directionsService: null,
        directionDisplay: null,
        traffic: null,
        map: null,
        infoWindow: null
    },

    data: {
        markerImage: 'Resources/img/car.png'
    },

    cars: [],

    carsQuery: {
        getMarkerByCarId: function (carId) {
            for (var i = 0; i < autoControl.map.cars.length; i++) {
                if (autoControl.map.cars[i].CarId == carId) {
                    return autoControl.map.cars[i];
                }
            }

            return null;
        },

        getCarInfoByCarId: function (carId) {
            var car = autoControl.map.carsQuery.getMarkerByCarId(carId);
            if (car == null)
                return null;

            return car.carInfo;
        }
    },

    event: {
        initModule: function () {
            autoControl.map.services.traffic = new google.maps.TrafficLayer();

            autoControl.map.services.map = new google.maps.Map(autoControl.map.jsMap.map, {
                center: {lat: 54.519817, lng: 18.529571},
                zoom: 10,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.RIGHT_TOP
                }
            });

            if (!autoControl.settings.state.initialized) {
                setTimeout(function () {
                    autoControl.carsUpdate.event.initModule();
                    autoControl.map.services.infoWindow = new google.maps.InfoWindow();
                }, 3000);
            }

        },

        updateCars: function (cars) {
            for (var i = 0; i < cars.length; i++) {
                var randomPosition = autoControl.settings.jqueryMap.randomPosition[0].checked;

                var marker = autoControl.map.carsQuery.getMarkerByCarId(cars[i].CarId);
                var p = marker.getPosition();
                var newLatLon = new google.maps.LatLng({lat: cars[i].Lat, lng: cars[i].Lon});

                if (randomPosition) {
                    var max = 10;
                    var latChange = Math.floor((Math.random() * max) + 1 - max / 2) / 1000;
                    var lngChange = Math.floor((Math.random() * max) + 1 - max / 2) / 1000;

                    newLatLon = new google.maps.LatLng({lat: p.lat() - latChange, lng: p.lng() - lngChange});
                }

                MoveMarker(marker, newLatLon);
            }
        },

        clearCarsAndAddNew: function (data) {
            if (data == null)
                return;

            autoControl.map.event.removeCars();
            autoControl.map.event.renderCars(data);
            autoControl.carsInfo.event.render(data);
        },

        zoomMapToFitAllCars: function () {
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < autoControl.map.cars.length; i++) {
                bounds.extend(autoControl.map.cars[i].getPosition());
            }
            autoControl.map.services.map.fitBounds(bounds);
        },

        removeCars: function () {
            for (var i = 0; i < autoControl.map.cars.length; i++) {
                autoControl.map.cars[i].setMap(null);
            }

            autoControl.map.cars = [];
        },

        renderCars: function (cars) {
            for (var i = 0; i < cars.length; i++) {
                autoControl.map.cars.push(autoControl.car.newCar(cars[i]));
            }
        },

        centerOnMarker: function (carId) {
            var marker = autoControl.map.carsQuery.getMarkerByCarId(carId);

            if (marker == null)
                return;

            var latLon = marker.getPosition();
            autoControl.map.services.map.panTo(latLon);

            autoControl.map.services.infoWindow.setContent(autoControl.car.renderInfoContent(marker));
            autoControl.map.services.infoWindow.open(
                autoControl.map.services.map,
                marker
            );
        },

        toogleTrafficLayer: function (turnOnTraffic) {
            if (turnOnTraffic) {
                autoControl.map.services.traffic.setMap(autoControl.map.services.map);
            } else {
                autoControl.map.services.traffic.setMap(null);
            }
        }
    }
};

