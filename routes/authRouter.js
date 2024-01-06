import { Router } from "express";
import { authController } from "../controller/authController.js";

const authRouter = Router()

authRouter.route("/signup")
  .post(authController.signup)

authRouter.route("/login")
  .get(authController.login)

export default authRouter