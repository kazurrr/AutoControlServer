if (!autoControl.carsInfo)
    autoControl.carsInfo = {};

autoControl.carsInfo = {
    jqueryMap: {
        mainWrapper: null
    },

    event: {
        initModule: function (divID) {
            autoControl.carsInfo.jqueryMap.mainWrapper = $('#' + divID);
        },

        render: function (data) {
            var html = '<ul class="collection">';

            for (var i = 0; i < data.length; i++) {
                html += '<li class="collection-item">' +
                    data[i].Brand + ' ' + data[i].Model + ' - ' + data[i].VIN +

                    '<a class="secondary-content tooltipped" data-position="top" data-delay="50" data-tooltip="Pokaż na mapie"' +
                    '   onclick="autoControl.map.event.centerOnMarker(' + data[i].CarId + ')">' +
                    '   <i class="material-icons">my_location</i>' +
                    '</a>' +

                    '<a class="secondary-content tooltipped" data-position="top" data-delay="50" data-tooltip="Błędy pojazdu"' +
                    '   onclick="autoControl.modalWindow.event.openModalWithCarErrors(' + data[i].CarId + ')">' +
                    '   <i class="material-icons">error</i>' +
                    '</a>';
            }

            html += '</ul>';

            autoControl.carsInfo.jqueryMap.mainWrapper.html(html);
            $('.tooltipped').tooltip({delay: 50});
        }
    }
};
