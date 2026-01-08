
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { QuizStatus, FunctionalGroup, QuizResult, GameMode, MatchItem } from './types';
import { FUNCTIONAL_GROUPS, CREATORS, ENCOURAGEMENT_PHOTO_URL, SUCCESS_PHRASES } from './constants';
import { getFunctionalGroupFact, getRiddleForGroup } from './services/geminiService';
import FormulaDisplay from './components/FormulaDisplay';
import StructureDisplay from './components/StructureDisplay';

const QUESTIONS_COUNT = 10;
const MATCH_PAIRS_COUNT = 5; // Increased pairs per round
const MATCH_ROUNDS = 3;     // Added multiple rounds
const RIDDLE_COUNT = 5;

const App: React.FC = () => {
  const [status, setStatus] = useState<QuizStatus>(QuizStatus.START);
  const [mode, setMode] = useState<GameMode | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [currentGroup, setCurrentGroup] = useState<FunctionalGroup | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [fact, setFact] = useState<string>('');
  const [isLoadingFact, setIsLoadingFact] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);

  // Riddle State
  const [clues, setClues] = useState<string[]>([]);
  const [visibleClueCount, setVisibleClueCount] = useState(1);
  const [isLoadingRiddle, setIsLoadingRiddle] = useState(false);
  const [randomSuccessPhrase, setRandomSuccessPhrase] = useState('');

  // Matching Game State
  const [matchItems, setMatchItems] = useState<MatchItem[]>([]);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongMatchIds, setWrongMatchIds] = useState<string[]>([]);
  const [currentMatchRound, setCurrentMatchRound] = useState(1);

  const startQuiz = () => {
    setMode(GameMode.QUIZ);
    setCurrentIndex(0);
    setScore(0);
    setResults([]);
    generateQuestion();
    setStatus(QuizStatus.QUESTION);
  };

  const startMatching = () => {
    setMode(GameMode.MATCHING);
    setScore(0);
    setCurrentMatchRound(1);
    generateMatchingSet();
    setStatus(QuizStatus.MATCHING);
  };

  const startRiddle = () => {
    setMode(GameMode.RIDDLE);
    setCurrentIndex(0);
    setScore(0);
    setResults([]);
    generateRiddle();
    setStatus(QuizStatus.RIDDLE);
  };

  const generateQuestion = useCallback(() => {
    const randomGroup = FUNCTIONAL_GROUPS[Math.floor(Math.random() * FUNCTIONAL_GROUPS.length)];
    setCurrentGroup(randomGroup);
    const otherOptions = FUNCTIONAL_GROUPS.filter(g => g.name !== randomGroup.name).map(g => g.name).sort(() => 0.5 - Math.random()).slice(0, 3);
    const allOptions = [...otherOptions, randomGroup.name].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setFact('');
    
    // Optimistically pre-fetch fact for this group to have it ready for feedback
    getFunctionalGroupFact(randomGroup.name);
  }, []);

  const generateRiddle = async () => {
    setIsLoadingRiddle(true);
    setVisibleClueCount(1);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setFact('');
    
    const randomGroup = FUNCTIONAL_GROUPS[Math.floor(Math.random() * FUNCTIONAL_GROUPS.length)];
    setCurrentGroup(randomGroup);

    // This uses the cached response if available, making repeated rounds instant
    const riddleData = await getRiddleForGroup(randomGroup.name);
    setClues(riddleData.clues);
    
    const otherOptions = FUNCTIONAL_GROUPS.filter(g => g.name !== randomGroup.name).map(g => g.name).sort(() => 0.5 - Math.random()).slice(0, 3);
    const allOptions = [...otherOptions, randomGroup.name].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
    
    setIsLoadingRiddle(false);
    
    // Also pre-fetch fact
    getFunctionalGroupFact(randomGroup.name);
  };

  const generateMatchingSet = () => {
    // Select random groups for this round
    const selected = [...FUNCTIONAL_GROUPS].sort(() => 0.5 - Math.random()).slice(0, MATCH_PAIRS_COUNT);
    const items: MatchItem[] = [];
    selected.forEach(g => {
      items.push({ id: `name-${g.id}`, content: g.name, type: 'name', pairId: g.id });
      items.push({ id: `formula-${g.id}`, content: g.formula, type: 'formula', pairId: g.id });
    });
    setMatchItems(items.sort(() => 0.5 - Math.random()));
    setMatchedIds([]);
    setWrongMatchIds([]);
    setSelectedMatchId(null);
  };

  const handleMatchClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    if (!selectedMatchId) {
      setSelectedMatchId(id);
      return;
    }
    if (selectedMatchId === id) {
      setSelectedMatchId(null);
      return;
    }
    const firstItem = matchItems.find(i => i.id === selectedMatchId)!;
    const secondItem = matchItems.find(i => i.id === id)!;
    if (firstItem.type !== secondItem.type && firstItem.pairId === secondItem.pairId) {
      const newMatched = [...matchedIds, firstItem.id, secondItem.id];
      setMatchedIds(newMatched);
      setSelectedMatchId(null);
      setScore(s => s + 1);
      
      // Check if current set is cleared
      if (newMatched.length === matchItems.length) {
        if (currentMatchRound < MATCH_ROUNDS) {
          // Next Round
          setTimeout(() => {
            setCurrentMatchRound(prev => prev + 1);
            generateMatchingSet();
          }, 600);
        } else {
          // Finish Game
          setTimeout(() => setStatus(QuizStatus.RESULTS), 800);
        }
      }
    } else {
      setWrongMatchIds([firstItem.id, secondItem.id]);
      setSelectedMatchId(null);
      setTimeout(() => setWrongMatchIds([]), 500);
    }
  };

  const handleAnswer = async (answer: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answer);
    const correct = answer === currentGroup?.name;
    setIsCorrect(correct);
    if (correct) {
      setScore(s => s + 1);
      setRandomSuccessPhrase(SUCCESS_PHRASES[Math.floor(Math.random() * SUCCESS_PHRASES.length)]);
    }

    setResults(prev => [...prev, {
      question: mode === GameMode.RIDDLE ? "ทายปริศนา" : (currentGroup?.formula || ''),
      correctAnswer: currentGroup?.name || '',
      userAnswer: answer,
      isCorrect: correct
    }]);

    setIsLoadingFact(true);
    setStatus(QuizStatus.FEEDBACK);
    if (currentGroup) {
      const educationalFact = await getFunctionalGroupFact(currentGroup.name);
      setFact(educationalFact);
    }
    setIsLoadingFact(false);
  };

  const nextQuestion = () => {
    const limit = mode === GameMode.RIDDLE ? RIDDLE_COUNT : QUESTIONS_COUNT;
    if (currentIndex + 1 < limit) {
      setCurrentIndex(i => i + 1);
      if (mode === GameMode.RIDDLE) generateRiddle();
      else generateQuestion();
      setStatus(mode === GameMode.RIDDLE ? QuizStatus.RIDDLE : QuizStatus.QUESTION);
    } else {
      setStatus(QuizStatus.RESULTS);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg mb-4">
          <i className="fa-solid fa-flask-vial text-white text-3xl"></i>
        </div>
        <h1 className="text-3xl font-extrabold text-black tracking-tight">Chemistry Quest</h1>
        <p className="text-black font-medium opacity-80">Master of Functional Groups</p>
      </div>

      <div className="glass rounded-[32px] p-6 shadow-2xl overflow-hidden relative min-h-[450px]">
        {status === QuizStatus.START && (
          <div className="text-center space-y-4 py-8 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold text-black mb-4">Choose Your Mode</h2>
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={startQuiz}
                className="group w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg flex items-center justify-between active:scale-[0.98]"
              >
                <div className="text-left">
                  <div className="text-lg">Quiz Mode</div>
                  <div className="text-xs font-normal opacity-70">10 Questions (Formula + Structure)</div>
                </div>
                <i className="fa-solid fa-list-check text-2xl"></i>
              </button>
              
              <button
                onClick={startMatching}
                className="group w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg flex items-center justify-between active:scale-[0.98]"
              >
                <div className="text-left">
                  <div className="text-lg">Matching Mania</div>
                  <div className="text-xs font-normal opacity-70">{MATCH_ROUNDS} Rounds • {MATCH_PAIRS_COUNT} Pairs</div>
                </div>
                <i className="fa-solid fa-puzzle-piece text-2xl"></i>
              </button>

              <button
                onClick={startRiddle}
                className="group w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg flex items-center justify-between active:scale-[0.98]"
              >
                <div className="text-left">
                  <div className="text-lg">Mystery Riddles</div>
                  <div className="text-xs font-normal opacity-70">Sequential Hints & Clues</div>
                </div>
                <i className="fa-solid fa-ghost text-2xl"></i>
              </button>
            </div>
            <div className="pt-8 border-t border-slate-200">
              <h3 className="text-sm font-semibold text-black uppercase tracking-widest mb-4 opacity-60">Team Creators</h3>
              <div className="grid grid-cols-1 gap-2 text-left px-4">
                {CREATORS.map((name, i) => (
                  <div key={i} className="flex items-center text-black text-sm">
                    <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center mr-3 text-[10px] font-bold text-black">{i+1}</span>
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {status === QuizStatus.MATCHING && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-300" key={`matching-round-${currentMatchRound}`}>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-black flex items-center">
                  <i className="fa-solid fa-link mr-2 text-purple-600"></i> Matching
                </h2>
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-tighter">Round {currentMatchRound} of {MATCH_ROUNDS}</span>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase">Score: {score}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {matchItems.map(item => {
                const isSelected = selectedMatchId === item.id;
                const isMatched = matchedIds.includes(item.id);
                const isWrong = wrongMatchIds.includes(item.id);
                let btnClass = "border-2 transition-all p-3 min-h-[70px] rounded-xl flex items-center justify-center text-center font-bold text-sm ";
                if (isMatched) btnClass += "bg-green-100 border-green-400 text-green-700 opacity-50";
                else if (isWrong) btnClass += "bg-red-100 border-red-500 text-red-700 shake";
                else if (isSelected) btnClass += "bg-blue-600 border-blue-600 text-white scale-105 shadow-md";
                else btnClass += "bg-white border-slate-200 text-black hover:border-purple-300 active:scale-95";
                return <button key={item.id} onClick={() => handleMatchClick(item.id)} disabled={isMatched} className={btnClass}>{item.content}</button>;
              })}
            </div>
            <button onClick={() => setStatus(QuizStatus.START)} className="w-full text-slate-400 hover:text-slate-600 text-[10px] font-bold uppercase tracking-widest">Back to Menu</button>
          </div>
        )}

        {status === QuizStatus.RIDDLE && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center px-2">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
                Riddle {currentIndex + 1} / {RIDDLE_COUNT}
              </span>
              <span className="text-black font-bold">Score: <span className="text-indigo-600">{score}</span></span>
            </div>

            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-6 min-h-[200px] flex flex-col justify-center space-y-4">
              {isLoadingRiddle ? (
                <div className="flex flex-col items-center space-y-3">
                  <i className="fa-solid fa-spinner fa-spin text-3xl text-indigo-400"></i>
                  <p className="text-indigo-400 font-bold animate-pulse">กำลังซ่อนคำใบ้...</p>
                </div>
              ) : (
                <>
                  <h3 className="text-center font-bold text-indigo-800 text-lg mb-2">ฉันคือใคร?</h3>
                  <div className="space-y-3">
                    {clues.slice(0, visibleClueCount).map((clue, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-xl shadow-sm border-l-4 border-indigo-500 animate-in slide-in-from-left duration-500">
                        <span className="font-bold text-indigo-600 mr-2">#{idx+1}</span>
                        <span className="text-black font-medium">{clue}</span>
                      </div>
                    ))}
                  </div>
                  {visibleClueCount < 3 && !isLoadingRiddle && (
                    <button 
                      onClick={() => setVisibleClueCount(prev => prev + 1)}
                      className="mt-4 text-indigo-600 font-bold text-sm hover:underline"
                    >
                      <i className="fa-solid fa-eye mr-2"></i> เปิดคำใบ้ถัดไป
                    </button>
                  )}
                </>
              )}
            </div>

            {!isLoadingRiddle && (
              <div className="grid grid-cols-2 gap-3">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="p-3 border-2 border-slate-200 rounded-xl text-black font-bold hover:bg-indigo-50 hover:border-indigo-300 transition-all active:scale-95"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {(status === QuizStatus.QUESTION || status === QuizStatus.FEEDBACK) && currentGroup && mode !== GameMode.RIDDLE && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center px-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">Question {currentIndex + 1} / {QUESTIONS_COUNT}</span>
              <span className="text-black font-bold">Score: <span className="text-blue-600">{score}</span></span>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1"><FormulaDisplay formula={currentGroup.formula} /></div>
              <div className="flex-1"><StructureDisplay svgPath={currentGroup.svgPath} /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {options.map((option) => {
                let btnStyle = "border-2 border-slate-200 text-black hover:border-blue-300 hover:bg-blue-50";
                if (selectedAnswer === option) btnStyle = isCorrect ? "bg-green-500 border-green-500 text-white" : "bg-red-500 border-red-500 text-white";
                else if (selectedAnswer !== null && option === currentGroup.name) btnStyle = "bg-green-500 border-green-500 text-white";
                return <button key={option} disabled={selectedAnswer !== null} onClick={() => handleAnswer(option)} className={`p-4 rounded-xl text-lg font-semibold transition-all ${btnStyle} ${selectedAnswer === null ? 'active:scale-95' : 'cursor-default'}`}>{option}</button>;
              })}
            </div>
          </div>
        )}

        {status === QuizStatus.FEEDBACK && (
          <div className="p-5 mt-6 rounded-2xl bg-white border border-slate-100 shadow-md animate-in zoom-in-95 duration-300">
            <div className="flex items-center mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                <i className={`fa-solid ${isCorrect ? 'fa-check' : 'fa-xmark'}`}></i>
              </div>
              <h4 className={`font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? randomSuccessPhrase : `เกือบถูกแล้ว! คำตอบคือ ${currentGroup?.name}`}
              </h4>
            </div>
            {isCorrect && (
              <div className="flex justify-center mb-6 animate-bounce-subtle">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur opacity-25"></div>
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                    <img src={ENCOURAGEMENT_PHOTO_URL} alt="Encouragement" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            )}
            <div className="text-black text-sm leading-relaxed min-h-[40px]">
              {isLoadingFact ? <div className="h-4 bg-slate-100 rounded animate-pulse w-full"></div> : <div className="bg-slate-50 p-3 rounded-xl italic opacity-90 text-center">"{fact}"</div>}
            </div>
            <button onClick={nextQuestion} className="w-full mt-4 bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl transition-all">Next Question</button>
          </div>
        )}

        {status === QuizStatus.RESULTS && (
          <div className="text-center py-4 space-y-6 animate-in fade-in duration-700">
            <div className="relative inline-block"><div className="text-7xl mb-2">🏆</div></div>
            <div>
              <h2 className="text-3xl font-extrabold text-black mb-1">ยินดีด้วย!</h2>
              <p className="text-black font-medium opacity-70">
                {mode === GameMode.RIDDLE ? `ไขปริศนาไปได้ ${score} ข้อ!` : `คุณได้คะแนน ${score} เต็ม ${mode === GameMode.QUIZ ? QUESTIONS_COUNT : (MATCH_PAIRS_COUNT * MATCH_ROUNDS)}`}
              </p>
            </div>
            <button onClick={() => setStatus(QuizStatus.START)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all">Back to Menu</button>
          </div>
        )}
      </div>

      <footer className="mt-8 text-center text-black opacity-50 text-xs font-medium space-y-2">
        <p>© 2024 Chemistry Mastery Game</p>
        <div className="flex flex-col items-center justify-center space-y-1">
          <p className="flex items-center"><i className="fa-solid fa-microchip mr-2 opacity-70"></i>Powered by Gemini AI</p>
          <div className="flex flex-wrap justify-center gap-x-2 text-[10px]">
            {CREATORS.map((c, i) => <span key={i}>{c}{i < CREATORS.length - 1 ? ' • ' : ''}</span>)}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .shake { animation: shake 0.2s cubic-bezier(.36,.07,.19,.97) both; }
        .animate-bounce-subtle { animation: bounce-subtle 2s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default App;
