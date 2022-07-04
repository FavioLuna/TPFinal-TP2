import {Schema, model } from 'mongoose'

const leagueSchema = new Schema(
    {
        name:{
            type: String,
            required: false,
            trim: true
        },
        
    }
)

export default model('League', leagueSchema)