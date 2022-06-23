import config from "../config/config";
import jwt from 'jsonwebtoken';
import { I_UserDoc } from "../models/user";

function createToken(user: I_UserDoc){
    return jwt.sign({_id: user._id}, config.jwtSecret,)
}

export default createToken;