import {Schema, model } from 'mongoose'

const teamSchema = new Schema(
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
        img:{
            type: String,
            required: true
        },
    }
)

export default model('Team', teamSchema)