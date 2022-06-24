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
const league_1 = __importDefault(require("../models/league"));
const mongoose_1 = __importDefault(require("mongoose"));
class LeagueController {
    CreateLeague(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newLeague = new league_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                name: req.body.name,
                team: req.body.team
            });
            yield newLeague.save();
            res.json({ data: newLeague });
        });
    }
    deleteLeague(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const league = yield league_1.default.findById(id);
            yield league_1.default.findOneAndDelete(league.id);
            res.json({ response: 'League Deleted successfully' });
        });
    }
    getAllLeague(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const leagues = yield league_1.default.find();
            res.json(leagues);
        });
    }
}
const leagueController = new LeagueController();
exports.default = leagueController;
