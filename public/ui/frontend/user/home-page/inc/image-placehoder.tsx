"use client";
import { CoreConfigs } from "@/Interfaces/core-configs";
import { useSession } from "next-auth/react";
import ButtonCarouselRole from "./button-carousel-role";
export default function ImagePlaceHoder({ data }: { data: CoreConfigs }) {
  const { data: session, status } = useSession();
  return (
    <div className="flex justify-center md:mt-7 my-3 mx-1">
      <div className="relative container mx-auto aspect-[1280/500]">
        {data.cover && (
          <img
            src={data.cover}
            alt="image_background"
            // width={1500}
            // height={780}
            className="rounded-[30px] w-full h-full object-cover sm:shadow-[0px_4px_10px_0px_#0000000D] shadow-[0px_4px_10px_0px_#DFDFDF]"
          />
        )}

        <div className="absolute top-[20%] left-[5%] flex gap-[10px] w-[35%] flex-col">
          <div className="text-[#376db6] font-black [font-size:clamp(0.7rem,3vw,5rem)]">
            {data.title}
          </div>
          <div className="text-[#1f222b] font-black [font-size:clamp(0.5rem,1.5vw,3rem)]">
            {data.description}
          </div>
        </div>
        <ButtonCarouselRole role={session?.user.role} />
      </div>
    </div>
  );
}
