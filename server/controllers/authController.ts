import { Request, Response } from 'express';
import User from '../models/User';
import token from '../configs/jwtToken';

export const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    const findUser = await User.findOne({email: email})
    if(findUser && await findUser.comparePassword(password)){
        res.send({
            token: token(findUser?.id)
        })
    }
}