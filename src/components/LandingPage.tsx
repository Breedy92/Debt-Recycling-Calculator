import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, PiggyBank } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Debt Recycling Made Simple
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Understand how to transform your debt into wealth in just a few clicks
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStarted}
            className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-indigo-700 transition-colors"
          >
            Let's Go
          </motion.button>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex justify-center mb-4">
                <TrendingUp className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pay Off Debt Faster</h3>
              <p className="text-gray-600">
                Strategically reduce your non-deductible debt while building wealth
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex justify-center mb-4">
                <PiggyBank className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Grow Your Net Wealth</h3>
              <p className="text-gray-600">
                Build your investment portfolio while managing debt effectively
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex justify-center mb-4">
                <DollarSign className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save on Taxes</h3>
              <p className="text-gray-600">
                Optimize your tax position through strategic debt structuring
              </p>
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-20 text-center text-sm text-gray-500">
          <p>
            This tool provides projections based on assumptions and is not financial advice.
            Please consult a licensed financial adviser before making any decisions.
          </p>
        </div>
      </div>
    </div>
  );
}