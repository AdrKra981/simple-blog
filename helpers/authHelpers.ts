import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const validateJWT = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      throw new Error("No token found");
    }
    return await verifyJWTToken(token);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const verifyJWTToken = async (token: string) => {
  const decodedData: any = await jwt.verify(token, process.env.JWT_SECRET!);

  if(! decodedData.userId){
    throw new Error("Error with verify token!");
  }

  return decodedData.userId;
} 