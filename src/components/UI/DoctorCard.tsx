import React from "react";
import { motion } from "framer-motion";
import { Doctor } from "../../types/doctor";

interface DoctorCardProps {
  doctor: Doctor;
  onClick: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="bg-white border-2 border-transparent hover:border-purple-200 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
    >
      <div className="relative aspect-square">
        <img
          src={doctor.photo}
          alt={` ${doctor.name}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/400?text=Doctor";
          }}
        />
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2"></div>

        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {doctor.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3">
          {doctor.specialities[0]?.name}
        </p>

        <div className="flex items-center text-sm text-gray-500">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {doctor.experience}
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
