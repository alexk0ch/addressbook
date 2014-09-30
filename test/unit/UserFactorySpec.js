describe('Test User Factory', function () {
	beforeEach(module('addressBook'))

	it('should set storage name and return value from scoped localStorage', inject(function (User) {
		User.setStorage('stor');
		User.set({data: true});
		expect(User.get()).toBeDefined();
		var val = JSON.stringify(User.get());
		expect(val).toBe('{"data":true}');
	}))

	it('should return default configuration', inject(function (User) {
		var expected = JSON.stringify({
			isLoggedIn: false,
			login: '',
			password: '',
			activeGroup : '!',
			reverse : false,
			sortFlag : 0,
			sortType : 'asc',
			contacts: [],
			groups: []
		});

		expect( JSON.stringify(User.getDefault()) ).toBe(expected)
	}));

	it('should set last access field for autologin', inject(function (User) {
		User.setLastAccess('232')
		expect(User.getLastAccess()).toBe('232');
	}))

	it('should clear the last access field cause of logout', inject(function (User) {
		User.clearLastAccess();
		expect(User.getLastAccess()).toBe(null);
	}))
})
