import React from "react";
import Image from "next/image";
import testFloral from "@/public/tool/testfloral.png";

const Floral = () => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <Image
        src={testFloral}
        width={120}
        height={120}
        alt="floral pattern"
        className="absolute bottom-0 left-[-24px]"
      />

      <Image
        src={testFloral}
        width={120}
        height={120}
        alt="floral pattern"
        className="absolute right-0 rotate-180 translate-x-1/4"
      />
    </div>
  );
};

export default Floral;
