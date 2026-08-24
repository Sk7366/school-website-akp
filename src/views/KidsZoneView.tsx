import React, { useState } from 'react';
import { PageTab, PhonicsCard, StoryPage } from '../types';
import {
  PHONICS_CARDS_DATA,
  LEO_STORY_PAGES,
} from '../data/preschoolExtendedData';
import {
  Sparkles,
  Volume2,
  BookOpen,
  Gamepad2,
  Smile,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Award,
  Music,
  Heart,
  Star,
  RefreshCw,
} from 'lucide-react';
import { LeoSuper, LeoReader, LeoArtist, LeoTeacher, StarDeco } from '../components/MascotIcons';

interface KidsZoneViewProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAdmissionModal: () => void;
}

interface ShapeGameItem {
  id: string;
  name: string;
  shape: 'circle' | 'square' | 'triangle' | 'star' | 'heart';
  color: string;
  colorName: string;
  prompt: string;
  options: { label: string; shape: string; isCorrect: boolean }[];
}

const SHAPE_GAME_ITEMS: ShapeGameItem[] = [
  {
    id: 'q1',
    name: 'Sun Star',
    shape: 'star',
    color: '#FFD21F',
    colorName: 'Yellow',
    prompt: 'Which one is the Yellow Shining Star?',
    options: [
      { label: '🔵 Circle', shape: 'circle', isCorrect: false },
      { label: '⭐ Shining Star', shape: 'star', isCorrect: true },
      { label: '🟥 Square', shape: 'square', isCorrect: false },
    ],
  },
  {
    id: 'q2',
    name: 'Love Heart',
    shape: 'heart',
    color: '#FF4F6D',
    colorName: 'Pink',
    prompt: 'Leo wants to share love! Find the Pink Heart:',
    options: [
      { label: '💖 Sweet Heart', shape: 'heart', isCorrect: true },
      { label: '🔺 Triangle', shape: 'triangle', isCorrect: false },
      { label: '🔵 Circle', shape: 'circle', isCorrect: false },
    ],
  },
  {
    id: 'q3',
    name: 'Magic Triangle',
    shape: 'triangle',
    color: '#29B6F6',
    colorName: 'Blue',
    prompt: 'Look at the roof of the castle! Find the 3-sided Triangle:',
    options: [
      { label: '🟩 Square', shape: 'square', isCorrect: false },
      { label: '🔺 Blue Triangle', shape: 'triangle', isCorrect: true },
      { label: '⭐ Star', shape: 'star', isCorrect: false },
    ],
  },
  {
    id: 'q4',
    name: 'Green Block',
    shape: 'square',
    color: '#5BC85A',
    colorName: 'Green',
    prompt: 'Help Leo build a high tower! Find the Green Square block:',
    options: [
      { label: '🟩 Green Square', shape: 'square', isCorrect: true },
      { label: '💖 Pink Heart', shape: 'heart', isCorrect: false },
      { label: '🟡 Yellow Circle', shape: 'circle', isCorrect: false },
    ],
  },
];

