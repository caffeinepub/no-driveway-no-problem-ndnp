import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle } from 'lucide-react';
import ComingSoonBadge from './ComingSoonBadge';

interface SimulatedFlowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  steps: string[];
}

export default function SimulatedFlowModal({
  open,
  onOpenChange,
  title,
  steps,
}: SimulatedFlowModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    setCompleted(false);
    onOpenChange(false);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{title}</DialogTitle>
            <ComingSoonBadge />
          </div>
          <DialogDescription>
            This is a simulated flow. No actual action will be performed.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!completed ? (
            <>
              <Progress value={progress} className="w-full" />
              <div className="space-y-2">
                <p className="font-medium">
                  Step {currentStep + 1} of {steps.length}
                </p>
                <p className="text-sm text-muted-foreground">{steps[currentStep]}</p>
              </div>
            </>
          ) : (
            <div className="text-center space-y-4 py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <div>
                <p className="font-semibold text-lg">Simulation Complete!</p>
                <p className="text-sm text-muted-foreground mt-2">
                  This feature will be available soon.
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {!completed ? (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleNext}>
                {currentStep < steps.length - 1 ? 'Next' : 'Complete'}
              </Button>
            </>
          ) : (
            <Button onClick={handleClose}>Close</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
