"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

const logos = [
  { name: "Google", src: "/logos/google.png" },
  { name: "Apple", src: "/logos/apple.png" },
  { name: "Microsoft", src: "/logos/microsoft.png" },
  { name: "Amazon", src: "/logos/amazon.png" },
  { name: "Netflix", src: "/logos/netflix.png" },
  { name: "Spotify", src: "/logos/spotify.png" },
  { name: "Meta", src: "/logos/meta.png" },
  { name: "Airbnb", src: "/logos/airbnb.png" },
  { name: "Tesla", src: "/logos/tesla.png" },
  { name: "Uber", src: "/logos/uber.png" },
  { name: "Nvidia", src: "/logos/nvidia.png" },
  { name: "Adobe", src: "/logos/adobe.png" }
];

const TrustedBy = () => {
  return (
    <section className="relative w-full py-16 border-y border-zinc-900/60 bg-zinc-950/10 backdrop-blur-sm overflow-hidden">
      {/* Injecting linear styling for Swiper marquee */}
      <style>{`
        .swiper-marquee .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>

      {/* Title */}
      <div className="flex items-center justify-center gap-4 mb-10 w-full px-4">
        <div className="h-px flex-1 max-w-25 bg-linear-to-r from-transparent to-zinc-800" />
        <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-zinc-550 uppercase select-none text-center">
          Trusted by industry leaders
        </span>
        <div className="h-px flex-1 max-w-25 bg-linear-to-l from-transparent to-zinc-800" />
      </div>

      {/* Swiper Slider */}
      <div className="w-full max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={4000}
          slidesPerView={3}
          spaceBetween={40}
          allowTouchMove={false}
          className="swiper-marquee"
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          breakpoints={{
            480: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 60,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 70,
            },
          }}
        >
          {logos.map((logo, idx) => (
            <SwiperSlide key={idx} className="flex items-center justify-center">
              <div className="relative w-28 h-10 flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={100}
                  height={32}
                  className="object-contain max-h-8  duration-300 select-none pointer-events-none"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TrustedBy;