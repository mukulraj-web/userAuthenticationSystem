import {Router} from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
const router = Router();

// console.log("fetching the routes form user.routes.js")

router.route("/register").post(registerUser);
router.route("/login").post(loginUser)



export default router; 