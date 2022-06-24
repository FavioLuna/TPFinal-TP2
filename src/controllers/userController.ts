import {Request, Response} from 'express';
import User, { I_UserDoc } from "../models/user";
import createToken from '../functions/createToken';
import bcrypt from 'bcrypt'
import mongoose from 'mongoose';



class UserController {
    //Uso Promise<Response> para especificar que voy a devolver una Response
    async createUser(req: Request, res: Response): Promise<Response> {
        const uEmail = await User.findOne({email: req.body.email})
        if (uEmail) {
                return res.status(400).json({succes: false, msg: 'Email already in use'})
        }
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }); //Tomo los datos del body de la Request y los uso para crear un nuevo user
        if (!newUser) {
            //E 400 BAD REQUEST si user es null o hay algun campo req vacio
            return res.status(400).json({ success: false, message: 'Error creating User' })
        }
        try {
            await newUser.save();
            //S 201 CREATED
            return res.status(201).json({succes: true, message: "User created successfully", newUser})
        } catch (error) {
            //E 400 BAD REQUEST si hubo error
            return res.status(400).json({ success: false, message: (error as Error).message});
        }

    }
    async login(req: Request, res: Response){
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({succes: false, msg: 'Please send a email and password'})
        }
        const user = await User.findOne({email: req.body.email})
        if (!user) {
            return res.status(400).json({succes: false, msg: 'User does not exists'})
        }
        bcrypt.compare(req.body.password, user.password, (error, result) => {
            if (error) {
                return res.status(401).json({messsage: 'Unauthorized'})
            }else if(result){
                const token = createToken(user)
                user.token = token
                return res.status(200).json({message: 'Auth Successful', user, token})
            }
        })
    }
    async logout(req: Request, res: Response): Promise<Response>{
        let token = ""
        let id = req.params.id
        let user = await User.findById(id)
        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }
        try {
            res.locals.jwt = token
            user.token = token
            return res.status(200).json({message: 'Success logout', user})
        } catch (error) {
            return res.status(400).json({ success: false, message: (error as Error).message});
        }
    }
    async makeChange(req: Request, res: Response): Promise<Response>{
        const id = req.params.id
        let user = await User.findById(id);
        if (!user) {
                return res.status(404).json({message: 'User not found'})
        }
        try {
            if (req.body.password != user.password) {
                let newPassword = req.body.password
                user.password = await bcrypt.hash(newPassword, 8)
                user.save()
                return res.status(200).json({message: 'User password updated', user})
            }
            user.set(req.body).save()
            return res.status(200).json({message: 'User update', user})
        } catch (error) {
            return res.status(400).json({ success: false, message: (error as Error).message});
        }
    }

    async getUser(req: Request, res: Response): Promise<Response> {
        //populete me sirve para ver el contenido del shcema.object.id
        //En este caso le pido todo, pero como segundo parametro puedo especificar qué ver
        //especificado dentro del segundo parametro entre comillas simples separado por espacios
        //con - le puedo sacar qué datos
        const id = req.params.id 
        try {
            const user = await User.findById(id).populate('shirts')
            if (!user) {
                return res.status(404).json({succes: false, message: 'User not found'})
            }
            return res.json({succes: true, message: "User obtained successfully",user})
        } catch (error) {
            return res.status(400).json({ success: false, message: (error as Error).message});
        }
    }
    async getAllUsers(req: Request, res: Response): Promise<Response> {
        const users = await User.find().select('-password');
        return res.json(users);
    }
    /*  getAllUserShirts(req: Request, res: Response){
        res.send('Hello im me')
    } */
    async deleteUser(req: Request, res: Response): Promise<Response> {
        const id = req.params.id
        try {
            const user = await User.findById(id)
            if (!user) {
                return res.status(404).json({succes: false, message: 'User not found'})
            }
            await User.findOneAndDelete(user.id);
            return res.status(200).json({succes: true, message: "User deleted successfully"})
        } catch (error) {
            return res.status(400).json({ success: false, message: (error as Error).message});
        }
    }
}

const userController = new UserController();

export default userController;