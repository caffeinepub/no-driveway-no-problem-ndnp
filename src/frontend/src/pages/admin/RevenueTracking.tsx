import { useGetRevenueData, useGetFeeConfiguration } from '../../hooks/useQueries';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

export default function RevenueTracking() {
  const { data: revenue } = useGetRevenueData();
  const { data: feeConfig } = useGetFeeConfiguration();

  return (
    <PageLayout>
      <div className="space-y-6">
        <PageTitle>Revenue Tracking</PageTitle>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${revenue?.totalRevenue || 0}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Mechanic Commissions:</span>
                <span>${revenue?.mechanicCommissions || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Garage Commissions:</span>
                <span>${revenue?.garageCommissions || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Featured Boosts:</span>
                <span>${revenue?.featuredBoosts || 0}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Fee Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Mechanic Booking Commission:</span>
                <span>{feeConfig?.mechanicBookingCommission || 20}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Garage Rental Commission:</span>
                <span>{feeConfig?.garageRentalCommission || 15}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Featured Boost Fee:</span>
                <span>${feeConfig?.featuredBoostFee || 50}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Emergency Surge Multiplier:</span>
                <span>{feeConfig?.emergencySurgeMultiplier || 1.5}x</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
