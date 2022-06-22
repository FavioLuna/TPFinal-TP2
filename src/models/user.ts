import {Schema, model} from 'mongoose'
const validator = require('validator');

const userSchema = new Schema({
    name: {
        type: String, //tipo de dato
        required: true, //si es requerido o no
        trim: true, //se usa para sacar espacios vacios adelante y detras
        validate(value: any) {
            if (validator.isEmpty(value)) {
                throw new Error("Please enter a name");
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value: any){
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid");
                
            }
        }
    },
    password: {
        type: String,
        minLength: 8,
        trim: true,
        required:true 
    }, 
    admin:{
        type: Boolean,
        default: false,
    },
    shirts:[{
        type: Schema.Types.ObjectId, //Le digo qué tipo de datos va a guardar: el id referido al id ed las shirts
        ref: 'shirt' //le referencio el modelo shirt, ya que podra tener una coleccion de shirts
    }]
});
//BUSCAR COMO CIFRAR CONSTASEÑAS
export default model('User', userSchema) //Agrego modelo a la base de datos, en base a lo recien detallado