import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Screen = ({ list, interval = 2 }) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Carousel
        plugins={[
          Autoplay({
            delay: interval * 1000,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {list.map((media, index) => (
            <CarouselItem key={index}>
              {media.data.mediaType === "image" ? (
                <img
                  className="h-screen w-auto"
                  src={media.data.mediaSrc}
                  alt=""
                />
              ) : media.data.mediaType === "video" ? (
                <video
                  className="h-screen w-auto"
                  src={media.data.mediaSrc}
                  autoPlay
                  muted
                  playsInline
                  loop
                />
              ) : null}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Screen;
