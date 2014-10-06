var args = arguments[0] || {};
var apiHelper = require('apiHelper');
var that = this;
/*
 * Get and add right menu view
 */
this.rightMenuView = Alloy.createController("adrRightMenu", {
	context : this
}).getView();
$.winProduct.add(this.rightMenuView);
this.isRightMenuShown = false;
/*
 * Get and add right menu button
 */
var rightMenuButton = Alloy.createController("adrRightMenuButton", {
	parentView : this.rightMenuView,
	context : this
}).getView();
/*
 * REQUIRE the headerBar controller
 * we will pass our Home View so we can animate it
 * when we click the menu button
 */
var headerBar = Alloy.createController("adrHeaderBar", {
	parentView : (args.isFlyout) ? $.winProduct : args.parentView,
	title : (args.isFlyout) ? args.menuItem.title : args.title,
	isFlyout : args.isFlyout
}).getView();

headerBar.add(rightMenuButton);
$.winProduct.add(headerBar);
/*
 * Call api function
 */
if (Titanium.Network.online) {
	$.ind.show();
	apiHelper.APIGetRequest(Alloy.Globals.URLS.products_url, function(e) {
		var status = this.status;
		if (status == 200) {
			var Json = eval('(' + this.responseText + ')');
			var rows = [];
			var totalRows = Math.ceil(Json.result.length / 2);
			rows = createRows(Json.result);
			$.productTable.setData(rows);
			$.ind.hide();
		}
	}, function(err) {
		$.ind.hide();
		alert('Unknow error from api');
	});
} else {
	alert('No internet connection found');
}
/*
 * Create product rows dynamically
 */
function createRows(Products) {
	var tableRows = [];
	var row;
	var _left = '7dp';
	for (var i = 0; i < Products.length; i++) {
		var view1 = Alloy.createController('adrCustomProductView', {
			product : Products[i],
			left : _left
		}).getView();

		if (i == 0) {
			row = Titanium.UI.createTableViewRow({
				backgroundSelectedColor : 'transparent',
				height : Ti.UI.SIZE
			});
		}
		row.add(view1);
		if (((i - 1) % 2 == 0) || (i == Products.length - 1)) {
			_left = '7dp';
			tableRows.push(row);
			row = Titanium.UI.createTableViewRow({
				backgroundSelectedColor : 'transparent',
				height : Ti.UI.SIZE
			});
		} else {
			_left = (Ti.Platform.displayCaps.platformWidth / 2);
		}

	};
	return tableRows;
}
