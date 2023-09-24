import { Model, Schema, Types, model } from "mongoose"

interface IShippingDetails {
    address: string,
    cellphone: number, 
    location: string, 
    name: string,
}

interface IItem {
    id: number,
    img: string,
    name: string,
    price: number,
    quantity: number,
}

export interface IOrder {
    createdAt: Date;
    user: Types.ObjectId;
    price: number;
    shippingCost: number;
    items: IItem[];
    shippingDetails: IShippingDetails;
    status: string;
    total: number;
}

const orderSchema = new Schema <IOrder> ({
    createdAt:{
        type: Date,
        default: Date.now
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "Usuario", 
        required: true

    },
    price:{
        type: Number,
        required: true,

    },
    shippingCost:{
        type: Number,

    },
    items:{
        type: [{
        id: {
            type: Number,
            required: true,
        },
        price:{
            type: Number, 
            required: true,
        },
        quantity:{
            type: Number,
            required: true,
        },
        name:{
            type: String,
            required: true,
        }
        }],
        required: true,
    },
    shippingDetails:{
        name: {
            type: String,
            required: true,
        },
        cellphone: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        address:{
            type: String,
            required: true,
        }
    },
    status:{
        type: String,
        required: true,
    },
    total:{
        type: Number,
        required: true,
    }
})

const Order: Model <IOrder>  = model <IOrder> ("Order", orderSchema)

export default Order