import React from "react";

const FloralSVG = ({ className }: { className?: string }) => (
  <svg
    width="160"
    height="180"
    viewBox="0 0 160 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Main stem */}
    <path
      d="M80 180 Q75 150 70 130 Q65 110 70 90 Q75 70 85 50 Q90 35 95 15"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
    />

    {/* Bottom-left leaf */}
    <path
      d="M70 140 Q45 132 30 115 Q50 115 70 133"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
    />
    <path
      d="M70 137 Q52 126 40 118"
      stroke="currentColor"
      strokeWidth="0.6"
      fill="none"
    />

    {/* Bottom-right leaf */}
    <path
      d="M72 125 Q95 112 115 102 Q95 112 73 120"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
    />
    <path
      d="M73 122 Q93 113 107 105"
      stroke="currentColor"
      strokeWidth="0.6"
      fill="none"
    />

    {/* Mid-left leaf */}
    <path
      d="M68 105 Q42 97 25 80 Q45 82 68 100"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
    />
    <path
      d="M67 102 Q48 92 35 84"
      stroke="currentColor"
      strokeWidth="0.6"
      fill="none"
    />

    {/* Mid-right leaf */}
    <path
      d="M72 88 Q100 75 120 65 Q98 75 73 84"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
    />
    <path
      d="M73 86 Q96 76 112 68"
      stroke="currentColor"
      strokeWidth="0.6"
      fill="none"
    />

    {/* Upper-left leaf */}
    <path
      d="M78 70 Q55 62 40 45 Q58 52 78 66"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
    />
    <path
      d="M77 67 Q58 58 48 50"
      stroke="currentColor"
      strokeWidth="0.6"
      fill="none"
    />

    {/* Upper-right leaf */}
    <path
      d="M84 55 Q108 42 128 32 Q106 42 85 51"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
    />
    <path
      d="M85 53 Q105 43 120 36"
      stroke="currentColor"
      strokeWidth="0.6"
      fill="none"
    />

    {/* Top small leaves */}
    <path
      d="M90 35 Q72 28 62 15 Q78 22 90 32"
      stroke="currentColor"
      strokeWidth="0.9"
      fill="none"
    />
    <path
      d="M93 25 Q110 15 125 8 Q108 18 94 22"
      stroke="currentColor"
      strokeWidth="0.9"
      fill="none"
    />
  </svg>
);

const Floral = () => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none text-black/[0.08]">
      {/* Bottom-left: pushed right so stem is hidden, only leaves peek in */}
      <FloralSVG className="absolute bottom-0 left-0 translate-x-[-60px] translate-y-[20px]" />

      {/* Bottom-right: mirrored */}
      <FloralSVG className="absolute bottom-0 right-0 -scale-x-100 translate-x-[60px] translate-y-[20px]" />

      {/* Top-left: flipped downward */}
      <FloralSVG className="absolute top-0 left-0 rotate-180 -scale-x-100 translate-x-[-60px] translate-y-[-20px]" />

      {/* Top-right: flipped + mirrored */}
      <FloralSVG className="absolute top-0 right-0 rotate-180 translate-x-[60px] translate-y-[-20px]" />
    </div>
  );
};

export default Floral;
