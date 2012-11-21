//Geolocation config
Ti.Geolocation.preferredProvider = "gps";
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 10;
// set the granularity of the location event

//Core variables
app.core.restUrl = 'http://www.hotnowapp.com/api/v1/q.php';
app.core.restUrl2 = app.core.restUrl + '?callback=&';
app.core.events = new Array();
//Contains new events
app.core.eventsLoaded = false;
app.core.updateEventsInterval = 10000;
//60000 in production
app.core.sinceId = 0;
app.core.maxId = undefined;
app.core.qtyPag = 30;
app.core.searchRadius = 300000;
//Initial radius 300Km
//Events update interval

//CORE FUNCTIONS
app.core.start = function() {//Init app function
    app.ui.loading.show();
    app.core.updateEvents('bottom');
    //Carga inicial de eventos
    //Se actualiza desde aqui y no en el callback de la funcion ajax, por si falla el ajax
    setInterval(app.core.updateEvents, app.core.updateEventsInterval, 'top');
    //Carga en busqueda de novedades
}
app.core.ajax = function(method, url, params, callbacks, hideLoading) {
    //Show loading
    //setTimeout(function(){
    if (!hideLoading) {
        app.ui.loading.show();
    }

    //Titanium.UI.currentWindow.add(app.ui.loading);
    //app.view.timeline.window.add(app.ui.loading);
    app.ui.tabs.add(app.ui.loading);
    //},100);

    //Init AJAX
    var xhr = Ti.Network.createHTTPClient();//enableKeepAlive: true
    
    //xhr.ondatastream = callbacks.dataStream;
    //xhr.onsendstream = callbacks.sendStream;
    
    
    //+ '&callback'
    //Se añade &callback para evitar que devuelva una cadena en el response de JSONP
    //xhr.setRequestHeader('Content-Type', 'application/json');

    //xhr.setTimeout(20000);
    //Callback handlers
    xhr.onload = function(data) {//Success callback
        app.ui.loading.hide();

        var data = this.responseText.substring(1);
        //Remove first (
        data = data.substring(0, data.length - 1);
        //Remove last )
        data = JSON.parse(data);
        //Call callback
        callbacks.success(data);
    }
    xhr.onerror = callbacks.error ||
    function() {//Default error callback
        app.ui.loading.hide();
        //alert('Request ERROR');
    };
    
    xhr.open(method, url);
    
    if (params) {//Simplificar solo con xhr.send();
        params.callback = '';
        xhr.send(params);
    } else {
        xhr.send();
    }
    
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
//Actualiza los eventos cada X tiempo definido en app.core.updateEventsInterval
//dataPosition --> Indica la posicion donde hay que meter el resultado de los eventos [top|bottom]
app.core.updateEvents = function(dataPosition) {//
    //alert('updateEvents sinceId: ' + app.core.sinceId);
    var searchFilter = '';
    //Determining search data filter
    if (dataPosition == 'top') {
        searchFilter = '&sinceId=' + app.core.sinceId;
    } else if (dataPosition == 'bottom' && app.core.maxId) {
        searchFilter = '&maxId=' + app.core.maxId;
    }

    app.core.getCurrentPosition(function(e) {

        var latitude = e.coords.latitude;
        var longitude = e.coords.longitude;

        //alert('longitude: ' + longitude + ' latitude: ' + latitude );
        var url = app.core.restUrl2 + 'action=find&radius=' + app.core.searchRadius + '&qtyPag=' + app.core.qtyPag + '&lat=' + latitude + '&lng=' + longitude + searchFilter;
        //lat=39.402738&lng=-0.403518
        //alert(url);
        app.core.ajax('GET', url, undefined, {
            success : function(data) {//Success

                var values = data.values;

                //app.core.events = values;

                if (values) {
                    var evento, rows = new Array(), annotations = new Array(), row, rowImg, rowLabel;

                    for (var i = 0, len = values.length; i < len; i++) {
                        evento = values[i];
                        //Timeline
                        row = app.core.createCustomRow(evento.title, evento.direction.complete, evento.image.s[1], {
                            title : evento.title,
                            qtyLikes : evento.qtyLikes,
                            id : evento.id,
                            image : evento.image,
                            direction : evento.direction,
                            lat : evento.lat,
                            lng : evento.lng
                        })
                        //Map
                        annotations.push(Titanium.Map.createAnnotation({
                            id : evento.id,
                            qtyLikes : evento.qtyLikes,
                            latitude : evento.lat,
                            longitude : evento.lng,
                            title : evento.title,
                            image : evento.image,
                            direction : evento.direction,
                            lat : evento.lat,
                            lng : evento.lng,
                            //subtitle : 'Cupertino, CA',//Meter tiempo "Hace 5 minutos"
                            pincolor : Titanium.Map.ANNOTATION_GREEN,
                            animate : true,
                            rightButton : evento.image.s[1]
                        }));

                        if (dataPosition == 'top') {//se mete al principio
                            app.view.timeline.tableView.insertRowBefore(0, row);
                        } else {//se guarda y se mete luego con todas
                            rows.push(row);
                        }

                    }
                    //Adding annotations to the map
                    app.view.map.mapView.addAnnotations(annotations);
                    if (dataPosition == 'bottom') {//Si hay que meterlo al final
                        //Adding show more events button
                        var showMoreButton = Ti.UI.createButton({
                            title : 'Show more events',
                            witdh : '100%',
                            top : 5
                        }), endRow = Ti.UI.createTableViewRow({
                            witdh : '100%',
                            loadMore : true
                        });
                        endRow.add(showMoreButton);
                        rows.push(endRow);
                        //Adding data
                        app.view.timeline.tableView.appendRow(rows);
                        //app.view.timeline.tableView.setData(rows);
                        //Update maxId
                        app.core.maxId = values[values.length - 1].id;
                    } else {
                        //Update sinceId
                        app.core.sinceId = values[0].id;
                    }

                    if (!app.core.eventsLoaded) {//Si es la primera vez que se llama la funcion
                        //Setting events loaded
                        app.core.eventsLoaded = true;
                        //Set first value to sinceId
                        app.core.sinceId = values[0].id;
                        //Set map loaction
                        app.controller.map.location = {
                            latitude : latitude,
                            longitude : longitude,
                            latitudeDelta : 0.5,
                            longitudeDelta : 0.5
                        };
                        app.view.map.mapView.setLocation(app.controller.map.location);
                    }
                }

                /*setTimeout(function() {
                 var row = {
                 leftImage : 'http://www.vertice360.com/wp-content/themes/vertice360/img/logo_corp_big.png',
                 title : 'Appended ROW',
                 className : 'Pic'
                 };
                 app.view.timeline.tableView.appendRow([row, row, row]);
                 app.view.timeline.tableView.insertRowBefore(0, row);
                 }, 5000);*/
            }
        }, true);
    });
}
app.core.resetEvents = function() {
    app.core.eventsLoaded = false;
    app.core.sinceId = 0;
    app.core.maxId = undefined;
    app.view.timeline.tableView.setData([]);
    app.view.map.mapView.removeAllAnnotations();
}
app.core.capitalize = function(string) {//Capitalize the First letter

    return string.charAt(0).toUpperCase() + string.slice(1);
}
app.core.AndroidMenuHandler = function() {
    Ti.UI.createAlertDialog({
        title : 'AndroidMenuHandler'
    }).show();
}
app.core.facebookPost = function() {//Post feed in wall of current user
    app.ui.loading.show();
    Titanium.Facebook.requestWithGraphPath('me/feed', {
        message : app.controller.eventDetail.eventTitle,
        link : 'http://www.hotnowapp.com/share.php?id=' + app.controller.eventDetail.eventId
    }, "POST", function() {
        app.ui.loading.hide();
        app.core.niceAlert('Event shared');
    });
}
app.core.niceAlert = function(title) {
    Ti.UI.createAlertDialog({
        title : title
    }).show();
}
app.core.createCustomRow = function(title, detail, image, rowConfig) {
    if (rowConfig) {
        rowConfig.className = 'Pic';
    } else {
        rowConfig = {};
    }
    var row = Titanium.UI.createTableViewRow(rowConfig);
    //Image
    rowImg = Titanium.UI.createImageView({
        url : image,
        height : 70,
        width : 70,
        left : 1
    });
    //Title
    rowLabel = Titanium.UI.createLabel({
        text : app.core.capitalize(title),
        color : '#333',
        font : {
            fontSize : 16,
            fontWeight : 'bold'
        },
        width : 'auto',
        textAlign : 'left',
        top : 2,
        left : 80,
        height : 20
    });
    //Detail
    rowInfoLabel = Ti.UI.createLabel({
        color : '#444',
        textAlign : 'left',
        text : detail,
        font : {
            fontSize : 14
        },
        left : 80,
        height : 20
    });
    row.add(rowImg);
    row.add(rowLabel);
    row.add(rowInfoLabel);
    return row;
}
app.core.refreshEventsItemHandler = function() {
    app.ui.loading.show();
    app.core.updateEvents('top');
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

