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

app.core.getCurrentPosition(function(e) {

	var latitude = e.coords.latitude;
	var longitude = e.coords.longitude;

	//alert('longitude: ' + longitude + ' latitude: ' + latitude );
	var url = 'http://www.hotnowapp.com/api/v1/q.php?action=find&radius=12000000&lat=' + latitude + '&lng=' + longitude + '&qtyPag=50&callback';
	//lat=39.402738&lng=-0.403518

	app.core.ajax('GET', url, undefined, function(data) {//Success
		//alert('success');
		//console.log(this.responseText);//.responseText
		//Hide load
		//app.ui.loading.hide();

		//var data = this.responseText.substring(1);//Remove first (
		//data = data.substring(0, data.length - 1);//Remove last )
		//data = JSON.parse(data);
		//console.log(data.values);

		var values = data.values, rows = new Array(), evento;

		for (var i = 0, len = values.length; i < len; i++) {
			evento = values[i];
			rows.push({
				leftImage : evento.image.s[1],
				imageBig : evento.image.sb[0],
				title : evento.title,
				direction : evento.direction,
				//hasChild: true,
				className : 'Pic'
			});
			//Ti.API.info(results[i].text);
		}
		/*var table = Ti.UI.createTableView({
		 data : rows
		 });*/
		app.view.timeline.tableView.setData(rows);

		app.view.timeline.window.add(app.view.timeline.tableView);

		app.view.timeline.tableView.addEventListener('click', function(e) {
			var evento = e.rowData,
			win = Titanium.UI.createWindow({//Event detaill window
				//url: e.rowData.test,
				title : evento.title,
				backgroundColor : '#fff',
				layout:'vertical' 
			}),
			 scrollView = Titanium.UI.createScrollView({//Scroll
				contentHeight : 'auto',
				layout:'vertical'
			}), 
			tab = app.ui.tabs.activeTab, //Titanium.UI.currentTab;
			eventPicture = Ti.UI.createImageView({//Picture
				image : evento.imageBig,
				top : 20,
				width : '90%'
			}),
			labelDirection = Titanium.UI.createLabel({//Direction
				top: 20,
				color:'#000',
				text: evento.direction.complete,
				font:{fontSize:20,fontFamily:'Helvetica Neue'},
				textAlign:'center',
				width:'auto'
			});

			//Añadir imagen
			scrollView.add(eventPicture);
			//Añadir direction
			scrollView.add(labelDirection);
			//Añadir comentarios
			//Adding scroll
			win.add(scrollView);
			tab.open(win, {
				animated : true
			});
			//console.log(this);
		});

	});
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
