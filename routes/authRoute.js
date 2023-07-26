import express from "express";
import { ResetPasswordController, forgetPasswordController, loginController, registerController } from "../controllers/authController.js";

// router object
const router = express.Router();

// routing
// register || method post
router.post("/register", registerController);

// login
router.post("/login", loginController);

// forgot password
router.post("/forget-password", forgetPasswordController);

// reset password
router.post("/reset-password", ResetPasswordController);

export default router;