import {Router} from "express"
import shirtController from "../controllers/shirtController"

class ShirtRouter{
    router: Router

    constructor(){
        this.router = Router(),
        this.routes()
    }

    routes(){
        this.router.post("/shirt", shirtController.CreateShirt);
        this.router.get("/shirts", shirtController.getAllShirts)
        this.router.delete('/shirt/:id', shirtController.deleteShirt)
        this.router.put("/shirt/:id", shirtController.updateShirt)
    }
}

const shirtRouter = new ShirtRouter()

export default shirtRouter.router