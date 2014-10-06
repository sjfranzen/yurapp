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
    this.__controllerPath = "customHomeButton";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.btnCustom = Ti.UI.createView({
        top: 0,
        height: 140,
        width: 140,
        backgroundColor: Alloy.Globals.ThemeStyles.home_button.backgroundColor,
        id: "btnCustom"
    });
    $.__views.btnCustom && $.addTopLevelView($.__views.btnCustom);
    $.__views.icon = Ti.UI.createImageView({
        height: 64,
        width: 64,
        hires: true,
        id: "icon"
    });
    $.__views.btnCustom.add($.__views.icon);
    $.__views.lblTitle = Ti.UI.createLabel({
        color: Alloy.Globals.ThemeStyles.home_button.color,
        font: Alloy.Globals.ThemeStyles.home_button.font,
        bottom: 10,
        id: "lblTitle"
    });
    $.__views.btnCustom.add($.__views.lblTitle);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.left ? $.btnCustom.left = args.left : $.btnCustom.right = args.right;
    $.btnCustom.addEventListener("touchstart", function() {
        $.btnCustom.backgroundColor = Alloy.Globals.ThemeStyles.home_button.selectedBackgroundColor;
    });
    $.btnCustom.addEventListener("touchcancel", function() {
        $.btnCustom.backgroundColor = Alloy.Globals.ThemeStyles.home_button.backgroundColor;
    });
    $.btnCustom.addEventListener("touchend", function() {
        $.btnCustom.backgroundColor = Alloy.Globals.ThemeStyles.home_button.backgroundColor;
    });
    $.icon.image = args.image;
    $.lblTitle.text = args.title;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;