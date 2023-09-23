import { Request, Response, } from "express"
import Order, { IOrder } from "../models/orders"
import { ObjectId } from "mongoose"

export const getOrders = async (req: Request, res: Response) : Promise <void> =>{
    const userID : ObjectId = req.body.userConfirmed._id;

    const consult = { user: userID}

    const orders = await Order.find(consult)

    res.json ({
        data: [... orders]
    })
}

export const createOrder =async (req: Request, res: Response) : Promise <void> => {
    const userID : ObjectId = req.body.userConfirmed._id;
    const orderData : IOrder = req.body;

    const data ={
        ...orderData,
        user: userID,
        createdAt: new Date(),
        status: "pending",
    }
    
    console.log(data);
    
    const order = new Order (data); 
    
    await order.save()
    
    res.status(201).json({
        order
    })

  
}

// {   "price": 200,
//     "shippingCost": 1000,
//    "total": 4500,
//    "shippingDetails": {
//        "name": "Nombre",
//        "cellphone": 22222,
//        "location": "avenida",
//        "address": "siempre viva"
//    },
//    "items": [
//        {
//            "desc": "descripción",
//            "id": 4,
//            "img": "url",
//            "price": 95,
//            "quantity": 3,
//            "title": "producto"
//        },
//        {
//            "desc": "descripción",
//            "id": 1,
//            "img": "url",
//            "price": 94,
//            "quantity": 2,
//            "title": "producto1"
//        },
//        {
//            "desc": "descripción",
//            "id": 2,
//            "img": "url",
//            "price": 93,
//            "quantity": 1,
//            "title": "producto2"
//        }
//    ]
// }