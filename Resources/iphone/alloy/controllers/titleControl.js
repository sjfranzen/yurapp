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
    this.__controllerPath = "titleControl";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.titleView = Ti.UI.createView({
        backgroundColor: "transparent",
        width: Ti.UI.SIZE,
        id: "titleView"
    });
    $.__views.titleView && $.addTopLevelView($.__views.titleView);
    $.__views.lblTitle = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: 18,
            fontFamily: "Montserrat",
            fontWeight: "Bold"
        },
        id: "lblTitle"
    });
    $.__views.titleView.add($.__views.lblTitle);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.lblTitle.text = args.title;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;