import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import RadioGroup from '../UI/RadioGroup';
import SortSelector from '../UI/SortSelector';
import { Doctor, ConsultationMode, SortOption } from '../../types/doctor';

interface FilterPanelProps {
  doctors: Doctor[];
  consultationMode: ConsultationMode | null;
  specialties: string[];
  sort: SortOption | null;
  onConsultationModeChange: (value: ConsultationMode | null) => void;
  onSpecialtiesChange: (values: string[]) => void;
  onSortChange: (value: SortOption | null) => void;
  onClearFilters: () => void;
  isMobileView?: boolean;
  onClose?: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  doctors,
  consultationMode,
  specialties,
  sort,
  onConsultationModeChange,
  onSpecialtiesChange,
  onSortChange,
  onClearFilters,
  isMobileView,
  onClose
}) => {
  const uniqueSpecialties = useMemo(() => {
    const specialtiesSet = new Set<string>();
    doctors?.forEach(doctor => {
      doctor.specialities?.forEach(specialty => {
        if (specialty?.name) {
          specialtiesSet.add(specialty.name);
        }
      });
    });
    return Array.from(specialtiesSet).sort();
  }, [doctors]);

  const specialtyOptions = uniqueSpecialties.map(specialty => ({
    id: specialty,
    label: specialty,
    value: specialty,
    testId: `specialty-${specialty.toLowerCase().replace(/\s+/g, '-')}`
  }));

  const consultationModeOptions = [
    { id: 'video', label: 'Video Consult', value: 'video', testId: 'consultation-video' },
    { id: 'in_clinic', label: 'In Clinic', value: 'in_clinic', testId: 'consultation-clinic' }
  ];

  const sortOptions = [
    { id: 'fees', label: 'Fees (Low to High)', value: 'fees', testId: 'sort-fees' },
    { id: 'experience', label: 'Experience (High to Low)', value: 'experience', testId: 'sort-experience' }
  ];

  const containerClass = isMobileView 
    ? "h-full bg-white overflow-hidden flex flex-col rounded-t-xl"
    : "bg-white rounded-xl shadow-sm border border-primary-100 p-6";

  return (
    <div className={containerClass}>
      {isMobileView && (
        <div className="flex-shrink-0 border-b p-4 flex justify-between items-center bg-white">
          <h2 className="text-xl font-semibold">Filters</h2>
          <button onClick={onClose} className="p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className={`${isMobileView ? "flex-1 overflow-y-auto p-4" : ""}`}>
        <div className="flex justify-between items-center mb-6">
          {!isMobileView && <h2 className="text-xl font-semibold text-gray-900">Filters</h2>}
          {(consultationMode || specialties.length > 0 || sort) && (
            <button
              onClick={onClearFilters}
              className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="space-y-6">
          <RadioGroup
            label="Specialties"
            options={specialtyOptions}
            value={specialties[0] || null}
            onChange={(value) => onSpecialtiesChange(value ? [value] : [])}
          />

          <RadioGroup
            label="Consultation Mode"
            options={consultationModeOptions}
            value={consultationMode}
            onChange={(value) => onConsultationModeChange(value as ConsultationMode)}
          />

          <SortSelector
            label="Sort By"
            options={sortOptions}
            value={sort}
            onChange={(value) => onSortChange(value as SortOption)}
          />
        </div>
      </div>

      {isMobileView && (
        <div className="flex-shrink-0 p-4 bg-white border-t">
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary-500 text-white rounded-xl font-semibold"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;