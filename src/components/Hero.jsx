import { useState, useEffect } from "react";
import { assets } from "../assets/images/assets";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [assets.promo1, assets.promo2, assets.promo3];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      {/* Container untuk carousel */}
      <div className="overflow-hidden rounded w-full h-fit">
        {/* Wrapper untuk slide */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {images.map((img, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Tombol navigasi */}
      <div className="flex justify-center mt-4 items-center gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? "bg-slate-600 w-4" : "bg-gray-300"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
