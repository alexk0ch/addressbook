angular.module('addressBook').controller('ContactDetail', function ($scope, $location, $routeParams) {

	$scope.data.current = $scope.data.contacts.filter(function (contact) {
		return contact.id == $routeParams.id;
	})[0]

	var index = $scope.data.contacts.indexOf($scope.data.current);
	$scope.data.currentClone = angular.copy($scope.data.current);

	$scope.updateContact = function () {
		$scope.data.contacts[index] = $scope.data.current = $scope.data.currentClone;
		$location.path('/contacts/view/' + $scope.data.current.id).replace();
	}
});