export const KidsZoneView: React.FC<KidsZoneViewProps> = ({
  onNavigate,
  onOpenAdmissionModal,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'phonics' | 'storybook' | 'shapes'>('phonics');

  // Phonics state
  const [selectedLetter, setSelectedLetter] = useState<PhonicsCard>(PHONICS_CARDS_DATA[0]);

  // Storybook state
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [isStorySpeaking, setIsStorySpeaking] = useState<boolean>(false);
  const [interactiveDone, setInteractiveDone] = useState<boolean>(false);

  // Shape Game state
  const [shapeQuestionIdx, setShapeQuestionIdx] = useState<number>(0);
  const [gameScore, setGameScore] = useState<number>(0);
  const [gameFeedback, setGameFeedback] = useState<string | null>(null);

  // Phonics Audio Synthesis
  const playLetterSound = (card: PhonicsCard) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      `Letter ${card.letter}! Sound ${card.phoneticSound}. ${card.word}! Did you know: ${card.funFact}`
    );
    utterance.rate = 0.88;
    utterance.pitch = 1.25;
    window.speechSynthesis.speak(utterance);
  };

  // Storybook Speech Synthesis
  const playStoryPageAudio = () => {
    if (!('speechSynthesis' in window)) return;
    const page = LEO_STORY_PAGES[currentPageIndex];
    if (isStorySpeaking) {
      window.speechSynthesis.cancel();
      setIsStorySpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `Page ${page.pageNumber}. ${page.title}. ${page.storyText}`
      );
      utterance.rate = 0.92;
      utterance.pitch = 1.18;
      utterance.onend = () => setIsStorySpeaking(false);
      utterance.onerror = () => setIsStorySpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsStorySpeaking(true);
    }
  };

  // Trigger story interactive item
  const handleStoryInteractive = () => {
    setInteractiveDone(true);
    if ('speechSynthesis' in window) {
      const page = LEO_STORY_PAGES[currentPageIndex];
      const u = new SpeechSynthesisUtterance(page.interactiveAction);
      u.pitch = 1.3;
      window.speechSynthesis.speak(u);
    }
  };

  // Shape Game Answer Handler
  const currentShapeQuestion = SHAPE_GAME_ITEMS[shapeQuestionIdx % SHAPE_GAME_ITEMS.length];
  const handleShapeAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setGameScore((prev) => prev + 1);
      setGameFeedback('🎉 Roar-some Job! You found the right shape!');
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance('Hooray! Great job finding the right shape!');
        u.pitch = 1.3;
        window.speechSynthesis.speak(u);
      }
      setTimeout(() => {
        setGameFeedback(null);
        setShapeQuestionIdx((prev) => prev + 1);
      }, 1400);
    } else {
      setGameFeedback('🦁 Try again! You can do it little cub!');
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance('Try again! Give it another guess!');
        u.pitch = 1.1;
        window.speechSynthesis.speak(u);
      }
    }
  };

  return (
    <div className="bg-[#FFF9EC] min-h-screen py-10 sm:py-14 text-[#173B5E]">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-gradient-to-r from-[#FFD21F] via-[#FF8A3D] to-[#F4511E] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white">
          <div className="space-y-3 max-w-xl z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-white" />
              <span>Interactive Child Learning Den</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Leo’s Play &amp; Learn Safari
            </h1>
            <p className="text-white/90 text-sm sm:text-base font-medium">
              Click any alphabet to hear cheerful phonics, read picture storybooks together, or test your shapes!
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3 z-10">
            <LeoSuper size={140} animate={true} />
          </div>

          {/* Deco circles */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full pointer-events-none" />
          <div className="absolute top-0 right-20 w-32 h-32 bg-white/15 rounded-full pointer-events-none" />
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setActiveSubTab('phonics')}
            className={`px-5 py-3 rounded-2xl font-heading font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-md transition-all cursor-pointer ${
              activeSubTab === 'phonics'
                ? 'bg-[#F4511E] text-white scale-105 shadow-orange-500/30'
                : 'bg-white text-[#173B5E] hover:bg-orange-50'
            }`}
          >
            <Volume2 className="w-5 h-5 text-[#FFD21F]" />
            <span>1. ABC Phonics Safari</span>
          </button>

          <button
            onClick={() => setActiveSubTab('storybook')}
            className={`px-5 py-3 rounded-2xl font-heading font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-md transition-all cursor-pointer ${
              activeSubTab === 'storybook'
                ? 'bg-[#29B6F6] text-white scale-105 shadow-blue-500/30'
                : 'bg-white text-[#173B5E] hover:bg-blue-50'
            }`}
          >
            <BookOpen className="w-5 h-5 text-white" />
            <span>2. Leo’s Read-Along Story</span>
          </button>

          <button
            onClick={() => setActiveSubTab('shapes')}
            className={`px-5 py-3 rounded-2xl font-heading font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-md transition-all cursor-pointer ${
              activeSubTab === 'shapes'
                ? 'bg-[#5BC85A] text-white scale-105 shadow-green-500/30'
                : 'bg-white text-[#173B5E] hover:bg-green-50'
            }`}
          >
            <Gamepad2 className="w-5 h-5 text-white" />
            <span>3. Shape Quest Game</span>
          </button>
        </div>
      </div>

      {/* Main Content Area Based on Sub-Tab */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* 1. PHONICS SAFARI */}
        {/* ========================================================================= */}
        {activeSubTab === 'phonics' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Alphabet Grid (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-3 border-[#FFD21F] shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-black text-2xl text-[#173B5E]">
                    Tap a Letter to Hear Phonics!
                  </h2>
                  <p className="text-xs text-gray-500 font-medium">
                    Listen to natural phonetic sounds, animal friends, and curious preschool facts.
                  </p>
                </div>
                <button
                  onClick={() => playLetterSound(selectedLetter)}
                  className="px-3.5 py-2 rounded-xl bg-[#FFF3E0] hover:bg-[#FFE0B2] text-[#F4511E] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Hear &quot;{selectedLetter.letter}&quot; Sound</span>
                </button>
              </div>

              {/* Grid of Alphabet Buttons */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {PHONICS_CARDS_DATA.map((item) => {
                  const isSelected = selectedLetter.letter === item.letter;
                  return (
                    <button
                      key={item.letter}
                      onClick={() => {
                        setSelectedLetter(item);
                        playLetterSound(item);
                      }}
                      className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer border-2 ${
                        isSelected
                          ? 'bg-[#173B5E] text-white border-[#F4511E] scale-105 shadow-lg'
                          : 'bg-[#FFF9EC] text-[#173B5E] border-orange-100 hover:border-[#FFD21F] hover:bg-orange-50'
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl mb-1">{item.emoji}</span>
                      <span
                        className="font-heading font-black text-xl sm:text-2xl"
                        style={{ color: isSelected ? '#FFD21F' : item.color }}
                      >
                        {item.letter}
                      </span>
                      <span className="text-[10px] font-bold truncate max-w-full text-gray-500">
                        {item.word}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Selected Letter Interactive Card (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div
                className="rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between"
                style={{ backgroundColor: selectedLetter.color }}
              >
                <div className="flex items-start justify-between z-10">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full">
                      Letter Spotlight
                    </span>
                    <h3 className="font-heading font-black text-6xl sm:text-7xl mt-2 tracking-tight">
                      {selectedLetter.letter} <span className="text-3xl font-bold opacity-90">{selectedLetter.letter.toLowerCase()}</span>
                    </h3>
                  </div>
                  <div className="text-6xl sm:text-7xl">{selectedLetter.emoji}</div>
                </div>

                <div className="space-y-4 my-6 bg-white/15 backdrop-blur-xs p-5 rounded-2xl border border-white/20 z-10">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm uppercase tracking-wide">Word:</span>
                    <span className="font-heading font-black text-xl text-[#FFD21F]">
                      {selectedLetter.word}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs uppercase tracking-wide">Phonetic Sound:</span>
                    <span className="font-bold text-sm bg-white/20 px-2.5 py-0.5 rounded-lg">
                      {selectedLetter.phoneticSound}
                    </span>
                  </div>

                  <div>
                    <div className="text-[11px] font-black uppercase tracking-wider text-white/80 mb-1">
                      🦁 Leo’s Wonder Fact:
                    </div>
                    <p className="text-xs sm:text-sm font-medium leading-relaxed">
                      &ldquo;{selectedLetter.funFact}&rdquo;
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => playLetterSound(selectedLetter)}
                  className="w-full py-4 rounded-2xl bg-white text-[#173B5E] font-heading font-black text-base shadow-lg hover:scale-102 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer z-10"
                >
                  <Volume2 className="w-5 h-5 text-[#F4511E]" />
                  <span>Speak &quot;{selectedLetter.word}&quot; Sound</span>
                </button>
              </div>

              {/* Leo Encouragement Box */}
              <div className="bg-white rounded-3xl p-5 border-2 border-orange-200 shadow-md flex items-center gap-4">
                <LeoTeacher size={80} />
                <div className="space-y-1">
                  <h4 className="font-heading font-extrabold text-sm text-[#173B5E]">
                    Teacher Leo’s Phonics Tip
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    Repeat the sound 3 times out loud with smiling lips to build natural tongue muscle memory!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. READ-ALONG STORYBOOK */}
        {/* ========================================================================= */}
        {activeSubTab === 'storybook' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-[#29B6F6] shadow-2xl space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b pb-4 border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#0288D1] flex items-center justify-center font-heading font-black text-lg">
                    📖
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Interactive Picture Book
                    </span>
                    <h2 className="font-heading font-black text-xl sm:text-2xl text-[#173B5E]">
                      Leo’s First Day at Preschool
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500">
                    Page {currentPageIndex + 1} of {LEO_STORY_PAGES.length}
                  </span>
                  <button
                    onClick={playStoryPageAudio}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isStorySpeaking
                        ? 'bg-[#F4511E] text-white animate-pulse'
                        : 'bg-[#29B6F6] text-white hover:bg-[#0288D1]'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isStorySpeaking ? 'Stop Reading' : 'Read to Me'}</span>
                  </button>
                </div>
              </div>

              {/* Story Content Block */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Story Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100 h-64 sm:h-72">
                  <img
                    src={LEO_STORY_PAGES[currentPageIndex].illustration}
                    alt={LEO_STORY_PAGES[currentPageIndex].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#173B5E]/90 text-[#FFD21F] px-3 py-1 rounded-full text-xs font-extrabold shadow-sm">
                    Page {LEO_STORY_PAGES[currentPageIndex].pageNumber}
                  </div>
                </div>

                {/* Story Text & Interaction */}
                <div className="space-y-5">
                  <h3 className="font-heading font-black text-2xl text-[#173B5E]">
                    {LEO_STORY_PAGES[currentPageIndex].title}
                  </h3>
                  <p className="text-base text-gray-700 font-medium leading-relaxed">
                    {LEO_STORY_PAGES[currentPageIndex].storyText}
                  </p>

                  {/* Interactive Button */}
                  <div className="pt-2">
                    <button
                      onClick={handleStoryInteractive}
                      className={`w-full py-3 px-4 rounded-2xl font-heading font-extrabold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        interactiveDone
                          ? 'bg-[#5BC85A] text-white'
                          : 'bg-[#FFD21F] hover:bg-[#FFC400] text-[#173B5E]'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-[#F4511E]" />
                      <span>{LEO_STORY_PAGES[currentPageIndex].interactiveItem}</span>
                    </button>

                    {interactiveDone && (
                      <p className="text-center text-xs font-bold text-[#5BC85A] mt-2 animate-bounce">
                        ✨ {LEO_STORY_PAGES[currentPageIndex].interactiveAction}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <button
                  disabled={currentPageIndex === 0}
                  onClick={() => {
                    setCurrentPageIndex((prev) => Math.max(0, prev - 1));
                    setInteractiveDone(false);
                    setIsStorySpeaking(false);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 font-bold text-xs flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Page</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {LEO_STORY_PAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentPageIndex(i);
                        setInteractiveDone(false);
                        setIsStorySpeaking(false);
                      }}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentPageIndex === i
                          ? 'w-7 bg-[#29B6F6]'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                <button
                  disabled={currentPageIndex === LEO_STORY_PAGES.length - 1}
                  onClick={() => {
                    setCurrentPageIndex((prev) => Math.min(LEO_STORY_PAGES.length - 1, prev + 1));
                    setInteractiveDone(false);
                    setIsStorySpeaking(false);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#29B6F6] text-white font-bold text-xs flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#0288D1] transition-colors"
                >
                  <span>Next Page</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. SHAPE QUEST GAME */}
        {/* ========================================================================= */}
        {activeSubTab === 'shapes' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-[#5BC85A] shadow-2xl space-y-8 text-center">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#FFD21F]" />
                  <span className="font-heading font-extrabold text-sm text-[#173B5E]">
                    Score: {gameScore} Stars
                  </span>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-100 text-[#2E7D32] text-xs font-bold">
                  Question {(shapeQuestionIdx % SHAPE_GAME_ITEMS.length) + 1} of {SHAPE_GAME_ITEMS.length}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#173B5E]">
                  {currentShapeQuestion.prompt}
                </h2>
                <div className="flex justify-center">
                  <div
                    className="w-28 h-28 rounded-3xl flex items-center justify-center shadow-lg border-4 border-white animate-bounce"
                    style={{ backgroundColor: currentShapeQuestion.color }}
                  >
                    <span className="text-4xl text-white font-black">?</span>
                  </div>
                </div>
              </div>

              {/* Feedback Alert */}
              {gameFeedback && (
                <div className="p-3 rounded-2xl bg-[#FFF3E0] border border-orange-200 text-sm font-black text-[#F4511E] animate-fade-in">
                  {gameFeedback}
                </div>
              )}

              {/* Answer Option Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {currentShapeQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleShapeAnswer(opt.isCorrect)}
                    className="py-4 px-3 rounded-2xl border-3 border-[#173B5E]/10 bg-[#FFF9EC] hover:bg-[#FFD21F] hover:border-[#FFD21F] text-[#173B5E] font-heading font-extrabold text-base transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>Develops cognitive spatial orientation &amp; color matching</span>
                <button
                  onClick={() => {
                    setGameScore(0);
                    setShapeQuestionIdx(0);
                    setGameFeedback(null);
                  }}
                  className="flex items-center gap-1 text-[#F4511E] font-bold hover:underline cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Score</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA to Book Campus Tour */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <div className="bg-white rounded-3xl p-8 border-2 border-orange-200 shadow-md max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h3 className="font-heading font-black text-xl text-[#173B5E]">
              Love what you see? Visit our real classrooms!
            </h3>
            <p className="text-xs text-gray-600 font-medium">
              Schedule a personalized morning circle tour and let your child meet Leo in person!
            </p>
          </div>
          <button
            onClick={() => onNavigate('book-tour')}
            className="px-6 py-3 rounded-xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shrink-0 cursor-pointer"
          >
            Book Free Campus Tour 🦁
          </button>
        </div>
      </div>
    </div>
  );
};
