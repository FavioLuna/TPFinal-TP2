import {Router} from 'express';
import userController from '../controllers/userController';

class UserRoutes {
    
    router : Router;

    constructor(){
        this.router = Router();
        this.routes()
    }

    routes(){
        this.router.get('/user/me', userController.getUser);
    }
 
}
const userRoutes = new UserRoutes();

export default userRoutes.router;