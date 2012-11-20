//Testing geolocation

/*Titanium.Geolocation.getCurrentPosition(function(e) {
if (!e.success || e.error) {
// manage the error
alert('geolocation error');
return;
}

var longitude = e.coords.longitude;
var latitude = e.coords.latitude;
alert('longitude: ' + longitude + ' latitude: ' + latitude );
//var accuracy = e.coords.accuracy;

});*/
//Load events first time

app.view.timeline.tableView.addEventListener('click', function(e) {//Click in row of timeline -> tableView
    var evento = e.rowData;
    evento.index = e.index;
    
    if(!evento.loadMore){//If its a row
        app.controller.eventDetail.loadEvent(evento);    
    }else{//If is load more Button
        app.ui.loading.show();
        app.core.updateEvents('bottom');
        //D
        app.view.timeline.tableView.deleteRow(e.index);
        //e.row.remove();
        //evento.remove();
        //e.source.remove();
        //app.view.timeline.tableView.deleteRow(1);
        //app.view.timeline.tableView.deleteRow(2);
        //app.view.timeline.tableView.deleteRow(3);
    }
    
    //console.log(this);
});
/*Titanium.Geolocation.addEventListener('location', function(e) {//Fires when the user position changes more than distanceFilter
if (e.error) {
// manage the error
return;
}

var longitude = e.coords.longitude;
var latitude = e.coords.latitude;
var altitude = e.coords.altitude;
var heading = e.coords.heading;
var accuracy = e.coords.accuracy;
var speed = e.coords.speed;
var timestamp = e.coords.timestamp;
var altitudeAccuracy = e.coords.altitudeAccuracy;

// again we use the gathered data
});*/
//Load events

/*
 function twitterCallback(){
 alert('onload');
 //Titanium.API.info('API.INFO');
 //Ti.API.info(' text ' + this.responseText);
 var data = this.responseText;
 var jdata = JSON.parse(data);
 Ti.API.info(jdata);
 var results = jdata.results,
 rows = new Array();

 for(var i = 0, len = results.length; i < len; i++){
 rows.push({
 leftImage: 'http://api.twitter.com/1/users/profile_image/' + results[i].from_user + '.json',
 title: results[i].text
 });
 //Ti.API.info(results[i].text);
 }
 //var response = json_encode(this.responseText);
 //
 var table = Ti.UI.createTableView({
 data: rows
 });

 app.view.timeline.window.add(table);
 }*/
