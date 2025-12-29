import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card } from "@/components/ui/card";
import { formatDateGMT3 } from "@/lib/date-utils";

interface DayData {
    date: string;
    cigarette: number;
    leaf: number;
}

interface MonthlyChartProps {
    data: Record<string, DayData>;
    currentMonthDays: Date[];
}

export const MonthlyChart = ({ data, currentMonthDays }: MonthlyChartProps) => {
    const chartData = currentMonthDays.map((date) => {
        const dateStr = formatDateGMT3(date, 'yyyy-MM-dd');
        const dayData = data[dateStr] || { cigarette: 0, leaf: 0 };
        return {
            day: formatDateGMT3(date, 'dd'),
            fullDate: formatDateGMT3(date, 'dd/MM'),
            cigarette: dayData.cigarette,
            leaf: dayData.leaf,
        };
    });

    return (
        <div className="h-[200px] w-full mt-4 mb-6" style={{ fontFamily: 'inherit' }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground))" opacity={0.1} />
                    <XAxis
                        dataKey="day"
                        tickLine={false}
                        axisLine={true}
                        tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))', fontFamily: 'sans-serif' }}
                        interval={2}
                    />
                    <YAxis
                        domain={[0, 6]}
                        tickLine={false}
                        axisLine={true}
                        tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))', fontFamily: 'sans-serif' }}
                        width={20}
                    />
                    <Tooltip
                        cursor={{ fill: 'var(--accent)', opacity: 0.2 }}
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <Card className="p-2 border-none shadow-lg bg-popover/95 backdrop-blur-sm">
                                        <div className="text-xs font-medium text-muted-foreground mb-1">
                                            {payload[0].payload.fullDate}
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="flex items-center gap-1">
                                                <div className="w-2 h-2 rounded-full bg-[#ba5f27]" />
                                                <span className="text-sm font-bold">{payload[0].value}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="w-2 h-2 rounded-full bg-[#27ba42]" />
                                                <span className="text-sm font-bold">{payload[1].value}</span>
                                            </div>
                                        </div>
                                    </Card>
                                );
                            }
                            return null;
                        }}
                    />
                    <Bar
                        dataKey="cigarette"
                        fill="#ba5f27"
                        fillOpacity={0.8}
                        radius={[4, 4, 0, 0]}
                    />
                    <Bar
                        dataKey="leaf"
                        fill="#27ba42"
                        fillOpacity={0.8}
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
