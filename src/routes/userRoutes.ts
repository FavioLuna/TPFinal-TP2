import {Request, Response, Router} from 'express';

class UserRoutes {
    
    router : Router;

    constructor(){
        this.router = Router();
        this.routes()
    }

    getUser(req: Request, res: Response){
        res.send('Hello im me')
    }

    routes(){
        this.router.get('/user/me', this.getUser);
    }
 
}
const userRoutes = new UserRoutes();

export default userRoutes.router;