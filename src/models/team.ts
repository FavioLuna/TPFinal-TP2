import {Schema, model } from 'mongoose'

const teamSchema = new Schema(
    {
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