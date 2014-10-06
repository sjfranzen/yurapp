var args = arguments[0] || {};
var that = this;
// REQUIRE THE HEADER BAR FROM headerBar controller
// we will pass our Home View so we can animate it when we click the menu button
var headerBar = Alloy.createController("adrHeaderBar", {
	parentView : $.winHome,
	title : args.menuItem.title,
	isFlyout : true
}).getView();

/*
 * Get and add right menu view
 */
this.rightMenuView = Alloy.createController("adrRightMenu", {
	context : that
}).getView();
$.winHome.add(this.rightMenuView);
this.isRightMenuShown = false;
/*
 * Get and add right menu button
 */
var rightMenuButton = Alloy.createController("adrRightMenuButton", {
	parentView : this.rightMenuView,
	context : that
}).getView();
headerBar.add(rightMenuButton);

$.winHome.add(headerBar);
// set top of button containers
$.btnView.top = 18 * Alloy.Globals.dp;
$.btnView2.top = 10 * Alloy.Globals.dp;

//
// Logo View height 
//
Ti.API.info('Home:: Logo row height is : ' + $.logoView.toImage().height);
$.logoRow.height = $.logoView.toImage().height + 10 * Alloy.Globals.dp;
Ti.API.info('..............adjusted to : ' + $.logoRow.height);
//
// News
//
var btn_news = Alloy.createController('adrCustomHomeButton', {
	image : '/images/home-news.png',
	title : 'News',
	left : 14 * Alloy.Globals.dp
}).getView();

btn_news.addEventListener('click', function(e) {
	var NewsWin = Ti.UI.createWindow({
		backgroundColor : Alloy.Globals.ThemeStyles.win.backgroundColor,
		zIndex : 20,
		exitOnClose : false,
		navBarHidden : true,
		orientationModes : [Ti.UI.PORTRAIT]
	});

	var newsView = Alloy.createController('adrNews', {
		parentView : NewsWin,
		isFlyout : false,
		title : 'News'
	}).getView();
	NewsWin.add(newsView);

	NewsWin.open();
});

$.btnView.add(btn_news);

//
// Products
//
var btn_products = Alloy.createController('adrCustomHomeButton', {
	image : '/images/home-products.png',
	title : 'Products',
	right : 14 * Alloy.Globals.dp
}).getView();

btn_products.addEventListener('click', function(e) {
	var ProductsWin = Ti.UI.createWindow({
		backgroundColor : Alloy.Globals.ThemeStyles.win.backgroundColor,
		zIndex : 20,
		exitOnClose : false,
		navBarHidden : true,
		orientationModes : [Ti.UI.PORTRAIT]
	});

	var productsView = Alloy.createController('adrProducts', {
		parentView : ProductsWin,
		isFlyout : false,
		title : 'Products'
	}).getView();
	ProductsWin.add(productsView);

	ProductsWin.open();
});

$.btnView.add(btn_products);

//
// Map
//
var btn_map = Alloy.createController('adrCustomHomeButton', {
	image : '/images/home-map.png',
	title : 'Map',
	left : 14 * Alloy.Globals.dp
}).getView();

btn_map.addEventListener('click', function(e) {
	var MapWin = Ti.UI.createWindow({
		backgroundColor : Alloy.Globals.ThemeStyles.win.backgroundColor,
		zIndex : 20,
		exitOnClose : false,
		navBarHidden : true,
		orientationModes : [Ti.UI.PORTRAIT]
	});

	var mapView = Alloy.createController('adrMap', {
		parentView : MapWin,
		isFlyout : false,
		title : 'Map'
	}).getView();
	MapWin.add(mapView);

	MapWin.open();
});

$.btnView2.add(btn_map);
//
// Elements
//
var btn_elements = Alloy.createController('adrCustomHomeButton', {
	image : '/images/home-elements.png',
	title : 'Elements',
	right : 14 * Alloy.Globals.dp
}).getView();

btn_elements.addEventListener('click', function(e) {
	var ElementWin = Ti.UI.createWindow({
		backgroundColor : Alloy.Globals.ThemeStyles.win.backgroundColor,
		zIndex : 20,
		exitOnClose : false,
		navBarHidden : true,
		orientationModes : [Ti.UI.PORTRAIT]
	});

	var mapView = Alloy.createController('adrElements', {
		parentView : ElementWin,
		isFlyout : false,
		title : 'Elements'
	}).getView();
	ElementWin.add(mapView);

	ElementWin.open();
});

$.btnView2.add(btn_elements);
