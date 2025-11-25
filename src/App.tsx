import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner, toast } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Cigarette, Leaf } from "lucide-react";
import { CounterCard } from "@/components/CounterCard";
import { CalendarView } from "@/components/CalendarView";

interface DayData {
  date: string;
  cigarette: number;
  leaf: number;
}

import { getTodayKeyGMT3 } from "@/lib/date-utils";

const App = () => {
  const [data, setData] = useState<Record<string, DayData>>({});
  const today = getTodayKeyGMT3();

  useEffect(() => {
    const stored = localStorage.getItem('smoking-tracker');
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      localStorage.setItem('smoking-tracker', JSON.stringify(data));
    }
  }, [data]);

  const incrementCount = (type: 'cigarette' | 'leaf') => {
    setData((prev) => {
      const todayData = prev[today] || { date: today, cigarette: 0, leaf: 0 };
      const newCount = todayData[type] + 1;

      toast.success(`+1 ${type === 'cigarette' ? 'cigarro' : 'folha'}`, {
        description: `Total hoje: ${newCount}`,
        duration: 2000,
      });

      return {
        ...prev,
        [today]: {
          ...todayData,
          [type]: newCount,
        },
      };
    });
  };

  const resetCount = (type: 'cigarette' | 'leaf') => {
    setData((prev) => {
      const todayData = prev[today] || { date: today, cigarette: 0, leaf: 0 };

      toast.info(`Contador ${type === 'cigarette' ? 'cigarro' : 'folha'} zerado`, {
        description: 'Contagem de hoje reiniciada',
        duration: 2000,
      });

      return {
        ...prev,
        [today]: {
          ...todayData,
          [type]: 0,
        },
      };
    });
  };

  const todayData = data[today] || { date: today, cigarette: 0, leaf: 0 };

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-12">
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
              Puff Tracker
            </h1>
            <p className="text-muted-foreground">do but don't forget</p>
          </header>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-12">
            <CounterCard
              icon={Cigarette}
              label="Cigarro"
              count={todayData.cigarette}
              variant="cigarette"
              onClick={() => incrementCount('cigarette')}
              onReset={() => resetCount('cigarette')}
            />
            <CounterCard
              icon={Leaf}
              label="Folha"
              count={todayData.leaf}
              variant="leaf"
              onClick={() => incrementCount('leaf')}
              onReset={() => resetCount('leaf')}
            />
          </div>

          <CalendarView data={data} />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default App;
