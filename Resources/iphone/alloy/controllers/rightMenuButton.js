function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function btnRightMenuClicked() {
        if (args.context.isMenuShown) {
            args.context.isMenuShown = false;
            args.Right_Menu.animate(Alloy.Globals.animations.slide_out_top);
        } else {
            args.Right_Menu.animate(Alloy.Globals.animations.slide_in_top);
            args.context.isMenuShown = true;
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "rightMenuButton";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.btnRightMenu = Ti.UI.createButton({
        width: 24,
        height: 16,
        image: "/images/icon_menu_right.png",
        id: "btnRightMenu"
    });
    $.__views.btnRightMenu && $.addTopLevelView($.__views.btnRightMenu);
    btnRightMenuClicked ? $.__views.btnRightMenu.addEventListener("click", btnRightMenuClicked) : __defers["$.__views.btnRightMenu!click!btnRightMenuClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    __defers["$.__views.btnRightMenu!click!btnRightMenuClicked"] && $.__views.btnRightMenu.addEventListener("click", btnRightMenuClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;