import { Model, Schema, model } from 'mongoose';

export interface Iissue {
    name: string;
    email: string;
    phone: number;
    message: string;
}

const issueSchema = new Schema <Iissue> ({
    name: {
        type: String,
        required: [true, "te faltó el nombre"]
    },
    email: {
        type: String,
        required: [true, "te faltó el email"]
    },
    phone: {
        type: Number,
        required: [true, "te faltó el celular"]
    },
    message: {
        type: String,
        required: [ true, "te faltó escribir el mensaje"]
    }
})

issueSchema.methods.toJSON = function () {
    const { __v, _id, ...issue} = this.toObject ();
    return issue;
}

const Issue: Model <Iissue> = model <Iissue> ("Issue", issueSchema)

export default Issue 