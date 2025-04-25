import React from 'react';
import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react';
import { motion } from 'framer-motion';

interface Option {
  id: string;
  label: string;
  value: string;
  testId?: string;
}

interface RadioGroupProps {
  label: string;
  options: Option[];
  value: string | null;
  onChange: (value: string | null) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ label, options, value, onChange }) => {
  const handleChange = (newValue: string) => {
    // Toggle selection if the same value is selected
    onChange(value === newValue ? null : newValue);
  };

  return (
    <div className="mb-6">
      <h3 className="text-md font-medium text-gray-700 mb-2">{label}</h3>
      <HeadlessRadioGroup value={value || ''} onChange={handleChange}>
        <div className="space-y-2">
          {options.map((option) => (
            <HeadlessRadioGroup.Option
              key={option.id}
              value={option.value}
              className={({ active, checked }) =>
                `${active ? 'ring-2 ring-blue-200' : ''}
                 ${checked ? 'bg-blue-500 text-white' : 'bg-white'}
                 relative rounded-lg px-4 py-2 cursor-pointer flex items-center focus:outline-none
                 transition-all duration-200 shadow-sm`
              }
              data-testid={option.testId}
            >
              {({ checked }) => (
                <>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <HeadlessRadioGroup.Label
                          as="p"
                          className={`font-medium ${checked ? 'text-white' : 'text-gray-700'}`}
                        >
                          {option.label}
                        </HeadlessRadioGroup.Label>
                      </div>
                    </div>
                    {checked && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-2 text-white"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                </>
              )}
            </HeadlessRadioGroup.Option>
          ))}
        </div>
      </HeadlessRadioGroup>
    </div>
  );
};

export default RadioGroup;