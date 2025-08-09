import { useState } from "react";
import { TrafficStats } from "@/components/TrafficStats";
import { IntersectionCard } from "@/components/IntersectionCard";
import { ControlPanel } from "@/components/ControlPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Car, Bell, User, Menu } from "lucide-react";

const Index = () => {
  const [emergencyIntersections, setEmergencyIntersections] = useState<string[]>([]);

  const intersections = [
    {
      id: "int-001",
      name: "Main St & Oak Ave",
      location: "Downtown District",
      currentPhase: "green" as const,
      trafficVolume: 65
    },
    {
      id: "int-002", 
      name: "Highway 101 & Pine St",
      location: "North Side",
      currentPhase: "red" as const,
      trafficVolume: 89
    },
    {
      id: "int-003",
      name: "Broadway & 2nd St",
      location: "City Center",
      currentPhase: "yellow" as const,
      trafficVolume: 34
    },
    {
      id: "int-004",
      name: "Park Ave & Elm St",
      location: "Residential",
      currentPhase: "green" as const,
      trafficVolume: 42
    },
    {
      id: "int-005",
      name: "Industrial Blvd & Commerce",
      location: "Industrial Zone",
      currentPhase: "red" as const,
      trafficVolume: 76
    },
    {
      id: "int-006",
      name: "School St & Cedar Ave",
      location: "Education District",
      currentPhase: "green" as const,
      trafficVolume: 28
    }
  ];

  const handleEmergencyToggle = (id: string) => {
    setEmergencyIntersections(prev => 
      prev.includes(id) 
        ? prev.filter(intersectionId => intersectionId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Car className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-bold">Traffic Control Center</h1>
              </div>
              <Badge variant="outline" className="bg-traffic-green text-white">
                System Online
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Alerts
                {emergencyIntersections.length > 0 && (
                  <Badge className="ml-2 bg-traffic-red text-white">
                    {emergencyIntersections.length}
                  </Badge>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                Admin
              </Button>
              <Button variant="outline" size="sm">
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Stats Overview */}
          <TrafficStats />

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Intersections Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Active Intersections</h2>
                <Badge variant="outline">
                  {intersections.length} Total
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {intersections.map((intersection) => (
                  <IntersectionCard
                    key={intersection.id}
                    {...intersection}
                    isEmergency={emergencyIntersections.includes(intersection.id)}
                    onEmergencyToggle={handleEmergencyToggle}
                    onSettings={(id) => console.log("Settings for", id)}
                  />
                ))}
              </div>
            </div>

            {/* Control Panel */}
            <div className="lg:col-span-1">
              <ControlPanel />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
