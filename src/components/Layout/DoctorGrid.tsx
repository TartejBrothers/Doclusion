import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DoctorCard from '../UI/DoctorCard';
import DoctorModal from '../UI/DoctorModal';
import { Doctor } from '../../types/doctor';

interface DoctorGridProps {
  doctors: Doctor[];
}

const DoctorGrid: React.FC<DoctorGridProps> = ({ doctors }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {doctors.map((doctor) => (
          <DoctorCard 
            key={doctor.id} 
            doctor={doctor} 
            onClick={() => setSelectedDoctor(doctor)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedDoctor && (
          <DoctorModal
            doctor={selectedDoctor}
            onClose={() => setSelectedDoctor(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default DoctorGrid;