function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function createRows(Products) {
        var tableRows = [];
        var row;
        var _left = 7;
        for (var i = 0; Products.length > i; i++) {
            var view1 = Alloy.createController("customProductView", {
                product: Products[i],
                left: _left
            }).getView();
            0 == i && (row = Titanium.UI.createTableViewRow({
                selectionStyle: "none",
                height: Ti.UI.SIZE
            }));
            row.add(view1);
            if (0 == (i - 1) % 2 || i == Products.length - 1) {
                _left = 7;
                tableRows.push(row);
                row = Titanium.UI.createTableViewRow({
                    selectionStyle: "none",
                    height: Ti.UI.SIZE
                });
            } else _left = Ti.Platform.displayCaps.platformWidth / 2;
        }
        return tableRows;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Products";
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        var $model = __processArg(arguments[0], "$model");
        var __itemTemplate = __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.winProduct = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.ThemeStyles.win.backgroundColor,
        navTintColor: Alloy.Globals.ThemeStyles.win.navTintColor,
        barColor: Alloy.Globals.ThemeStyles.win.barColor,
        translucent: false,
        id: "winProduct"
    });
    $.__views.winProduct && $.addTopLevelView($.__views.winProduct);
    $.__views.productTable = Ti.UI.createTableView({
        showVerticalScrollIndicator: false,
        height: "auto",
        backgroundColor: "transparent",
        separatorColor: "#343434",
        id: "productTable"
    });
    $.__views.winProduct.add($.__views.productTable);
    $.__views.ind = Ti.UI.createActivityIndicator({
        style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
        id: "ind"
    });
    $.__views.winProduct.add($.__views.ind);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var apiHelper = require("apiHelper");
    $.winProduct.setTitleControl(Alloy.createController("titleControl", {
        title: args.title
    }).getView());
    args.isFlyout ? $.winProduct.leftNavButton = Alloy.createController("leftMenuButton").getView() : $.winProduct.backButtonTitle = "Back";
    $.winProduct.addEventListener("open", function(e) {
        if (Titanium.Network.online) {
            $.ind.show();
            apiHelper.APIGetRequest(Alloy.Globals.URLS.products_url, function(e) {
                var status = this.status;
                if (200 == status) {
                    var Json = eval("(" + this.responseText + ")");
                    var rows = [];
                    var totalRows = Math.ceil(Json.result.length / 2);
                    rows = createRows(Json.result);
                    $.productTable.setData(rows);
                    $.ind.hide();
                }
            }, function() {
                $.ind.hide();
                alert("Unknow error from api");
            });
        } else alert("No internet connection found");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;