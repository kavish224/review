import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {User} from "next-auth";

export async function POST(request: Request){
    await dbConnect()

    const session = await getServerSession(authOptions);
    const user:User = session?.user as User
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not Authenticated"
        })
    }
    const userId = user._id
    const {acceptMessages} = await request.json()
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessage: acceptMessages},
            {new: true}
        )
        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "failed to update user status to accept messages"
            })
        }
        return Response.json({
            success: true,
            message: "Message acceptance status updated",
            updatedUser
        })
    } catch (error) {
        console.log("failed to update user status to accept messages")
        return Response.json({
            success: false,
            message: "failed to update user status to accept messages"
        })
    }
}

export async function GET(request: Request){
    await dbConnect()

    const session = await getServerSession(authOptions);
    const user:User = session?.user as User
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not Authenticated"
        })
    }
    const userId = user._id;
    try {
        const foundUser = await UserModel.findById(userId);
        if (!foundUser) {
            return Response.json({
                success: false,
                message: "User not found"
            })
        }
        return Response.json({
            success: true,
            isAcceptingMessage: foundUser.isAcceptingMessage
        })
    } catch (error) {
        console.error("Error in getting message acceptance status")
        return Response.json({
            success: false,
            message: "Error in getting message acceptance status"
        })
    }
}