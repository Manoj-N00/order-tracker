"use client";

import { useMenuStore } from "@/store/toggleMenuStore";
import { motion } from "framer-motion";
import MenuLinks from "./menu-links";


export default function Sidebar() {
  const { isOpen } = useMenuStore();
  return (
    <motion.div
      initial={{ width: isOpen ? 80 : 250 }}
      animate={{ width: isOpen ? 80 : 250 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`sticky z-10 top-0 flex flex-col h-[100vh] items-center overflow-hidden py-10 border-r max-w-[80px] md:max-w-[200px] ${
        isOpen
          ? "max-md:hidden gap-6"
          : "block gap-12"
      }`}
    >
      <MenuLinks isOpen={isOpen} />
    </motion.div>
  );
}
