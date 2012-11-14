//APP estructure
var app = {
  core: {},
  view: {},
  controller: {},
  ui: {}
}

//Includes
Ti.include('core/core.js')
Ti.include('ui/ui.js');
//Views
Ti.include('view/timeline.js');
Ti.include('view/create.js');
Ti.include('view/map.js');
//Init UI
app.ui.start();
//Controllers
Ti.include('controller/timeline.js');
Ti.include('controller/create.js');
Ti.include('controller/map.js');




// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//Titanium.UI.setBackgroundColor('#fff');

//

//
// create base UI tab and root window
//


//
// create controls tab and root window
//
/*var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Create',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);
*/


//
//  add tabs
//

//tabGroup.addTab(tab2);  


// open tab group

