
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { InvestmentType } from '../types';

interface DashboardProps {
  totalValue: number;
  allocationData: { name: string; value: number }[];
}

const COLORS: { [key in InvestmentType]: string } = {
  [InvestmentType.STOCK]: '#38bdf8', // lightBlue-400
  [InvestmentType.MUTUAL_FUND]: '#34d399', // emerald-400
  [InvestmentType.FD]: '#fbbf24', // amber-400
  [InvestmentType.BOND]: '#a78bfa', // violet-400
  [InvestmentType.CASH]: '#f87171', // red-400
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-2 border border-gray-600 rounded-md shadow-lg">
        <p className="label text-sm text-white">{`${payload[0].name} : ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(payload[0].value)}`}</p>
      </div>
    );
  }
  return null;
};

const Dashboard: React.FC<DashboardProps> = ({ totalValue, allocationData }) => {
  const formattedTotalValue = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(totalValue);

  return (
    <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-white">Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col justify-center items-center bg-gray-900/50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-400">Total Portfolio Value</h3>
          <p className="text-4xl font-bold text-cyan-400 mt-2">{formattedTotalValue}</p>
        </div>
        <div className="lg:col-span-2 h-80 bg-gray-900/50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-400 mb-2 text-center">Asset Allocation</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                stroke="none"
              >
                {allocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name as InvestmentType] || '#8884d8'} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend iconSize={12} wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
