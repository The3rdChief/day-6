import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import images from "./Images";
import gsap from "gsap";

function App() {
  const logoRef = useRef(null);
  const logoPopRef = useRef(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(logoRef.current, {
      scale: 0.25,
      duration: 1,
      delay: 1.85,
    })
      .to(logoRef.current, { width: "50vw", borderRadius: "50%" })
      .to(
        logoRef.current,
        {
          position: "relative",
          height: "2rem",
          width: "2rem",
          duration: 1,
        },
        "-=0.5"
      )
      .to(logoRef.current, {
        scale: 1,
        duration: 0.5,
        onComplete: () => setIsAnimationComplete(true),
      })
      .to(logoPopRef.current, {
        top: -10,
        right: -10,
        duration: 0.3,
      });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <section className="bg-black/95 min-h-dvh w-full pt-10 pb-3 space-y-8">
        <header className="relative flex items-center justify-between gap-8 w-11/12 mx-auto max-w-7xl">
          {/* logo */}
          <div
            ref={logoRef}
            className="fixed top-0 left-0 w-full bottom-0 bg-white z-10 flex items-center justify-center text-7xl"
          >
            <div
              ref={logoPopRef}
              className="bg-white size-2.5 rounded-full absolute top-1 right-2"
            />
            <motion.p
              initial={{ scale: 1 }}
              animate={{ scale: 0, transition: { delay: 1.5, duration: 0.5 } }}
              className="text-black overflow-y-hidden h-24"
            >
              <motion.span
                initial={{ y: "150%" }}
                animate={{
                  y: ["150%", "0%", "0%", "0%", "0%", "-150%"],
                  transition: { duration: 1.5, ease: "easeInOut" },
                }}
                className="inline-block"
              >
                Day 6
              </motion.span>
            </motion.p>
          </div>

          {/* nav btn */}
          {isAnimationComplete && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-3 flex flex-col justify-between"
            >
              <div className="w-full h-0.5 bg-[#D9D9D9]" />
              <div className="w-full h-0.5 bg-[#D9D9D9]" />
            </motion.button>
          )}
        </header>

        {/* main */}
        {isAnimationComplete && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="w-full flex flex-col gap-10 pt-20"
          >
            {" "}
            <section className="w-11/12 mx-auto max-w-6xl space-y-14 text-center sm:text-left">
              <motion.p className="text-white font-medium text-4xl md:text-5xl uppercase md:max-w-[28ch]">
                {Array.from(
                  "OUR PHOTOGRAPHY MASTER CLASS GETS YOU INSPIRED & PREPARED FOR THE INDUSTRY"
                ).map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0.3 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.025 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.p>

              <p className="text-white text-lg uppercase font-Inter font-light">
                works by student
              </p>
            </section>
            {/* carousels */}
            <section className="w-full flex flex-col gap-3 overflow-clip">
              <Carousel images={images[0]} direction="right" />
              <Carousel images={images[1]} direction="left" />
            </section>
          </motion.main>
        )}
      </section>
    </>
  );
}

const Carousel = ({ images, direction }) => {
  return (
    <section className="w-full flex items-center gap-3 overflow-hidden pl-3">
      <motion.div
        className="flex gap-3"
        animate={{ x: direction === "right" ? [0, "-50%"] : ["-50%", 0] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* First set of images */}
        {images.map((image, index) => (
          <motion.div key={index} className="shrink-0 w-96 h-60">
            <img
              src={image.url}
              alt={image.id}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        {/* Duplicate set of images for seamless loop */}
        {images.map((image, index) => (
          <motion.div key={`duplicate-${index}`} className="shrink-0 w-96 h-60">
            <img
              src={image.url}
              alt={image.id}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default App;
