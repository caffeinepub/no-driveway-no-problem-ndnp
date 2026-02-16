import { Link } from '@tanstack/react-router';
import { useGetGaragesByOwner } from '../../hooks/useQueries';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Warehouse, Calendar, FileText } from 'lucide-react';

export default function GarageOwnerDashboard() {
  const { data: garageIds } = useGetGaragesByOwner();
  const hasListings = garageIds && garageIds.length > 0;

  return (
    <PageLayout>
      <div className="space-y-6">
        <PageTitle>Garage Owner Dashboard</PageTitle>
        
        {!hasListings ? (
          <Card>
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Create your first garage listing to start earning from your space.
              </p>
              <Link to="/garage/editor">
                <Button>
                  <Warehouse className="mr-2 h-4 w-4" />
                  Create Listing
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Warehouse className="h-5 w-5" />
                  My Listings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link to="/garage/editor">
                  <Button variant="outline">Manage Listings</Button>
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
                  Rental Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  No pending requests.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
