import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const SwipperCompo = ({ List }) => {
  return (
    <section>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        effect="slide"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        className="w-[100%] "
      >
        {List?.length > 0 ? (
          List.map((img, index) => (
            <SwiperSlide key={index} className="relative pb-6">
              <img
                src={img.image}
                alt={`Banner ${index + 1}`}
                className="h-[100%] rounded object-fill transition-opacity object- duration-1000 ease-in-out lg:pb-3 md:pb-2 sm:pb-2 pb-3"
              />
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center text-gray-400">No images available</p>
        )}
      </Swiper>
    </section>
  );
};

export default SwipperCompo;
