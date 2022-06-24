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
const shirt_1 = __importDefault(require("../models/shirt"));
const mongoose_1 = __importDefault(require("mongoose"));
class ShirtController {
    CreateShirt(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newShirt = new shirt_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                name: req.body.name,
                number: req.body.number,
                price: req.body.price,
                description: req.body.price,
                size: req.body.size,
                img: req.body.img,
                team: req.body.team,
                league: req.body.league,
                year: req.body.year,
            });
            yield newShirt.save();
            res.json({ data: newShirt });
        });
    }
    getAllShirts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const shirts = yield shirt_1.default.find();
            res.json(shirts);
        });
    }
    deleteShirt(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const shirt = yield shirt_1.default.findById(id);
            yield shirt_1.default.findOneAndDelete(shirt.id);
            res.json({ response: 'Shirt Deleted successfully' });
        });
    }
    updateShirt(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            let shirt = yield shirt_1.default.findById(id);
            shirt.set(req.body).save();
            res.json(req.body);
        });
    }
}
const shirtController = new ShirtController();
exports.default = shirtController;
