
import React from 'react';
import { Investment, InvestmentType } from '../types';
import { StockIcon, MutualFundIcon, FDIcon, BondIcon, CashIcon } from './icons/AssetIcons';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';

interface InvestmentItemProps {
  investment: Investment;
  onEdit: (investment: Investment) => void;
  onDelete: (id: string) => void;
}

const TypeDisplay: React.FC<{ type: InvestmentType }> = ({ type }) => {
  const getIcon = () => {
    switch (type) {
      case InvestmentType.STOCK: return <StockIcon className="w-6 h-6 text-blue-400" />;
      case InvestmentType.MUTUAL_FUND: return <MutualFundIcon className="w-6 h-6 text-green-400" />;
      case InvestmentType.FD: return <FDIcon className="w-6 h-6 text-yellow-400" />;
      case InvestmentType.BOND: return <BondIcon className="w-6 h-6 text-purple-400" />;
      case InvestmentType.CASH: return <CashIcon className="w-6 h-6 text-red-400" />;
      default: return null;
    }
  };

  return (
    <div className="flex items-center gap-3">
      {getIcon()}
      <span className="font-medium hidden md:inline">{type}</span>
    </div>
  );
};


const InvestmentItem: React.FC<InvestmentItemProps> = ({ investment, onEdit, onDelete }) => {
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(investment.amount);
  
  const formattedDate = new Date(investment.purchaseDate).toLocaleDateString();

  return (
    <tr className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
      <td className="p-4">
        <TypeDisplay type={investment.type} />
      </td>
      <td className="p-4 font-semibold">{investment.name}</td>
      <td className="p-4 text-right font-mono">{formattedAmount}</td>
      <td className="p-4 hidden sm:table-cell">{formattedDate}</td>
      <td className="p-4">
        <div className="flex justify-center items-center gap-2">
          <button onClick={() => onEdit(investment)} className="p-2 text-gray-400 hover:text-cyan-400 rounded-full transition-colors">
            <PencilIcon className="w-5 h-5" />
          </button>
          <button onClick={() => onDelete(investment.id)} className="p-2 text-gray-400 hover:text-red-500 rounded-full transition-colors">
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default InvestmentItem;
