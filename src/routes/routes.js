 const UserR = require("./Users/UserR")
 const HomeR = require("./Home/HomeR");
 const errorHandler = require("../helpers/errorHandler");
 const TeacherR = require("./Teachers/TeacherR");
const CourseR = require("./Courses/CourseR");
const ApplicantsR = require("./Applicants/ApplicantsR");
const GroupR = require("./Groups/GroupR");
 
 module.exports = async function (app) {

     try {


         app.use("/", HomeR)
         app.use("/users", UserR)
         app.use("/teachers", TeacherR)
         app.use("/courses", CourseR)
         app.use("/applicants", ApplicantsR)
         app.use("/groups", GroupR)


     } finally {
         app.use(errorHandler)
     }
 }


 //  server.use("/users", require("./Users/UserR"))