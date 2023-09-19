import Usuario, { IUser } from "../models/users";

export const emailExist =async (email: string) : Promise <void> => {
    const emailInDB : IUser | null = await Usuario.findOne({email })

    if (emailInDB){
        throw new Error (`el mail ${email} ya fue registrado`)
    }

}