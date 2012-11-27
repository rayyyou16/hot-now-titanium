//APP estructure
var app = {
    core : {},
    view : {},
    controller : {},
    ui : {}
}

//Includes
Ti.include('core/core.js');
Ti.include('core/events.js');
Ti.include('ui/ui.js');
//Views
Ti.include('view/timeline.js');
Ti.include('view/create.js');
Ti.include('view/map.js');
Ti.include('view/eventDetail.js');
Ti.include('view/configurationWindow.js');
//Init UI
app.ui.start();
//Controllers
Ti.include('controller/timeline.js');
Ti.include('controller/create.js');
Ti.include('controller/map.js');
Ti.include('controller/eventDetail.js');
Ti.include('controller/configurationWindow.js');
//When the nameSpaces are created, ui global events start
app.ui.startEvents();
app.core.start();
Ti.include('core/statusbarNotification.js');
Ti.include('core/service.js');
/*setTimeout(function() {
    alert('start service');
    var intent = Ti.Android.createServiceIntent({
        url : 'service.js'
    });
    intent.putExtra('interval', 5000);
    intent.putExtra('message', 'Hi from started service');
    Ti.Android.startService(intent);
    
    Ti.App.addEventListener('serviceFired', function(data) {
        app.core.statusbarNotification.add('Servio','notification started via service','service preview');
        //alert('Service says: "' + data.message + '"');
        //addMsg('Service says: "' + data.message + '"');
    });
    //alert(app.view.timeline.tableView.data[0]);
    //var row = app.view.timeline.tableView.data[0].rows[0];
    //alert(row.id);
    //app.controller.eventDetail.loadEvent(row);
    //row.fireEvent('click');
    //alert(row.title);

    //alert(rows[0]);
}, 5000);
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

