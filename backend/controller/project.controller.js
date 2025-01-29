import { validationResult } from "express-validator";
import projectModel from "../models/project.model";
import userModel from "../models/user.model";
import projectService from "../services/project.service";


export const createPorjectController = async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

    try {
        const { name } = req.body;
        const loggedInUser = await userModel.findOne({ email: req.user.email })
        const userId = loggedInUser._id
        const newProject = await projectService.createProject({ user, userId })

        res.status(201).json(newProject)
    }
    catch (err) {
        console.log(err)
        res.status(400).send(err.message);
    }
}