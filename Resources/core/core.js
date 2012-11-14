//FORMS
//var forms = require('forms');
//Geolocation config
/*
 * if (Titanium.Geolocation.locationServicesEnabled === false){
 alert('location disabled')
 }
 */
Ti.Geolocation.preferredProvider = "gps";
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
// set the granularity of the location event
Titanium.Geolocation.distanceFilter = 10;

app.core.ajax = function(method, url, params, successCallback, errorCallback) {
	//Show loading
	//setTimeout(function(){
	app.ui.loading.show();
	//Titanium.UI.currentWindow.add(app.ui.loading);
	//app.view.timeline.window.add(app.ui.loading);
	app.ui.tabs.add(app.ui.loading);
	//},100);

	//Init AJAX
	var xhr = Ti.Network.createHTTPClient();

	xhr.open(method, url);//+ '&callback'
	//Se añade &callback para evitar que devuelva una cadena en el response de JSONP
	//xhr.setRequestHeader('Content-Type', 'application/json');

	if (params) {//Simplificar solo con xhr.send(); 
		params.callback = '';
		xhr.send(params);
	} else {
		xhr.send();
	}
	
	//xhr.setTimeout(20000);
	xhr.onload = function(data){//Success callback
		app.ui.loading.hide();
	
		var data = this.responseText.substring(1);//Remove first (
		data = data.substring(0, data.length - 1);//Remove last )
		data = JSON.parse(data);
		//Call callback
		successCallback(data);
	}
	xhr.onerror = errorCallback ||
	function() {//Default errorCallback
		app.ui.loading.hide();
		alert('AJAX ERROR');
	};

	/*xhr.onload = function(){
	 alert('onload');
	 var data = this.responseText;
	 Ti.API.info(data);
	 eval(this.responseText);
	 //var jdata = JSON.parse(data);
	 //Ti.API.info(jdata);
	 };*/

}
app.core.getCurrentPosition = function(callback) {
	Titanium.Geolocation.getCurrentPosition(function(e) {
		if (!e.success || e.error) {
			// manage the error
			alert('geolocation error');
			return;
		}
		callback(e);

		//var accuracy = e.coords.accuracy;

	});
}
/*
 * Geolocation reverse --> Obtiene el nombre a traves de las coordenadas
 *Titanium.Geolocation.reverseGeocoder(latitude,longitude,function(evt){
 if (evt.success) {
 var places = evt.places,
 text;
 if (places && places.length) {
 text = places[0].address;
 } else {
 text = "No address found";
 }
 alert(text);
 //Ti.API.debug("reverse geolocation result = "+JSON.stringify(evt));
 }else {
 Ti.UI.createAlertDialog({
 title:'Reverse geo error',
 message:evt.error
 }).show();
 //Ti.API.info("Code translation: "+translateErrorCode(e.code));
 }
 });
 */

