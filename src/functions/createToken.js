"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//el token de JWT consta de 3 partes:
//El header: consta de type token, JWT en este caso y el algoritmo usado, en este caso esta por defecto 
//El Payload: contiene the claims. Son los atributos de una entidad que queremos guardar y alguna data adicional. En este caso solametne el Id
//La Signature: consta del header cifrado, el payload cifrado, la palabara secreta y el algoritmo de cifrado usado
function createToken(user) {
    return jsonwebtoken_1.default.sign({ _id: user._id }, config_1.default.jwtSecret); //Le paso qué quiero guardar en el token  y la clave secreta
}
exports.default = createToken;
