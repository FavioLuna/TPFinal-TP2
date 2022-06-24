import {Router} from 'express';
import teamController from '../controllers/teamController';

class TeamRoutes {
    
    router : Router;

    constructor(){
        this.router = Router();
        this.routes()
    } 

    routes(){
        //CREAR USUARIO
        this.router.post('/team', teamController.createTeam);
       
        //DELETE USUARIO
        this.router.delete('/team/:id',teamController.deleteTeam);
        this.router.get("/team", teamController.getAllTeams)
    }
}
const teamRoutes = new TeamRoutes();

export default teamRoutes.router;