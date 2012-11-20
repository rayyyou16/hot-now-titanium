app.view.map = {
	window : Titanium.UI.createWindow({//Main "map" Window
		title : 'Map',
		backgroundColor : '#fff'
	}),
	mapView : Titanium.Map.createView({
		//top : 20,
		//height : 300,
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
	start : function() {
		var tab = Titanium.UI.createTab({
			icon : 'img/map.png',
			title : 'Map',
			window : app.view.map.window
		});
		
		app.view.map.window.add(app.view.map.mapView);
		app.ui.tabs.addTab(tab);
	}
}

app.view.map.start();
