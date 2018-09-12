var formatSafeUser = function(user) {
	let safeUser = Object.assign({}, user);

	delete safeUser.password;

	return safeUser;
};

module.exports = {
	formatSafeUser
};
