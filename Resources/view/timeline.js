//alert('timeline');

app.view.timeline = {

	window : Titanium.UI.createWindow({
		title : 'Tab 1',
		backgroundColor : '#fff'
	}),
	tableView : Ti.UI.createTableView(),
	start : function() {

		//alert('timeline start');

		var tab1 = Titanium.UI.createTab({
			icon : 'KS_nav_views.png',
			title : 'Timeline',
			window : app.view.timeline.window
			//badge: '5'
		});
        
        //tab1.setBadge(1);
		/*var label1 = Titanium.UI.createLabel({
			color : '#999',
			//text:'Timeline',
			font : {
				fontSize : 20,
				fontFamily : 'Helvetica Neue'
			},
			textAlign : 'center',
			width : 'auto'
		});

		app.view.timeline.window.add(label1);*/

		app.ui.tabs.addTab(tab1);
		//Adding table (first time)
        app.view.timeline.window.add(app.view.timeline.tableView);
	}
}

app.view.timeline.start();
