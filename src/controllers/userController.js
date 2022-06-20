"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    getUser(req, res) {
        res.send('Hello im me');
    }
}
const userController = new UserController();
exports.default = userController;
