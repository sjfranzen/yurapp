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
    this.__controllerPath = "Elements";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.winElements = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.ThemeStyles.win.backgroundColor,
        navTintColor: Alloy.Globals.ThemeStyles.win.navTintColor,
        barColor: Alloy.Globals.ThemeStyles.win.barColor,
        translucent: false,
        id: "winElements"
    });
    $.__views.winElements && $.addTopLevelView($.__views.winElements);
    var __alloyId1 = [];
    $.__views.rowText = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        selectionStyle: 0,
        id: "rowText"
    });
    __alloyId1.push($.__views.rowText);
    $.__views.textFname = Ti.UI.createTextField({
        color: Alloy.Globals.ThemeStyles.textfield.color,
        backgroundColor: Alloy.Globals.ThemeStyles.textfield.backgroundColor,
        borderColor: Alloy.Globals.ThemeStyles.textfield.borderColor,
        borderStyle: Alloy.Globals.ThemeStyles.textfield.borderStyle,
        borderRadius: Alloy.Globals.ThemeStyles.textfield.borderRadius,
        height: Alloy.Globals.ThemeStyles.textfield.height,
        top: 10,
        hintText: "Enter text ...",
        left: 14,
        right: 14,
        width: Ti.UI.FILL,
        font: Alloy.Globals.ThemeStyles.textfield.font,
        paddingLeft: 10,
        id: "textFname"
    });
    $.__views.rowText.add($.__views.textFname);
    $.__views.rowSlider = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        selectionStyle: 0,
        id: "rowSlider"
    });
    __alloyId1.push($.__views.rowSlider);
    $.__views.customSlider = Ti.UI.createSlider({
        min: 0,
        max: 100,
        value: 0,
        left: 14,
        top: 24,
        right: 14,
        width: Ti.UI.FILL,
        height: 20,
        leftTrackImage: "/images/slider_right.png",
        rightTrackImage: "/images/slider_default.png",
        thumbImage: "/images/thumb_image.png",
        args: {
            min: 0,
            max: 100
        },
        id: "customSlider"
    });
    $.__views.rowSlider.add($.__views.customSlider);
    $.__views.pBar = Ti.UI.createView({
        backgroundImage: "/images/slider_default.png",
        height: 20,
        top: 68,
        left: 14,
        right: 14,
        width: Ti.UI.FILL,
        id: "pBar"
    });
    $.__views.rowSlider.add($.__views.pBar);
    $.__views.progressView = Ti.UI.createView({
        top: 68,
        left: 14,
        right: 14,
        height: 20,
        backgroundImage: "/images/slider_right.png",
        width: 160,
        zIndex: 4,
        id: "progressView"
    });
    $.__views.rowSlider.add($.__views.progressView);
    $.__views.lblProgress = Ti.UI.createLabel({
        right: 5,
        color: Alloy.Globals.ThemeStyles.lableProgress.color,
        font: Alloy.Globals.ThemeStyles.lableProgress.font,
        id: "lblProgress"
    });
    $.__views.progressView.add($.__views.lblProgress);
    $.__views.rowSwitch = Ti.UI.createTableViewRow({
        selectionStyle: 0,
        height: 65,
        id: "rowSwitch"
    });
    __alloyId1.push($.__views.rowSwitch);
    $.__views.basicSwitch1 = Ti.UI.createSwitch({
        value: false,
        top: 24,
        id: "basicSwitch1"
    });
    $.__views.rowSwitch.add($.__views.basicSwitch1);
    $.__views.switchBlack = Ti.UI.createButton({
        height: 40,
        width: 81,
        backgroundImage: "/images/black_uncheck.png",
        left: 14,
        top: 24,
        title: "",
        state: "off",
        id: "switchBlack"
    });
    $.__views.rowSwitch.add($.__views.switchBlack);
    $.__views.switchGreenRed = Ti.UI.createButton({
        height: 40,
        width: 81,
        backgroundImage: "/images/green_check.png",
        right: 14,
        top: 24,
        title: "",
        state: "on",
        id: "switchGreenRed"
    });
    $.__views.rowSwitch.add($.__views.switchGreenRed);
    $.__views.rowButtonBar = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        selectionStyle: 0,
        id: "rowButtonBar"
    });
    __alloyId1.push($.__views.rowButtonBar);
    $.__views.bb1 = Ti.UI.createButtonBar({
        labels: [ "Active", "Label", "Label" ],
        backgroundColor: Alloy.Globals.ThemeStyles.button_bar.backgroundColor,
        font: Alloy.Globals.ThemeStyles.button_bar.font,
        top: 24,
        style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
        height: 40,
        width: 292,
        id: "bb1"
    });
    $.__views.rowButtonBar.add($.__views.bb1);
    $.__views.rowTabbedBar = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        selectionStyle: 0,
        id: "rowTabbedBar"
    });
    __alloyId1.push($.__views.rowTabbedBar);
    $.__views.tb1 = Ti.UI.iOS.createTabbedBar({
        labels: [ "Active", "Label", "Label" ],
        backgroundColor: Alloy.Globals.ThemeStyles.tabbed_bar.backgroundColor,
        font: Alloy.Globals.ThemeStyles.tabbed_bar.font,
        style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
        top: 24,
        height: 40,
        width: 292,
        index: 0,
        id: "tb1"
    });
    $.__views.rowTabbedBar.add($.__views.tb1);
    $.__views.rowButtonMedium = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        selectionStyle: 0,
        id: "rowButtonMedium"
    });
    __alloyId1.push($.__views.rowButtonMedium);
    $.__views.btnSmall1 = Ti.UI.createButton({
        height: 41,
        width: 141,
        font: Alloy.Globals.ThemeStyles.button.font,
        color: Alloy.Globals.ThemeStyles.button.color,
        backgroundImage: "/images/button_blue.png",
        left: 14,
        top: 24,
        title: "Button",
        id: "btnSmall1"
    });
    $.__views.rowButtonMedium.add($.__views.btnSmall1);
    $.__views.btnSmall2 = Ti.UI.createButton({
        height: 41,
        width: 141,
        font: Alloy.Globals.ThemeStyles.button.font,
        color: Alloy.Globals.ThemeStyles.button.color,
        backgroundImage: "/images/button_blue.png",
        right: 14,
        top: 24,
        title: "Button",
        id: "btnSmall2"
    });
    $.__views.rowButtonMedium.add($.__views.btnSmall2);
    $.__views.rowButtonLarge = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        selectionStyle: 0,
        id: "rowButtonLarge"
    });
    __alloyId1.push($.__views.rowButtonLarge);
    $.__views.btnLarge = Ti.UI.createButton({
        height: Alloy.Globals.ThemeStyles.button.height,
        width: 292,
        color: Alloy.Globals.ThemeStyles.button.color,
        font: Alloy.Globals.ThemeStyles.button.font,
        backgroundImage: "/images/button_large_blue.png",
        left: 14,
        right: 14,
        top: 24,
        title: "SEND MESSAGE",
        id: "btnLarge"
    });
    $.__views.rowButtonLarge.add($.__views.btnLarge);
    $.__views.elementsTable = Ti.UI.createTableView({
        showVerticalScrollIndicator: false,
        height: "auto",
        top: 0,
        backgroundColor: "transparent",
        separatorStyle: "none",
        data: __alloyId1,
        id: "elementsTable"
    });
    $.__views.winElements.add($.__views.elementsTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.winElements.setTitleControl(Alloy.createController("titleControl", {
        title: args.title
    }).getView());
    args.isFlyout ? $.winElements.leftNavButton = Alloy.createController("leftMenuButton").getView() : $.winElements.backButtonTitle = "Back";
    $.customSlider.addEventListener("change", function(e) {
        Ti.API.info(Math.round(e.source.value));
    });
    var pBarWidth = Ti.Platform.displayCaps.platformWidth - 28;
    $.lblProgress.text = Math.round(100 * ($.progressView.width / pBarWidth)) + " %";
    $.switchBlack.addEventListener("singletap", function(e) {
        if ("off" == e.source.state) {
            e.source.state = "on";
            $.switchBlack.backgroundImage = "/images/black_check.png";
        } else {
            e.source.state = "off";
            $.switchBlack.backgroundImage = "/images/black_uncheck.png";
        }
    });
    $.switchGreenRed.addEventListener("singletap", function(e) {
        if ("off" == e.source.state) {
            e.source.state = "on";
            e.source.backgroundImage = "/images/green_check.png";
        } else {
            e.source.state = "off";
            e.source.backgroundImage = "/images/red_uncheck.png";
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;