const permissionChecker = require("../helpers/permissionChecker");
const { CourseCreateValidation } = require("../modules/validations");
const path = require("path")
const fs = require("fs");
module.exports = class CourseRC {

    static async CourseGetC(req,res,next){
        try {
            permissionChecker("admin", req.user_permissions,res.error)

            const limit = req.query.limit || 15;
			const offset = req.query.offset - 1 || 0;

			const courses = await req.db.courses.findAll({
				raw: true,limit,offset: offset * limit,
			});
            
            console.log("GET ALL Courses CourseCreateGetC  in CourseRC");
			console.log(courses);

            res.status(200).json({
				ok: true,
				message: "All Courses in Courses PAGE",
                data:{
                    courses,
                }
		    });
            
        } catch (error) {
            next(error)
        }
    }




    static async CourseCreatePostC(req,res,next){
        try {
            permissionChecker("admin", req.user_permissions,res.error)

            const photo=req?.files?.photo;
        
            console.log("PHOTO______CourseCreatePostC______in CourseR__________________________");
            console.log(photo);

            if(photo && photo?.size > (5*1024*1024)){
                throw new res.error(400, "Photo size must be less than 5 mb ")
            }

            console.log("Req Body___CourseCreatePostC______in CourseR_");
            console.log(req.body);

            const data = await CourseCreateValidation(req.body,res.error)
 

            console.log("data___CourseCreatePostC    CourseCreateValidation______in CourseR_");
            console.log(data);


	
            let photo_name = photo
            ? photo.md5 +
              "." +
              photo.mimetype.split("/")[
                    photo.mimetype.split("/").length - 1
              ]
            : null;

          if (photo) {   photo.mv(   path.join(__dirname, "..", "public", "uploads", photo_name)  );  }

			const course = await req.db.courses.create({
				course_name: data.name,
				course_description: data.description,
				course_price: data.price,
				course_photo: photo_name,
			});



            res.status(201).json({
                ok: true,
                message: "Course created successfully",
            });
            
        } catch (error) {
            next(error)
        }
    }


    static async CourseUpdatePutC(req,res,next){
        try {
            permissionChecker("admin", req.user_permissions, res.error);

            const course_id = req.params.course_id;

            const course = await req.db.courses.findOne({
                where: {
                    course_id,
                },
                raw: true,
            });

            if (!course) throw new res.error(404, "Course not found");

            const photo = req?.files?.photo;

            if (photo && photo?.size > 5 * 1024 * 1024) {
                throw new res.error(
                    400,
                    "Size of photo must be less than 5 mb"
                );
            }

            const request = {
                name: req.body.name ? req.body.name : course.course_name,
                price: req.body.price ? req.body.price : course.course_price,
                description: req.body.description ? req.body.description : course.course_description,
            }

            console.log(request, req.body)

            const data = await CourseCreateValidation(request, res.error);

            let photo_name = photo
                ? photo.md5 +
                  "." +
                  photo.mimetype.split("/")[
                        photo.mimetype.split("/").length - 1
                  ]
                : course
                ? course?.course_photo
                : null;

            if (photo) {
                fs.unlink(
                    path.join(
                        __dirname,
                        "..",
                        "public",
                        "uploads",
                        course.course_photo
                    ),
                    () => {}
                );

                photo.mv(
                    path.join(__dirname, "..", "public", "uploads", photo_name)
                );
            }

            await req.db.courses.update(
                {
                    course_name: data.name,
                    course_price: data.price,
                    course_description: data.description,
                    course_photo: photo_name,
                },
                {
                    where: {
                        course_id,
                    },
                }
            );

            res.status(200).json({
                ok: true,
                message: "Updated successfully",
            });
            
        } catch (error) {
            next(error)
        }
    }

    static async CourseDeleteC(req,res,next){
        try {
            permissionChecker("admin", req.user_permissions,res.error)



            res.status(200).json({
				ok: true,
				message: "CourseCreateDeleteC PAGE",
		    });
            
        } catch (error) {
            next(error)
        }
    }


    static async CourseGetOneC(req, res, next) {
        try {
            const course_id = req.params.course_id;

            const course = await req.db.courses.findOne({
                where: {
                    course_id,
                },
                raw: true,
            });

            if (!course) throw new res.error(404, "Course not found");

            res.status(200).json({
                ok: true,
                message: "OK",
                data: {
                    course,
                },
            });
        } catch (error) {
            next(error);
        }
    }

}