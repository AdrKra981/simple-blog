import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../../../../connectDb";
import { UserModel } from "@/app/models/UserModel";
import bcrypt from 'bcrypt';


connectDb();


export async function POST(req: NextRequest){
    try {
        const reqBody = await req.json();

        const user = await UserModel.findOne({email: reqBody.email})

        if(user){
            throw new Error('User with that email already exists in database!')
        }
        
        const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
        const hashedPassword = await bcrypt.hash(reqBody.password, salt);
        reqBody.password = hashedPassword;

        await UserModel.create(reqBody);
        return NextResponse.json({message: 'User created succesfull', success: true}, {status: 201})  
    } catch (error: any) {
        return NextResponse.json({ message: error.message}, {status: 500})
    }
}