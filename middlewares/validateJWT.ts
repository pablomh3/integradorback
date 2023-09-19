import { NextFunction, Request, Response } from "express";
import jwt, {JwtPayload } from "jsonwebtoken"
import User, { IUser } from "../models/users"

const validateJWT = async (req: Request, res: Response, next: NextFunction) : Promise <void> =>{
    const token = req.headers["x-token"] as string;

    if (!token){
        res.status(401).json({
            msg: "no hay token en la petición"
        })
        return
    }

    try {
        const clave = process.env.KEY as string;
        const payload = jwt.verify(token, clave) as JwtPayload;

        const {id} = payload;

        const userConfirmed : IUser | null = await User.findById(id)

        if (!userConfirmed) {
            res.status(401).json ({
                msg: "token inválido"
            })
            return
        }

        req.body.userConfirmed = userConfirmed

        next ()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: "token inválido"
        })
    }
};

export default validateJWT