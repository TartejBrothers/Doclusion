import React from 'react';
import { Listbox } from '@headlessui/react';
import { motion } from 'framer-motion';

interface SortOption {
  id: string;
  label: string;
  value: string;
  testId?: string;
}

interface SortSelectorProps {
  label: string;
  options: SortOption[];
  value: string | null;
  onChange: (value: string | null) => void;
}

const SortSelector: React.FC<SortSelectorProps> = ({ 
  label, 
  options, 
  value, 
  onChange 
}) => {
  const selectedOption = options.find(option => option.value === value) || null;

  return (
    <div className="mb-6">
      <h3 className="text-md font-medium text-gray-700 mb-2">{label}</h3>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button 
            className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <span className="block truncate">
              {selectedOption ? selectedOption.label : 'Select sorting'}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg 
                className="w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </span>
          </Listbox.Button>
          <Listbox.Options 
            className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {options.map((option) => (
              <Listbox.Option
                key={option.id}
                value={option.value}
                className={({ active }) =>
                  `${active ? 'text-white bg-blue-600' : 'text-gray-900'}
                    cursor-pointer select-none relative py-2 pl-10 pr-4`
                }
                data-testid={option.testId}
              >
                {({ selected, active }) => (
                  <>
                    <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                      {option.label}
                    </span>
                    {selected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`${active ? 'text-white' : 'text-blue-600'} absolute inset-y-0 left-0 flex items-center pl-3`}
                      >
                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

export default SortSelector;