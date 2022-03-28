module.exports = async (sequelize, Sequelize) => {
	return await sequelize.define("sessions", {
		session_id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		session_useragent: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		user_id:{
			type: Sequelize.UUID,
			allowNull: false,
			references:{
			  model:"users",
			  key:"user_id"
			}
		  }
	});
};
