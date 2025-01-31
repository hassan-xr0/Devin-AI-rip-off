import { Router } from "express";
import { body } from "express-validator";
import * as projectController from "../controller/project.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/create",
  authMiddleware.authUser,
  body("name")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  projectController.createPorjectController
);

export default router;
