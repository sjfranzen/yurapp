var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.isIOS7 = function() {
    var version = Titanium.Platform.version.split(".");
    return version[0];
};

Alloy.Globals.dp = Titanium.Platform.Android ? Ti.Platform.displayCaps.dpi / 160 : 1;

Alloy.Globals.menuVisible = false;

Alloy.Globals.URLS = {
    news_url: "http://skounis.s3.amazonaws.com/mobile-apps/barebone/news.json",
    products_url: "http://skounis.s3.amazonaws.com/mobile-apps/barebone/products.json"
};

Alloy.Globals.navWindows = [];

Ti.Map = require("ti.map");

Alloy.Globals.animations = {
    left: {
        left: 275,
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
        duration: 200
    },
    right: {
        left: 0,
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
        duration: 200
    },
    slide_out_top: Titanium.UI.createAnimation({
        top: Ti.Platform.Android ? "-320dp" : -320
    }),
    slide_in_top: Titanium.UI.createAnimation({
        top: Ti.Platform.Android ? "48dp" : 0
    })
};

Alloy.Globals.ThemeStyles = {
    navTintColor: "#fff",
    win: {
        backgroundColor: "#232323",
        barColor: "7" == Alloy.Globals.isIOS7() ? "#464646" : "#232323",
        separatorColor: "#343434",
        navTintColor: "#fff"
    },
    flyout_menu: {
        backgroundColor: "#292929"
    },
    flyout_menu_item: {
        font: {
            fontSize: "18dp",
            fontFamily: "Montserrat",
            fontWeight: "Regular"
        },
        rowHeight: 60 * Alloy.Globals.dp,
        selectedBackgroundColor: "#8c5e7a",
        verticalDividerColor: "#343434",
        rowSeparatorColor: "#343434"
    },
    right_menu: {
        color: "#66565",
        backgroundColor: "#292929",
        selectedBackgroundColor: "#8c5e7a",
        rowSeparatorColor: "#343434",
        font: {
            fontSize: "18dp",
            fontFamily: "Montserrat",
            fontWeight: "Regular"
        },
        width: 175,
        rowHeight: 48
    },
    home_logo: {
        color: "#ffffff",
        font: {
            fontSize: "18dp",
            fontFamily: "Montserrat",
            fontWeight: "Regular"
        }
    },
    home_button: {
        color: "#ffffff",
        backgroundColor: "#579aa9",
        selectedBackgroundColor: "#8c5e7a",
        font: {
            fontSize: "18dp",
            fontFamily: "Montserrat",
            fontWeight: "Regular"
        }
    },
    feed_table_row: {
        imageWidth: "96dp",
        backgroundColor: "transparent",
        selectedBackgroundColor: "#8c5e7a"
    },
    feed_table_row_teaser: {
        font: {
            fontSize: "14dp",
            fontFamily: "Montserrat",
            fontWeight: "Regular"
        },
        color: "#bdbdbd"
    },
    feed_table_row_title: {
        color: "#ffffff",
        font: {
            fontSize: "15dp",
            fontFamily: "Montserrat",
            fontWeight: "Regular"
        }
    },
    feed_table_row_tags: {
        color: "#4f4f4f",
        font: {
            fontSize: "11dp",
            fontFamily: "Montserrat",
            fontWeight: "Regular"
        }
    },
    products_table: {},
    products_table_row: {
        imageWidth: 139 * Alloy.Globals.dp,
        imageHeight: "139dp"
    },
    products_table_tile: {
        backgroundColor: "#232323",
        selectedBackgroundColor: "#8c5e7a"
    },
    product: {},
    product_slider: {
        height: "180dp"
    },
    detail_title: {
        color: "#ffffff",
        font: {
            fontSize: "28dp",
            fontFamily: "Montserrat",
            fontWeight: "Regular"
        }
    },
    detail_tags: {
        color: "#4f4f4f",
        font: {
            fontSize: "13dp",
            fontFamily: "Montserrat",
            fontWeight: "Regular"
        }
    },
    detail_body: {
        color: "#bdbdbd",
        font: {
            fontSize: "15dp",
            fontFamily: "Montserrat",
            fontWeight: "Regular"
        }
    },
    textfield: {
        color: "#000000",
        backgroundColor: "#fff",
        placeholderColor: "#656565",
        borderColor: "#2e2e2e",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 5,
        height: "35dp",
        font: {
            fontSize: "18dp",
            fontFamily: "Montserrat",
            fontWeight: "Regular"
        }
    },
    textarea: {
        color: "#000000",
        backgroundColor: "#fff",
        placeholderColor: "#656565",
        borderColor: "#2e2e2e",
        height: "143dp",
        font: {
            fontSize: "18dp",
            fontFamily: "Montserrat",
            fontWeight: "Regular"
        }
    },
    lableProgress: {
        color: "#fff",
        font: {
            fontSize: "14dp",
            fontFamily: "Montserrat",
            fontWeight: "Regular"
        }
    },
    button_bar: {
        backgroundColor: "#447d89",
        font: {
            fontSize: 16,
            fontFamily: "Montserrat",
            fontWeight: "Regular"
        }
    },
    tabbed_bar: {
        backgroundColor: "#775068",
        font: {
            fontSize: 16,
            fontFamily: "Montserrat",
            fontWeight: "Regular"
        }
    },
    button: {
        color: "#ffffff",
        backgroundColor: "#579aa9",
        selectedBackgroundColor: "#8c5e7a",
        height: "55dp",
        font: {
            fontSize: "18dp",
            fontFamily: "Montserrat",
            fontWeight: "Regular"
        }
    }
};

