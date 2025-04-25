import { Doctor, ConsultationMode, SortOption } from '../types/doctor';

interface FilterOptions {
  search: string;
  consultationMode: ConsultationMode | null;
  specialties: string[];
  sort: SortOption | null;
}

export function filterDoctors(doctors: Doctor[], options: FilterOptions): Doctor[] {
  let filteredDoctors = [...doctors];
  
  // Filter by search term
  if (options.search) {
    const searchLower = options.search.toLowerCase();
    filteredDoctors = filteredDoctors.filter(doctor => 
      doctor.name.toLowerCase().includes(searchLower)
    );
  }
  
  // Filter by consultation mode
  if (options.consultationMode) {
    filteredDoctors = filteredDoctors.filter(doctor => {
      if (options.consultationMode === 'video') return doctor.video_consult;
      if (options.consultationMode === 'in_clinic') return doctor.in_clinic;
      return false;
    });
  }
  
  // Filter by specialties
  if (options.specialties.length > 0) {
    filteredDoctors = filteredDoctors.filter(doctor => 
      options.specialties.some(specialty => 
        doctor.specialities.some(s => s.name === specialty)
      )
    );
  }
  
  // Sort the results
  if (options.sort) {
    filteredDoctors = [...filteredDoctors].sort((a, b) => {
      if (options.sort === 'fees') {
        return parseFloat(a.fees) - parseFloat(b.fees); // Low to high
      }
      
      if (options.sort === 'experience') {
        return parseInt(b.experience) - parseInt(a.experience); // High to low
      }
      
      return 0;
    });
  }
  
  return filteredDoctors;
}