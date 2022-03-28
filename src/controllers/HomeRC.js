
module.exports = class HomeRC {

    static async HomeGetC(req,res,next){
        try {
            res.status(200).json({
				ok: true,
				message: "HOME PAGE",
		    });
            
        } catch (error) {
            next(error)
        }
    }




}