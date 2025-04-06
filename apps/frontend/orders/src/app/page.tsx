"use client"

import CartCard from "@/components/CartCard";
import SuggetionCard from "@/components/SuggetionCard";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  useEffect(()=>{
    axios.get("http://localhost:8000").then(()=>{
      
    })
  })
  return (
      <div>
        <div>Back</div>
          <div>
              <div>
                  <h1>Weclome Carts</h1>
              </div>
              <div>
                <CartCard />
                <SuggetionCard/>
              </div>
          </div>
      </div>
  );
}
