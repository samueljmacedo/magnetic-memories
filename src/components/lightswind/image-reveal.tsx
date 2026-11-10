"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type {TravelMagnet} from "@/components/MagnetPanel/MagnetPanel.tsx";

type ImageRevealProps = {
  item: TravelMagnet;
}

const ImageReveal: React.FC<ImageRevealProps> = ({item}) => {
  const [focusedItem, setFocusedItem] = useState<TravelMagnet | null>(item);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 300, damping: 40 });
  const smoothY = useSpring(cursorY, { stiffness: 300, damping: 40 });

  useEffect(() => {
    const updateScreen = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };
    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  const onMouseTrack = (e: React.MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  const onHoverActivate = (item: TravelMagnet) => {
    setFocusedItem(item);
  };

  const onHoverDeactivate = () => {
    setFocusedItem(null);
  };

  return (
    <div
      className="relative mx-auto w-full min-h-fit bg-background rounded-md border overflow-hidden"
      onMouseMove={onMouseTrack}
      onMouseLeave={onHoverDeactivate}
    >
      {item ? <div
          key={item.id}
          className="p-4 cursor-pointer relative sm:flex items-center justify-between"
          onMouseEnter={() => onHoverActivate(item)}
        >
          {!isLargeScreen && (
            <img
              src={item.image}
              className="sm:w-32 sm:h-20 w-full h-52 object-cover rounded-md"
              alt={item.destination}
            />
          )}
          {/*<h2
            className={`newFont uppercase md:text-5xl sm:text-2xl text-xl font-semibold sm:py-6 py-2 leading-[100%] relative transition-colors ${
              focusedItem?.id === item.id
                ? "mix-blend-difference z-20 text-gray-300"
                : "text-foreground"
            }`}
          >
            {item.destination}
          </h2>
          <button
            className={`sm:block hidden p-4 rounded-full transition-all duration-300 ease-out ${
              focusedItem?.id === item.id
                ? "mix-blend-difference z-20 bg-white text-black"
                : ""
            }`}
          >
            <ArrowIcon className="w-8 h-8" />
          </button>*/}
          <img
              src={item.image}
              alt={`${item.destination} souvenir magnet`}
              loading="lazy" />
          <div
            className={`h-[2px] dark:bg-white bg-black absolute bottom-0 left-0 transition-all duration-300 ease-linear ${
              focusedItem?.id === item.id ? "w-full" : "w-0"
            }`}
          />
        </div>
      : <div></div>}
      {isLargeScreen && focusedItem && (
        <motion.img
          src={focusedItem.image}
          alt={focusedItem.destination}
          className="fixed z-30 object-cover w-[300px] h-[400px] rounded-lg pointer-events-none shadow-2xl dark:bg-gray-950 bg-white"
          style={{
            left: smoothX,
            top: smoothY,
            x: "-50%",
            y: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </div>
  );
};

export default ImageReveal;
