
import React from 'react';

interface FormulaDisplayProps {
  formula: string;
}

const FormulaDisplay: React.FC<FormulaDisplayProps> = ({ formula }) => {
  // Simple regex to subscript numbers
  const formatFormula = (text: string) => {
    return text.split(/(\d+)/).map((part, i) => 
      /^\d+$/.test(part) ? <sub key={i} className="text-2xl">{part}</sub> : part
    );
  };

  return (
    <div className="flex items-center justify-center min-h-[160px] bg-white rounded-3xl border-4 border-blue-500 shadow-inner px-8 py-10">
      <div className="text-5xl md:text-6xl font-bold text-black tracking-wider">
        {formatFormula(formula)}
      </div>
    </div>
  );
};

export default FormulaDisplay;
