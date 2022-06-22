import {Schema, model, Document} from 'mongoose'
import brcypt from 'bcrypt';

//Esta dependencia formatea loe errorres de MongoDB
//relacionados al error por unique.
//De esta forma es más legible
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const validator = require('validator');


//Schema define cómo sera el modelo en la BD
const userSchema = new Schema({
    name: {
        type: String, //tipo de dato
        required: true, //si es requerido o no
        trim: true, //se usa para sacar espacios vacios adelante y detras
<<<<<<< HEAD
        validate(value: any) {
=======
        validate(value: String) {
>>>>>>> 7fa98c621a40c78a01dcc1140f05b78f0d8802d1
            if (validator.isEmpty(value)) {
                throw new Error("Please enter a name");
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
<<<<<<< HEAD
=======
        trim: true,
>>>>>>> 7fa98c621a40c78a01dcc1140f05b78f0d8802d1
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
        required:true,
        validate(value: String) {
            if (validator.isEmpty(value)) {
                throw new Error("Please enter a name");
            }
        }
    }, 
    admin:{
        type: Boolean,
        default: false,
    },
    //User tiene shirts
    shirts:[{
        type: Schema.Types.ObjectId, //Le digo qué tipo de datos va a guardar: el id referido al id ed las shirts
        ref: 'shirt' //le referencio el modelo shirt, ya que podra tener una coleccion de shirts
    }]
});
userSchema.plugin(beautifyUnique);
//El método .pre() toma de parametro una acción
//en este caso es el 'save'
//Entonces antes de que se ejecute el save, el metodo cifrará
//Como password es un campo required, cuando el user haga una
//modificacion del mismo, entrará al if y ejecutara el cifrado.

/* userSchema.pre('save', async function(next){
    const user = this
    //Consulto si el user modifica la contraseña
    if (user.isModified('password')) {
        user.password = await brcypt.hash(user.password, 8)
    }
    next()
}) */
export default model('User', userSchema) //Exporto el modelo, primer parametro nombre, segundo el shechma que usa.