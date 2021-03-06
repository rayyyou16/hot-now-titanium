// create tab group
//Tabs
app.ui.tabs = Titanium.UI.createTabGroup({
    //backgroundColor: '#fff',
    //activeTabBackgroundColor: '#fff'
    activeTabBackgroundSelectedColor: '#fff',
    activeTabBackgroundFocusedColor: '#fff'
});
//Android Menu items
app.ui.androidMenu = {
    refreshEventsItem : undefined,
    configurationItem : undefined
}
//UI Global events
app.ui.startEvents = function() {
    //Tabs events
    app.ui.tabs.addEventListener('click', function(e) {//Click in a tab
        

        //var tabTitle = e.source.title;

        //app.ui.tabs.getActiveTab().icon = 'img/facebook.png';
        //alert(tabTitle);
        //app.ui.tabs.tabs[e.index].icon = 'img/facebook.png';
        //e.source.setIcon('img/facebook.png');
        //e.source.icon = 'img/facebook.png';
        //app.view.create.tab.icon = '../img/facebook.png';

        /*setTimeout(function(){
         alert('time');
         //Ti.UI.currentTab.icon = 'img/facebook.png'
         //app.ui.tabs.getActiveTab().setIcon('../img/facebook.png');
         //app.view.create.tab.setIcon('/img/facebook.png');
         //app.ui.tabs.tabs[1].icon = 'img/facebook.png';
         },5000);
         //Ti.UI.currentTab.icon = 'img/facebook.png';

         if (tabTitle == 'Map') {
         //app.controller.map.paintEvents();
         }*/
    });
}
//Loading
app.ui.loading = Titanium.UI.createActivityIndicator({
    message : 'Loading',
    height : 50,
    width : 10/*,
     color: '' */
});
//Android Menu
app.ui.createAndroidMenu = function(e) {
    var menu = e.menu;
    //Creating items
    app.ui.androidMenu.refreshEventsItem = menu.add({
        title : "Refresh"
    });
    app.ui.androidMenu.configurationItem = menu.add({
        title : "Configuration"
    });
    //Set icons
    app.ui.androidMenu.refreshEventsItem.setIcon("img/refresh.png");
    app.ui.androidMenu.configurationItem.setIcon("img/configuration.png");
    //Ading handlers
    app.ui.androidMenu.refreshEventsItem.addEventListener("click", app.core.refreshEventsItemHandler);
    app.ui.androidMenu.configurationItem.addEventListener("click", app.controller.configurationWindow.activate);
}
app.ui.start = function() {//Create the UI for the App

    app.ui.tabs.open();

    //Android Menu Handlers
    app.view.timeline.window.activity.onCreateOptionsMenu = app.ui.createAndroidMenu;
    app.view.map.window.activity.onCreateOptionsMenu = app.ui.createAndroidMenu;

}

