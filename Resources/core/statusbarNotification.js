app.core.statusbarNotification = {
    //The id asociated to notification
    currentId : 1,
    pending: undefined,
    intent : Ti.Android.createIntent({
        action : Ti.Android.ACTION_MAIN,
        className : 'com.appcelerator.hotnow.HotnowActivity',
        //url : 'app.js',
        flags : Ti.Android.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED | Ti.Android.FLAG_ACTIVITY_SINGLE_TOP
    }),
    //Method to add new notification
    add : function(title, text, tickerText) {
        //Clear previous notifications
        Ti.Android.NotificationManager.cancelAll();
        
        var notification = Ti.Android.createNotification({
            contentIntent : app.core.statusbarNotification.pending,
            contentTitle : title,
            contentText : text,
            tickerText : tickerText,
            when : new Date().getTime(),
            icon : Ti.App.Android.R.drawable.appicon,
            flags : Titanium.Android.ACTION_DEFAULT | Titanium.Android.FLAG_AUTO_CANCEL | Titanium.Android.FLAG_SHOW_LIGHTS
        });
        Ti.Android.NotificationManager.notify(app.core.statusbarNotification.currentId, notification);
        //Increase the id
        app.core.statusbarNotification.currentId++;
    },
    //Load the module
    start : function() {
        //setting statusbarNotification properties
        app.core.statusbarNotification.intent.addCategory(Titanium.Android.CATEGORY_LAUNCHER);
        
        app.core.statusbarNotification.pending = Ti.Android.createPendingIntent({
            //activity : app.view.timeline.window.activity,
            activity: Ti.Android.currentActivity,
            intent : app.core.statusbarNotification.intent,
            type : Ti.Android.PENDING_INTENT_FOR_ACTIVITY,
            flags : Ti.Android.FLAG_ACTIVITY_NO_HISTORY
        });
        //app.core.statusbarNotification.pending.intent = app.core.statusbarNotification.intent;
        
    }
}
app.core.statusbarNotification.start();
//Ti.Android.NotificationManager.cancelAll();
/*setTimeout(function() {
    app.core.statusbarNotification.add('Titulo', 'textooo', 'preview text');
}, 4000);

setTimeout(function() {
    //app.core.statusbarNotification.add('Titulo2', 'textooo2', 'preview text2');
}, 10000);*/