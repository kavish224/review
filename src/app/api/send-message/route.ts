import dbConnect from "@/lib/dbConnect";
import UserModel, { Message } from "@/model/User";

export async function POST(request: Request) {
    await dbConnect()

    const {username, content} = await request.json();
    try {
        const user = await UserModel.findOne({username});
        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            })
        }
        if (!user.isAcceptingMessage) {
            return Response.json({
                success: false,
                message: "Not Accepting message"
            })
        }
        const newMessage = {content, createdAt: new Date()}
        user.messages.push(newMessage as Message)
        await user.save()
        return Response.json({
            success: true,
            message: "message sent successfully"
        })
    } catch (error) {
        console.error("An unexpected Error occoured", error)
        return Response.json({
            success: false,
            message: "An unexpected Error occoured"
        })
    }
}