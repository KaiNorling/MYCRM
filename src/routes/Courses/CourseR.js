
const {  CourseCreatePostC, CourseGetC, CourseUpdatePutC, CourseDeleteC, CourseGetOneC,   } = require("../../controllers/CourseRC");
const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");
const expFileUploadMidd= require("express-fileupload")


const CourseR = require("express").Router();  
CourseR.use([authMiddleware,permissionMiddleware],)

CourseR.get("/", CourseGetC )
CourseR.get("/:course_id", CourseGetOneC )

CourseR.post("/", expFileUploadMidd({abortOnLimit:true,safeFileNames:true,}),CourseCreatePostC )
CourseR.put("/:course_id", expFileUploadMidd({abortOnLimit:true,safeFileNames:true,}), CourseUpdatePutC)

CourseR.delete("/",expFileUploadMidd({abortOnLimit:true,safeFileNames:true,}),CourseDeleteC )



module.exports=CourseR;