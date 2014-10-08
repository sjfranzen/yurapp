exports.definition = {
	config : {
		adapter : {
			type : "acs",
			collection_name : "users"
		}
	},
	extendModel : function(Model) {
		_.extend(Model.prototype, {
			cloud : require("ti.cloud"),

			// extended functions and properties go here

			/** attempt to log a user into ACS
			 * @param {Object} loginParams
			 * @param {String} loginParams.login
			 * @param {String} loginParams.password
			 * @param {Object} callback
			 * @param {Function} callback.success
			 * @param {Function} callback.error
			 * */
			login : function(loginParams, callback) {

				//capture the current scope
				var that = this;

				var d = require("q").defer();

				//attempt to log into ACS
				this.cloud.Users.login({
					login : loginParams.login,
					password : loginParams.password
				}, function(e) {
					if (e.success) {

						//store the user data in this object
						that.clear();
						that.set(e.users[0]);

						//store the user's session id for future use
						Ti.App.Properties.setString("sessionID", e.meta.session_id);

						//execute the success callback if it exists
						callback && typeof (callback.success) == "function" && callback.success(e);
						d.resolve(e);
					} else {
						//execute the success callback if it exists
						callback && typeof (callback.error) == "function" && callback.error(e);
						d.reject(e);
					}
				});

				//return a promise
				return d.promise;

			},

			/** log the current user out of ACS
			 * @param {Object} callback
			 * @param {Function} callback.success
			 * @param {Function} callback.error
			 * */
			logout : function(callback) {
				var d = require("q").defer();

				this.cloud.logout(function(e) {
					if (e.success) {
						callback && typeof (callback.success) == "function" && callback.success();

						//clear the user's session ID
						Ti.App.Properties.removeProperty("sessionID");

						d.resolve(e);
					} else {
						callback && typeof (callback.success) == "function" && callback.success();

						d.reject(e);
					}

				});

				return d.promise;
			},

			/** register a new account in ACS */
			register : function(userParams,callback) {
				var d = require("q").defer();
				
				alert("I need to be implemented.");
				
				return d.promise;
			},

			/** check if the user is still logged into ACS; if so, grab the user's information */
			checkUserAuthentication : function(params) {
				params = params || {};
				var that = this;
				var d = require("q").defer();
				var errorResponse = {
					success : false,
					error : true,
					message : "The user isn't logged in."
				};

				/* If the user's session ID no longer exists in the app, then
				 return false on a timed delay so the developer's optional promise logic can still work.
				 */
				if (Ti.App.Properties.getString("sessionID", null) == null) {

					typeof (params.error) == "function" && params.error(errorResponse);
					setTimeout(function() {
						d.reject(errorResponse);
					}, 100);
				} else {

					//add the user's pre-existing session ID to the cloud module
					that.cloud.sessionId = Ti.App.Properties.getString("sessionID");

					//check if the user's session is still fresh by attempting to fetch the user's accoun information
					that.cloud.Users.showMe(function(e) {

						//if this call was successful...
						if (e.success) {

							//store the retrieved user information in this backbone model
							that.clear();
							that.set(e.users[0]);

							typeof (params.success) == "function" && params.success(e);
							d.resolve(e);
						} else {

							//the session has expired, so the user will have to login again

							Ti.App.Properties.removeProperty("sessionID");

							typeof (params.error) == "function" && params.error(e);
							d.reject(e);
						}

					});

				}

				return d.promise;
			},
		});

		return Model;
	},
	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};
