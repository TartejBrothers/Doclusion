import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Doctor } from '../../types/doctor';

interface SearchBarProps {
  doctors: Doctor[];
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ doctors, value, onChange }) => {
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const searchTerm = value.toLowerCase();
    const matches = doctors
      .filter(doctor => doctor.name.toLowerCase().includes(searchTerm))
      .slice(0, 3);

    setSuggestions(matches);
    setSelectedIndex(-1);
  }, [value, doctors]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSelectSuggestion = (doctorName: string) => {
    onChange(doctorName);
    setSuggestions([]);
    setFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    }
    else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelectSuggestion(suggestions[selectedIndex].name);
    }
    else if (e.key === 'Escape') {
      setSuggestions([]);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder="Search doctors by name..."
          className="w-full p-4 pl-5 pr-12 rounded-xl border-2 border-primary-100 focus:border-primary-500 focus:outline-none search-input text-lg transition-all"
          data-testid="autocomplete-input"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-primary-500">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <AnimatePresence>
        {focused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg border border-primary-100 overflow-hidden"
          >
            <ul className="py-2">
              {suggestions.map((doctor, index) => (
                <motion.li 
                  key={doctor.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`px-5 py-3 cursor-pointer transition-colors ${
                    index === selectedIndex ? 'bg-primary-50 text-primary-500' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleSelectSuggestion(doctor.name)}
                  data-testid="suggestion-item"
                >
                  <div className="font-medium">{doctor.name}</div>
                  <div className="text-sm text-gray-500">
                    {doctor.specialities?.[0]?.name}
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;