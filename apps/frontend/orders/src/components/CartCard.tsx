"use client";
import { useAuthStore } from "@/store/auth";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";

function CartCard() {
    const { user } = useAuthStore();
    const [TPrice,setTPrice]=useState(0);
    const [cartDetails, setCartDetails] = useState();
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();
    const [enroll,setEnroll]=useState();
    

    const submitHandeler=async()=>{
        axios.post("http://localhost:8000/api/createOrder", {
            address,
            email,
            enroll,
            userId: String(user?.id),
            item: cartDetails,
            totalPrice:TPrice,
            quantity:Number(cartDetails.items.length),
            orderId:String(cartDetails.id)
        });
    };
    useEffect(() => {
        if (cartDetails && cartDetails.items) {
            const total = cartDetails.items.reduce((acc: number, item: any) => {
                return acc + Number(item.price) * item.quantity;
            }, 0);
            setTPrice(total);
        }
    }, [cartDetails]);
    useEffect(() => {
        if (user)
            axios
                .post(
                    "http://localhost:8000/api/getCartItem",
                    {
                        id: String(user.id),
                    },
                    { withCredentials: true }
                )
                .then((res) => {
                    console.log(typeof res.data.data);
                    setCartDetails(res.data.data);
                })
                .catch((value) => {
                    console.log(value);
                });
    }, [user]);
    return (
        <div className="md:w-1/2 mb-5 h-96 max-h-96 mr-2 overflow-hidden overflow-y-scroll bg-neutral-600">
            <div className="flex flex-col px-2  border-2">
                {cartDetails &&
                    cartDetails.items.map((item: any) => (
                        <div
                            className="flex border-y-2 items-center justify-between"
                            key={item.id}
                        >
                            <div>
                                <Image
                                    src={`${item.image}`}
                                    alt="image"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div> {item.name} </div>
                            <div>{item.quantity}</div>
                            <div>{Number(item.price) * item.quantity}</div>
                        </div>
                    ))}
            </div>

            <div className="flex flex-col text-black w-1/2 mt-5 mx-auto">
                <label htmlFor="address">Enter Address</label>
                <input
                    type="text"
                    className="px-3"
                    name="address"
                    required
                    id="address"
                    onChange={(e) => setAddress(e.target.value)}
                />
                <label htmlFor="address">Enter Email</label>
                <input
                    type="text"
                    className="px-3"
                    name="email"
                    required
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="address">Enter Enrollment</label>
                <input
                    type="text"
                    className="px-3"
                    name="enrollment"
                    required
                    id="enrollment"
                    onChange={(e) => setEnroll(e.target.value)}
                />
            </div>
            <div className="flex mt-10 items-center justify-evenly">
                <p className="text-lg">Total price ₹{TPrice}</p>
                <button
                    className="bg-orange-600 px-3 py-2 rounded-lg text-lg font-bold"
                    onClick={submitHandeler}
                >
                    Place Order
                </button>
            </div>
        </div>
    );
}

export default CartCard;
