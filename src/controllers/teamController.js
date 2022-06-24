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
const team_1 = __importDefault(require("../models/team"));
const mongoose_1 = __importDefault(require("mongoose"));
class TeamController {
    createTeam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTeam = new team_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                name: req.body.name,
                img: req.body.img,
            });
            yield newTeam.save();
            res.json({ data: newTeam });
        });
    }
    deleteTeam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const team = yield team_1.default.findById(id);
            yield team_1.default.findOneAndDelete(team.id);
            res.json({ response: 'Team Deleted successfully' });
        });
    }
    getAllTeams(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = yield team_1.default.find();
            res.json(teams);
        });
    }
}
const teamController = new TeamController();
exports.default = teamController;
