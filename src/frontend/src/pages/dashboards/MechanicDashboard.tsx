import { Link } from '@tanstack/react-router';
import { useGetMechanicsByOwner, useGetAllAssistanceRequests } from '../../hooks/useQueries';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Wrench, Calendar, FileText, Zap, Star } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function MechanicDashboard() {
  const { data: mechanicIds } = useGetMechanicsByOwner();
  const { data: assistanceRequests } = useGetAllAssistanceRequests();
  const [emergencyEnabled, setEmergencyEnabled] = useState(false);
  const [surgeMultiplier, setSurgeMultiplier] = useState('1.5');

  const hasProfile = mechanicIds && mechanicIds.length > 0;

  const handleEmergencyToggle = (checked: boolean) => {
    setEmergencyEnabled(checked);
    toast.success(checked ? 'Emergency service enabled' : 'Emergency service disabled');
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        <PageTitle>Mechanic Dashboard</PageTitle>
        
        {!hasProfile ? (
          <Card>
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Create your mechanic profile to start receiving bookings and quotes.
              </p>
              <Link to="/mechanic/editor">
                <Button>
                  <Wrench className="mr-2 h-4 w-4" />
                  Create Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  My Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link to="/mechanic/editor">
                  <Button variant="outline">Edit Profile</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Manage your availability calendar.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Incoming Assistance Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                {assistanceRequests && assistanceRequests.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{assistanceRequests.length} pending request(s)</p>
                    {assistanceRequests.slice(0, 3).map((request) => (
                      <div key={request.id.toString()} className="text-sm border-b pb-2">
                        <div className="flex justify-between">
                          <span>Request #{request.id.toString()}</span>
                          <span className="text-muted-foreground capitalize">{request.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No pending requests.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Emergency Service
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="emergency-toggle">Enable Emergency Service</Label>
                  <Switch
                    id="emergency-toggle"
                    checked={emergencyEnabled}
                    onCheckedChange={handleEmergencyToggle}
                  />
                </div>
                {emergencyEnabled && (
                  <div className="space-y-2">
                    <Label htmlFor="surge">Surge Multiplier</Label>
                    <Input
                      id="surge"
                      type="number"
                      step="0.1"
                      min="1.0"
                      max="3.0"
                      value={surgeMultiplier}
                      onChange={(e) => setSurgeMultiplier(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Emergency rate: Base rate × {surgeMultiplier}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Featured Boost
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Boost your profile to appear at the top of search results.
                </p>
                <Button variant="outline" size="sm">
                  Request Featured Boost
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Payment processed externally
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
