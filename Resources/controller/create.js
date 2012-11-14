//Handler events functions
var selectPictureButtonHandler = function() {
	Titanium.Media.showCamera({
		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO], //Ti.Media.MEDIA_TYPE_VIDEO,
		//allowEditing:true,
		saveToPhotoGallery : true,
		success : function(e) {
			var image = e.media;
			//alert('succes camera');
			//alert(e.media);
			var imageView = Ti.UI.createImageView({
				image : image,
				top : 225,
				width : '90%'
				/*,
				 transform: Ti.UI.create2DMatrix().rotate(90)*/
			});

			app.view.create.eventPicture = image;

			app.view.create.scrollView.add(imageView);
			//var encodeData = Ti.Utils.base64encode(image);
			//alert(encodeData);

			//uploadImageToServer(img.toImage()); //psuedocode*/
		},
		cancel : function() {
			alert('Camera cancel');
		},
		error : function(error) {
			alert('Camera error');
			alert(error);
		}
	});
}, sendEventButtonHandler = function() {
	var title = app.view.create.titleEventField.value;
	
	if (app.view.create.eventPicture && title) {//if exist event picture && title

		app.core.getCurrentPosition(function(e) {
			
			var latitude = e.coords.latitude,
			longitude = e.coords.longitude,
			data_to_send = {
				action : 'insert',
				title : title,
				lat : latitude,
				lng : longitude,
				imagePost : app.view.create.eventPicture
				//imageBase64: Ti.Utils.base64encode(image)
			};
			
			//
			/*xhr.onload = function(e) {
				alert('upload success!');
			}*/
			//xhr.open("POST", 'http://www.hotnowapp.com/api/v1/q.php');
			//xhr.send(data_to_send);
			app.core.ajax('POST', 'http://www.hotnowapp.com/api/v1/q.php',data_to_send, function(data) {//Success
				alert('upload success!');
			});
		});

	}else{
		alert('Title or Picture is empty');
	}

};

//Adding Handlers
app.view.create.selectPictureButton.addEventListener('click', selectPictureButtonHandler);
app.view.create.sendEventButton.addEventListener('click', sendEventButtonHandler);

