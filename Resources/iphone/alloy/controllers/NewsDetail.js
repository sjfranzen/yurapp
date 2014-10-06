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
    this.__controllerPath = "NewsDetail";
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
    var __alloyId4 = [];
    $.__views.rowImage = Ti.UI.createTableViewRow({
        height: "auto",
        selectionStyle: "none",
        backgroundColor: "transparent",
        id: "rowImage"
    });
    __alloyId4.push($.__views.rowImage);
    $.__views.coverImage = Ti.UI.createImageView({
        top: 14,
        right: 14,
        left: 14,
        bottom: 10,
        height: Ti.UI.SIZE,
        width: 292,
        hires: true,
        id: "coverImage"
    });
    $.__views.rowImage.add($.__views.coverImage);
    $.__views.rowTitle = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        selectionStyle: "none",
        backgroundColor: "transparent",
        layout: "vertical",
        id: "rowTitle"
    });
    __alloyId4.push($.__views.rowTitle);
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
    __alloyId4.push($.__views.rowDetail);
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
        data: __alloyId4,
        id: "detailTable"
    });
    $.__views.winDetail.add($.__views.detailTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.winDetail.setTitleControl(Alloy.createController("titleControl", {
        title: "News Detail"
    }).getView());
    $.coverImage.image = args.NewsItem.picture;
    $.lblName.text = args.NewsItem.title;
    for (var i = 0; args.NewsItem.tags.length > i; i++) {
        var lblTag = Ti.UI.createLabel({
            color: Alloy.Globals.ThemeStyles.detail_tags.color,
            font: Alloy.Globals.ThemeStyles.detail_tags.font,
            left: 0
        });
        lblTag.text = i + 1 == args.NewsItem.tags.length ? args.NewsItem.tags[i] : args.NewsItem.tags[i] + ", ";
        $.tagView.add(lblTag);
    }
    $.lblDetail.text = args.NewsItem.body;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;