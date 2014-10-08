var STR = require("alloy/string");

function S4() {
        return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
}

function guid() {
        return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

function InitAdapter(config) {
        Cloud = require("ti.cloud"), Cloud.debug = !0, config.Cloud = Cloud;
}

function Sync(method, model, opts) {
        var object_name = model.config.adapter.collection_name;
        var isCustomObject = model.config.adapter.custom;
        var object_method = isCustomObject ? Cloud['Objects'] : Cloud[STR.ucfirst(object_name)];
        object_name = isCustomObject ? object_name.replace(/s$/i, '') : object_name;

        Ti.API.info("method " + method);

        switch (method) {
                case "create":
                        // stick attributes into the params variable
                        var params = {};
                        // if custom object then set the classname in params variable
                        if (isCustomObject === true) {
                                params['fields'] = model.toJSON();
                                params['classname'] = object_name;
                        } else {
                                params = model.toJSON();
                        }

                        // bad hack to call "add" instead of "create"
                        if (object_name === "friends") {

                                //12/6 - this is a temporary hack until the correct method is implemented
                                if (params["remove"] == true) {
                                        object_method.remove(params, function(e) {
                                                //Ti.API.info(JSON.stringify(e));
                                                try {
                                                        if (e.success) {

                                                                //user object isn't returned when deleting
                                                                model.meta = e.meta;
                                                                opts.success && opts.success(model), model.trigger("fetch");

                                                                //opts.success && opts.success(e[object_name][0]), model.trigger("fetch");

                                                                return;
                                                        }

                                                        model.meta = e.meta;
                                                        model.errorMessage = e.message;
                                                        opts.error && opts.success(e.error && e.message || e);
                                                } catch(ex) {
                                                        Ti.API.error(ex);
                                                }

                                        });

                                } else {
                                        object_method.add(params, function(e) {
                                                //Ti.API.info(JSON.stringify(e));
                                                try {

                                                        //12/6 - this is a temporary hack until the correct method is implemented
                                                        if (e.success) {
                                                                model.meta = e.meta;
                                                                opts.success && opts.success(model), model.trigger("fetch");

                                                                return;
                                                        }
                                                        /*
                                                         if (e.success) {
                                                         model.meta = e.meta;
                                                         opts.success && opts.success(e[object_name][0]), model.trigger("fetch");
                                                         return;
                                                         }
                                                         */

                                                        model.meta = e.meta;
                                                        model.errorMessage = e.message;
                                                        opts.error && opts.error(e.error && e.message || e);
                                                } catch(ex) {
                                                        Ti.API.error(ex);
                                                }

                                        });
                                }
                        } else if (object_name === "acls") {
                                // bad hack, for some reason object_name === acls causes object_method to be undefined
                                if (params["addUser"] == true) {
                                        Cloud["ACLs"].addUser(params, function(e) {
                                                if (e.success) {
                                                        model.meta = e.meta;
                                                        opts.success && opts.success(e[object_name][0]), model.trigger("fetch");
                                                        return;
                                                }
                                                Ti.API.error(e);
                                                model.errorMessage = e.message;
                                                opts.error && opts.error(e.error && e.message || e);
                                        });
                                        
                                } else if (params["removeUser"] == true) {
                                        Cloud["ACLs"].removeUser(params, function(e) {
                                                if (e.success) {
                                                        model.meta = e.meta;
                                                        opts.success && opts.success(e[object_name][0]), model.trigger("fetch");
                                                        return;
                                                }
                                                Ti.API.error(e);
                                                model.errorMessage = e.message;
                                                opts.error && opts.error(e.error && e.message || e);
                                        });

                                } else {

                                        Cloud["ACLs"].create(params, function(e) {
                                                if (e.success) {
                                                        model.meta = e.meta;
                                                        opts.success && opts.success(e[object_name][0]), model.trigger("fetch");
                                                        return;
                                                }
                                                Ti.API.error(e);
                                                model.errorMessage = e.message;
                                                opts.error && opts.error(e.error && e.message || e);
                                        });
                                }
                        } else {
                                object_method.create(params, function(e) {
                                        if (e.success) {
                                                model.meta = e.meta;
                                                opts.success && opts.success(e[object_name][0]), model.trigger("fetch");
                                                return;
                                        }
                                        model.meta = e;
                                        Ti.API.error(e);
                                        model.errorMessage = e.message;
                                        opts.error && opts.error(e.error && e.message || e);
                                });
                        }
                        break;
                case "read":
                        var id_name = object_name.replace(/s+$/, "") + "_id", params = {};
                        params[id_name] = model.id = opts.id || model.id;

                        if (isCustomObject === true) {
                                !opts.data ? opts.data = {} : opts.data;
                                opts.data['classname'] = object_name;
                                opts.data['id'] = model.id;
                        } else {
                                id_name = object_name.replace(/s+$/, "") + "_id";
                                model.id && (opts.data[id_name] = model.id);
                        }

                        if (model.id) {
                                getObject(model, opts);
                        } else if (opts && opts.data && opts.data.q) {
                                searchObjects(model, opts);
                        } else {
                                getObjects(model, opts);
                        }
                        break;
                case "update":
                        //Ti.API.info(' updating object with id ' + model.id);

                        var opt = {}, params = model.toJSON(), id_name = object_name.replace(/s+$/, "") + "_id";
                        if (model.config.adapter.custom === !0) {
                                opt.classname = object_name;
                                opt.id = model.id;
                                opt.fields = JSON.stringify(model.toJSON());
                                params = opt;
                        } else {
                                id_name = object_name.replace(/s+$/, "") + "_id";
                                params[id_name] = model.id;
                        }
                        
                        /// -- Hack to avoid invalid oAuth signature error on ACS (Freddy) 
                        /// If params.photo is a TiBlob object, I need to unset this field to avoid the invalid OAuth error.
                        /// Assuming that we params.photo contains a JSON array with the ACS representation of an already created photo.
                        /// TODO: I'm only checking for the mimeType function of TiBlob's. Must have more robust validation
                        if( params['photo']!==null && typeof(params['photo'])==='object' && !params['photo'].mimeType){
                                delete params['photo'];
                        }

                        object_method.update(params, function(e) {
                                if (e.success) {
                                        model.meta = e.meta;
                                        opts.success && opts.success(e[object_name][0]), model.trigger("fetch");
                                        return;
                                }
                                Ti.API.error(e);
                                model.errorMessage = e.message;
                                opts.error && opts.error(e.error && e.message || e);
                        }), model.trigger("fetch");
                        break;
                case "delete":
                        var id_name = "";
                        var params = {};

                        if (model.config.adapter.custom === true) {
                                params['classname'] = object_name;
                                params['id'] = model.id;
                        } else {
                                id_name = object_name.replace(/s+$/, "") + "_id";
                                params[id_name] = model.id;
                        }
                        
                        object_method.remove(params, function(e) {
                                if (e.success) {
                                        model.meta = e.meta;
                                        opts.success && opts.success({}), model.trigger("fetch");
                                        return;
                                }
                                Ti.API.error(e);
                                model.errorMessage = e.message;
                                opts.error && opts.error(e.error && e.message || e);
                        });
        }
}

function getObject(_model, _opts) {
        //Ti.API.info("getObject");
        var object_name = _model.config.adapter.collection_name;
        var isCustomObject = _model.config.adapter.custom;
        var object_method = isCustomObject ? Cloud['Objects'] : Cloud[STR.ucfirst(object_name)];
        object_name = isCustomObject ? object_name.replace(/s$/i, '') : object_name;

        //Ti.API.info(" searching for object id " + JSON.stringify(_opts.data));
        object_method.show(_opts.data, function(e) {
                if (e.success) {
                        if (_model.id) {
                                _model.meta = e.meta;
                                _opts.success && _opts.success(e[object_name][0]), _model.trigger("fetch");
                                return;
                        }
                } else {
                        Ti.API.error(e);
                        _model.errorJSON = e;
                        _model.errorMessage = e.message;
                        _opts.error && _opts.error(e.error && e.message || e);
                }
        });
}

function getObjects(_model, _opts) {
        //Ti.API.info("getObjects");
        var object_name = _model.config.adapter.collection_name;
        var isCustomObject = _model.config.adapter.custom;
        var object_method = isCustomObject ? Cloud['Objects'] : Cloud[STR.ucfirst(object_name)];
        object_name = isCustomObject ? object_name.replace(/s$/i, '') : object_name;

        if (isCustomObject === true) {
                !_opts.data ? _opts.data = {} : _opts.data;
                _opts.data['classname'] = object_name;
        }//debugger
       
        object_method.query((_opts.data || {}), function(e) {
                if (e.success) {

                        if (object_name == "friends") {
                                object_name = "users";
                        }

                        var retArray = [];
                        for (var i in e[object_name]) {
                                retArray.push(e[object_name][i]);
                        }
                        _model.meta = e.meta;
                        _opts.success && _opts.success(retArray), _model.trigger("fetch");
                        return;
                } else {
                	_model.errorJSON = e;
                	Ti.API.info(JSON.stringify(_opts.data));
                        Ti.API.error(e);
                        _model.errorMessage = e.message;
                        _opts.error && _opts.error(e.error && e.message || e);
                }
        });
}

function searchObjects(_model, _opts) {
        //Ti.API.info("searchObjects");
        var object_name = _model.config.adapter.collection_name;
        var isCustomObject = _model.config.adapter.custom;
        var object_method = isCustomObject ? Cloud['Objects'] : Cloud[STR.ucfirst(object_name)];
        object_name = isCustomObject ? object_name.replace(/s$/i, '') : object_name;

        if (isCustomObject === true) {
                !_opts.data ? _opts.data = {} : _opts.data;
                _opts.data['classname'] = object_name;
        }

        object_method.search(_opts.data, function(e) {
                if (e.success) {

                        if (object_name == "friends") {
                                object_name = "users";
                        }

                        var retArray = [];
                        for (var i in e[object_name]) {
                                //Ti.API.info(e[object_name][i]);
                                retArray.push(e[object_name][i]);
                        }
                        _model.meta = e.meta;
                        _opts.success && _opts.success(retArray), _model.trigger("fetch");
                        return;
                } else {
                        Ti.API.error(e);
                        _model.errorJSON = e;
                        _model.errorMessage = e.message;
                        _opts.error && _opts.error(e.error && e.message || e);
                }
        });
}

var Cloud, _ = require("alloy/underscore")._;

module.exports.sync = Sync, module.exports.beforeModelCreate = function(config) {
        return config = config || {}, config.data = {}, InitAdapter(config), config;
}, module.exports.afterModelCreate = function(Model) {
        return Model = Model || {}, Model.prototype.config.Model = Model, Model;
};