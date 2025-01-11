import userModel from '../models/user.model.js';

export const createUser = async({email,password})=>{
    if(!email || !password) throw new Error('Email and password are required');
    const hashedPass = await userModel.hashPassword(password);
    const user = await userModel.create({email,password:hashedPass});
    return user
}