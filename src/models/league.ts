import {Schema, model } from 'mongoose'

const leagueSchema = new Schema(
    {
        name:{
            type: String,
            required: false,
            trim: true
        },
        teams:[{
            type: Schema.Types.ObjectId,
            ref:'team'
        }]
    }
)

export default model('League', leagueSchema)