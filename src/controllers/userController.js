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
const createToken_1 = __importDefault(require("../functions/createToken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
class UserController {
    //Uso Promise<Response> para especificar que voy a devolver una Response
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uEmail = yield user_1.default.findOne({ email: req.body.email });
            if (uEmail) {
                return res.status(400).json({ succes: false, msg: 'Email already in use' });
            }
            const newUser = new user_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }); //Tomo los datos del body de la Request y los uso para crear un nuevo user
            if (!newUser) {
                //E 400 BAD REQUEST si user es null o hay algun campo req vacio
                return res.status(400).json({ success: false, message: 'Error creating User' });
            }
            try {
                yield newUser.save();
                //S 201 CREATED
                return res.status(201).json({ succes: true, message: "User created successfully", newUser });
            }
            catch (error) {
                //E 400 BAD REQUEST si hubo error
                return res.status(400).json({ success: false, message: error.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.email || !req.body.password) {
                return res.status(400).json({ succes: false, msg: 'Please send a email and password' });
            }
            const user = yield user_1.default.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ succes: false, msg: 'User does not exists' });
            }
            bcrypt_1.default.compare(req.body.password, user.password, (error, result) => {
                if (error) {
                    return res.status(401).json({ messsage: 'Unauthorized' });
                }
                else if (result) {
                    const token = (0, createToken_1.default)(user);
                    user.token = token;
                    return res.status(200).json({ message: 'Auth Successful', user, token });
                }
            });
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = "";
            let id = req.params.id;
            let user = yield user_1.default.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            try {
                res.locals.jwt = token;
                user.token = token;
                return res.status(200).json({ message: 'Success logout', user });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error.message });
            }
        });
    }
    makeChange(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            let user = yield user_1.default.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            try {
                if (req.body.password != user.password) {
                    let newPassword = req.body.password;
                    user.password = yield bcrypt_1.default.hash(newPassword, 8);
                    user.save();
                    return res.status(200).json({ message: 'User password updated', user });
                }
                user.set(req.body).save();
                return res.status(200).json({ message: 'User update', user });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error.message });
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //populete me sirve para ver el contenido del shcema.object.id
            //En este caso le pido todo, pero como segundo parametro puedo especificar qué ver
            //especificado dentro del segundo parametro entre comillas simples separado por espacios
            //con - le puedo sacar qué datos
            const id = req.params.id;
            try {
                const user = yield user_1.default.findById(id).populate('shirts');
                if (!user) {
                    return res.status(404).json({ succes: false, message: 'User not found' });
                }
                return res.json({ succes: true, message: "User obtained successfully", user });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error.message });
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_1.default.find().select('-password');
            return res.json(users);
        });
    }
    /*  getAllUserShirts(req: Request, res: Response){
        res.send('Hello im me')
    } */
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const user = yield user_1.default.findById(id);
                if (!user) {
                    return res.status(404).json({ succes: false, message: 'User not found' });
                }
                yield user_1.default.findOneAndDelete(user.id);
                return res.status(200).json({ succes: true, message: "User deleted successfully" });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error.message });
            }
        });
    }
}
const userController = new UserController();
exports.default = userController;
