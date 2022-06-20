"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    getUser(req, res) {
        res.send('Hello im me');
    }
    routes() {
        this.router.get('/user/me', this.getUser);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
