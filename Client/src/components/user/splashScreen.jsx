import React from "react";
import { motion } from "framer-motion";
import dns from "../../assets/flogo.png";

const SplashScreen = () => {
  return (
    <motion.div
      className="flex justify-center items-center h-[100vh] bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <motion.img
        src={dns}
        alt="splash"
        className="h-20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default SplashScreen;
