import {Router} from 'express';
import userController from '../controllers/userController';

class UserRoutes {
    
    router : Router;

    constructor(){
        this.router = Router();
        this.routes()
    }

    routes(){
        //CREAR USUARIO
        this.router.post('/', userController.createUser);
        //LOGIN
        this.router.post('/login', userController.login);
        //LOGOUT
        this.router.post('/logout', userController.logout);
        //GET USUARIO
        this.router.get('/me', userController.getUser);
        //GET ALL SHIRTS OF USER 
        //this.router.get('/me/shirts', userController.getAllUserShirts);
        //DELETE USUARIO
        this.router.delete('/me', userController.deleteUser);
    }
 
}
const userRoutes = new UserRoutes();

export default userRoutes.router;