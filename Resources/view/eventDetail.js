app.view.eventDetail = {
    //Variable components
    window : Titanium.UI.createWindow({//Event detaill window
        //url: e.rowData.test,
        //title : evento.title,
        backgroundColor : '#eee',
        layout : 'vertical',
        softKeyboardOnFocus : Titanium.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS
    }),
    headerView : Ti.UI.createView({//Event header
        layout : 'horizontal',
        height : 50,
        contentHeight : 'auto'
    }),
    scrollView : Titanium.UI.createScrollView({//Scroll
        contentHeight : 'auto',
        layout : 'vertical',
        softKeyboardOnFocus : Titanium.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS
    }), //Titanium.UI.currentTab;
    likesLabel : Ti.UI.createLabel({
        backgroundColor: '#fff',
        borderWidth : 1,
        borderColor : '#ccc',
        borderRadius : 5,
        color : '#000',
        text : '0',
        textAlign : 'center',
        font : {
            fontSize : 16,
            fontWeight : 'bold'
        },
        top : 10,
        left : '5%',
        height : 40,
        width : 40
    }),
    likeButton : Ti.UI.createButton({
        backgroundColor: '#fff',
        backgroundSelectedColor: '#ccc',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        backgroundImage: '/img/like.png',
        height : 40,
        width : 40,
        top : 10,
        right : 5,
        left: 10
        
    }),
    facebookShare : Ti.UI.createButton({
        backgroundColor: '#fff',
        backgroundSelectedColor: '#ccc',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        backgroundImage : '/img/facebook.png',
        height : 40,
        width : 40,
        top : 10,
        left: 10,
        right : 15
        //borderColor : '#ccc',
        //borderRadius : 10,
        //borderWidth : 1
    }),
    //Profile Navigators
    previousProfile: Ti.UI.createButton({
        backgroundColor: '#fff',
        backgroundSelectedColor: '#ccc',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        backgroundImage: '/img/prev2.png',
        //title : 'Previous',
        height : 40,
        top : 10,
        right : 15,
        width : 40
    }),
    nextProfile: Ti.UI.createButton({
        backgroundColor: '#fff',
        backgroundSelectedColor: '#ccc',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        backgroundImage: '/img/next2.png',
        height : 40,
        top : 10,
        right : 15,
        width : 40
    }),
    eventPicture : Ti.UI.createImageView({//Picture
        //image : evento.image.sb[0], //Change imageBig by event.image
        top : 10,
        //top : '5%',
        backgroundColor: '#fff',
        width : '90%',
        //animating : true,
        borderColor : '#ccc',
        borderRadius : 10,
        borderWidth : 1,
        defaultImage : '/img/eventPicture.png' 
    }),
    labelDirection : Titanium.UI.createLabel({//Direction
        top : 10,
        color : '#000',
        //text : evento.direction.complete,
        font : {
            fontSize : 20,
            fontFamily : 'Helvetica Neue'
        },
        textAlign : 'center',
        width : 'auto',
        height : 30
    }),
    mapPicture: Ti.UI.createImageView({//Picture
        top : 10,
        backgroundColor: '#fff',
        width : '90%',
        borderColor : '#ccc',
        borderRadius : 10,
        borderWidth : 1
    }),
    comments : Ti.UI.createTableView({
        //color: '#000'
        top: 10,
        height : Ti.UI.SIZE,
        headerTitle : 'Comments',
        separatorColor : '#ccc'
    }),
    //Compose
    //Captcha
    captchaWrapper : Ti.UI.createView({//Para que se vean en la misma linea
        layout : 'horizontal',
        height : 90,
        contentHeight : 'auto'
    }),
    captchaImg : Ti.UI.createImageView({
        top : 20,
        left : '5%',
        //width: '40%',
        //width : '90%',
        height : 70,
        borderWidth : 1,
        borderColor : '#ccc',
        borderRadius : 5
    }),
    captchaReloadButton : Ti.UI.createButton({
        title : 'Reload',
        top : 20,
        height : 75,
        left : 10
        //right : 200
        //width : 100
    }),
    captchaField : Ti.UI.createTextField({
        height : 40,
        top : 20,
        right : '5%',
        width : '90%',
        //width : '40%',
        hintText : 'Captcha value',
        textAlign : 'left',
        borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS
    }),
    userField : Ti.UI.createTextField({
        height : 40,
        //top : 20,
        right : '5%',
        width : '90%',
        hintText : 'Nickname',
        borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
    }),
    commentArea : Ti.UI.createTextArea({
        height : 80,
        left : '5%',
        width : '90%',
        hintText : 'Comment',
        borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
    }),
    sendButton : Ti.UI.createButton({
        title : 'Send comment',
        top : 20,
        left : '5%',
        width : '90%'
    }),
    //Functions
    start : function() {//Set the components

        //Likes
        app.view.eventDetail.headerView.add(app.view.eventDetail.likesLabel);
        //Likes count
        app.view.eventDetail.headerView.add(app.view.eventDetail.likeButton);
        //Facebook
        app.view.eventDetail.headerView.add(app.view.eventDetail.facebookShare);
        //Profile navigators
        app.view.eventDetail.headerView.add(app.view.eventDetail.previousProfile);
        app.view.eventDetail.headerView.add(app.view.eventDetail.nextProfile);
        //Likes button
        //Header
        app.view.eventDetail.scrollView.add(app.view.eventDetail.headerView);

        //Añadir imagen
        app.view.eventDetail.scrollView.add(app.view.eventDetail.eventPicture);
        //Añadir direction
        app.view.eventDetail.scrollView.add(app.view.eventDetail.labelDirection);
        //Adding mapImage
        app.view.eventDetail.scrollView.add(app.view.eventDetail.mapPicture);
        //Añadir comentarios
        app.view.eventDetail.scrollView.add(app.view.eventDetail.comments);

        //Adding compose components
        app.view.eventDetail.captchaWrapper.add(app.view.eventDetail.captchaImg);
        app.view.eventDetail.captchaWrapper.add(app.view.eventDetail.captchaReloadButton);
        //app.view.eventDetail.scrollView.add(app.view.eventDetail.captchaImg);
        app.view.eventDetail.scrollView.add(app.view.eventDetail.captchaWrapper);
        app.view.eventDetail.scrollView.add(app.view.eventDetail.captchaField);

        app.view.eventDetail.scrollView.add(app.view.eventDetail.userField);
        app.view.eventDetail.scrollView.add(app.view.eventDetail.commentArea);
        app.view.eventDetail.scrollView.add(app.view.eventDetail.sendButton);

    }
}
app.view.eventDetail.start();

