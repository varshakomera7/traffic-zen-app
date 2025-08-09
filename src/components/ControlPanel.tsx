import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  Power, 
  Settings, 
  RefreshCw, 
  AlertTriangle,
  MapPin,
  Activity
} from "lucide-react";

export const ControlPanel = () => {
  const [systemStatus, setSystemStatus] = useState<'online' | 'maintenance' | 'emergency'>('online');
  const [autoMode, setAutoMode] = useState(true);
  const [emergencyOverride, setEmergencyOverride] = useState(false);

  const handleEmergencyToggle = () => {
    setEmergencyOverride(!emergencyOverride);
    if (!emergencyOverride) {
      setSystemStatus('emergency');
    } else {
      setSystemStatus('online');
    }
  };

  const getStatusColor = () => {
    switch (systemStatus) {
      case 'online': return 'bg-traffic-green';
      case 'maintenance': return 'bg-traffic-yellow';
      case 'emergency': return 'bg-traffic-red';
      default: return 'bg-secondary';
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Control Center
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* System Status */}
        <div className="space-y-3">
          <h4 className="font-medium">System Status</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor()}`} />
              <span className="capitalize">{systemStatus}</span>
            </div>
            <Badge variant="outline" className={getStatusColor()}>
              {systemStatus.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="font-medium">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="h-auto py-3 flex flex-col gap-1"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-xs">Sync All</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="h-auto py-3 flex flex-col gap-1"
            >
              <Settings className="w-4 h-4" />
              <span className="text-xs">Settings</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="h-auto py-3 flex flex-col gap-1"
            >
              <MapPin className="w-4 h-4" />
              <span className="text-xs">Map View</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="h-auto py-3 flex flex-col gap-1"
            >
              <Activity className="w-4 h-4" />
              <span className="text-xs">Analytics</span>
            </Button>
          </div>
        </div>

        {/* System Controls */}
        <div className="space-y-4">
          <h4 className="font-medium">System Controls</h4>
          
          <div className="flex items-center justify-between">
            <label htmlFor="auto-mode" className="text-sm font-medium">
              Auto Mode
            </label>
            <Switch
              id="auto-mode"
              checked={autoMode}
              onCheckedChange={setAutoMode}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="emergency" className="text-sm font-medium">
              Emergency Override
            </label>
            <Switch
              id="emergency"
              checked={emergencyOverride}
              onCheckedChange={handleEmergencyToggle}
            />
          </div>
        </div>

        {/* Emergency Button */}
        <Button 
          variant={emergencyOverride ? "destructive" : "outline"}
          className="w-full"
          onClick={handleEmergencyToggle}
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          {emergencyOverride ? "Cancel Emergency" : "Emergency Mode"}
        </Button>

        {/* System Info */}
        <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t">
          <div className="flex justify-between">
            <span>Last Update:</span>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Version:</span>
            <span>v2.1.4</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};