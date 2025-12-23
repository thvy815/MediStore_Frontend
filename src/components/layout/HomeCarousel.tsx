import { useEffect, useState } from "react";

const IMAGES = [
  "https://cdn.nhathuoclongchau.com.vn/unsafe/1920x0/filters:quality(90)/Top_Banner1440x414_258fae5fa4.jpg",
  "https://cdn.nhathuoclongchau.com.vn/unsafe/2560x0/filters:quality(90)/Banner_full_width_Desktop_1620x372_2b125a1e2e.png",
  "https://cdn.nhathuoclongchau.com.vn/unsafe/2560x0/filters:quality(90)/D_Herobanner_1620x372_6_ae8d634d4a.png",
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[360px] overflow-hidden rounded-2xl">
      {IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt="banner"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* DOTS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {IMAGES.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-green-600" : "bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
