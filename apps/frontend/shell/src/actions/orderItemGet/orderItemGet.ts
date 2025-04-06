"use server"
import {prisma} from "@repo/db/config"
export const orderItemGet=async(id:string)=>{
    try{
        const orderItems=await prisma.orders.findMany({
            where:{
                userId:Number(id)
            },
            orderBy:{
                createdAt:"desc"
            }
            
        })
        return orderItems
    }catch(error){
        if(error instanceof Error){
            return{
                success:false,
                message:error.message
            }
        }
        else{
            return{
                success:false,
                message:"Something went wrong"
            }
        }
    }
}