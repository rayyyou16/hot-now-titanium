//App Service Handler
app.core.service = {

    URL : 'service.js',
    //Start's the service instance (only if it's not started)
    start : function() {
        //alert('start service');
        //If service is not running
        if (!Ti.Android.isServiceRunning(Ti.Android.createServiceIntent({url : app.core.service.URL}))) {
            //alert('service is not running');
            var intent = Ti.Android.createServiceIntent({
                url : app.core.service.URL
            });
            intent.putExtra('interval', app.core.updateEventsInterval);
            //intent.putExtra('message', 'Hi from started service');
            Ti.Android.startService(intent);
            //Service custom event
            Ti.App.addEventListener('serviceFired', function(data) {
                //alert('serviceFired');
                //If the app is active or is in background
                app.core.updateEvents('top');
                /*if(!app.core.appDestroyed){
                    app.core.updateEvents('top');  
                }else{//if app is destroyed
                    //ONLY SHOW statusbarnotification if have new events
                }*/
                //
                //app.core.statusbarNotification.add('Servicio', closed, closed);
                //alert('Service says: "' + data.message + '"');
                //addMsg('Service says: "' + data.message + '"');
            });
        } else {
            //alert('service is running');
        }

    }
}

setTimeout(function(){
    //app.core.service.start();    
},6000)

