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
    this.__controllerPath = "Setting";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.winSetting = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.ThemeStyles.win.backgroundColor,
        barColor: Alloy.Globals.ThemeStyles.win.barColor,
        navTintColor: Alloy.Globals.ThemeStyles.win.navTintColor,
        layout: "vertical",
        translucent: false,
        id: "winSetting"
    });
    $.__views.winSetting && $.addTopLevelView($.__views.winSetting);
    $.__views.lblTest = Ti.UI.createLabel({
        textAlign: "left",
        left: 18,
        color: "#ffffff",
        font: Alloy.Globals.ThemeStyles.flyout_menu_item.font,
        id: "lblTest"
    });
    $.__views.winSetting.add($.__views.lblTest);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.winSetting.setTitleControl(Alloy.createController("titleControl", {
        title: args.title
    }).getView());
    args.isFlyout ? $.winSetting.leftNavButton = Alloy.createController("leftMenuButton").getView() : $.winSetting.backButtonTitle = "Back";
    $.lblTest.text = "dp / dpi: " + Ti.Platform.displayCaps.dpi / 160 + " / " + Ti.Platform.displayCaps.dpi;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;