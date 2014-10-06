function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.winParent = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.ThemeStyles.win.backgroundColor,
        id: "winParent"
    });
    $.__views.winParent && $.addTopLevelView($.__views.winParent);
    $.__views.menuview = Ti.UI.createView({
        left: 0,
        top: 0,
        backgroundColor: "#292929",
        width: Ti.UI.SIZE,
        bottom: 5,
        height: Ti.UI.SIZE,
        id: "menuview"
    });
    $.__views.winParent.add($.__views.menuview);
    $.__views.flyoutTable = Ti.UI.createTableView({
        width: 275,
        left: 0,
        showVerticalScrollIndicator: false,
        scrollable: true,
        backgroundColor: "transparent",
        separatorStyle: "none",
        id: "flyoutTable"
    });
    $.__views.menuview.add($.__views.flyoutTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    if (Ti.Platform.Android) Alloy.createController("android/index").getView(); else {
        var rows = [];
        _.each(Alloy.Globals.FlyoutMenu, function(item) {
            rows.push(Alloy.createController("flyoutRow", {
                image: item.icon,
                title: item.title,
                name: item.name,
                controller: item.controller
            }).getView());
        });
        $.flyoutTable.top = "7" == Alloy.Globals.isIOS7() ? 18 : 0;
        $.flyoutTable.setData(rows);
        $.flyoutTable.addEventListener("click", function(e) {
            Alloy.Globals.isMenuVisible = false;
            Alloy.Globals.navGroup.animate(Alloy.Globals.animations.right);
            if ("_main_menu" == e.row.name) alert("main menu clicked"); else if ("_options" == e.row.name) alert("option menu clicked"); else if (e.row.name == currentWindow) ; else {
                Ti.API.info("Current Controller: " + currentWindow);
                Ti.API.info("Selected Controller: " + e.row.name);
                currentWindow = e.row.name;
                var controller = Alloy.createController(e.row.controller, {
                    title: e.row.titleValue,
                    name: e.row.name,
                    isFlyout: true
                });
                var newWindow = controller.getView();
                Alloy.Globals.navGroup.openWindow(newWindow, {
                    animated: true
                });
                Alloy.Globals.navGroup.window = newWindow;
            }
        });
        Ti.App.Properties.setString("user_key", "1232456789");
        if (null != Ti.App.Properties.getString("user_key", null)) {
            Ti.API.info("We have a user key so go straight into the app");
            $.winParent.addEventListener("open", function() {
                Ti.API.info("Parent or Menu Window is opened");
                var homeController = Alloy.createController("Home", {
                    title: "Home",
                    name: "_home",
                    isFlyout: true
                }).getView();
                Alloy.Globals.navGroup = Titanium.UI.iOS.createNavigationWindow({
                    left: 0
                });
                Alloy.Globals.navGroup.window = homeController;
                Alloy.Globals.navGroup.width = 320;
                Alloy.Globals.navGroup.open();
            });
            Alloy.Globals.isMenuVisible = false;
            var currentWindow = "_home";
            $.winParent.open();
        } else Ti.API.info("We need to login the user");
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;