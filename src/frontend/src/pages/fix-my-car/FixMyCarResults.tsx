import { Link } from '@tanstack/react-router';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Wrench, Warehouse, ArrowRight } from 'lucide-react';

export default function FixMyCarResults() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <PageTitle>Your Recommendations</PageTitle>
        <p className="text-muted-foreground">
          Based on your issue, here are our recommendations
        </p>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Estimated Repair Cost
            </CardTitle>
            <CardDescription>Approximate cost range for this repair</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$150 - $400</p>
            <p className="text-sm text-muted-foreground mt-2">
              This is an estimate. Actual costs may vary based on your vehicle and location.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Find a Mechanic
              </CardTitle>
              <CardDescription>Browse verified mechanics near you</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Get professional help from certified mechanics in your area.
              </p>
              <Link to="/mechanics">
                <Button className="w-full">
                  Browse Mechanics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Warehouse className="h-5 w-5" />
                DIY Garage Rental
              </CardTitle>
              <CardDescription>Rent a garage bay and do it yourself</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Save money by renting professional garage space with tools.
              </p>
              <Link to="/garages">
                <Button variant="outline" className="w-full">
                  Browse Garages
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
