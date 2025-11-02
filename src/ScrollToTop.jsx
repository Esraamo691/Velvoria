import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IoIosArrowUp } from "react-icons/io";
export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const hideTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setIsScrolling(true);

      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

      hideTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        setIsVisible(false);
      }, 3000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: isScrolling ? [0, -8, 0] : 0,
          }}
          exit={{ opacity: 0, y: 50 }}
          transition={{
            duration: isScrolling ? 1 : 0.5,
            repeat: isScrolling ? Infinity : 0,
          }}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            backgroundColor: "#433f32",
            color: "white",
            border: "none",
            fontSize: "19px",
            fontWeight: "bold",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            cursor: "pointer",
            boxShadow: "1px 1px 20px #beb89a",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IoIosArrowUp />
        </motion.button>
      )}
    </>
  );
}
