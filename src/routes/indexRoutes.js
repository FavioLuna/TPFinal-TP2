"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
    }
}
const indexRoutes = new IndexRoutes();
indexRoutes.routes();
exports.default = indexRoutes.router;
