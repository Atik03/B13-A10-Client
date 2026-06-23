"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

export default function HeroSlide({ slide }) {
  return (
    <div
      className="hero min-h-[85vh]"
      style={{
        backgroundImage: `url(${slide.image.src})`,
      }}
    >
      {/* Overlay */}
      <div className="hero-overlay bg-black/60"></div>

      <div className="hero-content text-center text-neutral-content">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <h1 className="mb-6 text-4xl md:text-6xl font-bold">{slide.title}</h1>

          <p className="mb-8 text-sm md:text-lg opacity-90">
            {slide.description}
          </p>

          <Link href="/browse-books" className="btn btn-primary rounded-full">
            Browse Books
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
