"use client";
import React, { useState, useEffect } from "react";

const images = [
  "https://c8hsctiqb3.ufs.sh/f/RXFntDrDYyBvRcOsRVCrDYyBvfAxM6m7Ees0L4XWZkSJQVnu",
  "https://c8hsctiqb3.ufs.sh/f/RXFntDrDYyBvgW5i0FqdxUnhIwOfAsiXMqNSyoT45aVYRzrt",
  "https://c8hsctiqb3.ufs.sh/f/RXFntDrDYyBvcKjGegb9rLxtsAlMzCjdbw0Xv2YuPZyDm1GR",
  "https://c8hsctiqb3.ufs.sh/f/RXFntDrDYyBvea70W8K5Zdtmfh168qlJPUv2wQj3WTFpiaL4",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden">
      <div className="overflow-hidden rounded-lg w-full">
        <div
          className="flex transition-transform duration-300 ease-in-out w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
