"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import ImagePlaceHoder from "./inc/image-placehoder";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import TableCarousel from "./inc/table-carousel";

export default function BannerCarousel() {
  // ดึงข้อมูล items_slide
  const [items_slide, setItemsSlide] = useState<any>();

  useEffect(() => {
    const getItem = async () => {
      const res = await fetch("/api/banner");

      const data = await res.json();
      if (res.ok) {
        setItemsSlide(data);
      }
    };
    getItem();
  }, []);

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        cssMode={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          type: "bullets",
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {items_slide?.banner_data &&
          items_slide?.banner_data?.map((banner: any) => (
            <SwiperSlide>
              <ImagePlaceHoder data={banner} />
            </SwiperSlide>
          ))}

        {items_slide?.another_banner_data &&
          items_slide?.another_banner_data?.map((banner: any) => (
            <SwiperSlide>
              <TableCarousel data={banner} />
            </SwiperSlide>
          ))}
      </Swiper>
      {/* <div className="flex justify-center mt-4 gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              index === selectedIndex
                ? "bg-gray-400 hover:bg-gray-400 scale-110"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div> */}
    </>
  );
}
