"use client"
import React, { useEffect, useState } from 'react'
import Sidebar from './buttonComs/navtoggle'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

function Navbar() {
  const router = useRouter();
  const [isLoggedInUser, setIsLoggedInUser]=useState(true);
  const {user}=useAuthStore();
  useEffect(()=>{
    if(!user)setIsLoggedInUser(false);
    else setIsLoggedInUser(true);
  },[user])
  const clickedButton = () => {
    if(isLoggedInUser)router.push("/profile")
    else{
      window.location.href="http://localhost:3001/signin"
    }
  }
  const logoClick = () => {
    router.push("/")
  } 
  const itemClick = () => {
      router.push("/items");
  }; 
  const contactClick=()=>{
    router.push("/contact-us")
  }
  const cartClick=()=>{
    document.cookie = `authData=${btoa(JSON.stringify(user))}; path=/;`;
    window.location.href="http://localhost:3003"
  }
  return (
      <div className="h-16 md:h-24 flex items-center justify-around px-5 md:px-10 bg-[#313131] md:rounded-full md:mx-auto md:mt-10 md:w-11/12">
          <div className="md:hidden">
              <Sidebar />
          </div>
          <div
              onClick={logoClick}
              className="Logo text-4xl font-bold  cursor-pointer"
          >
              Smart Plate
          </div>
          <div className="hidden md:flex">
              <ul className=" text-lg flex justify-evenly w-96">
                  <li
                      className=" hover:text-gray-200 hover:font-semibold cursor-pointer"
                      onClick={itemClick}
                  >
                      Item
                  </li>
                  <li
                      className=" hover:text-gray-200 hover:font-semibold cursor-pointer"
                      onClick={cartClick}
                  >
                      Cart
                  </li>
                  <li className=" hover:text-gray-200 hover:font-semibold cursor-pointer"
                  onClick={()=>router.push("/orders")}
                  >
                      Orders
                  </li>
                  <li
                      onClick={contactClick}
                      className=" hover:text-gray-200 hover:font-semibold cursor-pointer "
                  >
                      Contact Us
                  </li>
              </ul>
          </div>
          <div>
              <button
                  onClick={clickedButton}
                  className={`bg-[#FD930B] text-3xl hover:bg-amber-600 hover:text-gray-300 rounded-full w-28 h-12`}
              >
                  {isLoggedInUser ? (
                      <FontAwesomeIcon icon={faUser} />
                  ) : (
                      "sign in"
                  )}
              </button>
          </div>
      </div>
  );
}

export default Navbar
