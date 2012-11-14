app.view.create = {
	//UI Public Elements
	window : Titanium.UI.createWindow({//Main "create" Window
		title : 'Tab 1',
		backgroundColor : '#fff'
	}),
	scrollView : Titanium.UI.createScrollView({
		contentHeight : 'auto',
	}),
	titleEventField : Titanium.UI.createTextField({
		//color:'#336699',
		height : 40,
		top : 25,
		left : '5%',
		width : '90%',
		hintText : 'Event Title',
		//textAlign:'center',

		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	}),
	selectPictureButton : Ti.UI.createButton({
		title : 'Select event picture',
		top : 95,
		left : '5%',
		width : '90%'
	}),
	sendEventButton : Ti.UI.createButton({
		title : 'Send Event',
		top : 160,
		left : '5%',
		width : '90%'
	}),
	start : function() {

		var tab = Titanium.UI.createTab({
			icon : 'KS_nav_views.png',
			title : 'Create',
			window : app.view.create.window
		});
		/*var label = Titanium.UI.createLabel({
		color:'#999',
		text:'Create event',
		font:{fontSize:20,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:'auto'
		});

		app.view.create.window.add(label);	*/

		//Adding componentes to the scroll
		app.view.create.scrollView.add(app.view.create.titleEventField);
		app.view.create.scrollView.add(app.view.create.selectPictureButton);
		app.view.create.scrollView.add(app.view.create.sendEventButton);
		//Adding scroll to the window
		app.view.create.window.add(app.view.create.scrollView);

		app.ui.tabs.addTab(tab);
	}
}

app.view.create.start();
