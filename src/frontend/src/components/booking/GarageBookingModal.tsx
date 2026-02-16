import { useState } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Wrench, CreditCard } from 'lucide-react';
import MechanicAssistanceAddon from './MechanicAssistanceAddon';
import PricingBreakdown from './PricingBreakdown';
import PaymentMethodSelector from '../payments/PaymentMethodSelector';
import WaiverSigningModal from '../waivers/WaiverSigningModal';
import { toast } from 'sonner';

interface GarageBookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  garage: any;
  onOpenDIYSupport?: () => void;
}

export default function GarageBookingModal({
  open,
  onOpenChange,
  garage,
  onOpenDIYSupport,
}: GarageBookingModalProps) {
  const { identity, login } = useInternetIdentity();
  const [currentTab, setCurrentTab] = useState('details');
  const [assistanceRequested, setAssistanceRequested] = useState(false);
  const [waiverSigned, setWaiverSigned] = useState(false);
  const [showWaiverModal, setShowWaiverModal] = useState(false);

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <DialogDescription>Please sign in to book this garage space.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Button onClick={login} className="w-full">
              Sign In
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const handleConfirmBooking = () => {
    if (garage?.waiverRequired && !waiverSigned) {
      setShowWaiverModal(true);
      return;
    }

    toast.success('Booking confirmed! (Simulated)');
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Book Garage Space</DialogTitle>
            <DialogDescription>Complete your booking details</DialogDescription>
          </DialogHeader>

          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">
                <Calendar className="mr-2 h-4 w-4" />
                Details
              </TabsTrigger>
              <TabsTrigger value="assistance">
                <Wrench className="mr-2 h-4 w-4" />
                Assistance
              </TabsTrigger>
              <TabsTrigger value="payment">
                <CreditCard className="mr-2 h-4 w-4" />
                Payment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Select your booking date and time (calendar integration coming soon)
                </p>
                {onOpenDIYSupport && (
                  <Button variant="outline" onClick={onOpenDIYSupport} className="w-full">
                    <Wrench className="mr-2 h-4 w-4" />
                    Need Help While DIY?
                  </Button>
                )}
                <Button onClick={() => setCurrentTab('assistance')} className="w-full">
                  Continue
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="assistance" className="space-y-4">
              <MechanicAssistanceAddon
                onAssistanceChange={setAssistanceRequested}
                assistanceRequested={assistanceRequested}
              />
              <Button onClick={() => setCurrentTab('payment')} className="w-full">
                Continue to Payment
              </Button>
            </TabsContent>

            <TabsContent value="payment" className="space-y-4">
              <PricingBreakdown
                basePrice={Number(garage?.hourlyRate || 0)}
                assistanceAddon={assistanceRequested ? 50 : 0}
                membershipDiscount={0}
              />
              <PaymentMethodSelector />
              <Button onClick={handleConfirmBooking} className="w-full" size="lg">
                Confirm Booking
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {garage?.waiverRequired && (
        <WaiverSigningModal
          open={showWaiverModal}
          onOpenChange={setShowWaiverModal}
          onSigned={() => {
            setWaiverSigned(true);
            setShowWaiverModal(false);
            handleConfirmBooking();
          }}
        />
      )}
    </>
  );
}
