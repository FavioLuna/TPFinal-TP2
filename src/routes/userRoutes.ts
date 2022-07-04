import {Router} from 'express';
import userController from '../controllers/userController';
import extractJWT from '../middlewares/extractJWT';

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
        this.router.post('/user/logout/:id', extractJWT, userController.logout);
        //GET ALL USERS
        this.router.get('/users', userController.getAllUsers);
        //PUT USER NAME
        this.router.put('/user/settings/:id', extractJWT, userController.changeName);
        //GET USUARIO
        this.router.get('/user/:id', extractJWT, userController.getUser);
        //DELETE USUARIO
        this.router.delete('/user/me/:id', extractJWT ,userController.deleteUser);
    }
}
const userRoutes = new UserRoutes();

export default userRoutes.router;