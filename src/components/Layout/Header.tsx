import React from "react";
import { motion } from "framer-motion";
import SearchBar from "../UI/SearchBar";
import { Doctor } from "../../types/doctor";

interface HeaderProps {
  doctors: Doctor[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  doctors,
  searchTerm,
  onSearchChange,
}) => {
  const floatingTags = [
    { text: "Video Consult", x: "10%", y: "20%", delay: 0 },
    { text: "Dentist", x: "85%", y: "15%", delay: 0.2 },
    { text: "Cardiologist", x: "75%", y: "60%", delay: 0.4 },
    { text: "In-Clinic", x: "15%", y: "70%", delay: 0.6 },
  ];

  return (
    <header className="hero-gradient min-h-[80vh] relative flex items-center">
      {/* Floating Tags */}
      {floatingTags.map((tag, index) => (
        <motion.div
          key={index}
          className="absolute hidden lg:block"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: tag.delay, duration: 0.5 }}
          style={{ left: tag.x, top: tag.y }}
        >
          <div className="floating-tags bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <span className="text-primary-500 font-medium">{tag.text}</span>
          </div>
        </motion.div>
      ))}

      <motion.div
        className="max-w-7xl mx-auto px-4 py-16 sm:py-24 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center justify-between max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block mb-6 px-4 py-2 rounded-full bg-primary-100 text-primary-500 font-medium"
            >
              Find Your Perfect Doctor
            </motion.div>

            <h1 className="text-5xl sm:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Your Health, Our{" "}
              <span className="text-primary-500">Priority</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              Connect with top healthcare professionals instantly. Book
              appointments, get consultations, and take control of your health
              journey.
            </p>
          </motion.div>

          <motion.div
            className="w-full max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SearchBar
              doctors={doctors}
              value={searchTerm}
              onChange={onSearchChange}
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-8 sm:gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { title: "10,000+", subtitle: "Happy Patients" },
              { title: "100+", subtitle: "Expert Doctors" },
              { title: "10+", subtitle: "Specializations" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex flex-col items-center"
              >
                <span className="text-3xl sm:text-4xl font-bold text-primary-500 mb-2">
                  {stat.title}
                </span>
                <span className="text-gray-600 text-sm sm:text-base">
                  {stat.subtitle}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
