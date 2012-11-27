app.view.create = {
    //UI Public Elements
    window : Titanium.UI.createWindow({//Main "create" Window
        title : 'Tab 1',
        backgroundColor : '#eee',
        softKeyboardOnFocus : Titanium.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS
    }),
    tab : Titanium.UI.createTab({
        icon : 'img/create.png'
        /*backgroundColor: '#fff',
        backgroundImage: 'img/create.png',
        height: 30,
         /*backgroundDisabledImage: 'img/create.png',
         backgroundSelectedImage: 'img/create.png',*/
        //backgroundFocusedColor : '#fff',
        //title : 'Create'
        //window : app.view.create.window
    }),
    scrollView : Titanium.UI.createScrollView({
        contentHeight : 'auto',
    }),
    eventPicture : Ti.UI.createImageView({
        top : 225,
        backgroundColor: '#fff',
        width : '90%',
        height: 'auto',
        borderColor : '#ccc',
        borderRadius : 10,
        borderWidth : 1,
        //defaultImage : 'http://jimpunk.net/Loading/wp-content/uploads/loading45.gif'
        defaultImage : '/img/eventPicture.png'
    }),
    titleEventField : Titanium.UI.createTextField({
        //color:'#336699',
        height : 40,
        top : 25,
        left : '5%',
        width : '90%',
        hintText : 'Event Title',
        //textAlign:'center',

        borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
    }),
    selectPictureButton : Ti.UI.createButton({
        title : 'Select event picture',
        top : 95,
        left : '5%',
        width : '90%'
    }),
    sendEventButton : Ti.UI.createButton({
        title : 'Send Event',
        top : 160,
        left : '5%',
        width : '90%'
    }),
    start : function() {

        /*var label = Titanium.UI.createLabel({
        color:'#999',
        text:'Create event',
        font:{fontSize:20,fontFamily:'Helvetica Neue'},
        textAlign:'center',
        width:'auto'
        });

        app.view.create.window.add(label);	*/
        
        //Adding componentes to the scroll
        app.view.create.scrollView.add(app.view.create.titleEventField);
        app.view.create.scrollView.add(app.view.create.selectPictureButton);
        app.view.create.scrollView.add(app.view.create.sendEventButton);
        app.view.create.scrollView.add(app.view.create.eventPicture);
        //Adding scroll to the window
        app.view.create.window.add(app.view.create.scrollView);
        //Set windows
        app.view.create.tab.setWindow(app.view.create.window);
        //add tab
        app.ui.tabs.addTab(app.view.create.tab);
    }
}

app.view.create.start();
