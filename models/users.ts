import { Model, Schema, model } from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    password: string;
    code?: string;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "te faltó el nombre"]
    },
    email: {
        type: String,
        required: [true, "te faltó el email"]
    },
    password: {
        type: String,
        required: [true, "te faltó la password"]
    },
     code:{
        type: String
    }
});

userSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    return usuario;
};

const Usuario: Model<IUser> = model<IUser>("Usuario", userSchema);
export default Usuario;
