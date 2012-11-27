//Handler events of App
app.core.events = {
    
    //When user closes the app
    appStart: function(){
        app.core.appDestroyed = false;
        //app.core.statusbarNotification.add('Servicio', 'appStart', 'appStart');
    },
    appResume : function() {
        app.core.appDestroyed = false;
        //app.core.statusbarNotification.add('Servicio', 'appResume', 'appResume');
    },
    appDestroy: function(){
        app.core.appDestroyed = true;
        //app.core.statusbarNotification.add('Servicio', 'appDestroy', 'appDestroy');
    },
    appStop: function(){
        app.core.appClosed = true;
        app.core.statusbarNotification.add('Servicio', 'appStop', 'appStop');
    },
    appPause : function() {
        app.core.appClosed = true;
        app.core.statusbarNotification.add('Servicio', 'appPause', 'appPause');
    },
    //Starts app.core.events
    start : function() {
        //Only 4 IOs
        //Ti.App.addEventListener('pause',app.core.events.appPause);
        //Ti.App.addEventListener('resume',app.core.events.appResume);

        var activity = Ti.Android.currentActivity;
        /*['create', 'destroy', 'pause', 'resume', 'start', 'stop'].forEach(function(e) {
            activity.addEventListener(e, function() {
                alert((new Date()) + " Activity: " + e + " HIT!");
            });
        });*/
        //activity.addEventListener('stop',app.core.events.appStop);
        activity.addEventListener('destroy',app.core.events.appDestroy);
        //activity.addEventListener('pause',app.core.events.appPause);
        activity.addEventListener('start',app.core.events.appStart);
        activity.addEventListener('resume',app.core.events.appResume);
        //activity.addEventListener('destroy',app.core.events.appClose);
        //activity.addEventListener('resume',app.core.events.appResume);

    }
}

app.core.events.start();
