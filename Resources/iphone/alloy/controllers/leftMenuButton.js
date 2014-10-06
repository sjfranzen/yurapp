function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function btnMenuClicked() {
        if (Alloy.Globals.isMenuVisible) {
            Alloy.Globals.navGroup.animate(Alloy.Globals.animations.right);
            Alloy.Globals.isMenuVisible = false;
        } else {
            Alloy.Globals.navGroup.visible = true;
            Alloy.Globals.navGroup.animate(Alloy.Globals.animations.left);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "leftMenuButton";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.btnMenu = Ti.UI.createButton({
        image: "/images/icon_menu.png",
        id: "btnMenu"
    });
    $.__views.btnMenu && $.addTopLevelView($.__views.btnMenu);
    btnMenuClicked ? $.__views.btnMenu.addEventListener("click", btnMenuClicked) : __defers["$.__views.btnMenu!click!btnMenuClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.btnMenu!click!btnMenuClicked"] && $.__views.btnMenu.addEventListener("click", btnMenuClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;