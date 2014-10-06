describe('ContactDetail Test Spec', function () {
	beforeEach(module('addressBook'));

	var ContactDetail, scope;

	beforeEach(inject(function ($controller, $rootScope, $routeParams) {
		scope = $rootScope.$new();

		scope.data = {}
		scope.data.contacts = [
	        { 'id': 1, 'name': 'Aaa', 'surname': 'Loki', 'phone': '894853409', 'email': 'dsfsdf@mailr.ru', 'group': 'grp1' },
	        { 'id': 2, 'name': 'Baa', 'surname': 'Suares', 'phone': '345435454', 'email': 'jhkjhkj@mailr.ru', 'group': 'grp1' },
	        { 'id': 3, 'name': 'Caa', 'surname': 'Brown', 'phone': '34235454656778', 'email': 'sjask@mailr.ru', 'group': '' },
	        { 'id': 4, 'name': 'Daa', 'surname': 'Doe', 'phone': '89783231212', 'email': 'asdsad@mailr.ru', 'group': '' },
	        { 'id': 5, 'name': 'Eaa', 'surname': 'Black', 'phone': '632312312312', 'email': 'dfhjhjh@mailr.ru', 'group': 'grp2' },
	        { 'id': 6, 'name': 'Faa', 'surname': 'Blue', 'phone': '89447798853409', 'email': 'nmcvcvzc@mailr.ru', 'group': 'grp3' },
	        { 'id': 7, 'name': 'Gaa', 'surname': 'White', 'phone': '32321243543', 'email': 'sjaxccxvvbvcbsk@mailr.ru', 'group': '' },
	        { 'id': 8, 'name': 'Haa', 'surname': 'Purple', 'phone': '32131246776978078', 'email': 'szxczxczxjask@mailr.ru', 'group': '' },
	        { 'id': 9, 'name': 'Iaa', 'surname': 'Green', 'phone': '23167878767465', 'email': 'xcvcxbvx@mailr.ru', 'group': '' },
	        { 'id': 10, 'name': 'Kaa', 'surname': 'Benq', 'phone': '2435547679879', 'email': 'cxzvxcbnbv@mailr.ru', 'group': '' },
	        { 'id': 11, 'name': 'Laa', 'surname': 'Asus', 'phone': '346568678967', 'email': 'vzcxzbvx@mailr.ru', 'group': '' },
	        { 'id': 12, 'name': 'Maa', 'surname': 'Louis', 'phone': '432144657658', 'email': 'czxbxvbcv@mailr.ru', 'group': '' }
	    ];

	    ContactDetail = $controller('ContactDetail', {
	      $scope: scope
	    });

	    $routeParams.id = 1;

	    scope.data.current = scope.data.contacts.filter(function (contact) {
			return contact.id == $routeParams.id;
		})[0]

		var index = scope.data.contacts.indexOf(scope.data.current);
		scope.data.currentClone = angular.copy(scope.data.current);
	    
	}));

	it('should pick the current contact depending on routeParams', inject(function ($rootScope, $routeParams, $location) {
		expect(scope.data.current.id).toBe(1)
	}))

	it('should update the contact with cloned params', inject(function ($rootScope, $routeParams, $location) {
		expect(scope.data.currentClone.id).toBe(scope.data.current.id);
		scope.data.currentClone.id = 2;
		scope.updateContact();
		expect(scope.data.currentClone.id).toBe(scope.data.current.id);
	}))
})