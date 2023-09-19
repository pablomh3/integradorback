import jwt from "jsonwebtoken"

export const generateJWT = (id: string ="") : Promise <string> =>{
    return new Promise ((res, rej) =>{
        const payload = {id}

        jwt.sign( payload, 
            process.env.KEY as string, 
            { expiresIn: "3h"},
            (err: Error | null, token: string | undefined ) =>{
                if(err){
                    console.log(err)
                    rej("error al generar el token")
                }else{
                    res(token as string)
                }
            }

        )
    })
}