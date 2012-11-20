app.view.configurationWindow = {

    window : Titanium.UI.createWindow({
        title : 'Configuration',
        backgroundColor : '#fff',
        layout : 'vertical'
    }),
    radioSlider : Ti.UI.createSlider({
        top : 20,
        min : 0,
        max : 10,
        width : '90%',
        value : 8
    }),
    sliderValueLabel: Ti.UI.createLabel({
        top : 15,
        color : '#000',
        text : 'Search radius: 120000Km',
        font : {
            fontSize : 20,
            fontFamily : 'Helvetica Neue'
        },
        textAlign : 'center',
        width : 'auto'
    }),
    saveChangesButton : Ti.UI.createButton({
        top: 20,
        title : 'Save changes'
    }),
    start : function() {//Add elements to the window
        //Slider
        app.view.configurationWindow.window.add(app.view.configurationWindow.radioSlider);
        app.view.configurationWindow.window.add(app.view.configurationWindow.sliderValueLabel);
        //Button
        app.view.configurationWindow.window.add(app.view.configurationWindow.saveChangesButton);
    }
}

app.view.configurationWindow.start();
