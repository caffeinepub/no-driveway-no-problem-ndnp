import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard } from 'lucide-react';
import { SiApplepay, SiGooglepay } from 'react-icons/si';
import ComingSoonBadge from '../coming-soon/ComingSoonBadge';
import SimulatedFlowModal from '../coming-soon/SimulatedFlowModal';

export default function PaymentMethodSelector() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showSimulation, setShowSimulation] = useState(false);
  const [simulationTitle, setSimulationTitle] = useState('');
  const [simulationSteps, setSimulationSteps] = useState<string[]>([]);

  const handlePaymentMethodChange = (value: string) => {
    if (value === 'apple' || value === 'google') {
      setSimulationTitle(value === 'apple' ? 'Apple Pay' : 'Google Pay');
      setSimulationSteps([
        'Authenticate with biometrics',
        'Confirm payment details',
        'Process payment',
        'Payment complete',
      ]);
      setShowSimulation(true);
    } else {
      setPaymentMethod(value);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                <CreditCard className="h-4 w-4" />
                Credit / Debit Card
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="apple" id="apple" />
              <Label htmlFor="apple" className="flex items-center gap-2 cursor-pointer">
                <SiApplepay className="h-4 w-4" />
                Apple Pay
                <ComingSoonBadge className="ml-2" />
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="google" id="google" />
              <Label htmlFor="google" className="flex items-center gap-2 cursor-pointer">
                <SiGooglepay className="h-4 w-4" />
                Google Pay
                <ComingSoonBadge className="ml-2" />
              </Label>
            </div>
          </RadioGroup>

          {paymentMethod === 'card' && (
            <p className="text-sm text-muted-foreground mt-4">
              Payment processing will be integrated in a future update.
            </p>
          )}
        </CardContent>
      </Card>

      <SimulatedFlowModal
        open={showSimulation}
        onOpenChange={setShowSimulation}
        title={simulationTitle}
        steps={simulationSteps}
      />
    </>
  );
}
