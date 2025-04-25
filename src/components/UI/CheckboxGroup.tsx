import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

interface Option {
  id: string;
  label: string;
  value: string;
  testId?: string;
}

interface CheckboxGroupProps {
  label: string;
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ 
  label, 
  options, 
  selectedValues, 
  onChange 
}) => {
  const handleChange = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(v => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-md font-medium text-gray-700 mb-2">{label}</h3>
      <div className="space-y-2 max-h-56 overflow-y-auto pr-2">
        {options.map((option) => {
          const isChecked = selectedValues.includes(option.value);
          
          return (
            <div
              key={option.id}
              className={classNames(
                "relative rounded-lg py-2 px-4 cursor-pointer transition-all duration-200 shadow-sm",
                "flex items-center hover:bg-gray-50",
                isChecked ? "bg-blue-50 border-blue-200" : "bg-white"
              )}
              onClick={() => handleChange(option.value)}
              data-testid={option.testId}
            >
              <div className="flex items-center h-5">
                <div className={classNames(
                  "w-5 h-5 border-2 rounded flex items-center justify-center transition-colors",
                  isChecked ? "border-blue-500 bg-blue-500" : "border-gray-300"
                )}>
                  {isChecked && (
                    <motion.svg 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 text-white" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </motion.svg>
                  )}
                </div>
              </div>
              <div className="ml-3 text-sm">
                <label className={`font-medium ${isChecked ? 'text-blue-800' : 'text-gray-700'}`}>
                  {option.label}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckboxGroup;