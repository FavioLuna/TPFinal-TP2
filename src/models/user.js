"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//Esta dependencia formatea loe errorres de MongoDB
//relacionados al error por unique.
//De esta forma es más legible
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const validator = require('validator');
//Schema define cómo sera el modelo en la BD
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error("Please enter a name");
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid");
            }
        }
    },
    password: {
        type: String,
        minLength: 8,
        trim: true,
        required: true,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error("Please enter a name");
            }
        }
    },
    admin: {
        type: Boolean,
        default: false,
    },
    //User tiene shirts
    shirts: [{
            type: mongoose_1.Schema.Types.ObjectId,
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
exports.default = (0, mongoose_1.model)('User', userSchema); //Exporto el modelo, primer parametro nombre, segundo el shechma que usa.
