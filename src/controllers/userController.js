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
const user_1 = __importDefault(require("../models/user"));
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new user_1.default(req.body); //Tomo los datos del body de la Request y los uso para crear un nuevo user
            yield newUser.save();
            res.json({ data: newUser });
        });
    }
    login(req, res) {
        res.send('Hello im LOGIN');
    }
    logout(req, res) {
        res.send('Hello im LOGOUT');
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //populete me sirve para ver el contenido del shcema.object.id
            //En este caso le pido todo, pero como segundo parametro puedo especificar qué ver
            //especificado dentro del segundo parametro entre comillas simples separado por espacios
            //con - le puedo sacar qué datos 
            const user = yield user_1.default.findById({ id: req.params.id }).populate('shirts');
            res.json(user);
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_1.default.find();
            res.json(users);
        });
    }
    /*  getAllUserShirts(req: Request, res: Response){
        res.send('Hello im me')
    } */
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield user_1.default.findOneAndDelete({ id });
            res.json({ response: 'User Deleted successfully' });
        });
    }
}
const userController = new UserController();
exports.default = userController;
