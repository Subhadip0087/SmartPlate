import { Request, Response } from "express";
import {prisma} from "@repo/db/config";
export const getCartItem =async(req:Request,res:Response)=>{
     const lol=async (req: Request, res: Response) => {
         try {
             const id = req.body.id;
             const cart = await prisma.cart.findFirst({
                 where: {
                     userId: Number(id),
                 },
             });
             return res.status(200).json({
                 success: true,
                 message: "Cart fetched successfully",
                 data: cart,
             });
         } catch (error) {
             if (error instanceof Error) {
                 return res.status(500).json({
                     success: false,
                     message: error.message,
                 });
             } else {
                 return res.status(500).json({
                     success: false,
                     message: "Something went wrong",
                 });
             }
         }
     };
    await lol(req,res);
}

export const createOrder=async(req:Request,res:Response)=>{
    const lol=async (req: Request, res: Response) => {
        try {
            const {
                address,
                email,
                enroll,
                userId,
                item,
                totalPrice,
                quantity,
                orderId,
            } = req.body;
            await prisma.$transaction([
                prisma.orders.create({
                    data: {
                        address,
                        email,
                        enrollment: enroll,
                        userId: Number(userId),
                        items: item,
                        TotalPrice: totalPrice,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        quantity: quantity,
                        status: "Processing",
                    },
                }),
                prisma.cart.delete({
                    where: {
                        id: Number(orderId),
                    },
                }),
            ]);

            return res.status(200).json({
                success: true,
                message: "Order created successfully",
                
            });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({
                    success: false,
                    message: error.message,
                });
            } else {
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong",
                });
            }
        }
    };
    await lol(req,res);
}
