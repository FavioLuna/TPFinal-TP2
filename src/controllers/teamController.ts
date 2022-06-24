import {Request, Response} from 'express';
import Team from "../models/team"
import mongoose from 'mongoose';

class TeamController{

    async createTeam(req :Request, res: Response ) : Promise<void>{
        const newTeam = new Team({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            img: req.body.img,
        });
        await newTeam.save()
        res.json({data: newTeam})
    } 

    async deleteTeam(req: Request, res: Response): Promise<void> {
        const  id  = req.params.id;
        const team = await Team.findById(id)
        await Team.findOneAndDelete(team.id);
        res.json({response: 'Team Deleted successfully'})
    }

    async getAllTeams(req: Request, res: Response): Promise<void> {
        const teams = await Team.find();
        res.json(teams);
    }
}
const teamController = new TeamController();

export default teamController;