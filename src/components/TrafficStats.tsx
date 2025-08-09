import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, Clock } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color?: 'green' | 'yellow' | 'red' | 'blue';
}

const StatCard = ({ title, value, change, icon, color = 'blue' }: StatCardProps) => {
  const colorClasses = {
    green: 'text-traffic-green',
    yellow: 'text-traffic-yellow', 
    red: 'text-traffic-red',
    blue: 'text-primary'
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <div className="flex items-center gap-1 mt-1">
              {change > 0 ? (
                <TrendingUp className="w-4 h-4 text-traffic-green" />
              ) : (
                <TrendingDown className="w-4 h-4 text-traffic-red" />
              )}
              <span className={`text-sm font-medium ${change > 0 ? 'text-traffic-green' : 'text-traffic-red'}`}>
                {Math.abs(change)}%
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-full bg-secondary ${colorClasses[color]}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const TrafficStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Active Intersections"
        value="24"
        change={5.2}
        icon={<Activity className="w-6 h-6" />}
        color="green"
      />
      <StatCard
        title="Emergency Alerts"
        value="3"
        change={-12.5}
        icon={<TrendingDown className="w-6 h-6" />}
        color="red"
      />
      <StatCard
        title="Avg Wait Time"
        value="2.3min"
        change={-8.1}
        icon={<Clock className="w-6 h-6" />}
        color="yellow"
      />
      <StatCard
        title="Traffic Flow"
        value="87%"
        change={12.3}
        icon={<TrendingUp className="w-6 h-6" />}
        color="blue"
      />
    </div>
  );
};