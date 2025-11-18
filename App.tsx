
import React, { useState, useMemo, useEffect } from 'react';
import { Investment, InvestmentType } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import InvestmentList from './components/InvestmentList';
import InvestmentModal from './components/InvestmentModal';

const initialInvestments: Investment[] = [
  { id: '1', type: InvestmentType.STOCK, name: 'Reliance Industries', ticker: 'RELIANCE', amount: 150000, purchaseDate: '2023-01-15', shares: 50 },
  { id: '2', type: InvestmentType.MUTUAL_FUND, name: 'SBI Bluechip Fund', fundHouse: 'SBI', amount: 250000, purchaseDate: '2022-11-20', units: 1000 },
  { id: '3', type: InvestmentType.FD, name: 'HDFC Bank FD', bank: 'HDFC Bank', amount: 500000, purchaseDate: '2023-05-10', interestRate: 7.1, maturityDate: '2025-05-10' },
  { id: '4', type: InvestmentType.BOND, name: 'GOI Savings Bond', issuer: 'Govt of India', amount: 100000, purchaseDate: '2023-03-22', couponRate: 7.75, maturityDate: '2030-03-22' },
  { id: '5', type: InvestmentType.CASH, name: 'Savings Account', location: 'ICICI Bank', amount: 300000, purchaseDate: '2023-01-01', currency: 'INR' },
];

const LOCAL_STORAGE_KEY = 'finance_tracker_investments';

const App: React.FC = () => {
  const [investments, setInvestments] = useState<Investment[]>(() => {
    try {
      const savedInvestments = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedInvestments) {
        return JSON.parse(savedInvestments);
      }
    } catch (error) {
      console.error("Failed to parse investments from localStorage", error);
    }
    return initialInvestments;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(investments));
    } catch (error) {
      console.error("Failed to save investments to localStorage", error);
    }
  }, [investments]);


  const handleAddInvestment = () => {
    setEditingInvestment(null);
    setIsModalOpen(true);
  };

  const handleEditInvestment = (investment: Investment) => {
    setEditingInvestment(investment);
    setIsModalOpen(true);
  };

  const handleDeleteInvestment = (id: string) => {
    setInvestments(investments.filter(inv => inv.id !== id));
  };

  const handleSaveInvestment = (investment: Investment) => {
    if (editingInvestment && investment.id) {
      setInvestments(investments.map(inv => (inv.id === investment.id ? investment : inv)));
    } else {
      setInvestments([...investments, { ...investment, id: crypto.randomUUID() }]);
    }
    setIsModalOpen(false);
    setEditingInvestment(null);
  };
  
  const totalValue = useMemo(() => investments.reduce((sum, inv) => sum + inv.amount, 0), [investments]);
  
  const allocationData = useMemo(() => {
    const allocation: { [key in InvestmentType]?: number } = {};
    investments.forEach(inv => {
      if (allocation[inv.type]) {
        allocation[inv.type]! += inv.amount;
      } else {
        allocation[inv.type] = inv.amount;
      }
    });
    return Object.entries(allocation).map(([name, value]) => ({ name, value }));
  }, [investments]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Header onAddInvestment={handleAddInvestment} />
        <main>
          <Dashboard totalValue={totalValue} allocationData={allocationData} />
          <InvestmentList 
            investments={investments} 
            onEdit={handleEditInvestment} 
            onDelete={handleDeleteInvestment}
          />
        </main>
      </div>
      <InvestmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveInvestment}
        investment={editingInvestment}
      />
    </div>
  );
};

export default App;
