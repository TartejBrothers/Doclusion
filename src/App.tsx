import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Layout/Header";
import FilterPanel from "./components/Layout/FilterPanel";
import DoctorGrid from "./components/Layout/DoctorGrid";
import { useDoctors } from "./hooks/useDoctors";
import { useQueryParams } from "./hooks/useQueryParams";
import { filterDoctors } from "./utils/filterDoctors";

function App() {
  const { doctors, loading, error } = useDoctors();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const {
    filters,
    updateSearch,
    updateConsultationMode,
    updateSpecialties,
    updateSort,
    clearFilters,
  } = useQueryParams();

  const filteredDoctors = filterDoctors(doctors, {
    search: filters.search,
    consultationMode: filters.consultationMode,
    specialties: filters.specialties,
    sort: filters.sort,
  });

  return (
    <div className="min-h-screen bg-primary-50">
      <Header
        doctors={doctors}
        searchTerm={filters.search}
        onSearchChange={updateSearch}
      />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <AnimatePresence>
          {loading ? (
            <motion.div
              className="flex items-center justify-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </motion.div>
          ) : error ? (
            <motion.div
              className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Mobile Filter Button */}
              <div className="md:hidden mb-4">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="w-full py-2 px-4 bg-white border border-primary-100 rounded-xl text-primary-500 font-medium flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                  Filters
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Desktop Filters */}
                <div className="hidden md:block md:col-span-1">
                  <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
                    <FilterPanel
                      doctors={doctors}
                      consultationMode={filters.consultationMode}
                      specialties={filters.specialties}
                      sort={filters.sort}
                      onConsultationModeChange={updateConsultationMode}
                      onSpecialtiesChange={updateSpecialties}
                      onSortChange={updateSort}
                      onClearFilters={clearFilters}
                    />
                  </div>
                </div>

                <div className="md:col-span-3">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {filteredDoctors.length === 0
                        ? "No doctors found"
                        : `Found ${filteredDoctors.length} doctor${
                            filteredDoctors.length === 1 ? "" : "s"
                          }`}
                    </h2>
                    {(filters.consultationMode ||
                      filters.specialties.length > 0 ||
                      filters.sort) && (
                      <button
                        onClick={clearFilters}
                        className="px-4 py-2 text-sm font-medium text-primary-500 hover:bg-primary-100 rounded-md transition-colors"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                  <DoctorGrid doctors={filteredDoctors} />
                </div>
              </div>

              {/* Mobile Filters Modal */}
              <AnimatePresence>
                {showMobileFilters && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                      onClick={() => setShowMobileFilters(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: "100%" }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: "100%" }}
                      transition={{ type: "spring", damping: 25 }}
                      className="fixed inset-x-0 bottom-0 top-20 z-50 md:hidden"
                    >
                      <FilterPanel
                        doctors={doctors}
                        consultationMode={filters.consultationMode}
                        specialties={filters.specialties}
                        sort={filters.sort}
                        onConsultationModeChange={updateConsultationMode}
                        onSpecialtiesChange={updateSpecialties}
                        onSortChange={updateSort}
                        onClearFilters={clearFilters}
                        isMobileView={true}
                        onClose={() => setShowMobileFilters(false)}
                      />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
