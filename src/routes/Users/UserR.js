const { UserSignInGetC, UserSignInPostC, CreateUserGetC, CreateUserPostC, UserGetC } = require("../../controllers/UserRC");
const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");





// module.exports=UserR;

const UserR = require("express").Router(); 

UserR.get("/", [authMiddleware, permissionMiddleware ], UserGetC )

UserR.get("/signin", UserSignInGetC )
UserR.post("/signin", UserSignInPostC )


UserR.get("/account", [authMiddleware ], CreateUserGetC  )
UserR.post("/account", [authMiddleware, permissionMiddleware ], CreateUserPostC )

 module.exports=UserR;