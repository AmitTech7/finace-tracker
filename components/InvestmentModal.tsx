
import React, { useState, useEffect, FormEvent } from 'react';
import { Investment, InvestmentType } from '../types';

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (investment: Investment) => void;
  investment: Investment | null;
}

const initialFormState = {
  id: '',
  type: InvestmentType.STOCK,
  name: '',
  amount: '',
  purchaseDate: new Date().toISOString().split('T')[0],
  ticker: '',
  shares: '',
  bank: '',
  interestRate: '',
  maturityDate: '',
  issuer: '',
  couponRate: '',
  fundHouse: '',
  units: '',
  currency: 'INR',
  location: '',
};

const InvestmentModal: React.FC<InvestmentModalProps> = ({ isOpen, onClose, onSave, investment }) => {
  const [formState, setFormState] = useState(initialFormState);

  useEffect(() => {
    if (investment) {
      const commonState = {
        id: investment.id,
        type: investment.type,
        name: investment.name,
        amount: String(investment.amount),
        purchaseDate: investment.purchaseDate,
      };

      let specificState = {};
      switch (investment.type) {
        case InvestmentType.STOCK:
          specificState = { ticker: investment.ticker, shares: String(investment.shares) };
          break;
        case InvestmentType.FD:
          specificState = { bank: investment.bank, interestRate: String(investment.interestRate), maturityDate: investment.maturityDate };
          break;
        case InvestmentType.BOND:
          specificState = { issuer: investment.issuer, couponRate: String(investment.couponRate), maturityDate: investment.maturityDate };
          break;
        case InvestmentType.MUTUAL_FUND:
          specificState = { fundHouse: investment.fundHouse, units: String(investment.units) };
          break;
        case InvestmentType.CASH:
          specificState = { currency: investment.currency, location: investment.location };
          break;
      }
      setFormState({ ...initialFormState, ...commonState, ...specificState });
    } else {
      setFormState(initialFormState);
    }
  }, [investment, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { id, type, name, amount, purchaseDate, ...rest } = formState;

    const newInvestment: Omit<Investment, 'id'> = {
      type,
      name,
      amount: parseFloat(amount),
      purchaseDate,
      ...(() => {
        switch (type) {
          case InvestmentType.STOCK: return { type: InvestmentType.STOCK, ticker: rest.ticker, shares: parseFloat(rest.shares) };
          case InvestmentType.FD: return { type: InvestmentType.FD, bank: rest.bank, interestRate: parseFloat(rest.interestRate), maturityDate: rest.maturityDate };
          case InvestmentType.BOND: return { type: InvestmentType.BOND, issuer: rest.issuer, couponRate: parseFloat(rest.couponRate), maturityDate: rest.maturityDate };
          case InvestmentType.MUTUAL_FUND: return { type: InvestmentType.MUTUAL_FUND, fundHouse: rest.fundHouse, units: parseFloat(rest.units) };
          case InvestmentType.CASH: return { type: InvestmentType.CASH, currency: rest.currency, location: rest.location };
          default: throw new Error('Invalid investment type');
        }
      })()
    };
    
    onSave({ ...newInvestment, id } as Investment);
  };
  
  const renderFields = () => {
    switch (formState.type) {
      case InvestmentType.STOCK:
        return <>
          <input name="ticker" value={formState.ticker} onChange={handleChange} placeholder="Ticker (e.g., RELIANCE)" required className="input-field" />
          <input name="shares" value={formState.shares} onChange={handleChange} placeholder="Number of Shares" type="number" step="any" required className="input-field" />
        </>;
      case InvestmentType.FD:
        return <>
          <input name="bank" value={formState.bank} onChange={handleChange} placeholder="Bank Name" required className="input-field" />
          <input name="interestRate" value={formState.interestRate} onChange={handleChange} placeholder="Interest Rate (%)" type="number" step="any" required className="input-field" />
          <input name="maturityDate" value={formState.maturityDate} onChange={handleChange} type="date" className="input-field" />
        </>;
      case InvestmentType.BOND:
        return <>
          <input name="issuer" value={formState.issuer} onChange={handleChange} placeholder="Issuer" required className="input-field" />
          <input name="couponRate" value={formState.couponRate} onChange={handleChange} placeholder="Coupon Rate (%)" type="number" step="any" required className="input-field" />
          <input name="maturityDate" value={formState.maturityDate} onChange={handleChange} type="date" className="input-field" />
        </>;
      case InvestmentType.MUTUAL_FUND:
        return <>
          <input name="fundHouse" value={formState.fundHouse} onChange={handleChange} placeholder="Fund House" required className="input-field" />
          <input name="units" value={formState.units} onChange={handleChange} placeholder="Number of Units" type="number" step="any" required className="input-field" />
        </>;
      case InvestmentType.CASH:
        return <>
          <input name="location" value={formState.location} onChange={handleChange} placeholder="Location (e.g., Savings Account)" required className="input-field" />
          <input name="currency" value={formState.currency} onChange={handleChange} placeholder="Currency (e.g., INR)" required className="input-field" />
        </>;
      default: return null;
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <style>{`.input-field { background-color: #1f2937; color: #d1d5db; border: 1px solid #4b5563; border-radius: 0.5rem; padding: 0.75rem; width: 100%; }`}</style>
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">&times;</button>
        <h2 className="text-2xl font-bold mb-6 text-cyan-400">{investment ? 'Edit' : 'Add'} Investment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select name="type" value={formState.type} onChange={handleChange} className="input-field">
            {Object.values(InvestmentType).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <input name="name" value={formState.name} onChange={handleChange} placeholder="Investment Name" required className="input-field" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="amount" value={formState.amount} onChange={handleChange} placeholder="Amount" type="number" step="any" required className="input-field" />
            <input name="purchaseDate" value={formState.purchaseDate} onChange={handleChange} type="date" required className="input-field" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderFields()}
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvestmentModal;
