import {Request, Response} from 'express';
import League from "../models/league"
import mongoose from 'mongoose';

class LeagueController{

    async CreateLeague(req :Request, res: Response ) : Promise<void>{
        const newLeague = new League({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
        });
        await newLeague.save()
        res.json({data: newLeague})
    } 

    async deleteLeague(req: Request, res: Response): Promise<void> {
        const  id  = req.params.id;
        const league = await League.findById(id)
        await League.findOneAndDelete(league.id);
        res.json({response: 'League Deleted successfully'})
    }

    async getAllLeague(req: Request, res: Response): Promise<void> {
        const leagues = await League.find();
        res.json(leagues);
    }
}
const leagueController = new LeagueController();

export default leagueController;