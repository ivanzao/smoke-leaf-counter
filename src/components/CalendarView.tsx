import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cigarette, Leaf } from "lucide-react";
import { getNowGMT3, formatDateGMT3, getStartOfMonthGMT3, getEndOfMonthGMT3 } from "@/lib/date-utils";
import { MonthlyChart } from "./MonthlyChart";

interface DayData {
  date: string;
  cigarette: number;
  leaf: number;
}

interface CalendarViewProps {
  data: Record<string, DayData>;
}

export const CalendarView = ({ data }: CalendarViewProps) => {
  const getWeekDays = () => {
    const days = [];
    const today = getNowGMT3();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    return days;
  };

  const getMonthDays = () => {
    const days = [];
    const firstDay = getStartOfMonthGMT3();
    const lastDay = getEndOfMonthGMT3();

    for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    return days;
  };

  const getDayData = (date: Date) => {
    const dateStr = formatDateGMT3(date, 'yyyy-MM-dd');
    return data[dateStr] || { date: dateStr, cigarette: 0, leaf: 0 };
  };

  const DayCell = ({ date, isToday }: { date: Date; isToday?: boolean }) => {
    const dayData = getDayData(date);
    const total = dayData.cigarette + dayData.leaf;

    return (
      <div className={`
        flex flex-col items-center gap-2 p-3 rounded-2xl transition-all
        ${isToday ? 'bg-accent ring-2 ring-primary' : 'bg-card'}
        ${total > 0 ? 'opacity-100' : 'opacity-40'}
      `}>
        <div className="text-xs font-medium text-muted-foreground">
          {formatDateGMT3(date, 'dd MMM')}
        </div>

        <div className="flex gap-2 items-center">
          {dayData.cigarette > 0 && (
            <div className="flex items-center gap-1">
              <Cigarette className="w-4 h-4 text-foreground" />
              <span className="text-sm font-semibold text-foreground">{dayData.cigarette}</span>
            </div>
          )}
          {dayData.leaf > 0 && (
            <div className="flex items-center gap-1">
              <Leaf className="w-4 h-4 text-foreground" />
              <span className="text-sm font-semibold text-foreground">{dayData.leaf}</span>
            </div>
          )}
        </div>

        {total === 0 && (
          <span className="text-xs text-muted-foreground">—</span>
        )}
      </div>
    );
  };

  const weekDays = getWeekDays();
  const monthDays = getMonthDays();
  const today = getNowGMT3();
  const todayStr = formatDateGMT3(today, 'yyyy-MM-dd');

  return (
    <Card className="p-6 sm:p-8" style={{ boxShadow: "var(--shadow-soft)" }}>
      <Tabs defaultValue="week" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="week" className="rounded-xl">Semana</TabsTrigger>
          <TabsTrigger value="month" className="rounded-xl">Mês</TabsTrigger>
        </TabsList>

        <TabsContent value="week" className="mt-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {weekDays.map((date) => (
              <DayCell
                key={date.toISOString()}
                date={date}
                isToday={formatDateGMT3(date, 'yyyy-MM-dd') === todayStr}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="month" className="mt-0">
          <MonthlyChart data={data} currentMonthDays={monthDays} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};
