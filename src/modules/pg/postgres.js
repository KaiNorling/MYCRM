const {Sequelize} = require("sequelize")

const UserModel = require("../../models/UserModel");
const SessionModel = require("../../models/SessionModel");
const PermissionModel = require("../../models/PermissionModel");
const UserPermissionModel = require("../../models/UserPermissionModel");
const TeachersModel = require("../../models/TeachersModel");
const CourseModel = require("../../models/CourseModel");
const ApplicantModel = require("../../models/ApplicantModel");
const GroupModel = require("../../models/GroupModel");
const GroupStudentsModel = require("../../models/GroupStudentsModel");
const sequelize = new Sequelize("postgres://postgres:1234a@localhost:5432/crm",{logging:false,});


 const init = require("./init");
 const relations = require("./relations");





async function postgres(){
    try {
        await sequelize.authenticate()
        console.log("DB has been connected successfully");
        
        let db={};

        db.users = await UserModel(sequelize,Sequelize)
        db.sessions=await SessionModel(sequelize,Sequelize)
        db.permissions=await PermissionModel(sequelize,Sequelize)
        db.user_permissions = await UserPermissionModel(sequelize,Sequelize) 
        db.teachers=await TeachersModel(sequelize,Sequelize)
        db.courses = await CourseModel(sequelize,Sequelize)
        db.applicants = await ApplicantModel(sequelize,Sequelize)
        db.groups = await GroupModel(sequelize,Sequelize)
        db.group_students=GroupStudentsModel(sequelize,Sequelize)

        
       
        await relations(db)
        await init(db) 
        await sequelize.sync({force:false});
 
        // await init(db) 
        // await relations(db)
     
               
     

        return db;


    } catch (error) {
        console.log(`POSTGRES ERROR : ${error}`); 
    }
}

module.exports=postgres