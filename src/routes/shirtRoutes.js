"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shirtController_1 = __importDefault(require("../controllers/shirtController"));
class ShirtRouter {
    constructor() {
        this.router = (0, express_1.Router)(),
            this.routes();
    }
    routes() {
        this.router.post("/shirt", shirtController_1.default.CreateShirt);
        this.router.get("/shirts", shirtController_1.default.getAllShirts);
        this.router.delete('/shirt/:id', shirtController_1.default.deleteShirt);
        this.router.put("/shirt/:id", shirtController_1.default.updateShirt);
    }
}
const shirtRouter = new ShirtRouter();
exports.default = shirtRouter.router;
