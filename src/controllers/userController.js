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
            if (!newUser) {
                //E 400 BAD REQUEST si user es null
                res.status(400).json({ success: false, code: 400, message: 'Error creating User' });
            }
            try {
                yield newUser.save();
                //S 201 CREATED
                res.status(201).json({ succes: true, message: "User obtained successfully", newUser });
            }
            catch (error) {
                //E 400 BAD REQUEST si hubo error
                res.status(400).json({ success: false, code: 400, message: error.message });
            }
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
            const _id = req.params.id;
            try {
                const user = yield user_1.default.findById(_id).populate('shirts');
                if (!user) {
                    res.status(404).json({ succes: false, code: 404, message: 'User not found' });
                }
                res.json({ succes: true, message: "User obtained successfully", user });
            }
            catch (error) {
                res.status(400).json({ success: false, code: 400, message: error.message });
            }
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
            const { _id } = req.params;
            res.json({ response: 'User Deleted successfully' });
            try {
                const user = yield user_1.default.findById({ _id });
                if (!user) {
                    res.status(404).json({ succes: false, code: 404, message: 'User not found' });
                }
                yield user_1.default.findOneAndDelete({ _id });
                res.status(200).json({ succes: true, message: "User deleted successfully" });
            }
            catch (error) {
                res.status(400).json({ success: false, code: 400, message: error.message });
            }
        });
    }
}
const userController = new UserController();
exports.default = userController;
