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
    this.__controllerPath = "adrHome";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.winHome = Ti.UI.createView({
        backgroundColor: Alloy.Globals.ThemeStyles.win.backgroundColor,
        id: "winHome"
    });
    $.__views.winHome && $.addTopLevelView($.__views.winHome);
    var __alloyId0 = [];
    $.__views.logoRow = Ti.UI.createTableViewRow({
        selectionStyle: "none",
        id: "logoRow"
    });
    __alloyId0.push($.__views.logoRow);
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
        height: "95dp",
        width: "95dp",
        top: "3dp",
        id: "imgLogo"
    });
    $.__views.logoView.add($.__views.imgLogo);
    $.__views.lblCompany = Ti.UI.createLabel({
        color: Alloy.Globals.ThemeStyles.home_logo.color,
        text: "BAREBONE CORPORATION",
        font: Alloy.Globals.ThemeStyles.home_logo.font,
        id: "lblCompany"
    });
    $.__views.logoView.add($.__views.lblCompany);
    $.__views.buttonRow1 = Ti.UI.createTableViewRow({
        selectionStyle: "none",
        height: Ti.UI.SIZE,
        id: "buttonRow1"
    });
    __alloyId0.push($.__views.buttonRow1);
    $.__views.btnView = Ti.UI.createView({
        backgroundColor: "transparent",
        height: Ti.UI.SIZE,
        id: "btnView"
    });
    $.__views.buttonRow1.add($.__views.btnView);
    $.__views.buttonRow2 = Ti.UI.createTableViewRow({
        selectionStyle: "none",
        height: Ti.UI.SIZE,
        id: "buttonRow2"
    });
    __alloyId0.push($.__views.buttonRow2);
    $.__views.btnView2 = Ti.UI.createView({
        backgroundColor: "transparent",
        height: Ti.UI.SIZE,
        id: "btnView2"
    });
    $.__views.buttonRow2.add($.__views.btnView2);
    $.__views.homeTable = Ti.UI.createTableView({
        showVerticalScrollIndicator: false,
        height: "auto",
        top: "48dp",
        backgroundColor: "transparent",
        separatorColor: "transparent",
        data: __alloyId0,
        id: "homeTable"
    });
    $.__views.winHome.add($.__views.homeTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var that = this;
    var headerBar = Alloy.createController("adrHeaderBar", {
        parentView: $.winHome,
        title: args.menuItem.title,
        isFlyout: true
    }).getView();
    this.rightMenuView = Alloy.createController("adrRightMenu", {
        context: that
    }).getView();
    $.winHome.add(this.rightMenuView);
    this.isRightMenuShown = false;
    var rightMenuButton = Alloy.createController("adrRightMenuButton", {
        parentView: this.rightMenuView,
        context: that
    }).getView();
    headerBar.add(rightMenuButton);
    $.winHome.add(headerBar);
    $.btnView.top = 18 * Alloy.Globals.dp;
    $.btnView2.top = 10 * Alloy.Globals.dp;
    Ti.API.info("Home:: Logo row height is : " + $.logoView.toImage().height);
    $.logoRow.height = $.logoView.toImage().height + 10 * Alloy.Globals.dp;
    Ti.API.info("..............adjusted to : " + $.logoRow.height);
    var btn_news = Alloy.createController("adrCustomHomeButton", {
        image: "/images/home-news.png",
        title: "News",
        left: 14 * Alloy.Globals.dp
    }).getView();
    btn_news.addEventListener("click", function() {
        var NewsWin = Ti.UI.createWindow({
            backgroundColor: Alloy.Globals.ThemeStyles.win.backgroundColor,
            zIndex: 20,
            exitOnClose: false,
            navBarHidden: true,
            orientationModes: [ Ti.UI.PORTRAIT ]
        });
        var newsView = Alloy.createController("adrNews", {
            parentView: NewsWin,
            isFlyout: false,
            title: "News"
        }).getView();
        NewsWin.add(newsView);
        NewsWin.open();
    });
    $.btnView.add(btn_news);
    var btn_products = Alloy.createController("adrCustomHomeButton", {
        image: "/images/home-products.png",
        title: "Products",
        right: 14 * Alloy.Globals.dp
    }).getView();
    btn_products.addEventListener("click", function() {
        var ProductsWin = Ti.UI.createWindow({
            backgroundColor: Alloy.Globals.ThemeStyles.win.backgroundColor,
            zIndex: 20,
            exitOnClose: false,
            navBarHidden: true,
            orientationModes: [ Ti.UI.PORTRAIT ]
        });
        var productsView = Alloy.createController("adrProducts", {
            parentView: ProductsWin,
            isFlyout: false,
            title: "Products"
        }).getView();
        ProductsWin.add(productsView);
        ProductsWin.open();
    });
    $.btnView.add(btn_products);
    var btn_map = Alloy.createController("adrCustomHomeButton", {
        image: "/images/home-map.png",
        title: "Map",
        left: 14 * Alloy.Globals.dp
    }).getView();
    btn_map.addEventListener("click", function() {
        var MapWin = Ti.UI.createWindow({
            backgroundColor: Alloy.Globals.ThemeStyles.win.backgroundColor,
            zIndex: 20,
            exitOnClose: false,
            navBarHidden: true,
            orientationModes: [ Ti.UI.PORTRAIT ]
        });
        var mapView = Alloy.createController("adrMap", {
            parentView: MapWin,
            isFlyout: false,
            title: "Map"
        }).getView();
        MapWin.add(mapView);
        MapWin.open();
    });
    $.btnView2.add(btn_map);
    var btn_elements = Alloy.createController("adrCustomHomeButton", {
        image: "/images/home-elements.png",
        title: "Elements",
        right: 14 * Alloy.Globals.dp
    }).getView();
    btn_elements.addEventListener("click", function() {
        var ElementWin = Ti.UI.createWindow({
            backgroundColor: Alloy.Globals.ThemeStyles.win.backgroundColor,
            zIndex: 20,
            exitOnClose: false,
            navBarHidden: true,
            orientationModes: [ Ti.UI.PORTRAIT ]
        });
        var mapView = Alloy.createController("adrElements", {
            parentView: ElementWin,
            isFlyout: false,
            title: "Elements"
        }).getView();
        ElementWin.add(mapView);
        ElementWin.open();
    });
    $.btnView2.add(btn_elements);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;