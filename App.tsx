import React, { useState, useMemo, useEffect } from "react";
import { Investment, InvestmentType } from "./types";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import InvestmentList from "./components/InvestmentList";
import InvestmentModal from "./components/InvestmentModal";
import { apiService } from "./api";

const App: React.FC = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInvestments();
  }, []);

  const loadInvestments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await apiService.getAllInvestments();
      setInvestments(data);
    } catch (error) {
      console.error("Failed to load investments..", error);
      setError(
        "Failed to load investments. Please check if the server is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddInvestment = () => {
    setEditingInvestment(null);
    setIsModalOpen(true);
  };

  const handleEditInvestment = (investment: Investment) => {
    setEditingInvestment(investment);
    setIsModalOpen(true);
  };

  const handleDeleteInvestment = async (id: string) => {
    try {
      await apiService.deleteInvestment(id);
      setInvestments(investments.filter((inv) => inv.id !== id));
    } catch (error) {
      console.error("Failed to delete investment", error);
      setError("Failed to delete investment. Please try again.");
    }
  };

  const handleSaveInvestment = async (investment: Investment) => {
    try {
      if (editingInvestment && investment.id) {
        const updated = await apiService.updateInvestment(
          investment.id,
          investment
        );
        setInvestments(
          investments.map((inv) => (inv.id === investment.id ? updated : inv))
        );
      } else {
        const newInvestment = { ...investment, id: crypto.randomUUID() };
        const created = await apiService.createInvestment(newInvestment);
        setInvestments([...investments, created]);
      }
      setIsModalOpen(false);
      setEditingInvestment(null);
    } catch (error) {
      console.error("Failed to save investment", error);
      setError("Failed to save investment. Please try again.");
    }
  };

  const totalValue = useMemo(
    () => investments.reduce((sum, inv) => sum + inv.amount, 0),
    [investments]
  );

  const allocationData = useMemo(() => {
    const allocation: { [key in InvestmentType]?: number } = {};
    investments.forEach((inv) => {
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

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-4">
            <p>{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-sm underline mt-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-lg">Loading investments...</div>
          </div>
        ) : (
          <main>
            <Dashboard
              totalValue={totalValue}
              allocationData={allocationData}
            />
            <InvestmentList
              investments={investments}
              onEdit={handleEditInvestment}
              onDelete={handleDeleteInvestment}
            />
          </main>
        )}
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
