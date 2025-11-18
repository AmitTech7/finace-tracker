
export enum InvestmentType {
  FD = 'Fixed Deposit',
  STOCK = 'Stock',
  BOND = 'Bond',
  MUTUAL_FUND = 'Mutual Fund',
  CASH = 'Cash',
}

interface BaseInvestment {
  id: string;
  type: InvestmentType;
  name: string;
  amount: number;
  purchaseDate: string;
}

export interface FD extends BaseInvestment {
  type: InvestmentType.FD;
  interestRate: number;
  maturityDate: string;
  bank: string;
}

export interface Stock extends BaseInvestment {
  type: InvestmentType.STOCK;
  ticker: string;
  shares: number;
}

export interface Bond extends BaseInvestment {
  type: InvestmentType.BOND;
  couponRate: number;
  maturityDate: string;
  issuer: string;
}

export interface MutualFund extends BaseInvestment {
  type: InvestmentType.MUTUAL_FUND;
  fundHouse: string;
  units: number;
}

export interface Cash extends BaseInvestment {
  type: InvestmentType.CASH;
  currency: string;
  location: string;
}

export type Investment = FD | Stock | Bond | MutualFund | Cash;
