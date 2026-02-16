import { useParams } from '@tanstack/react-router';
import { useState } from 'react';
import { useGetGarage } from '../../hooks/useQueries';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, Wrench, Shield, FileText } from 'lucide-react';
import GarageBookingModal from '../../components/booking/GarageBookingModal';
import DIYSupportModal from '../../components/diy/DIYSupportModal';
import { Skeleton } from '@/components/ui/skeleton';

export default function GarageDetail() {
  const { garageId } = useParams({ from: '/garages/$garageId' });
  const { data: garage, isLoading } = useGetGarage(garageId);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [diySupportModalOpen, setDIYSupportModalOpen] = useState(false);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="space-y-6">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-96 w-full" />
        </div>
      </PageLayout>
    );
  }

  if (!garage) {
    return (
      <PageLayout>
        <div className="space-y-6">
          <PageTitle>Garage Not Found</PageTitle>
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              The garage you're looking for doesn't exist or has been removed.
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <PageTitle>Garage Details</PageTitle>
            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{garage.location}</span>
            </div>
          </div>
          <Badge variant={garage.status === 'active' ? 'default' : 'secondary'}>
            {garage.status}
          </Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {garage.photos.length > 0 ? (
                    garage.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Garage ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))
                  ) : (
                    <img
                      src="/assets/generated/garage-placeholder.dim_1200x800.png"
                      alt="Garage"
                      className="w-full h-48 object-cover rounded-lg col-span-2"
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Available Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {garage.tools.map((tool, index) => (
                    <Badge key={index} variant="outline">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Rules & Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{garage.rules}</p>
                <div className="mt-4 space-y-2">
                  {garage.depositRequired && (
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Security deposit required</span>
                    </div>
                  )}
                  {garage.waiverRequired && (
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Liability waiver required</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Hourly Rate</span>
                  </div>
                  <span className="font-semibold">${garage.hourlyRate}/hr</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Daily Rate</span>
                  </div>
                  <span className="font-semibold">${garage.dailyRate}/day</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-3">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setBookingModalOpen(true)}
                  disabled={garage.status !== 'active'}
                >
                  Book This Garage
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setDIYSupportModalOpen(true)}
                >
                  <Wrench className="mr-2 h-4 w-4" />
                  DIY Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <GarageBookingModal
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
        garage={garage}
        onOpenDIYSupport={() => {
          setBookingModalOpen(false);
          setDIYSupportModalOpen(true);
        }}
      />

      <DIYSupportModal open={diySupportModalOpen} onOpenChange={setDIYSupportModalOpen} />
    </PageLayout>
  );
}
