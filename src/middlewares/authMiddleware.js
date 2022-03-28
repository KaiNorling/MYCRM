const { verifyToken } = require("../modules/jwt");


module.exports = async function AuthMiddleware(req, res, next) {
	try {
		let token = req.headers.authorization;

		if (!token) {
			throw new res.error(401, "Token is not found");
			return;
		}

		token = verifyToken(token);

		if (!token) {throw new res.error(401, "Token is invalid");}

		// console.log("TOKEN__AUTH MIDD_________________________");
		// console.log(token);


	
		const session = await req.db.sessions.findOne({
			where: {
				session_id: token.session_id,
			},
			include: req.db.users,
			raw: true,
		});

		//  console.log("Session___In AUTH MIDD________________________");
		//  console.log(session);

		 if (!session) {
			throw new res.error(401, "Session isn't found");
		}

		req.session = session;

		// console.log("REQ SESSION_____In AUTH MIDD_______________________");
		//  console.log(req.session);


		//console.log(req.headers);

		next();
	} catch (error) {
		next(error);
	}
};
