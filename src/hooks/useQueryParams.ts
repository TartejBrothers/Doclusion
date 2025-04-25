import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ConsultationMode, SortOption } from '../types/doctor';

interface FilterState {
  search: string;
  consultationMode: ConsultationMode | null;
  specialties: string[];
  sort: SortOption | null;
}

interface UseQueryParamsResult {
  filters: FilterState;
  updateSearch: (value: string) => void;
  updateConsultationMode: (value: ConsultationMode | null) => void;
  updateSpecialties: (value: string[]) => void;
  updateSort: (value: SortOption | null) => void;
  clearFilters: () => void;
}

export function useQueryParams(): UseQueryParamsResult {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const filters: FilterState = {
    search: searchParams.get('search') || '',
    consultationMode: (searchParams.get('type') as ConsultationMode) || null,
    specialties: searchParams.get('specialties')?.split(',').filter(Boolean) || [],
    sort: (searchParams.get('sort') as SortOption) || null
  };

  const updateSearchParams = useCallback((newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    
    const params: Record<string, string> = {};
    
    if (updatedFilters.search) params.search = updatedFilters.search;
    if (updatedFilters.consultationMode) params.type = updatedFilters.consultationMode;
    if (updatedFilters.specialties.length > 0) params.specialties = updatedFilters.specialties.join(',');
    if (updatedFilters.sort) params.sort = updatedFilters.sort;
    
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const updateSearch = useCallback((value: string) => {
    updateSearchParams({ search: value });
  }, [updateSearchParams]);

  const updateConsultationMode = useCallback((value: ConsultationMode | null) => {
    updateSearchParams({ consultationMode: value });
  }, [updateSearchParams]);

  const updateSpecialties = useCallback((value: string[]) => {
    updateSearchParams({ specialties: value });
  }, [updateSearchParams]);

  const updateSort = useCallback((value: SortOption | null) => {
    updateSearchParams({ sort: value });
  }, [updateSearchParams]);

  const clearFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return {
    filters,
    updateSearch,
    updateConsultationMode,
    updateSpecialties,
    updateSort,
    clearFilters
  };
}