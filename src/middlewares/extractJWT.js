"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const extractJWT = (req, res, next) => {
    var _a;
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; //Del Authorization del Header del request, tomo la segunda parte que es el token. Ya que la primera es la palabra reservada Bearer
    if (token) {
        jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret, (error, decoded) => {
            if (error) {
                return res.status(404).json({ message: error.message, error });
            }
            else {
                res.locals.jwt = decoded; //Si todo sale bien, lo guardo en los locals de la response para que pueda ser utilizado en la siguiente función
                next();
            }
        });
    }
    else {
        return res.status(401).json({ messgae: 'Unauthorized' });
    }
};
exports.default = extractJWT;
