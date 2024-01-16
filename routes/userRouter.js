import { Router } from "express";
import { authController } from "../controller/authController.js";
import { auth } from "../middlewares/auth.js";
import userController from "../controller/userController.js"

const userRouter = Router()

/* AuthController */
userRouter.route("/signup")
  .post(authController.signup)

userRouter.route("/login")
  .get(authController.login)

userRouter.route("/logout")
  .delete(auth, authController.logout)

userRouter.route("/logout-all")
  .delete(auth, authController.logoutAll)

userRouter.route("/forgot-password")
  .post(authController.forgotPassword)

userRouter.route("/reset-password/:token")
  .patch(authController.resetPassword)

userRouter.route("/updatePassword")
  .post(auth, authController.updatePassword)

// -------------------- UserController
userRouter.route("/")
  .get(auth,
    authController.accessChecker("admin"),
    userController.getAllUsers)
  .post(auth,
    authController.accessChecker("admin"),
    userController.createUser)


userRouter.route("/:id")
  .get(auth, userController.getUser)
  .patch(auth,
    authController.accessChecker("admin"),
    userController.updateUser)
  .delete(auth,
    authController.accessChecker("admin"),
    userController.deleteUser)


userRouter.route("/updateMe")
  .patch(auth,
    userController.updateMe)

userRouter.route("/deleteMe")
  .delete(auth,
    authController.accessChecker("user"),
    userController.deleteMe)

export default userRouter