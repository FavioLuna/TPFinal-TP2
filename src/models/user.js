"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
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
    updatedAt: {
        type: Date, default: Date.now //le agrego una fecha por default que será la del momento de creacion del Schema
    }
});
exports.default = (0, mongoose_1.model)('User', userSchema); //Agrego modelo a la base de datos, en base a lo recien detallado
