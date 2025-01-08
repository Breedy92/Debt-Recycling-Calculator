export interface CalculatorInputs {
  annualSalary: number;
  existingInvestment: number;
  newInvestmentAmount: number;
  monthlyContribution: number;
  mortgageBalance: number;
  existingInvestmentLoanBalance: number;
  newInvestmentLoanBalance: number;
  mortgageRate: number;
  investmentLoanRate: number;
  loanTerm: number;
  growthRate: number;
  dividendRate: number;
}

export interface ProjectionData {
  year: number;
  netAssetsWithoutStrategy: number;
  netAssetsWithStrategy: number;
  nonDeductibleDebtWithoutStrategy: number;
  nonDeductibleDebtWithStrategy: number;
}