"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleUser, faBars, faXmark} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const {user}=useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // Tailwind's md breakpoint
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isDesktop) {
      setIsOpen(true); // Always open on desktop
    } else {
      setIsOpen(false); // Close on mobile initially
    }
  }, [isDesktop]);

  const toggleSidebar = () => {
    if (!isDesktop) {
      setIsOpen(!isOpen);
    }
  };
const itemClick = () => {
    router.push("/items");
}; 
  const profileClick=()=>{
    setIsOpen(!isOpen);
    router.push("/profile");
  }

  return (
      <div className="relative text-black mt-24">
          {/* Toggle button (only visible on mobile) */}
          {!isDesktop && (
              <button
                  onClick={toggleSidebar}
                  className={` relative -top-12 left-4  hover:scale-110 bg-gray-900 text-white p-2 rounded-full h-10 w-10 z-50 ${isOpen ? "bg-gray-900" : "py-0 bg-transparent text-4xl "}`}
              >
                  {isOpen ? (
                      <FontAwesomeIcon icon={faXmark} />
                  ) : (
                      <FontAwesomeIcon icon={faBars} />
                  )}
              </button>
          )}

          {/* Sidebar */}
          <aside
              className={`fixed top-0  flex flex-col pt-24 px-10 justify-between left-0 h-full bg-gray-500 p-4 w-64 transition-transform transform ${
                  isOpen ? "translate-x-0" : "-translate-x-full"
              } ${isDesktop ? "translate-x-0" : ""} z-40`}
          >
              <div>
                  <h2 className="text-2xl font-bold mb-4">Welcome</h2>
                  <ul>
                      <li
                          className="border-b-2 py-4 hover:border-zinc-900 hover:bg-white/30 hover:text-lg pl-2 hover:backdrop-blur-sm hover:font-semibold"
                          onClick={itemClick}
                      >
                          Item
                      </li>
                      <li className="border-b-2 py-4 hover:border-zinc-900 hover:bg-white/30 hover:text-lg hover:backdrop-blur-sm pl-2 hover:font-semibold">
                          Cart
                      </li>
                      <li className="border-b-2 py-4 hover:border-zinc-900 hover:bg-white/30 hover:text-lg hover:backdrop-blur-sm pl-2 hover:font-semibold">
                          Orders
                      </li>
                      <li className="border-b-2 py-4 hover:border-zinc-900 hover:bg-white/30 hover:text-lg hover:backdrop-blur-sm pl-2 hover:font-semibold">
                          Contact Us
                      </li>
                  </ul>
              </div>
              {/* Add your sidebar content here */}
              <div className="bottom-0 float-end">
                  {" "}
                  {user ? (
                      <div
                          className="flex cursor-pointer"
                          onClick={profileClick}
                      >
                          <FontAwesomeIcon
                              className="text-4xl mr-5"
                              icon={faCircleUser}
                          />
                          <span className="mt-2 text-center">{user.name}</span>
                      </div>
                  ) : (
                      <Link href={"http://localhost:3001"}>signin</Link>
                  )}
              </div>
          </aside>

          {/* Overlay (only visible on mobile when sidebar is open) */}
          {!isDesktop && isOpen && (
              <div
                  onClick={toggleSidebar}
                  className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30"
              ></div>
          )}

          {/* Main content area (add your page content here) */}
          <div
              className={`ml-0 transition-margin-left ${isOpen && isDesktop ? "ml-64" : "ml-0"}`}
          >
              {/* Your main content */}
          </div>
      </div>
  );
}
