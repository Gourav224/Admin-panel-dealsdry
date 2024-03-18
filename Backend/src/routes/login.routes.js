import { Router } from "express";
import { getCurrrentUser, loginUser, logoutUser, registerUser } from "../controllers/login.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js"

const router = Router();


// user registration route
router.route("/register").post(registerUser);

// login route

router.route("/login").post(loginUser);


// secured routes

// logout user
router.route("/logout").post(verifyJWT, logoutUser);


//  get logged in user details
router.route("/get-current-user").get(verifyJWT, getCurrrentUser);




export default router;