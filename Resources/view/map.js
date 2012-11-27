app.view.map = {
    window : Titanium.UI.createWindow({//Main "map" Window
        title : 'Map',
        backgroundColor : '#fff'
    }),
    mapView : Titanium.Map.createView({
        //top : 20,
        //height : 300,
        userLocation : true,
        mapType : Titanium.Map.STANDARD_TYPE,
        /*location : {
         latitude : 39.402738,
         longitude : -0.403518,
         latitudeDelta : 0.5,
         longitudeDelta : 0.5
         },*/
        animate : true,
        regionFit : true,
        userLocation : true
    }),
    sateliteSwitch : Ti.UI.createSwitch({
        right: 20,
        top: 20,
        value : false,
        //title: 'Satelite view'
        titleOn : 'Satelite view',
        titleOff : 'Satelite view',
        width: 100
        
    }),
    centerLocationButton: Ti.UI.createButton({
       right: 20,
       top: 80,
       textAlign: 'center',
       title: 'My location',
       width: 100 
    }),
    start : function() {
        var tab = Titanium.UI.createTab({
            icon : 'img/map.png',
            //title : 'Map',
            window : app.view.map.window
        });

        app.view.map.window.add(app.view.map.mapView);
        //app.view.map.mapView.add(app.view.map.sateliteSwitch);
        //Map controlls
        app.view.map.window.add(app.view.map.sateliteSwitch);
        app.view.map.window.add(app.view.map.centerLocationButton);
        app.ui.tabs.addTab(tab);
    }
}

app.view.map.start();
