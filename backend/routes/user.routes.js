import { Router } from "express";
import { body } from "express-validator";
import * as userController from "../controller/user.controller.js";

const router = Router();

router.post(
  "/register",
  body("email").isEmail().withMessage("Email is invalid"),
  body("password").isLength({ min: 3  }).withMessage("Password must be at least 2 characters long")
  ,
  userController.createUserController
)

router.post("/login",
  body("email").isEmail().withMessage("Email is invalid"),
  body("password").isLength({ min: 3  }).withMessage("Password must be at least 2 characters long"),
  userController.loginUserController
)

export default router;