Alloy.Globals.MapData = {
    origin: {
        latitude: 37.407,
        longitude: -122.1
    },
    annotations: [ {
        picture: "http://lorempixel.com/100/76/",
        title: "eros",
        subtitle: "Molestie et wisi.",
        body: "Lobortis elit lobortis illum accumsan nibh, et facilisis eros zzril lorem, dignissim autem erat feugait. Delenit, ut illum.",
        latitude: 37.405,
        longitude: -122.1
    }, {
        picture: "http://lorempixel.com/100/76/",
        title: "Ullamcorper eros.",
        subtitle: "Ex consequat.",
        body: "Volutpat ex diam elit facilisi feugait, et odio qui aliquip.",
        latitude: 37.41,
        longitude: -122.1
    } ]
};

Alloy.Globals.FlyoutMenu = [ {
    title: "MAIN MENU",
    name: "_main_menu",
    controller: "",
    color: "#f6f6f6",
    icon: "/images/ic_menu.png",
    iconAndroid: "/images/ic_menu.png",
    rowBackgroundColor: "#292929",
    isHeader: true
}, {
    title: "Home",
    name: "_home",
    controller: Ti.Platform.Android ? "adrHome" : "Home",
    color: "#656565",
    icon: "/images/ic_home.png",
    iconAndroid: "/images/ic_home.png",
    rowBackgroundColor: "#292929"
}, {
    title: "News",
    name: "_news",
    controller: Titanium.Platform.Android ? "adrNews" : "News",
    color: "#656565",
    icon: "/images/ic_news.png",
    iconAndroid: "/images/ic_news.png",
    rowBackgroundColor: "#292929"
}, {
    title: "Products",
    name: "_products",
    controller: Titanium.Platform.Android ? "adrProducts" : "Products",
    color: "#656565",
    icon: "/images/ic_products.png",
    iconAndroid: "/images/ic_products.png",
    rowBackgroundColor: "#292929"
}, {
    title: "Map",
    name: "_map",
    controller: Titanium.Platform.Android ? "adrMap" : "Map",
    color: "#656565",
    icon: "/images/ic_map.png",
    iconAndroid: "/images/ic_map.png",
    rowBackgroundColor: "#292929"
}, {
    title: "Contact",
    name: "_contact",
    controller: Titanium.Platform.Android ? "adrContact" : "Contact",
    color: "#656565",
    icon: "/images/ic_contact.png",
    iconAndroid: "/images/ic_contact.png",
    rowBackgroundColor: "#292929"
}, {
    title: "Elements",
    name: "_elements",
    controller: Ti.Platform.Android ? "adrElements" : "Elements",
    color: "#656565",
    icon: "/images/ic_elements.png",
    iconAndroid: "/images/ic_elements.png",
    rowBackgroundColor: "#292929"
}, {
    title: "More Options",
    name: "_options",
    controller: "",
    color: "#656565",
    icon: "/images/ic_more_option.png",
    iconAndroid: "/images/ic_more_option.png",
    rowBackgroundColor: "#8c5e7a",
    isHeader: true
}, {
    title: "Products Views",
    name: "_products",
    controller: Titanium.Platform.Android ? "adrProductsView" : "Products",
    color: "#656565",
    icon: "/images/ic_products.png",
    iconAndroid: "/images/ic_products.png",
    rowBackgroundColor: "#292929"
}, {
    title: "Settings",
    name: "_setting",
    controller: Ti.Platform.Android ? "adrSetting" : "Setting",
    color: "#656565",
    icon: "/images/ic_settings.png",
    iconAndroid: "/images/ic_settings.png",
    rowBackgroundColor: "#292929"
} ];

Alloy.Globals.rightMenuItems = [ {
    title: "Menu Item 1",
    color: "#656565"
}, {
    title: "Menu Item 2",
    color: "#656565"
}, {
    title: "More Options",
    color: "#656565"
}, {
    title: "Settings",
    color: "#FFFFFF",
    controller: Ti.Platform.Android ? "adrSetting" : "Setting"
} ];

Alloy.createController("index");