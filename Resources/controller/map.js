app.controller.map = {
    //The position of the user (updates every minute)
    location: undefined,
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
	    //alert('mapClickHandler ' + evt.index);
	    //alert(evt.title);
	    //alert(evt.annotation.direction);
		var clickType = evt.clicksource;
		//alert(clickType);
		if(clickType == 'title' || clickType == 'rightPane'){//Annotation case
		    var evento = evt.annotation;
		    //evento.index = evt.index;
		    //Obtener el index a pelo
		    var rows = app.view.timeline.tableView.data[0].rows;
		    
		    for(var i = 0, len = rows.length; i < len; i++){
		        if(rows[i].id == evento.id){
		            evento.index = i;
		            break;
		        }
		    }
		    //Load event detaill
		    app.controller.eventDetail.loadEvent(evento);
		}
	}
}

//Map events 
app.view.map.mapView.addEventListener('click',app.controller.map.mapClickHandler);
