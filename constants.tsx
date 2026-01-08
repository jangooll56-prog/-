
import { FunctionalGroup } from './types';

export const FUNCTIONAL_GROUPS: FunctionalGroup[] = [
  { 
    id: '1', 
    formula: 'R-OH', 
    name: 'Alcohol', 
    category: 'Oxygenated',
    svgPath: '<circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="4"/><line x1="80" y1="50" x2="110" y2="50" stroke="currentColor" stroke-width="4"/><text x="115" y="58" font-family="Arial" font-size="24" font-weight="bold">OH</text>'
  },
  { 
    id: '2', 
    formula: 'R-CHO', 
    name: 'Aldehyde', 
    category: 'Oxygenated',
    svgPath: '<line x1="20" y1="50" x2="60" y2="50" stroke="currentColor" stroke-width="4"/><line x1="60" y1="50" x2="80" y2="25" stroke="currentColor" stroke-width="4"/><line x1="60" y1="50" x2="80" y2="75" stroke="currentColor" stroke-width="4"/><text x="85" y="30" font-family="Arial" font-size="20">O</text><text x="85" y="85" font-family="Arial" font-size="20">H</text><line x1="65" y1="45" x2="80" y2="25" stroke="currentColor" stroke-width="2"/>'
  },
  { 
    id: '3', 
    formula: "R-CO-R'", 
    name: 'Ketone', 
    category: 'Oxygenated',
    svgPath: '<line x1="20" y1="50" x2="100" y2="50" stroke="currentColor" stroke-width="4"/><line x1="60" y1="50" x2="60" y2="20" stroke="currentColor" stroke-width="4"/><line x1="55" y1="50" x2="55" y2="20" stroke="currentColor" stroke-width="2"/><text x="52" y="15" font-family="Arial" font-size="20">O</text>'
  },
  { 
    id: '4', 
    formula: 'R-COOH', 
    name: 'Carboxylic Acid', 
    category: 'Oxygenated',
    svgPath: '<line x1="20" y1="50" x2="60" y2="50" stroke="currentColor" stroke-width="4"/><line x1="60" y1="50" x2="80" y2="25" stroke="currentColor" stroke-width="4"/><line x1="60" y1="50" x2="80" y2="75" stroke="currentColor" stroke-width="4"/><text x="85" y="30" font-family="Arial" font-size="20">O</text><text x="85" y="85" font-family="Arial" font-size="20">OH</text>'
  },
  { 
    id: '5', 
    formula: "R-COO-R'", 
    name: 'Ester', 
    category: 'Oxygenated',
    svgPath: '<line x1="20" y1="50" x2="60" y2="50" stroke="currentColor" stroke-width="4"/><line x1="60" y1="50" x2="80" y2="25" stroke="currentColor" stroke-width="4"/><line x1="60" y1="50" x2="80" y2="75" stroke="currentColor" stroke-width="4"/><text x="85" y="30" font-family="Arial" font-size="20">O</text><text x="85" y="85" font-family="Arial" font-size="20">OR\'</text>'
  },
  { 
    id: '6', 
    formula: "R-O-R'", 
    name: 'Ether', 
    category: 'Oxygenated',
    svgPath: '<line x1="20" y1="50" x2="50" y2="50" stroke="currentColor" stroke-width="4"/><text x="55" y="58" font-family="Arial" font-size="24">O</text><line x1="75" y1="50" x2="105" y2="50" stroke="currentColor" stroke-width="4"/>'
  },
  { 
    id: '7', 
    formula: 'R-NH₂', 
    name: 'Amine', 
    category: 'Nitrogenated',
    svgPath: '<line x1="20" y1="50" x2="60" y2="50" stroke="currentColor" stroke-width="4"/><text x="65" y="58" font-family="Arial" font-size="24">NH₂</text>'
  },
  { 
    id: '8', 
    formula: 'R-CONH₂', 
    name: 'Amide', 
    category: 'Nitrogenated',
    svgPath: '<line x1="20" y1="50" x2="60" y2="50" stroke="currentColor" stroke-width="4"/><line x1="60" y1="50" x2="75" y2="25" stroke="currentColor" stroke-width="4"/><text x="78" y="30" font-family="Arial" font-size="20">O</text><text x="65" y="75" font-family="Arial" font-size="20">NH₂</text>'
  }
];

export const CREATORS = [
  "นางสาวชมพูนุท เทศเพ็ญ",
  "นายพัฒนศักดิ์ อุดเรือน",
  "นางสาวณัฐธิดา นาดี",
  "นายภาสกรกัน นุบาล",
  "นายรัฐศาสตร์ นุบาล"
];

// Encouragement photo and phrases
export const ENCOURAGEMENT_PHOTO_URL = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop";

export const SUCCESS_PHRASES = [
  "ไหวป่าวๆ",
  "อาจจะยังน้า",
  "เก่งมากปลานีโม่น้อยของพี่"
];
