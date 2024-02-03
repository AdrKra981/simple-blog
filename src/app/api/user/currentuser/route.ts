import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../../../../connectDb";
import { UserModel } from "@/app/models/UserModel";
import { validateJWT } from "../../../../../helpers/authHelpers";

connectDb();

export async function GET(request: NextRequest) {
  try {
    const userId = await validateJWT(request);
    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      throw new Error("No user found");
    }

    return NextResponse.json({
      message: "User data fetched successfully",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}