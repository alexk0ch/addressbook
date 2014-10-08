angular.module('addressBook')
	.controller('AppController', function ($scope, User, $timeout, $location, $routeParams) {

		$scope.data = User.getDefault();

		$scope.loginRegister = function () {

			$scope.data.login = CryptoJS.MD5($scope.data.userName).toString();
			$scope.data.password = CryptoJS.MD5($scope.data.passWord).toString();
			$scope.data.passWord = '';

			if ($scope.data.actionType === 'register')
				registerUser(); 
			if ($scope.data.actionType === 'login')
				loginUser();
		}

		$scope.$watch('data.loggerMessage', function () {
			$timeout(function () {
				$scope.data.loggerMessage = ''
			}, 3000)
		})

		function registerUser () {

			User.setStorage($scope.data.login);

			var exists = User.get();

			if (!!exists) {
				$scope.data.loggerMessage = 'User exists, pick another name';
			} else {
				User.setLastAccess($scope.data.login);
				User.set($scope.data)
				loginUser();
			}
		}

		function loginUser () {

			User.setStorage($scope.data.login);

			var exists = User.get();

			if (!!exists && exists.password === $scope.data.password) {
				User.setLastAccess($scope.data.login);
				$scope.data = exists;
				$scope.isLoggedIn = true;
				$location.path('/contacts/').replace();
			} else {
				$scope.data.loggerMessage = 'Can\'t find user with this name or password';
			}
		}

		(function autoLog () {
			var lA = User.getLastAccess();
			if (lA) {
				User.setStorage(lA);
				$scope.data = User.get();
				$scope.isLoggedIn = true;
			}
		})();

		$scope.logOut = function () {
			User.clearLastAccess();
			$scope.isLoggedIn = false;
		}

		$scope.toggleAscDesc = function () {
			$scope.data.reverse = !$scope.data.reverse;
			$scope.data.sortFlag = !$scope.data.sortFlag;
			$scope.data.sortType = ['asc', 'desc'][+$scope.data.sortFlag];
		}

		$scope.removeContact = function () {
			$scope.data.contacts.forEach(function (contact) {
				if (contact.id == $routeParams.id) {
					$scope.data.contacts.splice($scope.data.contacts.indexOf(contact), 1);
				}
			})
			User.set($scope.data);
			fetchGroups();
		}

		$scope.addContact = function (newContact) {
			var lastId = $scope.data.contacts.length ? $scope.data.contacts[$scope.data.contacts.length-1].id : 0;
			var clone = angular.copy(newContact)
			clone.id = lastId + 1;
			$scope.data.contacts.push(clone);
			$location.path('/contacts/view/' + (lastId+1));
			User.set($scope.data);
			fetchGroups();
		}

		function fetchGroups (name) {
			var groups = {};
			$scope.data.contacts.map(function (contact) {
				if (!!contact.group) {
					groups[contact.group] = '';
				}
			});

			$scope.data.groups = Object.keys(groups);
		}

		fetchGroups();

});