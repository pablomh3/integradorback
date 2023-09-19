import { Router } from "express";
import { register, logIn, sendMail, newPassword } from "../controller/auth";
import { check } from "express-validator";
import { collectErrors } from "../middlewares/recolectarErrores";
import { emailExist } from "../helpers/validaciones";

const router = Router ()

router.post("/register", [
    check ("name", "faltó el nombre").not().isEmpty(),
    check ("email", "faltó el email").isEmail(),
    check ("password", "la contraseña debe contener al menos 6 carácteres").isLength({ min: 6 }),
    
    check("email").custom(emailExist),
      
    collectErrors
], register)

router.post("/login", [
    check ("email", "faltó el email").isEmail(),
    check ("password", "la contraseña debe contener al menos 6 carácteres").isLength({ min: 6 }),
    collectErrors
], logIn)

router.post("/recover", [check("email", "El email es requerido").isEmail(),],
collectErrors,
 sendMail)

router.patch(
    "/password",
    [
      check("email", "El email es requerido").isEmail(),
      check("code", "El código de verificación es requerido").not().isEmpty(),
      check ("password", "la contraseña debe contener al menos 6 carácteres").isLength({ min: 6 }),
      collectErrors,
    ],
    newPassword
  )

export default router

