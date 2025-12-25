import {Router} from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
const router = Router();

// console.log("fetching the routes form user.routes.js")
//  multer configuration
// import multer from "multer";
// const upload = multer()
import { upload } from "../middleware/multer.middleware.js";
router.route("/register").post(
    upload.fields([
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser);


router.route("/login").post(loginUser)



export default router; 