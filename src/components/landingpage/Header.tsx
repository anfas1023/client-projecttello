"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`sticky top-0 z-10 ${isScrolled ? 'bg-indigo-900 opacity-75' : 'bg-indigo-900'} backdrop-blur-sm`}>
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 py-4 max-w-full">
        <h3 className="text-lg text-white font-semibold mb-4 leading-relaxed lg:mb-0 lg:mr-4">Project Trello</h3>
        <div className="flex flex-wrap gap-4 text-white rounded-xl border-2 p-2 border-white">
          <p className="cursor-pointer hover:text-gray-300 transition">Home</p>
          <p className="cursor-pointer hover:text-gray-300 transition">About</p>
          <p className="cursor-pointer hover:text-gray-300 transition">Pricing</p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Link href="/login">
            <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold py-2 px-4 rounded-lg">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
