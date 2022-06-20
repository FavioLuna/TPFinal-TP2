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
        this.router.post('/user', userController.createUser);
        //LOGIN
        this.router.post('/user/login', userController.login);
        //LOGOUT
        this.router.post('/user/logout', userController.logout);
        //GET ALL USERS
        this.router.get('/users', userController.getAllUsers);
        //GET ALL SHIRTS OF USER 
        //this.router.get('/me/shirts', userController.getAllUserShirts);
        //GET USUARIO
        this.router.get('/user/:id', userController.getUser);
        //DELETE USUARIO
        this.router.delete('/user/me/:id', userController.deleteUser);
    }
 
}
const userRoutes = new UserRoutes();

export default userRoutes.router;