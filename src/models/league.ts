import {Schema, model } from 'mongoose'

const leagueSchema = new Schema(
    {
        id:{
            type: String,
            required: true,
        },
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

export default model('Team', leagueSchema)