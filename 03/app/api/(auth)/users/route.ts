import { NextResponse } from "next/server";
import { connect } from "@/lib/db"
import User from "@/models/user";
import { Types } from "mongoose"

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async () => {

    try {
        await connect();
        const users = await User.find()
        return new NextResponse(JSON.stringify(users), { status: 200 })
    } catch (error: any) {
        return new NextResponse(JSON.stringify(`Error fetching users ${error}`), { status: 500 })
    }
}

export const POST = async (req: Request) => {
    try {
        const { username, email, password } = await req.json()
        await connect()
        const newUser = await User.create({ email, username, password })
        console.log("user created")
        return new NextResponse(JSON.stringify({ message: "user created", user: newUser }), { status: 200 })
    } catch (error) {
        return new NextResponse(JSON.stringify(`Error creating user ${error}`), { status: 500 })
    }
}

export const PATCH = async (req: Request) => {
    try {
        const { userId, newUsername } = await req.json()
        await connect()

        if (!userId || !newUsername) {
            return new NextResponse(JSON.stringify({ message: "userId or username not provided" }), { status: 400 })
        }

        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "user id is not valid" }), { status: 400 })
        }
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, { username: newUsername }, { new: true })
        if (!updatedUser) {
            return new NextResponse(JSON.stringify({ message: "user not found" }), { status: 400 })
        }
        return new NextResponse(JSON.stringify({ message: "user updated succesfully", user: updatedUser }), { status: 200 })

    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: "Error in updating user", error: error.message }), { status: 500 })
    }
}
export const DELETE = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get("userId")
    
    
        if (!userId) {
            return new NextResponse(JSON.stringify({ message: "userId or username not provided" }), { status: 400 })
        }
    
        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "user id is not valid" }), { status: 400 })
        }
        await connect()
        const deletedUser=await User.findByIdAndDelete(
            userId
        )
        if(!deletedUser){
            return new NextResponse(JSON.stringify({ message: "user not found" }), { status: 400 })
        }
        
         return new NextResponse(JSON.stringify({ message: "user deleted succesfully" }), { status: 200 })

    } catch (error:any) {
          return new NextResponse(JSON.stringify({ message: "Error in deleting user", error: error.message }), { status: 500 })
    }
}