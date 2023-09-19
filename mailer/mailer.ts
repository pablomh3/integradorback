import nodemailer from "nodemailer"

const pass = process.env.PASS 
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "tiendagameoverarg@gmail.com",
        pass: pass
    },
    from: "tiendagameoverarg@gmail.com"
})

export const sendEmail =async (to:string, code: string ):Promise<void> => {
    try{
        const mailOptions={
            from: '"Game Over Tienda Oficial" tiendagameoverarg@gmail.com',
            to,
            subject: "Código de recuperación de contraseña",
            text: `Ingresa el siguiente código: ${code} en la web y escribe tu nueva contraseña. Tendrás que vovler a loguearte a continuación.
                
            Si no pediste este código, solo ignora el mail.
            `
        }
        await transporter.sendMail(mailOptions)
        console.log("Correo electrónico enviado")
    }catch(error){
        console.error("Error al enviar el correo electrónico", error)
    }
}