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
    this.__controllerPath = "Map";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.winMap = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.ThemeStyles.win.backgroundColor,
        barColor: Alloy.Globals.ThemeStyles.win.barColor,
        navTintColor: Alloy.Globals.ThemeStyles.win.navTintColor,
        translucent: false,
        id: "winMap"
    });
    $.__views.winMap && $.addTopLevelView($.__views.winMap);
    var __alloyId3 = [];
    $.__views.mapview = Ti.Map.createView({
        region: {
            latitude: Alloy.Globals.MapData.origin.latitude,
            longitude: Alloy.Globals.MapData.origin.longitude,
            latitudeDelta: .01,
            longitudeDelta: .01
        },
        animate: true,
        regionFit: true,
        userLocation: true,
        annotations: __alloyId3,
        id: "mapview"
    });
    $.__views.winMap.add($.__views.mapview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var that = this;
    this.isMenuShown = false;
    $.winMap.setTitleControl(Alloy.createController("titleControl", {
        title: args.title
    }).getView());
    args.isFlyout ? $.winMap.leftNavButton = Alloy.createController("leftMenuButton").getView() : $.winMap.backButtonTitle = "Back";
    $.Right_Menu = Alloy.createController("RightMenu", {
        context: that
    }).getView();
    $.winMap.add($.Right_Menu);
    $.winMap.rightNavButton = Alloy.createController("rightMenuButton", {
        Right_Menu: $.Right_Menu,
        context: that
    }).getView();
    $.winMap.addEventListener("open", function() {
        var annotations = [];
        var mapdata = Alloy.Globals.MapData;
        for (var i = 0; mapdata.annotations.length > i; i++) {
            var mountainView = Ti.Map.createAnnotation({
                latitude: mapdata.annotations[i].latitude,
                longitude: mapdata.annotations[i].longitude,
                title: mapdata.annotations[i].title,
                subtitle: mapdata.annotations[i].subtitle,
                pincolor: Titanium.Map.ANNOTATION_RED,
                leftButton: "/images/sample_map_image.png",
                animate: false,
                rightButton: Ti.UI.iPhone.SystemButton.DISCLOSURE
            });
            annotations.push(mountainView);
            $.mapview.setAnnotations(annotations);
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;