"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leagueController_1 = __importDefault(require("../controllers/leagueController"));
class LeagueRouter {
    constructor() {
        this.router = (0, express_1.Router)(),
            this.routes();
    }
    routes() {
        this.router.post("/leagues", leagueController_1.default.CreateLeague);
        this.router.delete('/leagues/:id', leagueController_1.default.deleteLeague);
        this.router.get("/leagues", leagueController_1.default.getAllLeague);
    }
}
const leagueRouter = new LeagueRouter();
exports.default = leagueRouter.router;
