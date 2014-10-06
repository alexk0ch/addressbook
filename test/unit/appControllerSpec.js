describe('App controller Test Spec', function () {
	beforeEach(module('addressBook'));

	var AppController, scope;

	beforeEach(inject(function ($controller, $rootScope, $routeParams, User, $location) {
		scope = $rootScope.$new();

		scope.data = User.getDefault();

		scope.data = {}

	    AppController = $controller('AppController', {
	      $scope: scope
	    });

	    scope.data.userName = 'admin';
		scope.data.passWord = 'fedlll75';

	}));

	it('should populate the scope.data with default settings', function () {
		expect(scope.data.sortType).toBe('asc');
	})

	it('should be able to logout', inject(function (User) {
		scope.logOut();
		expect(scope.isLoggedIn).toBe(false);
	}))

	it('should watch for changes in loggerMessage', function () {
		scope.data.loggerMessage = 'loggerMessage';
		expect(scope.data.loggerMessage).toBe('loggerMessage')
		setTimeout(function () {
			expect(scope.data.loggerMessage).toBe('')
		}, 3010)
	})

	it('should store login and password protected; removing all traces from scope', function () {

		scope.loginRegister();

		expect(scope.data.login).toBe(CryptoJS.MD5(scope.data.userName).toString())
		expect(scope.data.password).toBe(CryptoJS.MD5('fedlll75').toString())
		expect(scope.data.passWord).toBe('')
	})

	it('should set message User exists if trying to register same one', function () {
		scope.data.actionType = 'register';
		scope.loginRegister();
		expect(scope.data.loggerMessage).toBe('User exists, pick another name')
	})

	it('should login user otherwise after registration', function () {
		scope.data.actionType = 'register';
		scope.data.userName = Math.random()*1000 + '';
		scope.loginRegister();

		expect(scope.data.loggerMessage).toBe(undefined);
		expect(scope.isLoggedIn).toBe(true)
	})

	it('should navigate to another page after login', inject(function ($location) {
		scope.data.actionType = 'login';
		scope.loginRegister();

		expect($location.path()).toBe('/contacts/')
	}))

	it('should write a fail message if password or username wrong', function () {
		
		scope.data.actionType = 'login';
		scope.data.userName = Math.random()*1000 + '';
		scope.loginRegister();

		expect(scope.data.loggerMessage).toBe('Can\'t find user with this name or password')
		
		scope.data.actionType = 'login';
		scope.data.userName = 'admin';
		scope.data.passWord = 'fedlll75';
		scope.loginRegister();

		expect(scope.data.loggerMessage).toBe(undefined)
		
		scope.data.actionType = 'login';
		scope.data.userName = 'admin';
		scope.data.passWord = 'fedl22ll75';
		scope.loginRegister();
		
		expect(scope.data.loggerMessage).toBe('Can\'t find user with this name or password')

	})

	it('should auto login if lastSession known', function () {
		scope.autoLog();
		expect(scope.isLoggedIn).toBe(true)
	})

	it('should handle filtering in alpha-num way or reversed alpha-num way', function () {
		scope.toggleAscDesc();
		expect(scope.data.reverse).toBe(true)
		expect(scope.data.sortFlag).toBe(true)
		expect(scope.data.sortType).toBe('desc')

		scope.toggleAscDesc();
		expect(scope.data.reverse).toBe(false)
		expect(scope.data.sortFlag).toBe(false)
		expect(scope.data.sortType).toBe('asc')
	})

	it('should remove contact from the scope', inject(function ($routeParams) {
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
		expect(scope.data.contacts.length).toBe(12)
		$routeParams.id = 1;

		scope.removeContact();
		expect(scope.data.contacts.length).toBe(11)
	}))

	it('should add contact from the form', inject(function ($routeParams) {
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

	    var newContact = {
	    	name: 'Emma', surname: 'Watson', phone: '911911911', email: 'emma@mail.ru'
	    };

		expect(scope.data.contacts.length).toBe(12)
		$routeParams.id = 1;

		scope.removeContact();
		expect(scope.data.contacts.length).toBe(11)

		scope.addContact(newContact);
		expect(scope.data.contacts.length).toBe(12)
		expect(scope.data.contacts.pop().id).toBe(13)
	}))

	it('should fetch new Groups', inject(function ($routeParams) {
		scope.data.contacts = [];
		var newContact = {
	    	name: 'Emma', surname: 'Watson', phone: '911911911', email: 'emma@mail.ru', group: 'mmm'
	    };

	    expect(scope.data.contacts.length).toBe(0)
	    scope.addContact(newContact);
	    expect(scope.data.contacts.length).toBe(1)
	    expect(scope.data.groups.length).toBe(1)
	    expect(scope.data.groups[0]).toBe('mmm')
	    expect(scope.data.contacts[0].id).toBe(1)

	    $routeParams.id = 1;
	    scope.removeContact();
	    expect(scope.data.contacts.length).toBe(0)
	    expect(scope.data.groups.length).toBe(0)
	}))
})