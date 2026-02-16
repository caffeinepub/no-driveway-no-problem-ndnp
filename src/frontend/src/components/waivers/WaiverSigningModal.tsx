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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText } from 'lucide-react';
import { toast } from 'sonner';

interface WaiverSigningModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSigned: () => void;
}

export default function WaiverSigningModal({
  open,
  onOpenChange,
  onSigned,
}: WaiverSigningModalProps) {
  const [fullName, setFullName] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSign = () => {
    if (!fullName.trim()) {
      toast.error('Please enter your full name');
      return;
    }

    if (!agreed) {
      toast.error('Please agree to the waiver terms');
      return;
    }

    toast.success('Waiver signed successfully');
    onSigned();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Liability Waiver
          </DialogTitle>
          <DialogDescription>
            Please read and sign the waiver before proceeding with your booking.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-64 border rounded-lg p-4">
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold">ASSUMPTION OF RISK AND WAIVER OF LIABILITY</h3>
            <p>
              By signing this waiver, I acknowledge that I am voluntarily participating in automotive
              repair activities at the rented garage facility. I understand that such activities
              involve inherent risks, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Personal injury from tools, equipment, or vehicle components</li>
              <li>Property damage to my vehicle or personal belongings</li>
              <li>Exposure to hazardous materials and chemicals</li>
              <li>Risk of fire, electrical shock, or mechanical failure</li>
            </ul>
            <p>
              I hereby release, waive, discharge, and covenant not to sue the garage owner, NDNP
              platform, and their respective officers, employees, and agents from any and all
              liability, claims, demands, actions, and causes of action whatsoever arising out of or
              related to any loss, damage, or injury that may be sustained by me or my property while
              using the garage facility.
            </p>
            <p>
              I agree to indemnify and hold harmless the garage owner and NDNP platform from any loss,
              liability, damage, or costs that may incur due to my use of the facility.
            </p>
            <p>
              I certify that I am physically fit and have no medical conditions that would prevent me
              from safely performing automotive repair work.
            </p>
            <p className="font-semibold">
              I HAVE READ THIS WAIVER OF LIABILITY AND ASSUMPTION OF RISK AGREEMENT, FULLY UNDERSTAND
              ITS TERMS, AND SIGN IT FREELY AND VOLUNTARILY.
            </p>
          </div>
        </ScrollArea>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Legal Name (Electronic Signature)</Label>
            <Input
              id="fullName"
              placeholder="Type your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="agree" checked={agreed} onCheckedChange={(checked) => setAgreed(!!checked)} />
            <Label htmlFor="agree" className="text-sm cursor-pointer">
              I have read, understood, and agree to the terms of this waiver
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSign} disabled={!fullName.trim() || !agreed}>
            Sign Waiver
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
