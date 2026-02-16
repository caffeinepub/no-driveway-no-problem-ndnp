import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import ComingSoonBadge from '../coming-soon/ComingSoonBadge';
import SimulatedFlowModal from '../coming-soon/SimulatedFlowModal';

export default function VideoConsultationComingSoon() {
  const [showSimulation, setShowSimulation] = useState(false);

  const steps = [
    'Select consultation duration (15, 30, or 60 minutes)',
    'Choose available mechanic and time slot',
    'Confirm booking and payment details',
    'Receive video call link and confirmation',
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Video Consultation
            </CardTitle>
            <ComingSoonBadge />
          </div>
          <CardDescription>
            Get live help from a professional mechanic via video call
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">What's Included:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Live video consultation with certified mechanic</li>
              <li>Real-time guidance on your repair</li>
              <li>Tool and parts recommendations</li>
              <li>Follow-up support via messaging</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Pricing:</h4>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="border rounded p-2 text-center">
                <div className="font-semibold">15 min</div>
                <div className="text-muted-foreground">$25</div>
              </div>
              <div className="border rounded p-2 text-center">
                <div className="font-semibold">30 min</div>
                <div className="text-muted-foreground">$45</div>
              </div>
              <div className="border rounded p-2 text-center">
                <div className="font-semibold">60 min</div>
                <div className="text-muted-foreground">$80</div>
              </div>
            </div>
          </div>

          <Button onClick={() => setShowSimulation(true)} className="w-full">
            <Video className="mr-2 h-4 w-4" />
            Book Video Consultation
          </Button>
        </CardContent>
      </Card>

      <SimulatedFlowModal
        open={showSimulation}
        onOpenChange={setShowSimulation}
        title="Video Consultation Booking"
        steps={steps}
      />
    </>
  );
}
