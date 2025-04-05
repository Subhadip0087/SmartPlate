"use server";
import { prisma } from "@repo/db/config";
// import { writeFile } from "fs/promises"
import { cloudinary, cloudinaryConfigFun } from "@repo/common/config";
// import path from "path"

export const getItems = async () => {
    try {
        const items = await prisma.items.findMany();

        return items;
    } catch (error) {
        console.log(error);
    }
};

export const deleteMenuItem = async (id: number) => {
    try {
        cloudinaryConfigFun({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
            api_key: process.env.CLOUDINARY_API_KEY!,
            api_secret: process.env.CLOUDINARY_API_SECRET!,
            secure: true,
        });
        const deletedItem = await prisma.items.delete({
            where: {
                id: Number(id),
            },
        });
        await new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(deletedItem.image_id,
                {
                    invalidate: true
                },(error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        })
        return {
            success: true,
            message: "Item deleted successfully",
            deletedItem,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to delete item",
        };
    }
};

// interface MenuItem {
//     id: number; // Prisma uses Int for id, so this should be a number
//     name: string;
//     price: number;
//     stock: number;
//     category: "mainCourse" | "snacks"; // Map Prisma enum to the interface's categories
//     image: string;
//     image_id: string; // Assuming image_id is relevant to the menu item
//     description?: string; // Optional field
//     is_veg: boolean; // Boolean to indicate if the item is vegetarian or not
// }

interface catagoryInterface {
    category: "mainCourse" | "snacks";
}

type cloudinaryUploadResult = {
    public_id: string;
    secure_url: string;
    url: string;
} & Record<string, unknown>;

export const addMenuItem = async (item: FormData) => {
    cloudinaryConfigFun({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        api_key: process.env.CLOUDINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!,
        secure: true,
    });
    const file = item.get("image") as File;
    const name = item.get("name") as string;
    const price = item.get("price") as string;
    const stock = item.get("stock") as string;
    const category = item.get("category") as string;
    const description = item.get("description") as string;
    const is_veg = item.get("is_veg") as string;
    if (!file) {
        return {
            success: false,
            message: "No image uploaded",
        };
    }
    if (file.size > 1024 * 1024 * 10) {
        return {
            success: false,
            message: "Image size exceeds 10MB",
        };
    }
    const fileName = `${Date.now()}-${file.name.replaceAll(/\s+/g, "-")}`;
    let res: cloudinaryUploadResult;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    try {
        res = await new Promise<cloudinaryUploadResult>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    public_id: fileName,
                    folder: "menu",
                },
                (errUpload, resUpload) => {
                    if (errUpload) {
                        reject(errUpload);
                    } else {
                        resolve(resUpload as cloudinaryUploadResult);
                    }
                }
            );
            uploadStream.end(buffer);
        });
        const newItem = await prisma.items.create({
            data: {
                name: name,
                price: Number(price),
                stock: Number(stock),
                category: category as catagoryInterface["category"],
                image: res.url,
                image_id: res.public_id || (Math.random() * 10 + 1).toString(),
                description: description,
                createdAt: new Date(),
                updatedAt: new Date(),
                is_veg: is_veg==='true'?true:false
            },
        });

        return {
            success: true,
            message: "Item added successfully",
            newItem,
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error.message,
            };
        }
        return {
            success: false,
            message: "Failed to add item",
        };
    }
};

export const editMenuItemServer = async (item: FormData) => {
    cloudinaryConfigFun({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        api_key: process.env.CLOUDINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!,
        secure: true,
    });
    const image = item.get("up-image") as File;
    const name = item.get("name") as string;
    const price = item.get("price") as string;
    const stock = item.get("stock") as string;
    const description = item.get("description") as string;
    const id = item.get("id") as string;

    const itemName = await prisma.items.findUnique({
        where: {
            id: Number(id),
        }
    });
    if (image) {
        const fileName = `${Date.now()}-${image.name.replaceAll(/\s+/g, "-")}`;
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        try {
            if(itemName?.image_id) await new Promise((resolve, reject) => {
                cloudinary.uploader.destroy(
                    itemName.image_id,
                    {
                        invalidate: true,
                    },
                    (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    }
                );
            });

            const res = await new Promise<cloudinaryUploadResult>(
                (resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            public_id: fileName,
                            folder: "menu",
                        },
                        (errUpload, resUpload) => {
                            if (errUpload) {
                                reject(errUpload);
                            } else {
                                resolve(resUpload as cloudinaryUploadResult);
                            }
                        }
                    );
                    uploadStream.end(buffer);
                }
            );

            await prisma.items.update({
                where: {
                    id: Number(id),
                },
                data: {
                    image: res.url,
                    image_id: res.public_id,
                },
            });
        } catch (error) {
            if (error instanceof Error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
            return {
                success: false,
                message: "Failed to update item",
            };
        }

        
    }
    try {
        interface updatedFieldInterface {
            name?: string;
            price?: number;
            stock?: number;
            description?: string;
        }
        const updatedFiled: updatedFieldInterface = {};
        if (itemName?.price !== Number(price)) {
            updatedFiled.price = Number(price);
        }
        if (itemName?.stock !== Number(stock)) {
            updatedFiled.stock = Number(stock);
        }
        if (itemName?.name !== name) {
            updatedFiled.name = name;
        }
        if (itemName?.description !== description) {
            updatedFiled.description = description;
        }

        if (Object.keys(updatedFiled).length > 0) {
            await prisma.items.update({
                where: {
                    id: Number(id),
                },
                data: updatedFiled,
            });
        }
        else{
            return{
                success: true,
                message: "No changes made"
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error.message,
            };
        }
        return {
            success: false,
            message: "Failed to update item",
        };
    }

    return {
        success: true,
        message: "Item updated successfully",
    };
};
