import { Link } from '@tanstack/react-router';
import { useGetCallerAssistanceRequests, useGetCallerDisputes } from '../../hooks/useQueries';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Star, Wrench, AlertCircle, Zap } from 'lucide-react';

export default function CustomerDashboard() {
  const { data: assistanceRequests } = useGetCallerAssistanceRequests();
  const { data: disputes } = useGetCallerDisputes();

  return (
    <PageLayout>
      <div className="space-y-6">
        <PageTitle>Customer Dashboard</PageTitle>

        {/* Fix My Car CTA - Mobile First */}
        <Card className="border-2 border-primary bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-6 w-6" />
              Need Your Car Fixed?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Upload a photo of your issue and get instant recommendations for mechanics and garage spaces.
            </p>
            <Link to="/fix-my-car">
              <Button size="lg" className="w-full sm:w-auto">
                <Zap className="mr-2 h-5 w-5" />
                Fix My Car Now
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                My Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No bookings yet. Browse mechanics or garages to get started.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Pending Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No pending reviews.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Mechanic Assistance Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              {assistanceRequests && assistanceRequests.length > 0 ? (
                <div className="space-y-2">
                  {assistanceRequests.slice(0, 3).map((request) => (
                    <div key={request.id.toString()} className="text-sm border-b pb-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Request #{request.id.toString()}</span>
                        <span className="text-muted-foreground capitalize">{request.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No assistance requests.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Disputes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {disputes && disputes.length > 0
                  ? `${disputes.length} active dispute(s)`
                  : 'No active disputes'}
              </p>
              <Link to="/disputes">
                <Button variant="outline" size="sm">
                  View Disputes
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
