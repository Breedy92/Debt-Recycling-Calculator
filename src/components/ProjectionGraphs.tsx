import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { CalculatorInputs, ProjectionData } from '../types';

interface ProjectionGraphsProps {
  inputs: CalculatorInputs;
}

function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 12;
  const numberOfPayments = years * 12;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
}

function calculateProjections(inputs: CalculatorInputs): ProjectionData[] {
  const data: ProjectionData[] = [];
  const monthlyRate = (inputs.mortgageRate / 100) / 12;
  const numberOfPayments = inputs.loanTerm * 12;
  const monthlyMortgagePayment = calculateMonthlyPayment(inputs.mortgageBalance, inputs.mortgageRate / 100, inputs.loanTerm);
  
  let currentMortgageWithoutStrategy = inputs.mortgageBalance;
  let currentMortgageWithStrategy = inputs.mortgageBalance;
  let currentInvestmentWithoutStrategy = inputs.existingInvestment;
  let currentInvestmentWithStrategy = inputs.newInvestmentAmount;
  let totalInvestmentLoanWithStrategy = inputs.existingInvestmentLoanBalance + inputs.newInvestmentLoanBalance;
  
  for (let year = 0; year <= inputs.loanTerm; year++) {
    // Without Strategy - Proper P&I calculation
    let yearStartBalance = currentMortgageWithoutStrategy;
    for (let month = 0; month < 12; month++) {
      const interestPayment = yearStartBalance * monthlyRate;
      const principalPayment = monthlyMortgagePayment - interestPayment;
      yearStartBalance = Math.max(0, yearStartBalance - principalPayment);
    }
    currentMortgageWithoutStrategy = yearStartBalance;
    
    // Investment growth without strategy
    currentInvestmentWithoutStrategy = currentInvestmentWithoutStrategy * (1 + inputs.growthRate / 100) +
      (inputs.monthlyContribution * 12);
    
    // With Strategy
    const annualDividends = currentInvestmentWithStrategy * (inputs.dividendRate / 100);
    const taxOnDividends = annualDividends * 0.37;
    const taxSavings = (inputs.investmentLoanRate / 100) * totalInvestmentLoanWithStrategy * 0.37;
    const netDividends = annualDividends - taxOnDividends;
    
    // Update investment value with strategy
    currentInvestmentWithStrategy = currentInvestmentWithStrategy * (1 + inputs.growthRate / 100) + 
      (inputs.monthlyContribution * 12) + netDividends;
    
    // Extra repayments from tax savings and net dividends
    const extraRepayment = taxSavings + netDividends;
    
    // With Strategy - P&I calculation plus extra repayments
    yearStartBalance = currentMortgageWithStrategy;
    for (let month = 0; month < 12; month++) {
      const interestPayment = yearStartBalance * monthlyRate;
      const principalPayment = monthlyMortgagePayment - interestPayment;
      const monthlyExtraRepayment = extraRepayment / 12;
      yearStartBalance = Math.max(0, yearStartBalance - (principalPayment + monthlyExtraRepayment));
    }
    currentMortgageWithStrategy = yearStartBalance;

    data.push({
      year,
      netAssetsWithoutStrategy: currentInvestmentWithoutStrategy - currentMortgageWithoutStrategy,
      netAssetsWithStrategy: currentInvestmentWithStrategy - currentMortgageWithStrategy - totalInvestmentLoanWithStrategy,
      nonDeductibleDebtWithoutStrategy: currentMortgageWithoutStrategy,
      nonDeductibleDebtWithStrategy: currentMortgageWithStrategy
    });
  }

  return data;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

export function ProjectionGraphs({ inputs }: ProjectionGraphsProps) {
  const data = calculateProjections(inputs);
  const finalYear = data[data.length - 1];
  const wealthDifference = finalYear.netAssetsWithStrategy - finalYear.netAssetsWithoutStrategy;

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Additional Wealth Created</p>
            <p className="text-2xl font-bold text-indigo-600">{formatCurrency(wealthDifference)}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Time to Pay Off Non-Deductible Debt</p>
            <p className="text-2xl font-bold text-indigo-600">
              {data.findIndex(d => d.nonDeductibleDebtWithStrategy <= 0)} years
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Net Asset Projection</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year"
                padding={{ left: 20, right: 20 }}
              />
              <YAxis 
                tickFormatter={(value) => formatCurrency(value)}
                width={100}
                padding={{ top: 20, bottom: 20 }}
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `Year ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="netAssetsWithStrategy"
                stroke="#4F46E5"
                name="With Strategy"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="netAssetsWithoutStrategy"
                stroke="#9333EA"
                name="Without Strategy"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Debt Reduction Timeline</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year"
                padding={{ left: 20, right: 20 }}
              />
              <YAxis 
                tickFormatter={(value) => formatCurrency(value)}
                width={100}
                padding={{ top: 20, bottom: 20 }}
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `Year ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="nonDeductibleDebtWithoutStrategy"
                stroke="#DC2626"
                name="Non-deductible Debt Without Strategy"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="nonDeductibleDebtWithStrategy"
                stroke="#2563EB"
                name="Non-deductible Debt With Strategy"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}