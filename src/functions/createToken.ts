import config from "../config/config";
import jwt from 'jsonwebtoken';
import { I_UserDoc } from "../models/user";
//el token de JWT consta de 3 partes:
//El header: consta de type token, JWT en este caso y el algoritmo usado, en este caso esta por defecto 
//El Payload: contiene the claims. Son los atributos de una entidad que queremos guardar y alguna data adicional. En este caso solametne el Id
//La Signature: consta del header cifrado, el payload cifrado, la palabara secreta y el algoritmo de cifrado usado

function createToken(user: I_UserDoc){
    return jwt.sign({_id: user._id}, config.jwtSecret,)//Le paso qué quiero guardar en el token  y la clave secreta
}

export default createToken;