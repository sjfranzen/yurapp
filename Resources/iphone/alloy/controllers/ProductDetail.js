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
    this.__controllerPath = "ProductDetail";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.winDetail = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.ThemeStyles.win.backgroundColor,
        barColor: Alloy.Globals.ThemeStyles.win.barColor,
        translucent: false,
        navTintColor: Alloy.Globals.ThemeStyles.win.navTintColor,
        backButtonTitle: "Back",
        id: "winDetail"
    });
    $.__views.winDetail && $.addTopLevelView($.__views.winDetail);
    var __alloyId5 = [];
    $.__views.rowImage = Ti.UI.createTableViewRow({
        height: "auto",
        selectionStyle: "none",
        backgroundColor: "transparent",
        id: "rowImage"
    });
    __alloyId5.push($.__views.rowImage);
    var __alloyId6 = [];
    $.__views.scrollableView = Ti.UI.createScrollableView({
        showPagingControl: true,
        pagingControlColor: Alloy.Globals.ThemeStyles.win.backgroundColor,
        height: Ti.UI.SIZE,
        left: 14,
        right: 14,
        top: 10,
        bottom: 10,
        views: __alloyId6,
        id: "scrollableView"
    });
    $.__views.rowImage.add($.__views.scrollableView);
    $.__views.rowTitle = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        selectionStyle: "none",
        backgroundColor: "transparent",
        layout: "vertical",
        id: "rowTitle"
    });
    __alloyId5.push($.__views.rowTitle);
    $.__views.lblName = Ti.UI.createLabel({
        color: Alloy.Globals.ThemeStyles.detail_title.color,
        font: Alloy.Globals.ThemeStyles.detail_title.font,
        top: 0,
        left: 14,
        wordWrap: true,
        height: Ti.UI.SIZE,
        id: "lblName"
    });
    $.__views.rowTitle.add($.__views.lblName);
    $.__views.tagView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "horizontal",
        left: 14,
        id: "tagView"
    });
    $.__views.rowTitle.add($.__views.tagView);
    $.__views.rowDetail = Ti.UI.createTableViewRow({
        height: "auto",
        selectionStyle: "none",
        backgroundColor: "transparent",
        id: "rowDetail"
    });
    __alloyId5.push($.__views.rowDetail);
    $.__views.lblDetail = Ti.UI.createLabel({
        color: Alloy.Globals.ThemeStyles.detail_body.color,
        left: 14,
        right: 14,
        top: 10,
        wordWrap: true,
        font: Alloy.Globals.ThemeStyles.detail_body.font,
        id: "lblDetail"
    });
    $.__views.rowDetail.add($.__views.lblDetail);
    $.__views.detailTable = Ti.UI.createTableView({
        showVerticalScrollIndicator: false,
        height: "auto",
        backgroundColor: "transparent",
        separatorColor: "transparent",
        data: __alloyId5,
        id: "detailTable"
    });
    $.__views.winDetail.add($.__views.detailTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.winDetail.setTitleControl(Alloy.createController("titleControl", {
        title: "Product Detail"
    }).getView());
    var Views = [];
    for (var i = 0; args.ProductItem.pictures.length > i; i++) {
        var picture = args.ProductItem.pictures[i];
        var view = Ti.UI.createView({
            backgroundColor: "transparent",
            height: Ti.UI.SIZE
        });
        var anImageView = Ti.UI.createImageView({
            image: picture,
            height: Alloy.Globals.ThemeStyles.product_slider.height,
            preventDefaultImage: true,
            hires: true
        });
        view.add(anImageView);
        Views.push(view);
    }
    $.scrollableView.views = Views;
    $.lblName.text = args.ProductItem.title;
    for (var i = 0; args.ProductItem.tags.length > i; i++) {
        var lblTag = Ti.UI.createLabel({
            color: Alloy.Globals.ThemeStyles.detail_tags.color,
            font: Alloy.Globals.ThemeStyles.detail_tags.font,
            left: 0
        });
        lblTag.text = i + 1 == args.ProductItem.tags.length ? args.ProductItem.tags[i] : args.ProductItem.tags[i] + ", ";
        $.tagView.add(lblTag);
    }
    $.lblDetail.text = args.ProductItem.body;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;