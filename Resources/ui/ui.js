// create tab group
//Tabs
app.ui.tabs = Titanium.UI.createTabGroup();
//UI Global events
app.ui.startEvents = function() {
	//Tabs events
	app.ui.tabs.addEventListener('click', function(e) {//Click in a tab

		var tabTitle = e.source.title;

		if (tabTitle == 'Map') {
			//app.controller.map.paintEvents();
		}
	});
}
//Loading
app.ui.loading = Titanium.UI.createActivityIndicator({
	message : 'Loading',
	height : 50,
	width : 10/*,
	 color: '' */
});
app.ui.start = function() {//Create the UI for the App

	app.ui.tabs.open();
}

