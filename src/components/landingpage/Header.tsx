"use client"
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Header() {
 const [isScrolled, setIsScrolled] = useState(false);

 useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 return (
    <>
      <div className={`sticky top-0 z-10 ${isScrolled ? 'bg-indigo-900 opacity-75' : 'bg-indigo-900'} backdrop-blur-sm`}>
        <div className="flex items-center justify-between px-6 py-4 max-w-full">
          <h3 className="text-lg text-white font-semibold mb-4 leading-relaxed lg:mb-0 lg:mr-4">Project Trello</h3>
          <div className="flex flex-wrap gap-6 text-white rounded-xl border-2 p-2 border-white">
            <p>Home</p>
            <p>About</p>
            <p>Pricing</p>
          </div>
          <div>
          <Link href='/login'> <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold py-2 px-4 rounded-lg">Get Started</button></Link>
          </div>
        </div>
      </div>
    </>
 );
}

