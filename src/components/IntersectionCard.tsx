import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrafficLight } from "./TrafficLight";
import { MapPin, Settings, AlertTriangle } from "lucide-react";

interface IntersectionCardProps {
  id: string;
  name: string;
  location: string;
  currentPhase: 'red' | 'yellow' | 'green';
  isEmergency?: boolean;
  trafficVolume: number;
  onEmergencyToggle?: (id: string) => void;
  onSettings?: (id: string) => void;
}

export const IntersectionCard = ({
  id,
  name,
  location,
  currentPhase,
  isEmergency = false,
  trafficVolume,
  onEmergencyToggle,
  onSettings
}: IntersectionCardProps) => {
  const [phase, setPhase] = useState(currentPhase);
  const [isAuto, setIsAuto] = useState(!isEmergency);

  useEffect(() => {
    if (isAuto && !isEmergency) {
      const interval = setInterval(() => {
        setPhase(current => {
          switch (current) {
            case 'green': return 'yellow';
            case 'yellow': return 'red';
            case 'red': return 'green';
            default: return 'green';
          }
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isAuto, isEmergency]);

  const getVolumeColor = (volume: number) => {
    if (volume < 30) return 'bg-traffic-green';
    if (volume < 70) return 'bg-traffic-yellow';
    return 'bg-traffic-red';
  };

  return (
    <Card className={`relative transition-all duration-300 ${isEmergency ? 'ring-2 ring-traffic-red shadow-[0_0_30px_hsl(var(--traffic-red-glow))]' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="w-3 h-3" />
              {location}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSettings?.(id)}
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={isEmergency ? "destructive" : "outline"}
              onClick={() => onEmergencyToggle?.(id)}
            >
              <AlertTriangle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          <TrafficLight 
            currentState={phase}
            isActive={true}
            size="md"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Traffic Volume</span>
            <Badge variant="outline" className={`${getVolumeColor(trafficVolume)} text-white`}>
              {trafficVolume}%
            </Badge>
          </div>
          
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${getVolumeColor(trafficVolume)}`}
              style={{ width: `${trafficVolume}%` }}
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Status</span>
          <Badge variant={isEmergency ? "destructive" : "default"}>
            {isEmergency ? "Emergency" : "Auto"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};