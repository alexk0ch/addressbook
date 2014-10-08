angular.module('addressBook').controller('ContactDetail', function ($scope, $location, $routeParams) {

	$scope.$parent.current = $scope.data.contacts.filter(function (contact) {
		return contact.id == $routeParams.id;
	})[0];

	var index = $scope.data.contacts.indexOf($scope.current);
	$scope.cloned = angular.copy($scope.current);


	$scope.updateContact = function () {
        $scope.cloned.group == '' ? $scope.cloned.group = ' ' : null;
		$scope.data.contacts[index] = $scope.current = $scope.cloned;
		$location.path('/contacts/view/' + $scope.current.id).replace();
	}
});