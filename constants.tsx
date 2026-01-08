
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
  },
  { 
    id: '9', 
    formula: 'Ar-OH', 
    name: 'Phenol', 
    category: 'Oxygenated',
    svgPath: '<polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" stroke-width="2"/><line x1="80" y1="50" x2="105" y2="50" stroke="currentColor" stroke-width="3"/><text x="108" y="58" font-family="Arial" font-size="20">OH</text>'
  },
  { 
    id: '10', 
    formula: 'R-CN', 
    name: 'Nitrile', 
    category: 'Nitrogenated',
    svgPath: '<line x1="20" y1="50" x2="60" y2="50" stroke="currentColor" stroke-width="4"/><text x="65" y="58" font-family="Arial" font-size="24">C≡N</text>'
  }
];

export const CREATORS = [
  "นางสาวชมพูนุท เทศเพ็ญ",
  "นายพัฒนศักดิ์ อุดเรือน",
  "นางสาวณัฐธิดา นาดี",
  "นายภาสกร กันนุลา",
  "นายรัฐศาสตร์ นุบาล"
];

export const ENCOURAGEMENT_PHOTO_URL = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop";

export const SUCCESS_PHRASES = [
  "ไหวป่าวๆ",
  "อาจจะยังน้า",
  "เก่งมากปลานีโม่น้อยของพี่"
];

export const PREDEFINED_RIDDLES = [
  {
    answer: "Carboxylic Acid",
    clues: [
      "สารอินทรีย์ที่มีสมบัติเป็นกรดอ่อน สามารถเปลี่ยนสีกระดาษลิตมัสจากน้ำเงินเป็นแดง",
      "มีหมู่ฟังก์ชันที่เกิดจากการรวมตัวของหมู่คาร์บอนิลและไฮดรอกซิลบนคาร์บอนตัวเดียวกัน",
      "พบในกรดแอซีติกของน้ำส้มสายชู และกรดฟอร์มิกในมด"
    ]
  },
  {
    answer: "Ester",
    clues: [
      "สารที่มีกลิ่นหอมคล้ายผลไม้ มักใช้ในอุตสาหกรรมเครื่องสำอางและรสชาติอาหาร",
      "เป็นอนุพันธ์ของกรดคาร์บอกซิลิกที่ไฮโดรเจนถูกแทนที่ด้วยหมู่แอลคิล (R)",
      "เกิดจากปฏิกิริยาเอสเทอริฟิเคชันระหว่างกรดคาร์บอกซิลิกและแอลกอฮอล์"
    ]
  },
  {
    answer: "Amide",
    clues: [
      "เป็นสารประกอบอินทรีย์ที่มีความเป็นเบสน้อยมากเนื่องจาก resonance ของคู่อิเล็กตรอน",
      "มีโครงสร้างประกอบด้วยหมู่คาร์บอนิล (C=O) ต่อกับอะตอมไนโตรเจน (N)",
      "พบในโครงสร้างหลักของโปรตีนและเส้นใยไนลอน"
    ]
  },
  {
    answer: "Phenol",
    clues: [
      "เป็นสารประกอบอะโรมาติกที่มีสมบัติเป็นกรดมากกว่าแอลกอฮอล์ทั่วไป",
      "โครงสร้างต้องมีหมู่ -OH ต่ออยู่กับวงเบนซีนโดยตรง",
      "นิยมใช้เป็นสารตั้งต้นในการผลิตยาฆ่าเชื้อและเรซิน"
    ]
  },
  {
    answer: "Nitrile",
    clues: [
      "มีสมบัติเป็นตัวทำละลายที่ดีและมีความหนาแน่นค่อนข้างสูง",
      "ประกอบด้วยหมู่ฟังก์ชันที่มีคาร์บอนสร้างพันธะสามกับไนโตรเจน",
      "พบในยางสังเคราะห์ชนิด NBR ที่ทนต่อน้ำมันได้ดี"
    ]
  },
  {
    answer: "Aldehyde",
    clues: [
      "เป็นตัวรีดิวซ์ที่แรง สามารถเกิดปฏิกิริยากับสารละลายเบเนดิกต์ได้ตะกอนสีแดงอิฐ",
      "มีหมู่ฟังก์ชันอยู่ที่ปลายสายโซ่คาร์บอนเสมอ โดยประกอบด้วย C=O และ H",
      "สมาชิกที่เล็กที่สุดคือฟอร์มาลดีไฮด์ ซึ่งใช้ในการรักษาสภาพเนื้อเยื่อ"
    ]
  },
  {
    answer: "Ketone",
    clues: [
      "ไม่เกิดปฏิกิริยากับสารละลายเบเนดิกต์หรือสารละลายทอลเลนส์ในสภาวะปกติ",
      "มีหมู่คาร์บอนิล (C=O) อยู่ระหว่างหมู่แอลคิลสองหมู่ (R-CO-R')",
      "อะซีโตนเป็นสมาชิกที่คุ้นเคยที่สุด ใช้เป็นตัวทำละลายล้างสีทาเล็บ"
    ]
  },
  {
    answer: "Ether",
    clues: [
      "เป็นสารที่มีจุดเดือดต่ำและไวไฟมาก มักใช้เป็นตัวทำละลายในห้องปฏิบัติการ",
      "มีอะตอมของออกซิเจนแทรกอยู่ระหว่างคาร์บอนสองอะตอม (R-O-R')",
      "ในอดีตเคยถูกใช้เป็นยาสลบในการผ่าตัด"
    ]
  },
  {
    answer: "Amine",
    clues: [
      "เป็นอนุพันธ์ของแอมโมเนียที่มีสมบัติเป็นเบส และมีกลิ่นคาวเฉพาะตัว",
      "มีหมู่ฟังก์ชันที่มีไนโตรเจนต่ออยู่กับคาร์บอนด้วยพันธะเดี่ยว",
      "พบในโครงสร้างของสารสื่อประสาทและสารอัลคาลอยด์ในพืช"
    ]
  },
  {
    answer: "Alcohol",
    clues: [
      "สามารถเกิดพันธะไฮโดรเจนระหว่างโมเลกุลได้ ทำให้มีจุดเดือดสูงกว่าอีเทอร์ที่มีมวลใกล้เคียงกัน",
      "มีหมู่ไฮดรอกซิล (-OH) ต่อกับคาร์บอนที่มีพันธะเดี่ยวทั้งหมด",
      "เอทานอลเป็นชนิดที่มนุษย์นำมาใช้ประโยชน์หลากหลาย ทั้งเชื้อเพลิงและเครื่องดื่ม"
    ]
  }
];
