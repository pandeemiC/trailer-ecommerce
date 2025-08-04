import Image from "next/image";
import perfumeModel1 from "@/public/perfume-model-1.jpg";
import perfume1 from "@/public/perfume-1.jpg";

export default function Home() {
  return (
    <main className="h-screen w-screen flex justify-center">
      {/* ImageContainer */}
      <div className="flex justify-center items-center gap-1">
        <Image
          src={perfumeModel1}
          alt="PerfumeModel"
          width={420}
          height={620}
          className="grayscale shadow-2xl"
        />
        <Image
          src={perfume1}
          alt="Perfume"
          width={420}
          height={620}
          className="grayscale shadow-2xl"
        />
      </div>
    </main>
  );
}
