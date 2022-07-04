import {Schema, model } from "mongoose" 

const shirtSchema = new Schema(
    {
      
        name:{
            type: String,
            required: false,
            trim: true
        },

        number:{
            type: Number,
            required: false,
        },

        price:{
            type: Number,
        },

        description:{
            type: String,
            required: false
        },

        size: {
            type: Number,
            required: true
        },

        

        img: {
            type: String,
            required: true
        },

        year: {
            type: Number,
            required: true
        },

         team:{
             type: Schema.Types.ObjectId,
             ref:'team'
        },

         league:{
             type: Schema.Types.ObjectId,
             ref:'league'
         }
    }
)

export default model('Shirt', shirtSchema)