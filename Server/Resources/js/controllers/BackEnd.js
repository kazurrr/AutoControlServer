if (!autoControl.backEnd)
    autoControl.backEnd = {};

autoControl.backEnd = {

    url: {
        allCars: function () {
            if (autoControl.settings.jqueryMap.randomPosition[0].checked)
                return '/Resources/js/testResponses/allCars.json';
            else
                return 'http://91.232.102.190:8080/api/cars/getall';
        },
        errorForCarId: function (carId) {
            if (autoControl.settings.jqueryMap.randomPosition[0].checked)
                return '/Resources/js/testResponses/allErrors.json';
            else
                return 'http://91.232.102.190:8080//api/errors/get/id/' + carId;
        },
        lastCarsDetails: function () {
            if (autoControl.settings.jqueryMap.randomPosition[0].checked)
                return '/Resources/js/testResponses/allDetails.json';
            else
                return 'http://91.232.102.190:8080/api/details/getlastdetailforeachcar';
        }
    },

    event: {
        connectToBackEnd: function () {
            $.ajax({
                url: autoControl.backEnd.url.allCars(),
                type: "HEAD",
                timeout: 1000,
                statusCode: {
                    200: function (response) {
                        autoControl.carsUpdate.event.getData();
                    },
                    400: function (response) {
                        autoControl.app.event.showToast('Brak łączności z serwerem<br>Mock mode ON');
                        autoControl.settings.jqueryMap.randomPosition.prop('checked', true);
                    },
                    0: function (response) {
                        autoControl.app.event.showToast('Brak łączności z serwerem<br>Mock mode ON');
                        autoControl.settings.jqueryMap.randomPosition.prop('checked', true);
                    }
                }
            });
        }
    },
    get: {
        errorsForCar: function (carId) {
            return $.getJSON(autoControl.backEnd.url.errorForCarId(carId));
        }
    }
};
