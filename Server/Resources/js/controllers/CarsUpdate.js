if (!autoControl.carsUpdate)
    autoControl.carsUpdate = {};

autoControl.carsUpdate = {
    data: [],

    state: {
        refreshInterval: 5000,
        autoRefresh: true,
        timeoutObj: 0
    },

    event: {

        initModule: function () {
            autoControl.carsUpdate.event.getData();
            autoControl.carsUpdate.event.toogleAutoRefresh(true);
        },

        toogleAutoRefresh: function (turnOn) {
            if (turnOn) {
                autoControl.carsUpdate.state.timeoutObj = setTimeout(autoControl.carsUpdate.event.updateDataWithLoop,
                    autoControl.carsUpdate.state.refreshInterval);
                autoControl.carsUpdate.state.autoRefresh = true;
            } else {
                clearTimeout(autoControl.carsUpdate.state.timeoutObj);
                autoControl.carsUpdate.state.autoRefresh = false;
            }
        },

        updateDataWithLoop: function () {
            $.when($.getJSON(autoControl.backEnd.url.allCars()), $.getJSON(autoControl.backEnd.url.lastCarsDetails()))
                .done(function (infoData, data) {
                    autoControl.carsUpdate.data = data[0];
                    autoControl.carsUpdate.event.setAdditionalCarInfo(infoData[0]);

                    autoControl.map.event.updateCars(autoControl.carsUpdate.data);

                    autoControl.carsUpdate.state.timeoutObj = setTimeout(autoControl.carsUpdate.event.updateDataWithLoop,
                        autoControl.carsUpdate.state.refreshInterval);
                });
        },

        getData: function () {
            $.getJSON(autoControl.backEnd.url.allCars(), function (infoData) {
                $.getJSON(autoControl.backEnd.url.lastCarsDetails(), function (data) {
                    autoControl.carsUpdate.data = data;
                    autoControl.carsUpdate.event.setAdditionalCarInfo(infoData);
                    autoControl.map.event.clearCarsAndAddNew(autoControl.carsUpdate.data);
                    autoControl.map.event.zoomMapToFitAllCars();

                    autoControl.route.event.renderModule();
                });
            });
        },

        setAdditionalCarInfo: function (carInfo) {
            for (var i = 0; i < autoControl.carsUpdate.data.length; i++) {
                var info = autoControl.carsUpdate.event.getSpecifiedCarInfo(autoControl.carsUpdate.data[i].CarId, carInfo);

                if (info != null) {
                    autoControl.carsUpdate.data[i].VIN = info.VIN;
                    autoControl.carsUpdate.data[i].Brand = info.Brand;
                    autoControl.carsUpdate.data[i].Model = info.Model;
                }
            }
        },

        getSpecifiedCarInfo: function (id, carSet) {
            for (var i = 0; i < carSet.length; i++) {
                if (carSet[i].CarId == id)
                    return carSet[i];
            }

            return null;
        }
    }
};
