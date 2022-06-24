import {Router} from "express"
import leagueController from "../controllers/leagueController"

class LeagueRouter{
    router: Router

    constructor(){
        this.router = Router(),
        this.routes()
    }

    routes(){
        this.router.post("/leagues", leagueController.CreateLeague);
        this.router.delete('/leagues/:id', leagueController.deleteLeague)
        this.router.get("/leagues", leagueController.getAllLeague)

    }
}

const leagueRouter = new LeagueRouter()

export default leagueRouter.router