angular.module('addressBook')
	.factory('User', function ($routeParams) {
		'use strict';

		var STORAGE_ID;

		var defaultUser = {
			isLoggedIn: false,
			login: '',
			password: '',
			sortFlag : 0,
			sortType : 'asc',
			contacts: [],
			groups: []
		};

		return {
            current: 1,
			get : function () {
				return STORAGE_ID ? JSON.parse(localStorage.getItem(STORAGE_ID)) : defaultUser;
			},
			set : function (data) {
				localStorage.setItem(STORAGE_ID, JSON.stringify(data));
			},
            lastAccess : function (LA) {
              return LA ? localStorage.setItem('lastAccessedUser', LA) : localStorage.getItem('lastAccessedUser');
            },
			clearLastAccess : function () {
				return localStorage.removeItem('lastAccessedUser');
			},
			setStorage : function (id) {
				STORAGE_ID = id;
			}
		}

});