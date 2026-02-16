import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Wrench } from 'lucide-react';

interface MechanicAssistanceAddonProps {
  onAssistanceChange: (requested: boolean) => void;
  assistanceRequested: boolean;
}

export default function MechanicAssistanceAddon({
  onAssistanceChange,
  assistanceRequested,
}: MechanicAssistanceAddonProps) {
  const [serviceType, setServiceType] = useState('consultation');
  const [details, setDetails] = useState('');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Add Mechanic Assistance
        </CardTitle>
        <CardDescription>
          Get professional help during your DIY project (+$50)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="assistance-toggle">Request Mechanic Assistance</Label>
          <Switch
            id="assistance-toggle"
            checked={assistanceRequested}
            onCheckedChange={onAssistanceChange}
          />
        </div>

        {assistanceRequested && (
          <>
            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type</Label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger id="serviceType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="repairHelp">Repair Help</SelectItem>
                  <SelectItem value="inspection">Inspection</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Details</Label>
              <Textarea
                id="details"
                placeholder="Describe what you need help with..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
