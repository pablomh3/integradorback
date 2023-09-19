import Router from "express"
import { getOrders, createOrder } from "../controller/orders"
import { collectErrors } from "../middlewares/recolectarErrores"
import { check } from "express-validator"
import validateJWT from "../middlewares/validateJWT"

const router = Router ()

router.get("/", [validateJWT, collectErrors], getOrders)
router.post ("/", [validateJWT,
    check("price", "el precio es obligatorio").not().isEmpty(),
    check("shippingCost", "El costo de envío es obligatorio").not().isEmpty(),
    check("total", "el precio total es obligatorio").not().isEmpty(),
    check("shippingDetails", "los detalles de envío son obligatorios").not().isEmpty(),
    check("items","es obligatorio tener al menos un producto en la compra").not().isEmpty(),
    collectErrors,
], createOrder)

export default router