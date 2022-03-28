const { GroupGetC, GroupGetOneC, GroupPostC, GroupPutC, GroupDeleteC, AddApplicantToGroupC, DeleteStudentFromGroupC, GroupStudentsGetC } = require("../../controllers/GroupRC");
const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");


const GroupR = require("express").Router();  
GroupR.use([authMiddleware,permissionMiddleware])

GroupR.get("/", GroupGetC )
GroupR.get("/:group_id", GroupGetOneC )
GroupR.post("/", GroupPostC )
GroupR.put("/:group_name", GroupPutC)
GroupR.delete("/", GroupDeleteC)


GroupR.post("/student", AddApplicantToGroupC);  
GroupR.delete("/student/:student_id", DeleteStudentFromGroupC);
GroupR.get("/students/:group_name", GroupStudentsGetC)




module.exports=GroupR;