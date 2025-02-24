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

router.get('/all', authMiddleware.authUser, projectController.getAllProjects)

router.put('/add-user',
  authMiddleware.authUser,
  body('projectId').isString().withMessage('Project ID is required'),
  body('users').isArray({ min: 1 }).withMessage('Users must be an array of strings').bail()
      .custom((users) => users.every(user => typeof user === 'string')).withMessage('Each user must be a string'),
  projectController.addUserToProject
)

export default router;
