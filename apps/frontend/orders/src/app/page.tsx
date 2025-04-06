"use client"

import CartCard from "@/components/CartCard";
import SuggetionCard from "@/components/SuggetionCard";
import axios from "axios";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
export default function Home() {
  const { user } = useAuthStore();
  useEffect(()=>{
    axios.get("http://localhost:8000").then(()=>{
      
    })
  })
  return (
      <div>
        <div>Back</div>
          <div>
              <div>
                  <h1>Weclome Carts {`${user}`} </h1>
              </div>
              <div>
                <CartCard />
                <SuggetionCard/>
              </div>
          </div>
      </div>
  );
}
