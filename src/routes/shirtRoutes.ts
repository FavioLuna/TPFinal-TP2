import {Router} from "express"
import shirtController from "../controllers/shirtController"

class ShirtRouter{
    router: Router

    constructor(){
        this.router = Router(),
        this.routes()
    }

    routes(){
        this.router.post("/shirts", shirtController.CreateShirt);
        this.router.get("/shirts", shirtController.getAllShirts)
        this.router.delete('/shirts/:id', shirtController.deleteShirt)
        this.router.put("/shirts/:id", shirtController.updateShirt)
    }
}

const shirtRouter = new ShirtRouter()

export default shirtRouter.router