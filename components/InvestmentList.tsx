
import React from 'react';
import { Investment } from '../types';
import InvestmentItem from './InvestmentItem';

interface InvestmentListProps {
  investments: Investment[];
  onEdit: (investment: Investment) => void;
  onDelete: (id: string) => void;
}

const InvestmentList: React.FC<InvestmentListProps> = ({ investments, onEdit, onDelete }) => {
  return (
    <section className="p-6 bg-gray-800 rounded-xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-4 text-white">My Investments</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-600 text-sm text-gray-400 uppercase">
            <tr>
              <th className="p-4">Type</th>
              <th className="p-4">Name</th>
              <th className="p-4 text-right">Amount</th>
              <th className="p-4 hidden sm:table-cell">Purchase Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {investments.length > 0 ? (
              investments.map(inv => (
                <InvestmentItem 
                  key={inv.id} 
                  investment={inv} 
                  onEdit={onEdit} 
                  onDelete={onDelete} 
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-8 text-gray-500">
                  No investments found. Add one to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default InvestmentList;
