import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Doctor } from "../../types/doctor";

interface DoctorModalProps {
  doctor: Doctor;
  onClose: () => void;
}

const DoctorModal: React.FC<DoctorModalProps> = ({ doctor, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      />

      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ type: "spring", damping: 25 }}
        className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto"
      >
        <div className="sticky top-0 bg-white z-10 border-b">
          <div className="flex justify-between items-center p-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold">Doctor Details</h2>
              <span className="bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">
                {doctor.name_initials}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Doctor Info */}
          <div className="flex gap-6">
            <img
              src={doctor.photo}
              alt={` ${doctor.name}`}
              className="w-32 h-32 rounded-2xl object-cover"
            />
            <div>
              <h3 className="text-2xl font-semibold mb-2">Dr. {doctor.name}</h3>
              <p className="text-gray-600 mb-2">
                {doctor.specialities.map((s) => s.name).join(", ")}
              </p>
              <p className="text-gray-600">{doctor.experience}</p>
            </div>
          </div>

          {doctor.doctor_introduction && (
            <div>
              <h4 className="text-lg font-semibold mb-3">About</h4>
              <p className="text-gray-600">{doctor.doctor_introduction}</p>
            </div>
          )}

          {/* Languages */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Languages Spoken</h4>
            <div className="flex flex-wrap gap-2">
              {doctor.languages?.map((language, index) => (
                <span
                  key={index}
                  className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>

          {/* Consultation Options */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Consultation Options</h4>
            <div className="grid grid-cols-2 gap-4">
              {doctor.video_consult && (
                <div className="p-4 bg-primary-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-primary-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-medium">Video Consult</span>
                  </div>
                </div>
              )}
              {doctor.in_clinic && (
                <div className="p-4 bg-primary-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-primary-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span className="font-medium">In-Clinic</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Clinic Info */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold">Clinic Information</h4>
              {doctor.clinic.address.logo_url && (
                <img
                  src={doctor.clinic.address.logo_url}
                  alt={doctor.clinic.name}
                  className="h-8 w-auto object-contain"
                />
              )}
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <h5 className="font-medium text-gray-900 mb-2">
                {doctor.clinic.name}
              </h5>
              <p className="text-gray-600 mb-2">
                {doctor.clinic.address.address_line1}
              </p>
              <p className="text-gray-600">
                {doctor.clinic.address.locality}, {doctor.clinic.address.city}
              </p>
              {doctor.clinic.address.location && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${doctor.clinic.address.location}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-500 mt-3 hover:text-primary-600"
                >
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Get Directions
                </a>
              )}
            </div>
          </div>

          {/* Consultation Fee */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Consultation Fee</h4>
            <p className="text-2xl font-bold text-primary-500">{doctor.fees}</p>
          </div>

          {/* Book Appointment Button */}
          <button className="w-full py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors">
            Book Appointment
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default DoctorModal;
