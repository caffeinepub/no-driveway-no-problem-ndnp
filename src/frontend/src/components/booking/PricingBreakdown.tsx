import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DollarSign } from 'lucide-react';

interface PricingBreakdownProps {
  basePrice: number;
  assistanceAddon?: number;
  membershipDiscount?: number;
  emergencySurge?: number;
}

export default function PricingBreakdown({
  basePrice,
  assistanceAddon = 0,
  membershipDiscount = 0,
  emergencySurge = 0,
}: PricingBreakdownProps) {
  const subtotal = basePrice + assistanceAddon + emergencySurge;
  const total = subtotal - membershipDiscount;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Pricing Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Base Rate</span>
          <span>${basePrice.toFixed(2)}</span>
        </div>

        {assistanceAddon > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Mechanic Assistance</span>
            <span>+${assistanceAddon.toFixed(2)}</span>
          </div>
        )}

        {emergencySurge > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Emergency Service Surge</span>
            <span>+${emergencySurge.toFixed(2)}</span>
          </div>
        )}

        {membershipDiscount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>DIY Membership Discount</span>
            <span>-${membershipDiscount.toFixed(2)}</span>
          </div>
        )}

        <Separator />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
