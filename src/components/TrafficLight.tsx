import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TrafficLightProps {
  currentState: 'red' | 'yellow' | 'green';
  isActive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onStateChange?: (state: 'red' | 'yellow' | 'green') => void;
}

export const TrafficLight = ({ 
  currentState, 
  isActive = true, 
  size = 'md',
  onStateChange 
}: TrafficLightProps) => {
  const [glowing, setGlowing] = useState(false);

  useEffect(() => {
    if (isActive) {
      setGlowing(true);
      const timer = setTimeout(() => setGlowing(false), 300);
      return () => clearTimeout(timer);
    }
  }, [currentState, isActive]);

  const sizeClasses = {
    sm: 'w-16 h-28',
    md: 'w-20 h-36',
    lg: 'w-24 h-44'
  };

  const lightSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className={cn(
      "bg-card border border-border rounded-xl p-3 flex flex-col items-center gap-2",
      sizeClasses[size],
      "shadow-lg"
    )}>
      {/* Red Light */}
      <div 
        className={cn(
          "rounded-full border-2 transition-all duration-300",
          lightSizes[size],
          currentState === 'red' && isActive
            ? "bg-traffic-red border-traffic-red shadow-[0_0_20px_hsl(var(--traffic-red))]"
            : "bg-card border-border opacity-30"
        )}
      />
      
      {/* Yellow Light */}
      <div 
        className={cn(
          "rounded-full border-2 transition-all duration-300",
          lightSizes[size],
          currentState === 'yellow' && isActive
            ? "bg-traffic-yellow border-traffic-yellow shadow-[0_0_20px_hsl(var(--traffic-yellow))]"
            : "bg-card border-border opacity-30"
        )}
      />
      
      {/* Green Light */}
      <div 
        className={cn(
          "rounded-full border-2 transition-all duration-300",
          lightSizes[size],
          currentState === 'green' && isActive
            ? "bg-traffic-green border-traffic-green shadow-[0_0_20px_hsl(var(--traffic-green))]"
            : "bg-card border-border opacity-30"
        )}
      />
    </div>
  );
};