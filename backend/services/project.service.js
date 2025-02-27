import mongoose from "mongoose";
import projectModel from "../models/project.model.js";
import user from "../models/user.model.js";

export const createProject = async ({ name, userId }) => {
    if (!name) {
        throw new Error('Name is required')
    }
    if (!userId) {
        throw new Error('User is required')
    }

    let project;
    try {
        project = await projectModel.create({
            name,
            users: [userId]
        });
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('Project already exists');
        }
        throw error;
    }

    return project;
}

export const getAllProjectsByUserId = async ({ userId }) => {
    if (!userId) {
        throw new Error('User is required')
    }

    const allUserProjects = await projectModel.find({ users: userId })

    return allUserProjects;
}

export const addUserToProject = async ({ projectId, users, userId }) => {
    if (!projectId) {
        throw new Error('ProjectId is required')
    }
    if (!users) {
        throw new Error('Users are required')
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error('Invalid ProjectId')
    }
    if (!userId) {
        throw new Error('userId is required')
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user Id')
    }

    if (!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))) {
        throw new Error('Invalid user Id in users array')
    }

    const project = await projectModel.findOne({
        _id: projectId,
        users: userId
    })

    if (!project) {
        throw new Error('User does not belong to this project')
    }

    const updatedProject = await projectModel.findOneAndUpdate({
        _id: projectId
    }, {
        $addToSet: {
            users: {
                $each: users
            }
        }
    }, {
        new: true
    })
    return updatedProject;
}

export const getProjectById = async ({projectId}) => {

    if (!projectId) throw new Error('ProjectId is required');

    if (!mongoose.Types.ObjectId.isValid(projectId)) throw new Error('Invalid ProjectId');

    const project = await projectModel.findById({ _id: projectId }).populate('users');
    return project;

}