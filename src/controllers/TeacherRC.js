const permissionChecker = require("../helpers/permissionChecker");
const { AddTeacherValidation } = require("../modules/validations");

module.exports = class TeacherRC {

    static async CreateTeacherGetC(req,res,next){
        try {
            // permissionChecker("admin", req.user_permissions,res.error)

            const limit = req.query.limit || 15;
			const offset = req.query.offset - 1 || 0;

			const teachers = await req.db.teachers.findAll({
				raw: true,
				include: [
					{
						model: req.db.users,
						attributes: {
							exclude: ["user_password"],
						},
					},
				],
				limit,
				offset: offset * limit,
			});
            
            console.log("GET ALL TEACHERS TeacherGetController  in TEACHERRC");
			console.log(teachers);

            // res.status(200).json({
            //     ok:true,
            //     message:"Updated Successfully"
            // })


            res.status(200).json({
				ok: true,
				message: "OK _____CreateTeacherGetC PAGE",
                data:teachers,
		    });
            
        } catch (error) {
            next(error)
        }



    }

    static async CreateTeacherPostC(req,res,next){
        try {

            permissionChecker("admin", req.user_permissions,res.error)

            const data = await AddTeacherValidation(
				req.body,
				res.error
			);
                console.log("DATA REQ BODY__ CreateTeacherPostC__________");
                console.log(data);

            const teacher = await req.db.teachers.create({
				user_id: data.user_id,
				teacher_phone: data.phone,
				teacher_skills: data.skills,
			});
            console.log("teacher  ___CreateTeacherPostC__________________");
            console.log(teacher);

            res.status(201).json({
				ok: true,
				message: "Teacher created successfully",
			});
            
        } catch (error) {
            next(error)
        }


        
    }
  

    static async UpdateTeacherPutC(req,res,next){

        try {
            permissionChecker("admin", req.user_permissions, res.error);

			const teacher_id = req.params.teacher_id;

			const teacher = await req.db.teachers.findOne({
				where: {
					teacher_id,
				},
			});

            // console.log("TEACHER ID  IN TEACHER RC UpdateTeacherPutC_____");
            // console.log(teacher_id);
            // console.log("TEACHER_____");

            // console.log(teacher);


			if (!teacher) throw new res.error(404, "Teacher not found");

			const data = await AddTeacherValidation(
				req.body,
				res.error
			);

			await req.db.teachers.update(
				{
					user_id: data.user_id,
					teacher_phone: data.phone,
					teacher_skills: data.skills,
				},
				{
					where: {
						teacher_id,
					},
				}
			);

			res.status(200).json({
				ok: true,
				message: "Updated successfully",
			});

        } catch (error) {
            next(error);


        }
    }





}