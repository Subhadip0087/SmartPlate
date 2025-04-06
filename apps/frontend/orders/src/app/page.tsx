"use client"

import CartCard from "@/components/CartCard";
import SuggetionCard from "@/components/SuggetionCard";
import {Loading} from"@repo/ui/Loading"
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
export default function Home() {
  const { user,setUser,clearUser } = useAuthStore();
  const [loading,setLoading]=useState(true)
    const [cartDetails,setCartDetails]=useState();

  function getCookieValue(name: string) {
      const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
      return match ? match[2] : null;
  }
  function deleteCookie(name: string) {
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
  useEffect(()=>{
    clearUser();
    const cookie = getCookieValue("authData");
    let parsed;
    if (cookie) {
       try {
          parsed = JSON.parse(atob(cookie));
           setUser(parsed);
           
           if(!parsed){
            setLoading(true); 
            window.location.href = "http://localhost:3001/signin";
           }
           else setLoading(false);
       } catch (err) {
           console.error("Failed to parse authData cookie:", err);
           window.location.href = "http://localhost:3001/signin";
       }
    }
    // if(!user) window.location.href="http://localhost:3001/signin"
   
     const handleBeforeUnload = () => {
       deleteCookie("authData");
        clearUser(); // 💥 Clear Zustand user store
        window.location.href = "http://localhost:3001/signin";
     };

     window.addEventListener("beforeunload", handleBeforeUnload);
    if(parsed==null) window.addEventListener("visibilitychange", handleBeforeUnload);
   
     return () => {
         window.removeEventListener("beforeunload", handleBeforeUnload);
     };
  },[])
  useEffect(()=>{
     if(user)axios
         .post(
             "http://localhost:8000/api/getCartItem",
             {
                 id: String(user.id),
             },
             { withCredentials: true }
             
         )
         .then((res) => {
             console.log(typeof(res.data.data));
             setCartDetails(res.data.data);
         }).catch((value) => {
            console.log(value)
         })
  },[user])
  return loading ? (
      <div>
          {" "}
          <Loading />{" "}
      </div>
  ) : (
      <div>
          <div
              className="cursor-pointer flex justify-center items-center mt-3 ml-3 rounded-3xl bg-gray-600 w-32 h-12"
              onClick={() => {
                  window.location.href = "http://localhost:3000/items";
              }}
          >
              Back to items
          </div>
          <div className="px-3">
              <div className="my-6">
                  <h1 className="text-center text-4xl font-bold">
                      Weclome To Carts
                  </h1>
              </div>
              <div className="grid grid-cols-1 md:flex mt-28 md:justify-evenly md:items-center">
                  <CartCard></CartCard>
                  <SuggetionCard />
              </div>
          </div>
      </div>
  );
}
