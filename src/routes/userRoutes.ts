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
        this.router.post('/users', userController.createUser);
        //LOGIN
        this.router.post('/users/login', userController.login);
        //LOGOUT
        this.router.post('/users/logout', userController.logout);
        //GET USUARIO
        this.router.get('/users/me/:id', userController.getUser);
        //GET ALL USERS
        this.router.get('/users/all', userController.getAllUsers);
        //GET ALL SHIRTS OF USER 
        //this.router.get('/me/shirts', userController.getAllUserShirts);
        //DELETE USUARIO
        this.router.delete('/users/me/:id', userController.deleteUser);
    }
 
}
const userRoutes = new UserRoutes();

export default userRoutes.router;