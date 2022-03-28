
const permissionChecker = require("../helpers/permissionChecker");
const { generateHash } = require("../modules/bcrypt");
const { createToken } = require("../modules/jwt");
const {
    SignInPostValidation, SignUpValidation
} = require("../modules/validations");


module.exports = class UserRC {
    static async UserSignInGetC(req, res, next) {
        try {
            res.status(200).json({
                ok: true,
                message: "UserSignInGetC Page",
            });

        } catch (error) {
            next(error)
        }

    }

    static async UserSignInPostC(req, res, next) {
        try {
            const {username, password} = await SignInPostValidation(req.body, res.error);

            // console.log("REQ BODY...............................");
            // console.log(req.body);

            const user = await req.db.users.findOne({
                where: {
                    user_username: username,
                },
                raw: true,
            });
            
            // console.log("USER...............................");
            // console.log(user);

            if (!user) throw new res.error(400, "User not found");

        	await req.db.sessions.destroy({
				where: {
					session_useragent: req.headers["user-agent"] || "Unknown",
					user_id: user.user_id,
				},
			});


            const session = await req.db.sessions.create({
				session_useragent: req.headers["user-agent"] || "Unknown",
				user_id: user.user_id,
			});
            // console.log("Session...............................");
            // console.log(session);


            const token = await createToken({
				session_id: session.dataValues.session_id,
			});;

            // console.log("Token_______________________");
            // console.log(token);

      
            res.status(201).json({
				ok: true,
				message: "Token created successfully",
				data: {
					token,
				},
			});



        } catch (error) {
            console.log(error);
            next(error)
        }
    }



    static async CreateUserGetC(req, res, next) {
        try {
            res.status(200).json({
                ok: true,
                message: "CreateUserGetC PAGE",
            });

        } catch (error) {
            next(error)
        }

    }

    static async CreateUserPostC(req, res, next) {
        try {
             permissionChecker("admin", req.user_permissions,res.error)
            // permissionChecker(
			// 	["admin", "operator"],
			// 	req.user_permissions,
			// 	res.error
			// );
            const data = await SignUpValidation(req.body, res.error);
            
            // console.log("REQ BODY.. CREATE USER POST CONTROLLER. IN UserRC.....................");
            // console.log(data);

            let user = await req.db.users.findOne({
                where: {
                    user_username: data.username,
                    user_email: data.email,
                }
            });

            if (user) throw new res.error(400, "Email already exists")

            user = await req.db.users.create({
				user_name: data.name,
				user_password: await generateHash (data.password),
				user_gender: data.gender,
				user_username: data.username,
                user_email: data.email,
                
			});

            // console.log("CREATED USER..........CREATE USER POST CONTROLLER. IN UserRC......");
            // console.log(user);

            res.status(201).json({
                ok: true,
                message: "Users account created Succesfully",
            })

        } catch (error) {
            // console.log(`CreateUserPostC ${error}`);
            console.log(error.message);
            // if(error.message =="Validation Error"){
            //     error.errorCode="400"
            //     error.message="Username Already exist"
            // }
            next(error)

        }
    }

    static async UserGetC(req, res, next) {
        try {
            permissionChecker("admin", req.user_permissions,res.error)

          
			const page = req.query.page ? req.query.page - 1 : 0;
			const limit = req.query.limit || 15;
			const order = req.query.order == "DESC" ? "DESC" : "ASC";

			const users = await req.db.users.findAll({
				attributes: [
					"user_id",
					"user_name",
					"user_username",
                    "user_email",
					"user_gender",

				],
				raw: true,
				limit: limit,
				offset: page * 15,
				order: [["createdAt", order]],
			});

			res.status(200).json({
				ok: true,
				message: "Users list UserGetC in UserRC ",
				data: {
					users,
				},
			});

        } catch (error) {
            next(error)
        }

    }


}