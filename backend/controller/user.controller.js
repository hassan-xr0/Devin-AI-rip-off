import user from '../models/user.model.js';
import userModel from '../models/user.model.js';
import * as userServices from '../services/user.service.js';
import { validationResult } from 'express-validator';

export const createUserController = async(req,res)=>{
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }

    try{
        const user = await userServices.createUser(req.body);
        const token = await user.generateJWT();
        res.status(201).json({user,token});
    }catch(err){
        res.status(400).send({error:err.message});
    }
}

export const loginUserController = async(req,res)=>{
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }

    try{
        const {email,password} = req.body;
        const user = await userModel.findOne({ email }).select('+password');

        if(!user){
            return res.status(401).json({error:'Invalid email or password'});
        }

        const ValidPass = await user.comparePassword(password);
        if(!ValidPass){
            return res.status(401).json({error:'Invalid email or password'});
        }
        const token = await user.generateJWT();
        res.status(200).json({user,token});
    }catch(err){
        res.status(403).send(err.message);
    }
}

