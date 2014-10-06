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
    this.__controllerPath = "News";
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        var $model = __processArg(arguments[0], "$model");
        var __itemTemplate = __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.winNews = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.ThemeStyles.win.backgroundColor,
        title: "Feeds",
        navTintColor: Alloy.Globals.ThemeStyles.win.navTintColor,
        barColor: Alloy.Globals.ThemeStyles.win.barColor,
        translucent: false,
        id: "winNews"
    });
    $.__views.winNews && $.addTopLevelView($.__views.winNews);
    $.__views.newsTable = Ti.UI.createTableView({
        showVerticalScrollIndicator: false,
        height: "auto",
        backgroundColor: "transparent",
        separatorColor: "transparent",
        id: "newsTable"
    });
    $.__views.winNews.add($.__views.newsTable);
    $.__views.ind = Ti.UI.createActivityIndicator({
        style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
        id: "ind"
    });
    $.__views.winNews.add($.__views.ind);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var apiHelper = require("apiHelper");
    var that = this;
    this.isMenuShown = false;
    $.winNews.setTitleControl(Alloy.createController("titleControl", {
        title: args.title
    }).getView());
    args.isFlyout ? $.winNews.leftNavButton = Alloy.createController("leftMenuButton").getView() : $.winNews.backButtonTitle = "Back";
    $.Right_Menu = Alloy.createController("RightMenu", {
        context: that
    }).getView();
    $.winNews.add($.Right_Menu);
    $.winNews.rightNavButton = Alloy.createController("rightMenuButton", {
        Right_Menu: $.Right_Menu,
        context: that
    }).getView();
    $.winNews.addEventListener("open", function(e) {
        if (Titanium.Network.online) {
            $.ind.show();
            apiHelper.APIGetRequest(Alloy.Globals.URLS.news_url, function(e) {
                var status = this.status;
                if (200 == status) {
                    var Json = eval("(" + this.responseText + ")");
                    var rows = [];
                    for (var i = 0; Json.result.length > i; i++) rows.push(Alloy.createController("newsRow", {
                        NewsItem: Json.result[i]
                    }).getView());
                    $.newsTable.setData(rows);
                    $.ind.hide();
                }
            }, function() {
                $.ind.hide();
                alert("Unknow error from api");
            });
        } else alert("No internet connection found");
    });
    $.newsTable.addEventListener("click", function(e) {
        var detailWin = Alloy.createController("NewsDetail", {
            NewsItem: e.row.NewsItem
        }).getView();
        Alloy.Globals.navGroup.openWindow(detailWin);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;