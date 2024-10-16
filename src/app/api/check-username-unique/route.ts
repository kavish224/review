import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod";
import { usernameValidation } from "@/schema/signupSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    await dbConnect()
    try {
        const {searchParams} = new URL(request.url)
        const queryParams = {
            username: searchParams.get('username')
        }
        const result = UsernameQuerySchema.safeParse(queryParams);
        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];
            return Response.json({
                success: false,
                message: "username must be atleast two characters"
            })
        }
        const {username} = result.data
        const existingVerifiedUsername = await UserModel.findOne({username,isVerified:true});
        if (existingVerifiedUsername) {
            return Response.json({
                success: false,
                message: "username already in use"
            })
        }
        return Response.json({
            success: true,
            message: "username available"
        })
    } catch (error) {
        console.error("Error Checking Username", error);
        return Response.json({
            success: false,
            message: "Error Checking Username"
        })
    }
}