"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";


export default function CategorySelector() {
  const [itemsPerPage, setItemsPerPage] = useState(5); // ค่าเริ่มต้นไม่เป็น 0
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
    slidesToScroll: itemsPerPage,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // ดึงข้อมูล items_slide
  const [items_slide, setItemsSlide] = useState<any>([]);

  useEffect(() => {
    
    const getItem = async () => {
      const res = await fetch("/api/category-selector");
      const data = await res.json();
      if (res.ok) {
        setItemsSlide(data);
        
      }
    };
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setItemsPerPage(6);
      else if (width >= 768) setItemsPerPage(4);
      else setItemsPerPage(3);
    };
    getItem();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!emblaApi || items_slide.length === 0) return;
    emblaApi.on("select", onSelect);
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi, items_slide, onSelect]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [itemsPerPage, items_slide, emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  return (
    <>
      <div className="md:text-2xl sm:text-lg text-md font-semibold md:p-[15px_80px_30px_0] p-[5px_20px_15px_5px]">
        หมวดหมู่อุปกรณ์
      </div>
      <div key={itemsPerPage} className="overflow-hidden" ref={emblaRef}>
        <div className="flex md:gap-5 gap-3">
          {items_slide && items_slide?.map((item: any, index: any) => (
            <div
              key={index}
              className={`flex-shrink-0 ${
                itemsPerPage === 6
                  ? "basis-1/8"
                  :itemsPerPage === 4
                  ? "basis-1/5"
                  : "basis-1/3"
              } sm:h-auto h-[160px]`}
            >
              <Link
                href={`/category/${item.id}`}
                className={`
                            group flex flex-col items-center justify-start
                            rounded-xl border border-gray-200 bg-white
                            transition-all duration-200 hover:bg-gray-100 focus:bg-gray-100
                            h-full p-2
                          `}
              >
                <div className="flex justify-center gap-2 items-center w-full mb-2">
                  <Image
                    src={item.image || "/images/no-picture.png"}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="object-contain rounded-full bg-gray-100"
                  />
                </div>
                <div
                  className="text-center sm:text-base text-sm text-gray-700 font-semibold line-clamp-2"
                  title={item.name}
                >
                  {item.name}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Dot Navigation */}
      <div className="flex justify-center mt-4 gap-2">
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
      </div>
    </>
  );
}
