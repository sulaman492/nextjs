import { connect } from "@/lib/db";
import User from "@/models/user";
import Category from "@/models/category";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export const GET=async (req:Request) => {
    try {
        const {searchParams}=new URL(req.url)
        const userId=searchParams.get("userId")

        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message:"User id is not valid"}),{status:400})
        }
        await connect()
        const user=await User.findById(userId)
        if(!user){
            return new NextResponse(JSON.stringify({message:"user not found"}),{status:400})
        }

        const categories=await Category.find({
            user:userId,
        })

        return new NextResponse(JSON.stringify(categories),{status:200})

    } catch (error:any) {
        return new NextResponse("Error in fetching categories"+error.message,{
            status:500
        })
    }
}

export const POST=async (req:Request) => {
    try {
        const {searchParams}=new URL(req.url)
        const userId=searchParams.get("userId")
        const {title}=await req.json()
        if(!userId || Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message:"user id is not valid"}),{status:400})
        }
        await connect();

        const user=await User.findById(userId)
        if(!user){
            return new NextResponse(JSON.stringify({message:"user not found"}),{status:400})
        }

        const newCategory=new Category({
            title,
            user:new Types.ObjectId(userId)
        })
        await newCategory.save()
        return new NextResponse(JSON.stringify({message:"category created"}),{status:200})


    } catch (error:any) {
        return new NextResponse("Error in creating category"+error.message,{status:500})
    }
}