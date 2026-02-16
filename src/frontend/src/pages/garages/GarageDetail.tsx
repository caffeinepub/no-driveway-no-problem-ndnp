import { useParams, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useGetGarage } from '../../hooks/useQueries';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import GaragePhotoGallery from '../../components/garages/GaragePhotoGallery';
import ReviewList from '../../components/reviews/ReviewList';
import GarageBookingModal from '../../components/booking/GarageBookingModal';
import DIYSupportModal from '../../components/diy/DIYSupportModal';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, DollarSign, Shield, FileText, Wrench } from 'lucide-react';

export default function GarageDetail() {
  const { garageId } = useParams({ from: '/garages/$garageId' });
  const { data: garage, isLoading } = useGetGarage(BigInt(garageId));
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [diyModalOpen, setDiyModalOpen] = useState(false);

  if (isLoading) {
    return (
      <PageLayout>
        <Skeleton className="h-96" />
      </PageLayout>
    );
  }

  if (!garage) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Garage not found</p>
          <Link to="/garages">
            <Button className="mt-4">Browse Garages</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  const approvedReviews = (garage as any).reviews?.filter((r: any) => r.approved) || [];

  return (
    <PageLayout>
      <div className="space-y-6">
        <div>
          <PageTitle>Garage Listing</PageTitle>
          <div className="flex items-center gap-2 mt-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {(garage as any).location || 'Location not specified'}
          </div>
        </div>

        <GaragePhotoGallery photos={(garage as any).photos || []} />

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Hourly Rate</span>
                  <span className="font-semibold">${((garage as any).hourlyRate || 0).toString()}/hr</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Daily Rate</span>
                  <span className="font-semibold">${((garage as any).dailyRate || 0).toString()}/day</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {((garage as any).tools || []).map((tool: string) => (
                    <Badge key={tool} variant="secondary">
                      <Wrench className="mr-1 h-3 w-3" />
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Safety Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{(garage as any).rules || 'No rules specified'}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {(garage as any).depositRequired && (
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>Security deposit required</span>
                  </div>
                )}
                {(garage as any).waiverRequired && (
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Waiver must be signed</span>
                  </div>
                )}
                {!(garage as any).depositRequired && !(garage as any).waiverRequired && (
                  <p className="text-sm text-muted-foreground">No special requirements</p>
                )}
              </CardContent>
            </Card>

            <Button className="w-full" size="lg" onClick={() => setBookingModalOpen(true)}>
              Book This Space
            </Button>

            <Button variant="outline" className="w-full" onClick={() => setDiyModalOpen(true)}>
              <Wrench className="mr-2 h-4 w-4" />
              Need Help While DIY?
            </Button>
          </div>
        </div>

        <ReviewList reviews={approvedReviews} rating={(garage as any).rating} />
      </div>

      <GarageBookingModal
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
        garage={garage}
        onOpenDIYSupport={() => {
          setBookingModalOpen(false);
          setDiyModalOpen(true);
        }}
      />

      <DIYSupportModal open={diyModalOpen} onOpenChange={setDiyModalOpen} />
    </PageLayout>
  );
}
