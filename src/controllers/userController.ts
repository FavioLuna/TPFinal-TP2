import {Request, Response} from 'express';

class UserController {

    getUser(req: Request, res: Response){
        res.send('Hello im me')
    }
}

const userController = new UserController();

export default userController;