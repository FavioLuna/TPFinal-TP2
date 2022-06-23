import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(' ')[1]; //Del Authorization del Header del request, tomo la segunda parte que es el token. Ya que la primera es la palabra reservada Bearer
    if (token) {
        jwt.verify(token, config.jwtSecret, (error, decoded) =>{ //Verifico si el token tiene la misma clave secreta que la establecida y si es asi lo guardo el token decoded
            if (error) {
                return res.status(404).json({message: error.message, error})
            }
            else{
                res.locals.jwt = decoded//Si todo sale bien, lo guardo en los locals de la response para que pueda ser utilizado en la siguiente función
                next();
            }
        });
    }
    else{
        return res.status(401).json({messgae: 'Unauthorized'})
    }

} 

export default extractJWT