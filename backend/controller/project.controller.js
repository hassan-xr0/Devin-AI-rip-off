import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";
import * as projectService from "../services/project.service.js";


export const createPorjectController = async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

    try {
        const { name } = req.body;
        const loggedInUser = await userModel.findOne({ email: req.user.email })
        const userId = loggedInUser._id
        const newProject = await projectService.createProject({ name, userId })

        res.status(201).json(newProject)
    }
    catch (err) {
        console.log(err)
        res.status(400).send(err.message);
    }
}

export const getAllProjects = async (req, res) => {
    try {
        const loggedInUser = await userModel.findOne({ email: req.user.email })
        const userId = loggedInUser._id

        const allUserProjects = await projectService.getAllProjectsByUserId({ userId })

        return res.status(200).json({ projects: allUserProjects })
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err.message);
    }
}

export const addUserToProject = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }
    try {
        const { projectId, users } = req.body
        const loggedInUser = await userModel.findOne({ email: req.user.email })
        const userId = loggedInUser._id
        const project = await projectService.addUserToProject({ projectId, userId, users })

        return res.status(200).json({project})
    }

    catch (err) {
        console.log(err)
        res.status(400).json({error:err.message})
    }

}

export const getProjectById = async (req, res) => {
    const { projectId } = req.params
    try {
        const project = await projectService.getProjectById({projectId})
        
        return res.status(200).json({project})

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }
}
