import {Request, Response} from 'express';
import User from "../models/user";

class UserController {

    async createUser(req: Request, res: Response): Promise<void> {
        const newUser = new User(req.body); //Tomo los datos del body de la Request y los uso para crear un nuevo user
        if (!newUser) {
            //E 400 BAD REQUEST si user es null
            res.status(400).json({ success: false, code: 400, message: 'Error creating User' })
        }
        try {
            await newUser.save();
            //S 201 CREATED
            res.status(201).json({succes: true, message: "User obtained successfully", newUser})
        } catch (error) {
            //E 400 BAD REQUEST si hubo error
            res.status(400).json({ success: false, code: 400, message: (error as Error).message});
        }

    }
    login(req: Request, res: Response){
        res.send('Hello im LOGIN')
    }
    logout(req: Request, res: Response){
        res.send('Hello im LOGOUT')
    }
    async getUser(req: Request, res: Response): Promise<void> {
        //populete me sirve para ver el contenido del shcema.object.id
        //En este caso le pido todo, pero como segundo parametro puedo especificar qué ver
        //especificado dentro del segundo parametro entre comillas simples separado por espacios
        //con - le puedo sacar qué datos
        const _id = req.params.id 
        try {
            const user = await User.findById(_id).populate('shirts')
            if (!user) {
                res.status(404).json({succes: false, code: 404, message: 'User not found'})
            }
            res.json({succes: true, message: "User obtained successfully",user})
        } catch (error) {
            res.status(400).json({ success: false, code: 400, message: (error as Error).message});
        }
    }
    async getAllUsers(req: Request, res: Response): Promise<void> {
        const users = await User.find();
        res.json(users);
    }
    /*  getAllUserShirts(req: Request, res: Response){
        res.send('Hello im me')
    } */
    async deleteUser(req: Request, res: Response): Promise<void> {
        const { _id } = req.params;
        
        res.json({response: 'User Deleted successfully'})
        try {
            const user = await User.findById({_id});
            if (!user) {
                res.status(404).json({succes: false, code: 404, message: 'User not found'})
            }
            await User.findOneAndDelete({_id});
            res.status(200).json({succes: true, message: "User deleted successfully"})
        } catch (error) {
            res.status(400).json({ success: false, code: 400, message: (error as Error).message});
        }
    }
}

const userController = new UserController();

export default userController;