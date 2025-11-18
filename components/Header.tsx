
import React from 'react';
import { PlusCircleIcon } from './icons/PlusCircleIcon';

interface HeaderProps {
  onAddInvestment: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddInvestment }) => {
  return (
    <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-700">
      <h1 className="text-3xl sm:text-4xl font-bold text-cyan-400 tracking-tight">
        Finance Tracker
      </h1>
      <button
        onClick={onAddInvestment}
        className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
      >
        <PlusCircleIcon className="w-5 h-5" />
        <span className="hidden sm:inline">Add Investment</span>
      </button>
    </header>
  );
};

export default Header;
