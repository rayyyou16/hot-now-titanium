//Geolocation config
Ti.Geolocation.preferredProvider = "gps";
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 10;
// set the granularity of the location event

//Core variables
app.core.restUrl = 'http://www.hotnowapp.com/api/v1/q.php?callback=&';
app.core.events = new Array();
//Contains new events
app.core.eventsLoaded = false;
app.core.updateEventsInterval = 10000;
//60000 in production
app.core.sinceId = 0;
app.core.maxId = undefined;
app.core.qtyPag = 30;
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
app.core.ajax = function(method, url, params, successCallback, errorCallback, hideLoading) {
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
    var xhr = Ti.Network.createHTTPClient();

    xhr.open(method, url);
    //+ '&callback'
    //Se añade &callback para evitar que devuelva una cadena en el response de JSONP
    //xhr.setRequestHeader('Content-Type', 'application/json');

    if (params) {//Simplificar solo con xhr.send();
        params.callback = '';
        xhr.send(params);
    } else {
        xhr.send();
    }

    //xhr.setTimeout(20000);
    xhr.onload = function(data) {//Success callback
        app.ui.loading.hide();

        var data = this.responseText.substring(1);
        //Remove first (
        data = data.substring(0, data.length - 1);
        //Remove last )
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
app.core.showEventDetaill = function(evento) {

    //app.ui.loading.show();

    var win = Titanium.UI.createWindow({//Event detaill window
        //url: e.rowData.test,
        title : evento.title,
        backgroundColor : '#fff',
        layout : 'vertical'
    }), scrollView = Titanium.UI.createScrollView({//Scroll
        contentHeight : 'auto',
        layout : 'vertical'
    }), //Titanium.UI.currentTab;
    eventPicture = Ti.UI.createImageView({//Picture
        image : evento.image.sb[0], //Change imageBig by event.image
        top : '5%',
        width : '90%',
        animating : true,
        //borderRadius : 10
        defaultImage : 'http://jimpunk.net/Loading/wp-content/uploads/loading45.gif'
    }), labelDirection = Titanium.UI.createLabel({//Direction
        top : 20,
        color : '#000',
        text : evento.direction.complete,
        font : {
            fontSize : 20,
            fontFamily : 'Helvetica Neue'
        },
        textAlign : 'center',
        width : 'auto'
    }), comments = Ti.UI.createTableView({
        //color: '#000'
        height : Ti.UI.SIZE,
        headerTitle : 'Comments'
    }), urlComments = app.core.restUrl + 'action=comments&id=' + evento.id;

    //alert(urlComments);
    //Añadir imagen
    scrollView.add(eventPicture);
    //Añadir direction
    scrollView.add(labelDirection);
    //Añadir comentarios
    scrollView.add(comments);
    
    //Compose
    //Captcha
    var captchaWrapper = Ti.UI.createView({
        layout:'horizontal',
        height: 90,
        contentHeight : 'auto'
    }),
    captchaImg = Ti.UI.createImageView({
        top: 20,
        left: '5%',
        width: '40%',
        height: 60,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5
    }), captchaField = Ti.UI.createTextField({
        height : 60,
        top : 20,
        right : '5%',
        width : '40%',
        hintText : 'Captcha value',
        textAlign : 'center',
        borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
    }), userField = Ti.UI.createTextField({
        height : 40,
        top : 20,
        right : '5%',
        width : '90%',
        hintText : 'Nickname',
        borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
    }), commentArea = Ti.UI.createTextArea({
        height: 80,
        left : '5%',
        width : '90%',
        hintText : 'Comment',
        borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
    }), sendButton = Ti.UI.createButton({
        title : 'Send event',
        top : 20,
        left : '5%',
        width : '90%'
    });

    //Adding compose components
    captchaWrapper.add(captchaImg)
    captchaWrapper.add(captchaField);
    //scrollView.add(captchaImg);
    //scrollView.add(captchaField);
    scrollView.add(captchaWrapper);
    scrollView.add(userField);
    scrollView.add(commentArea);
    scrollView.add(sendButton);
    //Adding scroll
    win.add(scrollView);
    //Open detaill
    app.ui.tabs.activeTab.open(win, {
        animated : true
    });
    //Handlers
    sendButton.addEventListener('click',app.core.sendComment);
    
    //Get event comments
    app.core.ajax('GET', urlComments, undefined, function(data) {//Get event comments
        commentsData = data.values.comments;
        var commentRows = new Array();
        //Comments
        if (commentsData) {
            //alert(commentsData);
            for (var i = 0, len = commentsData.length; i < len; i++) {
                //Username commentsData[i].avatar
                commentRows.push({
                    color : '#000',
                    leftImage : commentsData[i].avatar,
                    title : commentsData[i].txt
                });
                /*label = Ti.UI.createLabel({
                 text: commentsData[i].txt
                 });
                 win.add(label)*/
            }

        } else {
            //html = 'No comments for this event';
            commentRows.push({
                color : '#000',
                textAlign : 'center',
                title : 'No comments for this event :('
            });
        }
        comments.setData(commentRows);
        
        //Compose
        var captcha = data.values.captcha;
        captchaImg.setUrl(captcha.urlImage);
    });
    //eventPicture.addEventListener('load', function() {
    //alert('image loaded');
    //app.ui.loading.hide();

    //});

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
        var url = app.core.restUrl + 'action=find&radius=12000000&qtyPag=' + app.core.qtyPag + '&lat=' + latitude + '&lng=' + longitude + searchFilter;
        //lat=39.402738&lng=-0.403518
        //alert(url);
        app.core.ajax('GET', url, undefined, function(data) {//Success

            var values = data.values;

            //app.core.events = values;

            if (values) {
                var evento, rows = new Array(), annotations = new Array(), row;

                for (var i = 0, len = values.length; i < len; i++) {
                    evento = values[i];
                    //Timeline
                    row = {
                        color : '#333',
                        id : evento.id,
                        leftImage : evento.image.s[1],
                        image : evento.image,
                        title : evento.title,
                        direction : evento.direction,
                        className : 'Pic'
                    };
                    //Map
                    annotations.push(Titanium.Map.createAnnotation({
                        id : evento.id,
                        latitude : evento.lat,
                        longitude : evento.lng,
                        title : evento.title,
                        image : evento.image,
                        direction : evento.direction,
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
                    //Set first value to sinceId
                    app.core.sinceId = values[0].id;
                    //Setting events loaded
                    app.core.eventsLoaded = true;
                    //Set map loaction
                    app.view.map.mapView.setLocation({
                        latitude : latitude,
                        longitude : longitude,
                        latitudeDelta : 0.5,
                        longitudeDelta : 0.5
                    });
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
        }, function() {//Error

        }, true);
    });
}
app.core.sendComment = function(){
    alert('sendComment');
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

