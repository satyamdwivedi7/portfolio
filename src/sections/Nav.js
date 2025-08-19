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
    <nav className="w-full lg:h-16 flex flex-col sm:flex-row justify-center sm:justify-between items-center bg-theme py-4 sm:py-10 px-6 sm:px-32 z-20 fixed">
      <div className="flex justify-center items-center mb-4 sm:mb-0">
        <a href="/">
          <Image priority src="/logo.png" width={65} height={60} alt="Logo" />
        </a>
      </div>
      <div className="flex gap-3 flex-wrap justify-center">
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
