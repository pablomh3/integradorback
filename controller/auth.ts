import { Request, Response } from "express";
import Usuario, { IUser } from "../models/users";
import bcryptjs from "bcryptjs";
import { generateJWT } from "../helpers/generateJWT";
import randomstring from "randomstring"
import { sendEmail } from "../mailer/mailer";

export const register = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password }: IUser = req.body;

    const usuario = new Usuario({ name, email, password });

     const saltRounds = 10;
     const salt = bcryptjs.genSaltSync(saltRounds);

     usuario.password = bcryptjs.hashSync(password, salt);
     await usuario.save();
    
    res.status(201).json({
        usuario,
    });
};

export const sendMail = async (req: Request, res: Response) : Promise <void> =>{

    const { email } = req.body
        const usuario = await Usuario.findOne({email})
    try {
        if(!usuario){
        res.status(400).json({
            msg: "No se encontró el usuario en la base de datos"
        })
        return
    }
    
    const newCode = randomstring.generate(6);

    usuario.code = newCode

    await usuario.save()

    await sendEmail(email, newCode)

    res.status(201).json({
        usuario
    })

    } catch (error) {
    console.log(error)
    }
        
}

 export const newPassword =  async (req: Request, res: Response) : Promise <void> => {
    const { email, code, password } = req.body
    try {
        const usuario = await Usuario.findOne({ email })

        if(!usuario){
        res.status(400).json({
            msg: "No se encontró el email en la base de datos"
        })
        return
        }

        if(usuario.code !== code){
        res.status(401).json({
            msg: "El código ingresado es incorrecto"
        })
        return
        }
         const saltRounds = 10;
         const salt = bcryptjs.genSaltSync(saltRounds);
        const usuarioActualizado = await Usuario.findOneAndUpdate({email},{password: password})
        usuario.password = bcryptjs.hashSync(password, salt);
        await usuario.save();
       

            res.status(200).json({
            msg: "Contraseña modificada con éxito"
            }) 

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error en el servidor"
        })
    
}}


export const logIn = async (req: Request, res: Response ) : Promise <void> =>{
    const { email, password } :IUser = req.body 

    try {
        const user = await Usuario.findOne({ email })
        if(!user){
            res.status(400).json({
                msg: "no se encontró el usuario en la base de datos"
            });
            return
        }

        const validatePassword = bcryptjs.compareSync(password, user.password)

        if(!validatePassword){
            res.status(400).json({
                msg: "la contraseña es incorrecta"
            })
            return
        }

        const token = await generateJWT(user.id)
        
        res.json ({
            user, token
        })
    } catch (error) {
        res.status(500).json({
            msg: "error en el servidor"
        })
        console.log(error)
    }
}