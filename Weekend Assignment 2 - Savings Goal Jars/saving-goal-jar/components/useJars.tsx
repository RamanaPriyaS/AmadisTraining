import { useState, useEffect, useMemo } from 'react';

export type Deposit = { id: string; amount: number; date: string };
export type Jar = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deposits: Deposit[];
};

export function useJars() {
  // Load jars from local storage on first mount
  const [jars, setJars] = useState<Jar[]>(() => {
    const saved = localStorage.getItem('jars');
    return saved ? JSON.parse(saved) : [];
  });

  // Auto-save to local storage whenever jars change
  useEffect(() => {
    localStorage.setItem('jars', JSON.stringify(jars));
  }, [jars]);

  // Calculate the sum of all jars
  const grandTotal = useMemo(() => {
    return jars.reduce((total, jar) => total + jar.currentAmount, 0);
  }, [jars]);

  const addJar = (name: string, targetAmount: number) => {
    const newJar: Jar = {
      id: crypto.randomUUID(),
      name,
      targetAmount,
      currentAmount: 0,
      deposits: [],
    };
    setJars([...jars, newJar]);
  };

  const addDeposit = (jarId: string, amount: number) => {
    setJars((prevJars) =>
      prevJars.map((jar) => {
        if (jar.id === jarId) {
          const newDeposit = {
            id: crypto.randomUUID(),
            amount,
            date: new Date().toLocaleDateString(),
          };
          return {
            ...jar,
            currentAmount: jar.currentAmount + amount,
            deposits: [newDeposit, ...jar.deposits],
          };
        }
        return jar;
      })
    );
  };

  return { jars, grandTotal, addJar, addDeposit };
}