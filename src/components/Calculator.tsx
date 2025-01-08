import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { CalculatorInputs } from '../types';
import { ProjectionGraphs } from './ProjectionGraphs';

const defaultInputs: CalculatorInputs = {
  annualSalary: 100000,
  existingInvestment: 50000,
  newInvestmentAmount: 200000,
  monthlyContribution: 1000,
  mortgageBalance: 500000,
  existingInvestmentLoanBalance: 100000,
  newInvestmentLoanBalance: 200000,
  mortgageRate: 4.5,
  investmentLoanRate: 5.5,
  loanTerm: 30,
  growthRate: 7,
  dividendRate: 4
};

export function Calculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Calculator Inputs</h2>
                <button
                  onClick={() => setShowHowItWorks(!showHowItWorks)}
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  <Info className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Annual Salary ($)
                  </label>
                  <input
                    type="number"
                    name="annualSalary"
                    value={inputs.annualSalary}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Existing Investment ($)
                  </label>
                  <input
                    type="number"
                    name="existingInvestment"
                    value={inputs.existingInvestment}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Investment Amount ($)
                  </label>
                  <input
                    type="number"
                    name="newInvestmentAmount"
                    value={inputs.newInvestmentAmount}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Monthly Contribution ($)
                  </label>
                  <input
                    type="number"
                    name="monthlyContribution"
                    value={inputs.monthlyContribution}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mortgage Balance ($)
                  </label>
                  <input
                    type="number"
                    name="mortgageBalance"
                    value={inputs.mortgageBalance}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Existing Investment Loan ($)
                  </label>
                  <input
                    type="number"
                    name="existingInvestmentLoanBalance"
                    value={inputs.existingInvestmentLoanBalance}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Investment Loan ($)
                  </label>
                  <input
                    type="number"
                    name="newInvestmentLoanBalance"
                    value={inputs.newInvestmentLoanBalance}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mortgage Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    name="mortgageRate"
                    value={inputs.mortgageRate}
                    onChange={handleInputChange}
                    step="0.1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Investment Loan Rate (%)
                  </label>
                  <input
                    type="number"
                    name="investmentLoanRate"
                    value={inputs.investmentLoanRate}
                    onChange={handleInputChange}
                    step="0.1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Loan Term (years)
                  </label>
                  <input
                    type="number"
                    name="loanTerm"
                    value={inputs.loanTerm}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expected Investment Growth Rate (%)
                  </label>
                  <input
                    type="number"
                    name="growthRate"
                    value={inputs.growthRate}
                    onChange={handleInputChange}
                    step="0.1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expected Dividend Rate (%)
                  </label>
                  <input
                    type="number"
                    name="dividendRate"
                    value={inputs.dividendRate}
                    onChange={handleInputChange}
                    step="0.1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {showHowItWorks && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4">How Debt Recycling Works</h3>
                <div className="space-y-6 text-sm text-gray-600">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">The Basic Strategy</h4>
                    <p>Debt recycling converts non-deductible debt (your home loan) into tax-deductible debt (investment loan) while building an investment portfolio.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">How the Numbers Work</h4>
                    <ol className="list-decimal pl-4 space-y-2">
                      <li>You borrow money against your home to invest (this becomes tax-deductible debt)</li>
                      <li>Your investments generate dividend income</li>
                      <li>You can claim tax deductions on the investment loan interest</li>
                      <li>Both the dividend income and tax savings are used to pay down your non-deductible home loan faster</li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">The Calculation Process</h4>
                    <ol className="list-decimal pl-4 space-y-2">
                      <li>Investment Returns:
                        <ul className="list-disc pl-4 mt-1">
                          <li>Dividend income = Investment amount × Dividend rate</li>
                          <li>Capital growth = Investment amount × Growth rate</li>
                        </ul>
                      </li>
                      <li>Tax Benefits:
                        <ul className="list-disc pl-4 mt-1">
                          <li>Tax-deductible interest = Investment loan × Interest rate</li>
                          <li>Tax savings = Tax-deductible interest × Your tax rate</li>
                        </ul>
                      </li>
                      <li>Extra Mortgage Repayment:
                        <ul className="list-disc pl-4 mt-1">
                          <li>Net dividends (after tax) + Tax savings from deductible interest</li>
                          <li>This amount goes directly to reducing your home loan</li>
                        </ul>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Example</h4>
                    <p>On a $200,000 investment loan at 5.5% interest rate (assuming 37% tax bracket):</p>
                    <ul className="list-disc pl-4 space-y-1 mt-2">
                      <li>Annual interest = $11,000</li>
                      <li>Tax deduction = $4,070 (37% of interest)</li>
                      <li>If investments earn 4% dividends = $8,000</li>
                      <li>Total benefit = $12,070 to pay down your home loan faster</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800">Important Notes</h4>
                    <ul className="list-disc pl-4 space-y-1 mt-2">
                      <li>All calculations assume a constant tax rate of 37%</li>
                      <li>Investment returns can vary and are not guaranteed</li>
                      <li>The strategy's effectiveness depends on maintaining investment loan tax deductibility</li>
                      <li>Consider seeking professional advice for your situation</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-2">
            <ProjectionGraphs inputs={inputs} />
          </div>
        </motion.div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Important Disclosure</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              This calculator provides general projections based on the assumptions you enter.
              The results should be used as a guide only and not as a guarantee of future
              performance.
            </p>
            <p>
              Investment markets are unpredictable and actual results may vary significantly
              from these projections. Past performance is not indicative of future returns.
            </p>
            <p>
              Debt recycling involves financial risks including but not limited to:
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li>Interest rate fluctuations affecting borrowing costs</li>
              <li>Investment value volatility</li>
              <li>Changes to tax laws affecting deductibility</li>
            </ul>
            <p className="mt-4 font-semibold">
              Please consult a licensed financial adviser before implementing any investment
              strategy. This calculator does not constitute financial advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}