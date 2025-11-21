import { LucideIcon, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CounterCardProps {
  icon: LucideIcon;
  label: string;
  count: number;
  variant: "leaf" | "cigarette";
  onClick: () => void;
  onReset: () => void;
}

export const CounterCard = ({ icon: Icon, label, count, variant, onClick, onReset }: CounterCardProps) => {
  const gradientClass = variant === "leaf"
    ? "bg-gradient-to-br from-leaf to-leaf-light"
    : "bg-gradient-to-br from-cigarette-dark to-cigarette";

  return (
    <Card
      className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border-2"
      style={{
        boxShadow: "var(--shadow-soft)",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-soft)";
      }}
    >
      <div className="relative z-10 p-8 sm:p-12">
        <div className="flex flex-col items-center gap-6">
          <div className="p-6">
            <Icon className="w-16 h-16 text-foreground" strokeWidth={1.5} />
          </div>

          <div className="text-center space-y-4">
            <div className="flex items-baseline justify-center">
              <span className="text-5xl font-bold text-foreground">{count}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onReset();
              }}
              className="gap-2 opacity-60 hover:opacity-100 transition-opacity"
            >
              <RotateCcw className="w-4 h-4" />
              Zerar
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`absolute inset-0 opacity-0 hover:opacity-5 transition-opacity duration-300 ${gradientClass}`}
      />
    </Card>
  );
};
