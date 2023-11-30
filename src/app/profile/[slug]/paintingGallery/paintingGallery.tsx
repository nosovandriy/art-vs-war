"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Navigation, Thumbs, Mousewheel, Pagination } from "swiper/modules";

import "./paintingGallery.scss";
import "@styles/globals.scss";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

type Props = {
  paintings: string[];
  title: string;
  author: string;
};

const PaintingGallery: React.FC<Props> = ({ paintings, title, author }) => {
  const [isOpenFullScreen, setIsOpenFullScreen] = useState(false);
  const [imagesNav, setImagesNav] = useState<SwiperClass | null>(null);

  const handleZoomPainting = () => {
    setIsOpenFullScreen(!isOpenFullScreen);
  };

  return (
    <>
      <div className="slider hideScroll">
        <div className="slider__flex">
          <div
            className={`slider__images ${
              isOpenFullScreen && "fullScreenPainting"
            }`}
          >
            <Swiper
              thumbs={{
                swiper: imagesNav && !imagesNav.destroyed ? imagesNav : null,
                autoScrollOffset: 2,
              }}
              direction="horizontal"
              slidesPerView={1}
              spaceBetween={32}
              mousewheel={true}
              loop={true}
              pagination={{
                clickable: true,
              }}
              className="swiper-container__image"
              modules={[Navigation, Thumbs, Mousewheel, Pagination]}
            >
              {paintings.map((slide: string, index: number) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="slider__image">
                      <Image
                        src={slide}
                        alt={`art ${title} by ${author}`}
                        width={2000}
                        height={1500}
                        priority
                        loading={"eager"}
                        quality={90}
                        style={{
                          objectFit: "contain",
                          cursor: `${
                            isOpenFullScreen ? "zoom-out" : "zoom-in"
                          }`,
                        }}
                        className="imageOpacityEffect"
                        onLoadingComplete={(img) => (img.style.opacity = "1")}
                        onClick={handleZoomPainting}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="slider__col">
            <div className="slider__thumbs">
              <Swiper
                onSwiper={setImagesNav}
                thumbs={{
                  autoScrollOffset: 2,
                }}
                direction="vertical"
                slidesPerView={4}
                loopedSlides={2}
                className="swiper-container__thumbs"
                breakpoints={{
                  0: {
                    direction: "horizontal",
                  },
                  1024: {
                    direction: "vertical",
                  },
                }}
                modules={[Navigation, Thumbs]}
              >
                {paintings.map((slide: string, index: number) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="slider__image">
                        <Image
                          src={slide}
                          alt={`art ${title} by ${author}`}
                          width={96}
                          height={96}
                          priority
                          loading={"eager"}
                          className="imageOpacityEffect"
                          onLoadingComplete={(img) => (img.style.opacity = "1")}
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaintingGallery;
