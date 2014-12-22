var currentUser = Alloy.Models.instance("user");

if (Ti.Platform.Android) {

	var test = Alloy.createController("android/index").getView();

	//test.open();

} else {

	/*

	 * Menu rows will be created here

	 */

	var rows = [];

	_.each(Alloy.Globals.FlyoutMenu, function(item) {

		rows.push(Alloy.createController('flyoutRow', {

			image : item.icon,

			title : item.title,

			name : item.name,

			controller : item.controller

		}).getView());

	});

	if (Alloy.Globals.isIOS7() == "7") {

		$.flyoutTable.top = 18;

	} else {

		$.flyoutTable.top = 0;

	}

	$.flyoutTable.setData(rows);

	/*

	 * Flyout Menu click handling

	 */

	$.flyoutTable.addEventListener('click', function(e) {

		Alloy.Globals.isMenuVisible = false;

		Alloy.Globals.navGroup.animate(Alloy.Globals.animations.right);

		if (e.row.name == '_main_menu') {

			alert('main menu clicked');

		} else if (e.row.name == '_options') {

			alert('option menu clicked');

		} else if (e.row.name == currentWindow) {

			// DO NOTHING MENU WILL HIDE ITSELF.

		} else {

			Ti.API.info('Current Controller: ' + currentWindow);

			Ti.API.info('Selected Controller: ' + e.row.name);

			currentWindow = e.row.name;

			// get the detail controller and window references

			var controller = Alloy.createController(e.row.controller, {

				title : e.row.titleValue,

				name : e.row.name,

				isFlyout : true

			});

			var newWindow = controller.getView();

			Alloy.Globals.navGroup.openWindow(newWindow, {

				animated : true

			});

			Alloy.Globals.navGroup.window = newWindow;

		}

	});

	// start of login code that I am attempting to get to work....

		currentUser.checkUserAuthentication().then(function(success) {
			alert("My session is still good, so I don't have to login.");
			alert(currentUser.id);
			//show the home page
		}, function(error) {
			alert((error && error.message) || "uh oh");
			alert("I need to login.");
			//build a login page
			currentUser.login({
				login : "jayparker_1893",
				password : "password"
			}).then(function success(response) {
				alert("The user logged in!");
				//show the home page
			}, function error(response) {
				alert("error ");
			});
		});
		
		//build the home page
		/*

		 * Main Parent Window open event

		 */

		$.winParent.addEventListener('open', function(e) {

			Ti.API.info('Parent or Menu Window is opened');

			// open the home window

			var homeController = Alloy.createController('Home', {

				title : 'Home',

				name : '_home',

				isFlyout : true

			}).getView();

			Alloy.Globals.navGroup = Titanium.UI.iOS.createNavigationWindow({

				left : 0

			});

			Alloy.Globals.navGroup.window = homeController;

			Alloy.Globals.navGroup.width = 320;

			Alloy.Globals.navGroup.open();

		});

		// set a variable for menu visibility

		Alloy.Globals.isMenuVisible = false;

		// set a variable for current window

		var currentWindow = '_home';

		$.winParent.open();	
}

