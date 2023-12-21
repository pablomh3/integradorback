import { Router } from "express";
import { check } from "express-validator";
import { collectErrors } from "../middlewares/recolectarErrores";
import { issue } from "../controller/issue";

const router = Router ()

router.post("/", [
    check ("name", "faltó el nombre").not().isEmpty(),
    check ("email", "faltó el email").isEmail(),
    check ("phone", "faltó el celular").not().isEmpty(),
    check ("message", "faltó el mensaje").not().isEmpty(),
    collectErrors,
], issue)

export default router