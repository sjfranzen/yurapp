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
    this.__controllerPath = "customProductView";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.outerView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        bottom: 7,
        top: 7,
        width: 153,
        id: "outerView"
    });
    $.__views.outerView && $.addTopLevelView($.__views.outerView);
    $.__views.innerView = Ti.UI.createView({
        top: 7,
        right: 7,
        bottom: 7,
        left: 7,
        layout: "vertical",
        height: Ti.UI.SIZE,
        backgroundColor: Alloy.Globals.ThemeStyles.products_table_tile.backgroundColor,
        id: "innerView"
    });
    $.__views.outerView.add($.__views.innerView);
    $.__views.imgProduct = Ti.UI.createImageView({
        top: 0,
        width: Alloy.Globals.ThemeStyles.products_table_row.imageWidth,
        height: Alloy.Globals.ThemeStyles.products_table_row.imageHeight,
        hires: true,
        preventDefaultImage: true,
        touchEnabled: false,
        id: "imgProduct"
    });
    $.__views.innerView.add($.__views.imgProduct);
    $.__views.indSmall = Ti.UI.createActivityIndicator({
        style: Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN,
        id: "indSmall"
    });
    $.__views.imgProduct.add($.__views.indSmall);
    $.__views.infoView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "infoView"
    });
    $.__views.innerView.add($.__views.infoView);
    $.__views.lblTitle = Ti.UI.createLabel({
        color: Alloy.Globals.ThemeStyles.feed_table_row_title.color,
        left: 0,
        font: Alloy.Globals.ThemeStyles.feed_table_row_title.font,
        top: 10,
        height: Ti.UI.SIZE,
        wordWrap: true,
        id: "lblTitle"
    });
    $.__views.infoView.add($.__views.lblTitle);
    $.__views.tagView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "horizontal",
        left: 0,
        top: 0,
        id: "tagView"
    });
    $.__views.infoView.add($.__views.tagView);
    $.__views.lblDetail = Ti.UI.createLabel({
        color: Alloy.Globals.ThemeStyles.feed_table_row_teaser.color,
        left: 0,
        right: 14,
        height: 35,
        top: 10,
        font: Alloy.Globals.ThemeStyles.feed_table_row_teaser.font,
        id: "lblDetail"
    });
    $.__views.infoView.add($.__views.lblDetail);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var apiHelper = require("apiHelper");
    $.outerView.left = args.left;
    $.innerView.product = args.product;
    $.lblTitle.product = args.product;
    $.tagView.product = args.product;
    $.lblDetail.product = args.product;
    $.indSmall.show();
    apiHelper.APIGetRequestImage(args.product.thumb, $.imgProduct, $.indSmall, function(e) {
        var status = this.status;
        if (200 == status) {
            var image = e.source.imgView;
            image.setImage(this.responseData);
            e.source.ind.hide();
        }
    });
    $.innerView.addEventListener("touchstart", function() {
        $.innerView.backgroundColor = Alloy.Globals.ThemeStyles.products_table_tile.selectedBackgroundColor;
        $.outerView.backgroundColor = Alloy.Globals.ThemeStyles.products_table_tile.selectedBackgroundColor;
    });
    $.innerView.addEventListener("touchcancel", function() {
        $.innerView.backgroundColor = Alloy.Globals.ThemeStyles.products_table_tile.backgroundColor;
        $.outerView.backgroundColor = "transparent";
    });
    $.innerView.addEventListener("touchend", function() {
        $.innerView.backgroundColor = Alloy.Globals.ThemeStyles.products_table_tile.backgroundColor;
        $.outerView.backgroundColor = "transparent";
    });
    $.innerView.addEventListener("click", function(e) {
        var detailWin = Alloy.createController("ProductDetail", {
            ProductItem: e.source.product
        }).getView();
        Alloy.Globals.navGroup.openWindow(detailWin);
    });
    $.lblTitle.text = args.product.title;
    $.lblDetail.text = args.product.body.length > 37 ? args.product.body.substring(0, 37) + "..." : args.product.body;
    for (var i = 0; args.product.tags.length > i; i++) {
        var lblTag = Ti.UI.createLabel({
            color: Alloy.Globals.ThemeStyles.feed_table_row_tags.color,
            font: Alloy.Globals.ThemeStyles.feed_table_row_tags.font,
            left: 0
        });
        lblTag.text = i + 1 == args.product.tags.length ? args.product.tags[i] : args.product.tags[i] + ", ";
        $.tagView.add(lblTag);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;