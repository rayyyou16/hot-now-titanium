app.controller.configurationWindow = {

    radiusString : '',
    rangeValues : new Array('10m', '100m', '500m', '1Km', '5Km', '10Km', '50Km', '100Km', '300Km', '1000Km', '12000Km'),
    activate : function() {//Show Configuration window
        //alert('activate');
        app.ui.tabs.activeTab.open(app.view.configurationWindow.window, {
            animated : true
        });

    },
    sliderChangeHandler : function(e) {
        var range = Math.round(e.value);
        app.controller.configurationWindow.radiusString = app.controller.configurationWindow.rangeValues[range];
        app.view.configurationWindow.sliderValueLabel.text = 'Search radius: ' + app.controller.configurationWindow.radiusString;
        //String.format("%3.1f", e.value)

    },
    saveConfigChanges : function() {
        //Set radius config search
        var radius = app.controller.configurationWindow.radiusString;
        if (radius.indexOf('Km') != -1) {
            app.core.searchRadius = parseInt(radius) * 1000;
        } else {
            app.core.searchRadius = parseInt(radius);
        }

        Ti.UI.createAlertDialog({
            title : 'Configuration changed'
        }).show();
        //alert(app.core.searchRadius);
        app.ui.loading.show();
        //Reloading events with the new configuration
        app.core.resetEvents();
        app.core.updateEvents('bottom');
    }
}
//Handlers
app.view.configurationWindow.radioSlider.addEventListener('change', app.controller.configurationWindow.sliderChangeHandler);
app.view.configurationWindow.saveChangesButton.addEventListener('click', app.controller.configurationWindow.saveConfigChanges);
//app.ui.androidMenu.configurationItem.addEventListener("click", app.controller.configurationWindow.activate); 