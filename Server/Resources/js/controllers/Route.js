if (!autoControl.route)
    autoControl.route = {};

autoControl.route = {
    jqueryMap: {
        mainWrapper: null,
        routeTextWrapper: null,
        fromWrapper: null,
        toWrapper: null,
        searchButton: null,
        clearButon: null
    },

    dictionary: {
        originLabel: 'from',
        originDescription: 'Początek trasy',

        destinationLabel: 'to',
        destinationDescription: 'Miejsce docelowe'
    },

    state: {
        formTypes: {
            marker: 0,
            search: 1,
            map: 2
        }
    },

    event: {
        initModule: function (divID) {
            autoControl.route.jqueryMap.mainWrapper = $('#' + divID);

            autoControl.map.services.directionsService = new google.maps.DirectionsService();
            autoControl.map.services.directionDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

        },

        renderModule: function () {
            autoControl.route.jqueryMap.mainWrapper.html(autoControl.route.event.renderHTML());
            $('select').material_select();

            autoControl.route.jqueryMap.fromWrapper = $('#route-from-input-wrapper');
            autoControl.route.jqueryMap.toWrapper = $('#route-to-input-wrapper');
            autoControl.route.jqueryMap.searchButton = $('#route-search-button-start');
            autoControl.route.jqueryMap.clearButon = $('#route-clear-button');
            autoControl.route.jqueryMap.routeTextWrapper = $('#route-direction-text');

            autoControl.map.services.directionDisplay.setPanel(document.getElementById('route-direction-text'));

            autoControl.route.event.bindEvents();
        },

        renderHTML: function () {
            return '' +
                '<div class="route-from-wrapper">' +
                '   <input name="route-from-marker-type" checked type="radio" id="route-from-marker"/>' +
                '   <label for="route-from-marker">Marker</label>' +

                '   <input name="route-from-marker-type" type="radio" id="route-from-search"/>' +
                '   <label for="route-from-search">Adres</label>' +

                '   <input name="route-from-marker-type" type="radio" id="route-from-mapclick" disabled/>' +
                '   <label for="route-from-mapclick">Mapa</label>' +

                '   <div id="route-from-input-wrapper" class="route-input-wrapper input-field col s12">' +
                autoControl.route.render.marker(autoControl.route.dictionary.originLabel,
                    autoControl.route.dictionary.originDescription) +
                '   </div>' +

                '</div>' +

                '<div class="route-to-wrapper">' +
                '   <input name="route-to-marker-type" checked type="radio" id="route-to-marker"/>' +
                '   <label for="route-to-marker">Marker</label>' +

                '   <input name="route-to-marker-type" type="radio" id="route-to-search"/>' +
                '   <label for="route-to-search">Adres</label>' +

                '   <input name="route-to-marker-type" type="radio" id="route-to-mapclick" disabled/>' +
                '   <label for="route-to-mapclick">Mapa</label>' +

                '   <div id="route-to-input-wrapper" class="route-input-wrapper input-field col s12">' +
                autoControl.route.render.marker(autoControl.route.dictionary.destinationLabel,
                    autoControl.route.dictionary.destinationDescription) +
                '   </div>' +

                '</div>' +
                '<div class="right-align">' +
                '   <button id="route-search-button-start" class="waves-effect waves-light btn small">Wyszukaj trasę</button>' +
                '   <button id="route-clear-button" class="waves-effect waves-light btn small">Wyczyść trasę</button>' +
                '</div>' +

                '<div id="route-direction-text">' +

                '</div>';
        },

        bindEvents: function () {
            $("input[name=route-from-marker-type]:radio").change(autoControl.route.event.changeSearchType);
            $("input[name=route-to-marker-type]:radio").change(autoControl.route.event.changeSearchType);

            autoControl.route.jqueryMap.searchButton.click(autoControl.route.event.getDirection);
            autoControl.route.jqueryMap.clearButon.click(autoControl.route.event.clearDirection);
        },

        changeSearchType: function (data) {
            var positionLabel;
            var positionDescription;
            var wrapper;

            console.log(data.currentTarget.id);

            if (data.currentTarget.id.includes(autoControl.route.dictionary.destinationLabel)) {
                positionLabel = autoControl.route.dictionary.destinationLabel;
                positionDescription = autoControl.route.dictionary.destinationDescription;
                wrapper = autoControl.route.jqueryMap.toWrapper[0];
            } else {
                positionLabel = autoControl.route.dictionary.originLabel;
                positionDescription = autoControl.route.dictionary.originDescription;
                wrapper = autoControl.route.jqueryMap.fromWrapper[0];
            }

            if (data.currentTarget.id.includes('marker')) {
                wrapper.innerHTML = autoControl.route.render.marker(positionLabel, positionDescription);
                $('#route-' + positionLabel + '-input').material_select();
            } else if (data.currentTarget.id.includes('search')) {
                wrapper.innerHTML = autoControl.route.render.search(positionLabel, positionDescription);
            } else {
                wrapper.innerHTML = autoControl.route.render.mapClick(positionLabel, positionDescription);
            }
        },

        getDirection: function () {
            var from = autoControl.route.event.getLatLon(autoControl.route.dictionary.originLabel);
            var to = autoControl.route.event.getLatLon(autoControl.route.dictionary.destinationLabel);

            if (from == null || to == null) {
                autoControl.app.event.showToast('Podaj wszystkie punkty trasy');
                return;
            }

            console.log(from);
            console.log(to);

            autoControl.map.services.directionDisplay.setMap(autoControl.map.services.map);

            autoControl.map.services.directionsService.route({
                    origin: from,
                    destination: to,
                    travelMode: 'DRIVING'
                },
                function (response, status) {
                    if (status === 'OK') {
                        autoControl.map.services.directionDisplay.setDirections(response);
                    } else {
                        console.log('Directions request failed due to ' + status);
                    }
                });
        },

        clearDirection: function () {
            autoControl.map.services.directionDisplay.setMap(null);
            autoControl.route.jqueryMap.routeTextWrapper.html('');
        },

        getLatLon: function (position) {
            var currentType = $('input[name=route-' + position + '-marker-type]:checked');
            var inputValue = $('#route-' + position + '-input').val();

            if (currentType.attr('id').includes('marker')) {
                if (inputValue == null)
                    return null;

                return autoControl.map.carsQuery.getMarkerByCarId(inputValue).getPosition();
            } else if (currentType.attr('id').includes('search')) {
                //ToDo address validation
                if (inputValue == '')
                    return null;

                return inputValue
            } else {
                console.log(3);
            }
        }
    },

    render: {
        marker: function (place, label) {
            var allCars = autoControl.map.cars;

            var toReturn = '<select id="route-' + place + '-input">' +
                '   <option value="" disabled selected>' + label + '</option>';

            for (var i = 0; i < allCars.length; i++) {
                var detail = allCars[i].carInfo;

                toReturn += '<option value="' + detail.CarId + '">' +
                    detail.Brand + ' ' + detail.Model + ' - ' + detail.VIN +
                    '</option>';
            }

            toReturn += '</select>';

            return toReturn;
        },

        search: function (place, label) {
            return '<div class="input-field">' +
                '   <input id="route-' + place + '-input" type="text" class="validate">' +
                '   <label for="route-' + place + '-input">' + label + '</label>' +
                '</div>';
        },

        mapClick: function (place, label) {
            return 'Map Click';

        },
    }
};