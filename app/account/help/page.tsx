"use client";

import { useState } from "react";
import { PiCaretDownLight } from "react-icons/pi";
import Link from "next/link";
import { faqData } from "@/lib/navigationData";

export default function AccountHelp() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <h1 className="text-[22px] font-light tracking-[0.2em] uppercase mb-10">
        Help
      </h1>

      <div className="max-w-2xl flex flex-col gap-10">
        {faqData.map((section) => (
          <section key={section.category}>
            <h2 className="text-[13px] tracking-[0.2em] uppercase mb-4">
              {section.category}
            </h2>

            <div className="divide-y divide-gray-200">
              {section.questions.map((item, i) => {
                const key = `${section.category}-${i}`;
                const isOpen = openItems[key];

                return (
                  <div key={key}>
                    <button
                      onClick={() => toggleItem(key)}
                      className="w-full flex items-center justify-between py-4 text-left cursor-pointer group"
                    >
                      <span className="text-[12px] tracking-wider group-hover:text-gray-500 transition-colors">
                        {item.q}
                      </span>
                      <PiCaretDownLight
                        size={14}
                        className={`shrink-0 ml-4 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        isOpen ? "max-h-40 pb-4" : "max-h-0"
                      }`}
                    >
                      <p className="text-[11px] leading-relaxed tracking-wider text-gray-500">
                        {item.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <section className="border-t border-gray-200 pt-10">
          <h2 className="text-[13px] tracking-[0.2em] uppercase mb-4">
            Still need help?
          </h2>
          <p className="text-[12px] tracking-wider text-gray-500 mb-6">
            Our support team is available Monday through Friday, 9am - 6pm EST.
          </p>
          <Link
            href="mailto:support@trailer.com"
            className="inline-block py-3 px-8 text-white bg-black border border-black uppercase text-[11px] tracking-widest font-light hover:bg-black/80 transition-colors"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
}
