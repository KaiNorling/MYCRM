module.exports=async function permissionMiddleware(req, res, next){

    try {   


		const permissions = await req.db.user_permissions.findAll({
			where: {
				user_id: req.session.user_id,
			},
			include: req.db.permissions,
			raw: true,
		});

		req.user_permissions = permissions; 

   

        // console.log("Permissions in Permission Middleware__________");
		// console.log(permissions);


		//  console.log("Session  req.session in Permission Middleware__ ________");
		//  console.log(req.session);
        next()
    } catch (error) {

        next(error)
    }

}