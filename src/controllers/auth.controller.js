import jwt from 'jsonwebtoken'
import User from '../models/user.models.js'

export const register = async(req, res)=>{
    try {
        const userExists = await User.findOne({email: req.body.email});
        if(userExists) return res.status(400).json('User Exists!');
        const user = await User.create(req.body);
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET, {expiresIn:'7d'})

        res.status(201).json({token, user: {id: user._id, username: user.username, email: user.email}})
    } catch (error) {
        res.status(500).json(error.message)
    }
};

export const login = async(req,res) => {
    try {
        const user = await User.findOne({email: req.body.email });
        if(!user || !(await user.matchPassword(req.body.password)))
            return res.status(401).json('Invalid Credentials!')
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}