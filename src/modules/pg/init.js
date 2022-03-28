module.exports = async function init(db) {

	const count = await db.users.count();

	if (count === 0) {

		const admin = await db.users.create({
			user_username: "admin",
			user_password: "admin",
			user_gender: "male",
			user_name: "admin",
			user_email: "admin@gmail.com",
		});

		console.log("ADMIN ____________________________________");
		console.log(admin);



		const admin_permission = await db.permissions.create({
			permission_name: "admin",
		});

		console.log("ADMIN PERMISSION_____________________________");
		console.log(admin_permission);


		const set_permission = await db.user_permissions.create({
		user_id: admin.dataValues.user_id,
		permission_id: admin_permission.dataValues.permission_id,
		});


		console.log("SET PERMISSIONS________________________________");
		console.log(set_permission);

	}
	// const users = await db.appicants.findAll({ raw: true });
	// console.log(users);
};
