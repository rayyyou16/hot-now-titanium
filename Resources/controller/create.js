app.controller.create = {
    //Variables
    //La imagen que sera enviada en el POST
    eventPicture : undefined,
    //Handler events functions
    selectPictureButtonHandler : function() {
        Titanium.Media.showCamera({
            mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO], //Ti.Media.MEDIA_TYPE_VIDEO,
            //allowEditing:true,
            saveToPhotoGallery : true,
            success : function(e) {
                var image = e.media;
                //alert('succes camera');
                //alert(e.media);
                /*var imageView = Ti.UI.createImageView({
                image : image,
                top : 225,
                width : '90%'
                });*/
                //Set preview image
                app.view.create.eventPicture.setImage(image);
                //Setting image global value
                app.controller.create.eventPicture = image;

                //app.view.create.scrollView.add(imageView);
                //var encodeData = Ti.Utils.base64encode(image);
                //alert(encodeData);

                //uploadImageToServer(img.toImage()); //psuedocode*/
            },
            cancel : function() {
                //alert('Camera cancel');
            },
            error : function(error) {
                alert('Camera error');
                alert(error);
            }
        });
    },
    sendEventButtonHandler : function() {
        var title = app.view.create.titleEventField.value;

        if (app.controller.create.eventPicture && title) {//if exist event picture && title

            app.core.getCurrentPosition(function(e) {

                var latitude = e.coords.latitude, longitude = e.coords.longitude, data_to_send = {
                    action : 'insert',
                    title : title,
                    lat : latitude,
                    lng : longitude,
                    imagePost : app.controller.create.eventPicture
                    //imageBase64: Ti.Utils.base64encode(image)
                };

                //
                /*xhr.onload = function(e) {
                alert('upload success!');
                }*/
                //xhr.open("POST", 'http://www.hotnowapp.com/api/v1/q.php');
                //xhr.send(data_to_send);
               /* var progressbar = Titanium.UI.createProgressBar({
                    top: 20,
                    height: 30,
                    witdh: 300,
                    color : '#888',
                    value : 0,
                    min: 0,
                    max: 100
                });
                app.view.create.scrollView.add(progressbar);
                progressbar.show();*/
                app.core.ajax('POST', app.core.restUrl, data_to_send, {
                    success : function(data) {//Success
                        app.core.niceAlert('Event created');
                        //Reset create event values
                        app.view.create.titleEventField.setValue('');
                        app.view.create.eventPicture.setImage(null);
                    }/*,
                    dataStream: function(e){
                        app.view.create.titleEventField.setValue(e.progress);
                        /*var p = Math.round(e.progress);
                        progressbar.setValue(p);
                        progressbar.value = p;*/
                    /*},
                    sendStream: function(e){
                        var p = Math.round(e.progress);
                        progressbar.setValue(p);
                        progressbar.value = p;
                        //app.view.create.titleEventField.setValue(p);
                        //app.view.create.titleEventField.setValue(Math.round(e.progress));//app.view.create.titleEventField + 
                        //alert('sendStream ' + data);
                    }*/
                });
                /*setTimeout(function(){
                    progressbar.setValue(50);
                    progressbar.value = 50;
                },10000);*/
            });

        } else {
            alert('Title or Picture is empty');
        }

    }
}

//Adding Handlers
app.view.create.selectPictureButton.addEventListener('click', app.controller.create.selectPictureButtonHandler);
app.view.create.sendEventButton.addEventListener('click', app.controller.create.sendEventButtonHandler);

