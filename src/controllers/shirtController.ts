import {Request, Response} from 'express';
import Shirt from "../models/shirt"
import mongoose from 'mongoose';

class ShirtController{

    async CreateShirt(req :Request, res: Response ) : Promise<void>{
        const newShirt = new Shirt({
            
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                number: req.body.number,
                price: req.body.price,
                description: req.body.price,
                size: req.body.size,
                img: req.body.img,
                team: req.body.team,
                league: req.body.league,
                year: req.body.year,

            });
        
        await newShirt.save()
        res.json({data: newShirt})
    }

    async getAllShirts(req: Request, res: Response): Promise<void> {
        const shirts = await Shirt.find();
        res.json(shirts);
    }

    async deleteShirt(req: Request, res: Response): Promise<void> {
        const id  = req.params.id;
        const shirt = await Shirt.findById(id)
        await Shirt.findOneAndDelete(shirt.id);
        res.json({response: 'Shirt Deleted successfully'})
    }

    async updateShirt(req: Request, res: Response): Promise<void>{
        const  id  = req.params.id;
        let shirt =await Shirt.findById(id)
        shirt.set(req.body).save()
        
        res.json(req.body)
    }


}

const shirtController = new ShirtController();

export default shirtController;