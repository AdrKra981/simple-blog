import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

@modelOptions({ schemaOptions: {} })
class User {
    @prop({required: true, unique: true})
    public username!: string;

    @prop({required: true, unique: true})
    public email!: string;

    @prop({required: true})
    public password!: string;
}

export const UserModel = mongoose.models.User || getModelForClass(User);
   