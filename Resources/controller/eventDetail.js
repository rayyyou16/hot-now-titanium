app.controller.eventDetail = {
    //Variables
    eventIndex : undefined,
    eventId : undefined,
    eventTitle : undefined,
    captchaHash : undefined,
    refreshingCaptcha : false,
    refreshCaptcha : function(hideLoading) {
        if (!app.controller.eventDetail.refreshingCaptcha) {

            app.controller.eventDetail.refreshingCaptcha = true;
            var params = {
                action : 'refreshCaptcha'
            }
            //Si se pasa hash
            //if (hash) {
            params.hash = app.controller.eventDetail.captchaHash;
            //}
            app.core.ajax('POST', app.core.restUrl, params, function(response) {
                app.controller.eventDetail.refreshingCaptcha = false;
                //Update captcha hash
                app.controller.eventDetail.captchaHash = response.hash;
                //Repaint captcha img
                app.view.eventDetail.captchaImg.setUrl(response.urlImage);
                //Clear field
                app.view.eventDetail.captchaField.setValue('');
            }, function() {
                alert('Error while update catpcha');
            }, hideLoading);
        }
    },
    loadEvent : function(evento) {
        app.ui.loading.show();
        //alert(app.controller.eventDetail.eventIndex);
        //Setting event values
        //Controller
        app.controller.eventDetail.eventId = evento.id;
        app.controller.eventDetail.eventTitle = evento.title;
        //View
        //alert(evento.title);
        app.view.eventDetail.window.setTitle(app.core.capitalize(evento.title));
        //No funciona
        //app.view.eventDetail.window.title = evento.title;
        app.view.eventDetail.likesLabel.setText(evento.qtyLikes);
        app.view.eventDetail.eventPicture.setImage(evento.image.sb[0]);
        app.view.eventDetail.labelDirection.setText(evento.direction.complete);
        //Adding scroll
        app.view.eventDetail.window.add(app.view.eventDetail.scrollView);
        //Open detaill
        app.ui.tabs.activeTab.open(app.view.eventDetail.window, {
            animated : true
        });

        var urlComments = app.core.restUrl2 + 'action=comments&id=' + evento.id;
        //Get event comments
        app.core.ajax('GET', urlComments, undefined, function(data) {//Get event comments
            //Setting index
            app.controller.eventDetail.eventIndex = evento.index;

            commentsData = data.values.comments;
            var commentRows = new Array(), comment;
            //Comments
            if (commentsData) {
                //alert(commentsData);
                for (var i = 0, len = commentsData.length; i < len; i++) {
                    comment = commentsData[i];
                    //Username commentsData[i].avatar
                    commentRows.push(app.core.createCustomRow(comment.username, comment.txt, comment.avatar));
                    /*commentRows.push({
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
            app.view.eventDetail.comments.setData(commentRows);

            //Captcha
            var captcha = data.values.captcha;
            app.controller.eventDetail.captchaHash = captcha.hash;
            app.view.eventDetail.captchaImg.setUrl(captcha.urlImage);
        });
        //eventPicture.addEventListener('load', function() {
        //alert('image loaded');
        //app.ui.loading.hide();

        //});
    },
    sendComment : function() {
        var captcha = app.view.eventDetail.captchaField.value, username = app.view.eventDetail.userField.value, comment = app.view.eventDetail.commentArea.value;

        if (captcha && username && comment) {//if fields dont empty
            app.core.ajax('POST', app.core.restUrl, {
                action : 'insertComment',
                id : app.controller.eventDetail.eventId,
                captchaHash : app.controller.eventDetail.captchaHash,
                captchaValue : captcha,
                username : username,
                comment : comment
            }, function(response) {

                if (response.ok == 1) {
                    app.controller.eventDetail.refreshCaptcha(true);
                    //Add the new comment row
                    var commentRow = {
                        color : '#333',
                        leftImage : 'http://hotnowapp.com/img/avatar/1.png',
                        title : comment,
                        className : 'Pic'
                    };
                    app.view.eventDetail.comments.appendRow(commentRow);
                    //Clear fields
                    app.view.eventDetail.userField.setValue('');
                    app.view.eventDetail.commentArea.setValue('');
                } else {
                    if (response.error.code == 4) {//Si el captcha es erroneo
                        alert('Captcha is incorrect');
                    }
                }

            })
        } else {
            alert('Please fill all fields');
        }

    },
    addLike : function() {
        app.core.ajax('POST', app.core.restUrl, {
            action : 'like',
            id : app.controller.eventDetail.eventId
        }, function(response) {
            if (response.ok == 1) {
                app.view.eventDetail.likesLabel.setText(parseInt(app.view.eventDetail.likesLabel.getText()) + 1);
            } else {
                alert('You already did Like');
            }
        });
    },

    facebookShareHandler : function() {

        if (Titanium.Facebook.loggedIn) {//If current loged in
            app.core.facebookPost();
        } else {//Get login
            Titanium.Facebook.appid = '387014411335701';
            Titanium.Facebook.permissions = ['publish_stream'];
            // Permissions your app needs
            Titanium.Facebook.addEventListener('login', function(e) {
                if (e.success) {
                    app.core.facebookPost();
                } else if (e.error) {
                    alert(e.error);
                } else if (e.cancelled) {
                    alert("Cancelled");
                }
            });
            Titanium.Facebook.authorize();
        }
    },
    profileNavigatorHandler : function(direction) {
        var index = app.controller.eventDetail.eventIndex, rows = app.view.timeline.tableView.data[0].rows, nextIndex = index + direction;
        //alert(direction + ' ' + nextIndex + ' ' + rows.length);
        if (direction < 0 && nextIndex < 0) {//Si esta en el primero y retrocede: vuelve al ultimo
            //alert('uno');
            nextIndex = rows.length - 2;
        }else if (direction > 0 && (nextIndex + 1) == rows.length) {//Si esta en el ultimo y avanza: vuelve al primero
            nextIndex = 0;
        }
        
        //alert('nextIndex ' + nextIndex);
        //Event
        var evento = rows[nextIndex];
        evento.index = nextIndex;
        //alert(evento.title);
        //Loading
        app.controller.eventDetail.loadEvent(evento);
    }
}

//Handlers
app.view.eventDetail.sendButton.addEventListener('click', app.controller.eventDetail.sendComment);
app.view.eventDetail.likeButton.addEventListener('click', app.controller.eventDetail.addLike);
app.view.eventDetail.captchaReloadButton.addEventListener('click', app.controller.eventDetail.refreshCaptcha)
app.view.eventDetail.facebookShare.addEventListener('click', app.controller.eventDetail.facebookShareHandler);
app.view.eventDetail.previousProfile.addEventListener('click', function() {
    app.controller.eventDetail.profileNavigatorHandler(-1);
});
app.view.eventDetail.nextProfile.addEventListener('click', function() {
    app.controller.eventDetail.profileNavigatorHandler(1);
});
