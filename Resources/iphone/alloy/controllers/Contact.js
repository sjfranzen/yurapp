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
    this.__controllerPath = "Contact";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.winContact = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.ThemeStyles.win.backgroundColor,
        barColor: Alloy.Globals.ThemeStyles.win.barColor,
        navTintColor: Alloy.Globals.ThemeStyles.win.navTintColor,
        translucent: false,
        id: "winContact"
    });
    $.__views.winContact && $.addTopLevelView($.__views.winContact);
    var __alloyId0 = [];
    $.__views.row = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        selectionStyle: "none",
        id: "row"
    });
    __alloyId0.push($.__views.row);
    $.__views.tfname = Ti.UI.createTextField({
        color: "#fff",
        borderColor: Alloy.Globals.ThemeStyles.textfield.borderColor,
        height: Alloy.Globals.ThemeStyles.textfield.height,
        top: 14,
        hintText: "name*",
        left: 14,
        right: 14,
        width: Ti.UI.FILL,
        font: Alloy.Globals.ThemeStyles.textfield.font,
        paddingLeft: 10,
        id: "tfname"
    });
    $.__views.row.add($.__views.tfname);
    $.__views.row = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        selectionStyle: "none",
        id: "row"
    });
    __alloyId0.push($.__views.row);
    $.__views.tfEmail = Ti.UI.createTextField({
        color: Alloy.Globals.ThemeStyles.textfield.color,
        borderColor: Alloy.Globals.ThemeStyles.textfield.borderColor,
        height: Alloy.Globals.ThemeStyles.textfield.height,
        top: 14,
        hintText: "email*",
        left: 14,
        right: 14,
        width: Ti.UI.FILL,
        font: Alloy.Globals.ThemeStyles.textfield.font,
        paddingLeft: 10,
        id: "tfEmail"
    });
    $.__views.row.add($.__views.tfEmail);
    $.__views.row = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        selectionStyle: "none",
        id: "row"
    });
    __alloyId0.push($.__views.row);
    $.__views.tfSubject = Ti.UI.createTextField({
        color: Alloy.Globals.ThemeStyles.textfield.color,
        borderColor: Alloy.Globals.ThemeStyles.textfield.borderColor,
        height: Alloy.Globals.ThemeStyles.textfield.height,
        top: 14,
        hintText: "subject*",
        left: 14,
        right: 14,
        width: Ti.UI.FILL,
        font: Alloy.Globals.ThemeStyles.textfield.font,
        paddingLeft: 10,
        id: "tfSubject"
    });
    $.__views.row.add($.__views.tfSubject);
    $.__views.row = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        selectionStyle: "none",
        id: "row"
    });
    __alloyId0.push($.__views.row);
    $.__views.taMessage = Ti.UI.createTextArea({
        color: Alloy.Globals.ThemeStyles.textarea.color,
        borderColor: Alloy.Globals.ThemeStyles.textarea.borderColor,
        backgroundColor: "transparent",
        height: Alloy.Globals.ThemeStyles.textarea.height,
        top: 14,
        hintText: "message",
        left: 14,
        right: 14,
        font: Alloy.Globals.ThemeStyles.textfield.font,
        width: Ti.UI.FILL,
        paddingLeft: 10,
        id: "taMessage"
    });
    $.__views.row.add($.__views.taMessage);
    $.__views.row = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        selectionStyle: "none",
        id: "row"
    });
    __alloyId0.push($.__views.row);
    $.__views.btnSendMessage = Ti.UI.createView({
        backgroundColor: Alloy.Globals.ThemeStyles.button.backgroundColor,
        height: Alloy.Globals.ThemeStyles.button.height,
        top: 34,
        left: 14,
        right: 14,
        width: Ti.UI.FILL,
        id: "btnSendMessage"
    });
    $.__views.row.add($.__views.btnSendMessage);
    $.__views.lblSendMessage = Ti.UI.createLabel({
        text: "SEND MESSAGE",
        color: Alloy.Globals.ThemeStyles.button.color,
        font: Alloy.Globals.ThemeStyles.button.font,
        touchEnabled: false,
        id: "lblSendMessage"
    });
    $.__views.btnSendMessage.add($.__views.lblSendMessage);
    $.__views.contactTable = Ti.UI.createTableView({
        showVerticalScrollIndicator: false,
        height: "auto",
        backgroundColor: "transparent",
        separatorStyle: "none",
        data: __alloyId0,
        id: "contactTable"
    });
    $.__views.winContact.add($.__views.contactTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.winContact.setTitleControl(Alloy.createController("titleControl", {
        title: args.title
    }).getView());
    args.isFlyout ? $.winContact.leftNavButton = Alloy.createController("leftMenuButton").getView() : $.winContact.backButtonTitle = "Back";
    $.btnSendMessage.addEventListener("touchstart", function() {
        $.btnSendMessage.backgroundColor = Alloy.Globals.ThemeStyles.button.selectedBackgroundColor;
    });
    $.btnSendMessage.addEventListener("touchcancel", function() {
        $.btnSendMessage.backgroundColor = Alloy.Globals.ThemeStyles.button.backgroundColor;
    });
    $.btnSendMessage.addEventListener("touchend", function() {
        $.btnSendMessage.backgroundColor = Alloy.Globals.ThemeStyles.button.backgroundColor;
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;