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
    this.__controllerPath = "Home";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.winHome = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.ThemeStyles.win.backgroundColor,
        barColor: Alloy.Globals.ThemeStyles.win.barColor,
        navTintColor: Alloy.Globals.ThemeStyles.win.navTintColor,
        translucent: false,
        id: "winHome"
    });
    $.__views.winHome && $.addTopLevelView($.__views.winHome);
    var __alloyId2 = [];
    $.__views.logoRow = Ti.UI.createTableViewRow({
        selectionStyle: "none",
        id: "logoRow"
    });
    __alloyId2.push($.__views.logoRow);
    $.__views.logoView = Ti.UI.createView({
        top: 0,
        backgroundColor: "transparent",
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "logoView"
    });
    $.__views.logoRow.add($.__views.logoView);
    $.__views.imgLogo = Ti.UI.createImageView({
        image: "/images/home-logo.png",
        height: 95,
        width: 95,
        top: 3,
        id: "imgLogo"
    });
    $.__views.logoView.add($.__views.imgLogo);
    $.__views.lblCompany = Ti.UI.createLabel({
        color: Alloy.Globals.ThemeStyles.home_logo.color,
        text: "Barebone Framework ",
        font: Alloy.Globals.ThemeStyles.home_logo.font,
        id: "lblCompany"
    });
    $.__views.logoView.add($.__views.lblCompany);
    $.__views.buttonRow1 = Ti.UI.createTableViewRow({
        selectionStyle: "none",
        height: 158,
        id: "buttonRow1"
    });
    __alloyId2.push($.__views.buttonRow1);
    $.__views.btnView = Ti.UI.createView({
        top: 18,
        backgroundColor: "transparent",
        height: Ti.UI.SIZE,
        id: "btnView"
    });
    $.__views.buttonRow1.add($.__views.btnView);
    $.__views.buttonRow2 = Ti.UI.createTableViewRow({
        selectionStyle: "none",
        height: 158,
        id: "buttonRow2"
    });
    __alloyId2.push($.__views.buttonRow2);
    $.__views.btnView2 = Ti.UI.createView({
        top: 14,
        backgroundColor: "transparent",
        height: Ti.UI.SIZE,
        id: "btnView2"
    });
    $.__views.buttonRow2.add($.__views.btnView2);
    $.__views.homeTable = Ti.UI.createTableView({
        showVerticalScrollIndicator: false,
        height: "auto",
        backgroundColor: "transparent",
        separatorStyle: "none",
        data: __alloyId2,
        id: "homeTable"
    });
    $.__views.winHome.add($.__views.homeTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var that = this;
    this.isMenuShown = false;
    $.winHome.addEventListener("open", function() {
        Ti.API.info("Home Controller is Opened: ");
        $.winHome.setTitleControl(Alloy.createController("titleControl", {
            title: args.title
        }).getView());
        $.winHome.leftNavButton = Alloy.createController("leftMenuButton").getView();
        $.Right_Menu = Alloy.createController("RightMenu", {
            context: that
        }).getView();
        $.winHome.add($.Right_Menu);
        $.winHome.rightNavButton = Alloy.createController("rightMenuButton", {
            Right_Menu: $.Right_Menu,
            context: that
        }).getView();
        Ti.API.info("Home:: Logo row height is : " + $.logoView.toImage().height);
        $.logoRow.height = $.logoView.toImage().height + 10 * Alloy.Globals.dp;
        Ti.API.info("..............adjusted to : " + $.logoRow.height);
        var btn_news = Alloy.createController("customHomeButton", {
            image: "/images/home-news.png",
            title: "News",
            left: 14
        }).getView();
        btn_news.addEventListener("click", function() {
            var controller = Alloy.createController("News", {
                title: "News",
                isFlyout: false
            });
            var News = controller.getView();
            Alloy.Globals.navGroup.openWindow(News, {
                animated: true
            });
            Alloy.Globals.navGroup.window = News;
        });
        $.btnView.add(btn_news);
        var btn_products = Alloy.createController("customHomeButton", {
            image: "/images/home-products.png",
            title: "Products",
            right: 14
        }).getView();
        btn_products.addEventListener("click", function() {
            var controller = Alloy.createController("Products", {
                title: "Products",
                isFlyout: false
            });
            var Products = controller.getView();
            Alloy.Globals.navGroup.openWindow(Products, {
                animated: true
            });
            Alloy.Globals.navGroup.window = Products;
        });
        $.btnView.add(btn_products);
        var btn_map = Alloy.createController("customHomeButton", {
            image: "/images/home-map.png",
            title: "Map",
            left: 14
        }).getView();
        btn_map.addEventListener("click", function() {
            var controller = Alloy.createController("Map", {
                title: "Map",
                isFlyout: false
            });
            var Map = controller.getView();
            Alloy.Globals.navGroup.openWindow(Map, {
                animated: true
            });
            Alloy.Globals.navGroup.window = Map;
        });
        $.btnView2.add(btn_map);
        var btn_elements = Alloy.createController("customHomeButton", {
            image: "/images/home-elements.png",
            title: "Elements",
            right: 14
        }).getView();
        btn_elements.addEventListener("click", function() {
            var controller = Alloy.createController("Elements", {
                title: "Elements",
                isFlyout: false
            });
            var Elements = controller.getView();
            Alloy.Globals.navGroup.openWindow(Elements, {
                animated: true
            });
            Alloy.Globals.navGroup.window = Elements;
        });
        $.btnView2.add(btn_elements);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;