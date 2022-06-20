import {Request, Response} from 'express';
import User from "../models/user";

class UserController {

    async createUser(req: Request, res: Response): Promise<void> {
        const newUser = new User(req.body); //Tomo los datos del body de la Request y los uso para crear un nuevo user
        await newUser.save();
        res.json({data: newUser}) 
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
        const user = await User.findById({id: req.params.id}).populate('shirts')
        res.json(user)
    }
    async getAllUsers(req: Request, res: Response): Promise<void> {
        const users = await User.find();
        res.json(users);
    }
    /*  getAllUserShirts(req: Request, res: Response){
        res.send('Hello im me')
    } */
    async deleteUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await User.findOneAndDelete({id});
        res.json({response: 'User Deleted successfully'})
    }
}

const userController = new UserController();

export default userController;