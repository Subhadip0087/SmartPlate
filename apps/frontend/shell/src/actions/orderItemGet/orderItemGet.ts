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

interface CartItem {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: "mainCourse" | "snacks";
    image: string;
    image_id: string;
    description?: string | null;
    is_veg: boolean;
}

interface UserPayload {
    id: number;
    name: string;
    email: string;
    enrollment: number;
    avatar: string;
    avatar_id: string;
    isAdmin: boolean;
    created_at: object | undefined;
    updated_at: object | undefined;
    iat: number | undefined;
    cart: CartItem[];
}


export const addedToCartServer=async(elm:Partial<UserPayload>)=>{
    try{
        const cartData=JSON.stringify(elm.cart)
        
        await prisma.cart.create({
            data: {
                userId: Number(elm.id),
                items: JSON.parse(cartData),
                email: elm.email as string,
                enrollment: String(elm.enrollment),

            },
        });
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
    return {
        success:true,
        message:"Added to cart"
    }
    
}