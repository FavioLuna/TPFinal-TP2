import {Schema, model} from 'mongoose'


const userSchema = new Schema({
    name: {
        type: String, //tipo de dato
        required: [true, 'Name is required'], //si es requerido o no
        trim: true, //se usa para sacar espacios vacios adelante y detras
        
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        minLength: 8,
        trim: true,
        required: [true, 'Password is required'] 
    },
    dateOfBirth: {
        type: Date
    },
    updatedAt:{
        type: Date, default: Date.now //le agrego una fecha por default que será la del momento de creacion del Schema
    }
});

export default model('User', userSchema) //Agrego modelo a la base de datos, en base a lo recien detallado