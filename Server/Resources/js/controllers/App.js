if (!autoControl.app)
    autoControl.app = {};

autoControl.app = {
    jqueryMap: {
        progressBarIndeterminate: $('#header-progress-indeterminate'),
        progressBarDeterminate: $('#header-progress-determinate'),
        progressBarDeterminate_Bar: $('#header-progress-determinate-bar'),
        navbar: $('#main-navbar'),
        mainWrapper: $('#content-main')
    },

    state: {
        progressBarIndeterminateVisible: false,
        progressBarDeterminateVisible: false
    },

    event: {
        initModule: function () {
            autoControl.app.event.resize();
            $(window).resize(function () {
                autoControl.app.event.resize()
            });

            autoControl.app.event.initGUIModules();
            autoControl.modalWindow.event.initModule();
        },

        resize: function () {
            var navbar_height = autoControl.app.jqueryMap.navbar.height();
            var elementsToChange = document.getElementsByClassName('height-full');

            for (var i = 0; i < elementsToChange.length; i++) {
                if (elementsToChange[i].id == 'content-wrapper')
                    elementsToChange[i].style.maxHeight = window.innerHeight - navbar_height + "px";
                else
                    elementsToChange[i].style.height = window.innerHeight - navbar_height + "px";
            }

            if (autoControl.map) {
                autoControl.map.event.resize();
            }
        },

        initGUIModules: function () {
            autoControl.app.action.initExternalModule("Pojazdy", 'info_outline', autoControl.carsInfo.event.initModule, "car-info");
            autoControl.app.action.initExternalModule("Trasa", 'navigation', autoControl.route.event.initModule, "map-route");
            autoControl.app.action.initExternalModule("Ustawienia", 'settings', autoControl.settings.event.initModule, "settings");
        },

        showToast: function (message) {
            Materialize.toast(message, 4000);
        }
    },

    action: {
        initExternalModule: function (name, icon, initFunction, divID) {
            var html = '<li>' +
                '   <div class="collapsible-header"><i class="material-icons">' + icon + '</i>' + name + '</div>' +
                '   <div id="' + divID + '-wrapper" class="collapsible-body"></div>' +
                '</li>';

            autoControl.app.jqueryMap.mainWrapper.append(html);

            //ToDo add to menu
            initFunction(divID + '-wrapper');
        },

        showProgress: function (percentage) {
            if (typeof percentage !== 'undefined') {
                autoControl.app.jqueryMap.progressBarDeterminate.show();
                autoControl.app.jqueryMap.progressBarDeterminate_Bar.css("width", percentage + "%");
                autoControl.app.state.progressBarDeterminateVisible = true;
            }
        },

        hideProgress: function () {
            autoControl.app.jqueryMap.progressBarDeterminate.hide();
            autoControl.app.state.progressBarDeterminateVisible = false;
        },

        showProgressIndeterminate: function () {
            autoControl.app.jqueryMap.progressBarIndeterminate.show();
            autoControl.app.state.progressBarIndeterminateVisible = true;
        },

        hideProgressIndeterminate: function () {
            autoControl.app.jqueryMap.progressBarIndeterminate.hide();
            autoControl.app.state.progressBarIndeterminateVisible = false;
        }
    }
};
