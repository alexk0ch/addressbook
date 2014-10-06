angular.module('addressBook')
	.directive('contactCardSmall', function () {
		return {
			restrict: 'EA',
			scope: {
				data: '='
			},
			replace: true,
			templateUrl: "front/templates/directive-templates/contactCardSmall.html"
		};
	})