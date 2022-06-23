"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({ _id: user._id }, config_1.default.jwtSecret);
}
exports.default = createToken;
