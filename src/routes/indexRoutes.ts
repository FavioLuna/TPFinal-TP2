import {Request, Response, Router} from "express";

class IndexRoutes{

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        
    }
}

const indexRoutes = new IndexRoutes();
indexRoutes.routes()


export default indexRoutes.router;