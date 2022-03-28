const jwt = require("jsonwebtoken");

module.exports.createToken = function (user) {
	return jwt.sign(user, process.env.SECRET, {
		expiresIn: "1d",
	});
};

module.exports.verifyToken = function (token) {
	return jwt.verify(token, process.env.SECRET);
};
