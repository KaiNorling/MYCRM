const { CreateTeacherGetC, CreateTeacherPostC, UpdateTeacherPutC,  } = require("../../controllers/TeacherRC");
const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");


const TeacherR = require("express").Router();  

// TeacherR.use([authMiddleware,permissionMiddleware])
TeacherR.get("/", [authMiddleware,permissionMiddleware],  CreateTeacherGetC )
TeacherR.post("/",  [authMiddleware,permissionMiddleware], CreateTeacherPostC )

TeacherR.put("/:teacher_id", [authMiddleware,permissionMiddleware],  UpdateTeacherPutC )


module.exports=TeacherR;