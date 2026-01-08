
import React from 'react';

interface StructureDisplayProps {
  svgPath: string;
  size?: number;
}

const StructureDisplay: React.FC<StructureDisplayProps> = ({ svgPath, size = 150 }) => {
  return (
    <div className="flex items-center justify-center bg-white rounded-2xl border-2 border-slate-100 p-4 shadow-sm h-full w-full min-h-[140px]">
      <svg 
        viewBox="0 0 140 100" 
        className="text-black" 
        style={{ width: '100%', height: '100%', maxWidth: size }}
        dangerouslySetInnerHTML={{ __html: svgPath }}
      />
    </div>
  );
};

export default StructureDisplay;
