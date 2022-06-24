"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
//Esta dependencia formatea loe errorres de MongoDB
//relacionados al error por unique.
//De esta forma es más legible
const beautifyUnique = require('mongoose-beautiful-unique-validation');
//Schema define cómo sera el modelo en la BD
//Necesito aclarar para poder usar los atributos en los compare
//Sino me da un error de Documentacion y que no existe tal atributo
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true, //se usa para sacar espacios vacios adelante y detras
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        minLength: 8,
        trim: true,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    //User tiene shirts
    /*     shirts:[{
            type: Schema.Types.ObjectId, //Le digo qué tipo de datos va a guardar: el id referido al id ed las shirts
            ref: 'shirt' //le referencio el modelo shirt, ya que podra tener una coleccion de shirts
        }] */
}, {
    timestamps: true //Agrega el createdAT y updateAT en el model
});
userSchema.plugin(beautifyUnique);
//El método .pre() toma de parametro una acción
//en este caso es el 'save'
//Entonces antes de que se ejecute el save, el metodo cifrará
//Como password es un campo required, cuando el user haga una
//modificacion del mismo, entrará al if y ejecutara el cifrado.
//Para que funcione debo indicarle qué tipo de documento será el que va a analizar
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        //Consulto si el user modifica la contraseña
        if (user.isModified('password')) {
            user.password = yield bcrypt_1.default.hash(user.password, 8); //Guardo el hash, password cifrado, en la pass del user.
        }
        next();
    });
});
//Defino un metodo para comparar contraseñas
userSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
exports.default = (0, mongoose_1.model)('User', userSchema); //Exporto el modelo, primer parametro nombre, segundo el shechma que usa.
