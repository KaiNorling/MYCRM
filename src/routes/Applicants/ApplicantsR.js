const { ApplicantsGetC, ApplicantsPostC, ApplicantsDeleteC, ApplicantPutC } = require("../../controllers/ApplicantsR");
const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");



const ApplicantsR = require("express").Router();  
ApplicantsR.use([authMiddleware,permissionMiddleware])


ApplicantsR.get("/", ApplicantsGetC )
ApplicantsR.post("/:course_id", ApplicantsPostC )
ApplicantsR.put("/:applicant_id", ApplicantPutC )
ApplicantsR.delete("/:applicant_id", ApplicantsDeleteC )


module.exports=ApplicantsR;