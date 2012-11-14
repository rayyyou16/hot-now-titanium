// create tab group
//Tabs
app.ui.tabs = Titanium.UI.createTabGroup();
//Loading
app.ui.loading = Titanium.UI.createActivityIndicator({
	message: 'Loading',
	height:50,
	width:10/*,
	  color: '' */
});
app.ui.start = function(){//Create the UI for the App
	
	app.ui.tabs.open();
}

