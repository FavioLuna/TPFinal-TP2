import {Schema, model } from 'mongoose'

const leagueSchema = new Schema(
    {
        name:{
            type: String,
            required: false,
            trim: true
        },
<<<<<<< HEAD
        
=======
        img: {
            type: String,
            required: true
        }
>>>>>>> 0c4fe5dc5851df8d1fa2b35fd688582792466f3c
    }
)

export default model('League', leagueSchema)