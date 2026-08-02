import { useState } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { useJars } from './useJars';
import { ArrowLeft, Plus, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function JarPage() {
  const { jarId } = useParams({ strict: false });
  const { jars, addDeposit } = useJars();
  const [depositAmount, setDepositAmount] = useState('');

  const jar = jars.find(j => j.id === jarId);

  if (!jar) return <div className="min-h-screen bg-[#F7FCF5] p-6 text-[#5b755c]">Jar not found!</div>;

  const progress = Math.min((jar.currentAmount / jar.targetAmount) * 100, 100);
  const isComplete = jar.currentAmount >= jar.targetAmount;

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) return;
    addDeposit(jar.id, amount);
    setDepositAmount('');
  };

  return (
    <div className="min-h-screen bg-[#F7FCF5] p-6 font-sans text-[#2d3b2e]">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="flex items-center text-[#5b755c] font-medium hover:text-[#74C476] hover:underline mb-6 transition w-fit">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>

        <div className={`p-8 rounded-3xl border mb-8 text-center relative shadow-sm transition-colors duration-500 ${isComplete ? 'bg-[#E5F5E0] border-[#A1D99B]' : 'bg-white border-[#C7E9C0]'}`}>
          {isComplete && <div className="text-4xl mb-4 animate-bounce">🎉 Congratulations! 🎉</div>}
          <h1 className="text-4xl font-bold mb-2 text-[#2d3b2e]">{jar.name}</h1>
          <p className="text-xl text-[#74C476] font-bold mb-6">
            ₹{jar.currentAmount.toFixed(2)} <span className="text-[#c2cdbc] font-medium">/ ₹{jar.targetAmount.toFixed(2)}</span>
          </p>
          
          <div className="w-full bg-[#F7FCF5] h-6 rounded-full overflow-hidden border border-[#E5F5E0] mb-3 shadow-inner">
            <div 
              className={`h-full transition-all duration-700 ease-out ${isComplete ? 'bg-[#74C476]' : 'bg-[#A1D99B]'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-[#5b755c] font-medium text-right">{progress.toFixed(1)}% full</p>
        </div>

        <form onSubmit={handleDeposit} className="flex flex-col sm:flex-row gap-4 mb-10">
          <Input
            type="number"
            placeholder="Deposit amount (e.g. 50)"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            className="flex-1 border-[#c2cdbc] rounded-xl text-lg focus-visible:ring-[#A1D99B] bg-white shadow-sm h-14"
          />
          <Button type="submit" className="bg-[#74C476] text-white px-8 rounded-xl font-semibold hover:bg-[#5da75f] transition shadow-md h-14">
            <Plus className="w-5 h-5 mr-2" /> Add Funds
          </Button>
        </form>

        <div className="bg-white p-6 rounded-3xl border border-[#C7E9C0] shadow-sm">
          <h3 className="text-xl font-bold mb-4 border-b border-[#E5F5E0] pb-3 text-[#2d3b2e] flex items-center">
            <History className="w-5 h-5 mr-2 text-[#A1D99B]" /> Deposit History
          </h3>
          {jar.deposits.length === 0 ? (
            <p className="text-[#5b755c] italic text-center py-4">No deposits yet. Start saving!</p>
          ) : (
            <ul className="space-y-3">
              {jar.deposits.map(dep => (
                <li key={dep.id} className="flex justify-between items-center bg-[#F7FCF5] p-4 rounded-xl border border-[#E5F5E0]">
                  <span className="text-[#5b755c] font-medium">{dep.date}</span>
                  <span className="font-bold text-[#74C476]">+ ₹{dep.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}