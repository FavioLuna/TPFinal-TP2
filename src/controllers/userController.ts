import {Request, Response} from 'express';
import User from "../models/user";

class UserController {

    createUser(req: Request, res: Response){
        console.log(req.body);
        res.json('Received')
    }
    login(req: Request, res: Response){
        res.send('Hello im LOGIN')
    }
    logout(req: Request, res: Response){
        res.send('Hello im LOGOUT')
    }
    async getUser(req: Request, res: Response){
        const users = await User.find();
        res.json(users)
    }
/*     getAllUserShirts(req: Request, res: Response){
        res.send('Hello im me')
    } */
    deleteUser(req: Request, res: Response){
        res.send('Hello im DELETEUSER')
    }
}

const userController = new UserController();

export default userController;