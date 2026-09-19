import { connect } from "@/lib/db";
import User from "@/models/user";
import Category from "@/models/category";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export const PATCH=async (req:Request,context:{params:any}) => {
    const categoryId=context.params.category
    try {
        const {title}=await req.json()
        
        const {searchParams}=new URL(req.url)
        const userId=searchParams.get("userId")

        if(!userId || Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message:"invalid or missing userId"}))
        }

        if(!categoryId || Types.ObjectId.isValid(categoryId)){
            return new NextResponse(JSON.stringify({message:"invalid or missing categoryId"}))
        }

        await connect()
        
        const user=await User.findById(userId)

        if(!user){
            return new NextResponse(JSON.stringify({message:"user not found"}),{status:404})
        }
        
        const category=await Category.findOne({_id:categoryId,user:userId})
        if(!category){
            return new NextResponse(JSON.stringify({message:"category not found"}),{status:404})
        }

        const updatedCategory=await Category.findByIdAndUpdate({_id:categoryId},{title:title},{new:true})

        return new NextResponse(JSON.stringify({message:"category updated successfully",category:updatedCategory}),{status:200})

    } catch (error:any) {
        return new NextResponse("Erorr in updating category "+error.message,{status:500})
    }
}
export const DELETE=async (req:Request,context:{params:any}) => {
    const categoryId=context.params.category
    try {
         const {searchParams}=new URL(req.url)
        const userId=searchParams.get("userId")

        if(!userId || Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message:"invalid or missing userId"}))
        }

        if(!categoryId || Types.ObjectId.isValid(categoryId)){
            return new NextResponse(JSON.stringify({message:"invalid or missing categoryId"}))
        }

        await connect()
        
    } catch (error) {
        
    }
}