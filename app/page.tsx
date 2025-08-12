import Image from "next/image";
import perfumeModel1 from "@/public/perfume-model-1.jpg";
import perfume1 from "@/public/perfume-1.jpg";
import fragrance1 from "@/public/category-img5.jpg";
import maleModel1 from "@/public/male-model1.jpg";
import maleModel2 from "@/public/male-model2.jpg";
import womanDressModel1 from "@/public/woman-dress-model1.jpg";
import womanDressModel2 from "@/public/woman-dress-model2.jpg";
import womanDressModel3 from "@/public/woman-dress-model3.jpg";
import womanModel1 from "@/public/women-model1.jpg";
import womanModel2 from "@/public/women-model2.jpg";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* IMAGE CONTAINER */}
      <section className="flex justify-center items-center gap-2 py-10 mb-75 overflow-auto">
        <Image
          src={perfumeModel1}
          alt="PerfumeModel"
          width={490}
          height={620}
          className="grayscale shadow-md min-2xl:w-[720px] min-2xl:h-[950px] object-cover"
        />
        <Image
          src={perfume1}
          alt="Perfume"
          width={490}
          height={620}
          className="grayscale shadow-md min-2xl:w-[820px] min-2xl:h-[950px] object-cover"
        />
      </section>

      {/* FULL IMAGE CONTAINER */}
      <section className="relative h-300 w-screen mb-75">
        <Image
          src={fragrance1}
          alt="Fragrance"
          fill
          className="object-cover shadow-md"
          priority
        />
      </section>

      <section className="flex justify-center items-center gap-2 mb-75 py-10 overflow-auto">
        <Image
          src={womanDressModel1}
          alt="Woman Dress Model Alt"
          width={520}
          height={620}
          className="shadow-md object-cover"
        />
        <Image
          src={womanDressModel2}
          alt="Woman Dress Model Alt"
          width={520}
          height={620}
          className="shadow-md object-cover"
        />
      </section>

      <section className="relative h-450 w-screen mb-75">
        <Image
          src={womanDressModel3}
          alt="Woman Dress Model Full"
          fill
          className="object-cover shadow-md"
        />
      </section>

      <section className="flex justify-center items-center gap-2 py-10 mb-75 overflow-auto">
        <Image
          src={womanModel2}
          alt="WomanModel2"
          width={620}
          height={620}
          className="shadow-md min-2xl:w-[720px] min-2xl:h-[950px] object-cover"
        />
        <Image
          src={womanModel1}
          alt="WomanModel"
          width={620}
          height={620}
          className="shadow-md min-2xl:w-[820px] min-2xl:h-[950px] object-cover"
        />
      </section>

      <section className="flex justify-center items-center py-10 mb-75 overflow-auto">
        <Image
          src={maleModel1}
          alt="WomanModel2"
          width={720}
          height={620}
          className="shadow-md min-2xl:w-[720px] min-2xl:h-[950px] object-cover"
        />
        <div className="flex flex-col justify-center items-center ml-30 font-light text-sm tracking-widest">
          <h1 className="font-bold text-2xl">The Embroidery Edit</h1>
          <h3 className="mb-10 p-2">Photography by Daniel Archer</h3>
          <p className="p-2">Summer Embroidery Collection of 2025</p>
          <p className="p-2 mb-10">Talents / Me, Myself and I</p>
          <Image
            src={maleModel2}
            alt="WomanModel"
            width={420}
            height={620}
            className="shadow-md min-2xl:w-[820px] min-2xl:h-[950px] object-cover"
          />
        </div>
      </section>
    </main>
  );
}
