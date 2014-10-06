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
    this.__controllerPath = "flyoutRow";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.row1 = Ti.UI.createTableViewRow({
        height: Alloy.Globals.ThemeStyles.flyout_menu_item.rowHeight,
        backgroundColor: "#292929",
        selectedBackgroundColor: Alloy.Globals.ThemeStyles.flyout_menu_item.selectedBackgroundColor,
        id: "row1"
    });
    $.__views.row1 && $.addTopLevelView($.__views.row1);
    $.__views.iconMenu = Ti.UI.createImageView({
        width: 32,
        height: 32,
        left: 10,
        id: "iconMenu"
    });
    $.__views.row1.add($.__views.iconMenu);
    $.__views.lblTitle = Ti.UI.createLabel({
        color: "#656565",
        left: 24,
        font: {
            fontSize: 18,
            fontFamily: "Montserrat",
            fontWeight: "Regular"
        },
        id: "lblTitle"
    });
    $.__views.row1.add($.__views.lblTitle);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.iconMenu.image = args.image;
    $.row1.name = args.name;
    $.row1.controller = args.controller;
    $.row1.titleValue = args.title;
    var divider = Ti.UI.createView({
        height: 60,
        width: 1,
        backgroundColor: "#343434",
        left: 20 + $.iconMenu.width,
        zIndex: 5
    });
    if ("_main_menu" != args.name) {
        $.row1.add(divider);
        var imgRightDisclosure = Ti.UI.createImageView({
            image: "_options" == args.name ? "/images/ic_arrow_down.png" : "/images/ic_arrow.png",
            height: 32,
            width: 32,
            right: 5
        });
        $.row1.add(imgRightDisclosure);
    }
    $.lblTitle.left = 18 + divider.left;
    $.lblTitle.text = args.title;
    "_options" == args.name && ($.lblTitle.color = "#FFFFFF");
    var separator = Ti.UI.createView({
        height: 1,
        width: "290",
        backgroundColor: "#343434",
        bottom: 0,
        zIndex: 5
    });
    $.row1.add(separator);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;