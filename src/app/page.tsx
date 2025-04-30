"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CoursesPage from "./CoursesForm/coursespage";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <div className="">
      <div className="relative md:h-[800px] h-[700px] overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/homepage/hero-image.jpeg"
            alt="Background"
            className="object-cover w-full h-full"
            priority
            width={1000}
            height={1000}
          />
          <div className="absolute inset-0 bg-black/70" />
        </motion.div>

        <div className="relative z-10 flex flex-col h-full items-center justify-center text-center text-white max-content padding-x">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-6 font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
          >
            Master In-Demand Tech Skills & Build Your Future!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="mb-8 text-xl text-gray-200"
          >
            Learn in-demand tech skills with expert-led training, hands-on
            projects, and flexible learning options. Start your journey today.
          </motion.p>
        </div>
      </div>
      <CoursesPage />
      <Footer />
    </div>
  );
}
