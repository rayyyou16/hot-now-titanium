app.controller.map = {

	paintEvents : function() {//Set the event markers in the map

		//alert('paintEvents');

		var events = app.core.events, evento, annotations = new Array();

		if (events) {
			for (var i = 0, len = events.length; i < len; i++) {
				evento = events[i];

				annotations.push(Titanium.Map.createAnnotation({
					latitude : evento.lat,
					longitude : evento.lng,
					title : evento.title,
					image: evento.image,
					direction: evento.direction,
					//subtitle : 'Cupertino, CA',//Meter tiempo "Hace 5 minutos"
					pincolor : Titanium.Map.ANNOTATION_GREEN,
					animate : true,
					rightButton : evento.image.s[1],
					//myid : 2 // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
				}));
			}

			//Paint annotations
			app.view.map.mapView.addAnnotations(annotations);
			//Reset events array
			app.core.events = undefined;

		}

	},
	//HANDLERS
	mapClickHandler: function(evt){
	    //alert(evt);
	    //alert(evt.title);
	    //alert(evt.annotation.direction);
		var clickType = evt.clicksource;
		//alert(clickType);
		if(clickType == 'title' || clickType == 'rightPane'){//Annotation case
		    var evento = evt.annotation;
		    //alert(evento.title);
		    //alert(evento.direction);
		    //alert(evento.image);
		    app.core.showEventDetaill(evento);
		    //Load event detaill
		}
	}
}

//Map events 
app.view.map.mapView.addEventListener('click',app.controller.map.mapClickHandler);
