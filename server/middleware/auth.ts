import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const isAuthenticated = async(req: Request, res: Response, next: NextFunction) => {
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1];
        try{
            if(token){
                jwt.verify(token, "anscerrobotics");
                next();
            }
        }catch(err){
            throw new Error("Not authorized token expired, please login again")
        }
    }else{
        throw new Error("There is no token attached to header");
    }
};