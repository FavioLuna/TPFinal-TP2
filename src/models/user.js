"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator = require('validator');
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
        required: true
    },
    admin: {
        type: Boolean,
        default: false,
    },
    shirts: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'shirt' //le referencio el modelo shirt, ya que podra tener una coleccion de shirts
        }]
});
//BUSCAR COMO CIFRAR CONSTASEÑAS
exports.default = (0, mongoose_1.model)('User', userSchema); //Agrego modelo a la base de datos, en base a lo recien detallado
