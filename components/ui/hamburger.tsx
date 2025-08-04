"use client";

import React, { useState } from "react";
import burgerOpenNav from "@/public/tool/burger-open-nav.svg";
import Image from "next/image";

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        aria-label="Toggle Menu"
        className="cursor-pointer"
      >
        <Image
          src={burgerOpenNav}
          alt="Menu"
          width={100}
          height={75}
          className={`transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        />
      </button>
    </div>
  );
};

export default Hamburger;
