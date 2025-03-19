"use client";

import { motion } from "framer-motion";
import LinkButton from "@/components/LinkButton";
import Image from "next/image";
import CoursesPage from "./CoursesForm/coursespage";
import { Footer } from "@/components/footer";

// Sample course data - replace with your actual data or API call

export default function Page() {
  return (
    <div className="">
      <div className="relative md:h-[800px] h-[700px] overflow-hidden">
        {/* Background Image with Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/homepage/hero-image.jpeg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" /> {/* Dark overlay */}
        </motion.div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full items-center justify-center text-center text-white max-content padding-x">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-6 font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
          >
            Transforming Ideas Into Digital Excellence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="mb-8 text-xl text-gray-200"
          >
            Our comprehensive suite of services is designed to elevate your
            online presence to ensure seamless digital experience.
          </motion.p>

          {/* Buttons with Staggered Animation */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.2, delayChildren: 0.5 },
              },
            }}
            className="flex justify-start gap-4"
          >
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            ></motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            ></motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            ></motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              <LinkButton
                href="/contact"
                bgColor="bg-white"
                textColor="text-black"
                size="md"
                className="md:hidden"
              >
                Contact Us
              </LinkButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <CoursesPage />
      <Footer />
    </div>
  );
}
