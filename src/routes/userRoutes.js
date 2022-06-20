"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        //CREAR USUARIO
        this.router.post('/', userController_1.default.createUser);
        //LOGIN
        this.router.post('/login', userController_1.default.login);
        //LOGOUT
        this.router.post('/logout', userController_1.default.logout);
        //GET USUARIO
        this.router.get('/me', userController_1.default.getUser);
        //GET ALL SHIRTS OF USER 
        //this.router.get('/me/shirts', userController.getAllUserShirts);
        //DELETE USUARIO
        this.router.delete('/me', userController_1.default.deleteUser);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
