// module.exports = async (sequelize, Sequelize) => {
// 	 return await sequelize.define("user_permissions", {
// 		// permission_id:{
// 		// 	type: Sequelize.UUID,
// 		// 	allowNull: false,
// 		// 	references:{

// 		// 	  model:"permissions",
// 		// 	  key:"permission_id"

// 		// 	}
// 		//   }
// 	});
// };

module.exports = async (sequelize, Sequelize) => {
	return await sequelize.define("user_permissions", {
		// user_id:{
		// 	type: Sequelize.UUID,
		// 	allowNull: false,
		// 	references:{
		// 	  model:"users",
		// 	  key:"user_id"
		// 	}
		//   },
		// permission_id:{
		// 	type: Sequelize.UUID,
		// 	allowNull: false,
		// 	references:{
		// 	  model:'permissions',
		// 	  key:'permission_id'
		// 	}
		//   }

	
	});
};
