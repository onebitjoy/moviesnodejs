import { Router } from "express";
import { authController } from "../controller/authController.js";
import { auth } from "../middlewares/auth.js";

const authRouter = Router()

authRouter.route("/signup")
  .post(authController.signup)

authRouter.route("/login")
  .get(authController.login)

authRouter.route("/logout")
  .delete(auth, authController.logout)

authRouter.route("/logout-all")
  .delete(auth, authController.logoutAll)


authRouter.route("/forgot-password")
  .post(authController.forgotPassword)

authRouter.route("/reset-password/:token")
  .patch(authController.resetPassword)

authRouter.route("/update/password")
  .post(auth, authController.updatePassword)

export default authRouter