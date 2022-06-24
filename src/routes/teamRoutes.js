"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teamController_1 = __importDefault(require("../controllers/teamController"));
class TeamRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        //CREAR USUARIO
        this.router.post('/team', teamController_1.default.createTeam);
        //DELETE USUARIO
        this.router.delete('/team/:id', teamController_1.default.deleteTeam);
        this.router.get("/team", teamController_1.default.getAllTeams);
    }
}
const teamRoutes = new TeamRoutes();
exports.default = teamRoutes.router;
