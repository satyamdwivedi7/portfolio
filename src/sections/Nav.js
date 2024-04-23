"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  const [activeBtn, setActiveBtn] = useState("home");
  
  useEffect(() => {
    function handleScroll() {
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom > 0) {
          setActiveBtn(section.id);
        }
      });
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <nav className=" w-[100%] flex justify-between bg-theme py-10 px-32 z-20 fixed">
      <div className="flex justify-center items-center">
        <Image priority src="/logo.png" width={60} height={75} alt=""/>
        {/* <h1 className="text-2xl font-sans">Satyam</h1> */}
      </div>
      <div className="flex gap-3">
        <Link
          href="/#home"
          className={activeBtn === "home" ? "text-white" : "text-secondary"}

        >
          <span>#</span>home
        </Link>
        <Link
          href="/#my-works"
          className={activeBtn === "my-works" ? "text-white" : "text-secondary"}
        >
          <span>#</span>my-works
        </Link>
        <Link
          href="/#skills"
          className={activeBtn === "skills" ? "text-white" : "text-secondary"}
        >
          <span>#</span>skills
        </Link>
        <Link
          href="/#about-me"
          className={activeBtn === "about-me" ? "text-white" : "text-secondary"}
        >
          <span>#</span>about-me
        </Link>
        <Link
          href="/#contacts"
          className={activeBtn === "contacts" ? "text-white" : "text-secondary"}
        >
          <span>#</span>contacts
        </Link>
      </div>
    </nav>
  );
}
