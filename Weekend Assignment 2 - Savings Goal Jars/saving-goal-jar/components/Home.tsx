import { useState, useRef, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { useJars } from './useJars';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Target, PiggyBank } from 'lucide-react';

export function Home() {
  const { jars, grandTotal, addJar } = useJars();
  
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAdding && inputRef.current) inputRef.current.focus();
  }, [isAdding]);

  const handleAddJar = (e: React.FormEvent) => {
    e.preventDefault();
    const targetNum = parseFloat(target);
    if (!name.trim() || isNaN(targetNum) || targetNum <= 0) return;
    
    addJar(name, targetNum);
    setName('');
    setTarget('');
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen bg-[#F7FCF5] p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#E5F5E0] p-6 rounded-2xl border border-[#C7E9C0]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#C7E9C0] rounded-full flex items-center justify-center">
              <PiggyBank className="w-6 h-6 text-[#5b755c]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#2d3b2e]">My Savings Jars</h1>
              <p className="text-[#5b755c]">
                Total Saved: <span className="font-bold text-[#74C476]">₹{grandTotal.toFixed(2)}</span>
              </p>
            </div>
          </div>
          
          <Button 
            onClick={() => setIsAdding(!isAdding)}
            className="bg-[#74C476] text-white rounded-xl hover:bg-[#5da75f] shadow-sm"
          >
            {isAdding ? 'Cancel' : <><Plus className="w-4 h-4 mr-2" /> New Jar</>}
          </Button>
        </header>

        {isAdding && (
          <form onSubmit={handleAddJar} className="mb-8 p-5 bg-white rounded-2xl border border-[#C7E9C0] shadow-sm flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Target className="absolute left-3 top-3 h-4 w-4 text-[#A1D99B]" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="Goal name (e.g. Laptop)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 border-[#c2cdbc] rounded-xl focus-visible:ring-[#A1D99B] bg-[#F7FCF5]"
              />
            </div>
            <Input
              type="number"
              placeholder="Target Amount"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full md:w-48 border-[#c2cdbc] rounded-xl focus-visible:ring-[#A1D99B] bg-[#F7FCF5]"
            />
            <Button type="submit" className="bg-[#A1D99B] text-[#2d3b2e] rounded-xl hover:bg-[#74C476] hover:text-white">
              Create
            </Button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jars.map(jar => {
            const progress = Math.min((jar.currentAmount / jar.targetAmount) * 100, 100);
            const isComplete = jar.currentAmount >= jar.targetAmount;

            return (
              <Link key={jar.id} to={`/jar/${jar.id}`} className="block group">
                <div className={`relative overflow-hidden p-6 rounded-3xl border transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1 ${isComplete ? 'bg-[#E5F5E0] border-[#A1D99B]' : 'bg-white border-[#C7E9C0]'}`}>
                  {isComplete && <div className="absolute top-4 right-4 text-2xl animate-bounce">🎉</div>}
                  <h2 className="text-xl font-bold mb-1 text-[#2d3b2e]">{jar.name}</h2>
                  <div className="flex justify-between text-sm mb-4">
                    <span className="font-bold text-[#74C476]">₹{jar.currentAmount.toFixed(2)}</span>
                    <span className="text-[#c2cdbc] font-medium">/ ₹{jar.targetAmount.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-[#F7FCF5] h-3 rounded-full overflow-hidden border border-[#E5F5E0]">
                    <div 
                      className={`h-full transition-all duration-700 ease-out ${isComplete ? 'bg-[#74C476]' : 'bg-[#A1D99B]'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}