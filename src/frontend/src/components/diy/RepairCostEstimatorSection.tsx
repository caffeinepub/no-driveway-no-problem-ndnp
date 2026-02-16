import { useState } from 'react';
import { useCreateRepairEstimate, useGetCallerRepairEstimates } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Calculator, DollarSign, Clock } from 'lucide-react';
import { toast } from 'sonner';
import type { RepairCategory } from '../../backend';

export default function RepairCostEstimatorSection() {
  const [repairType, setRepairType] = useState<string>('');
  const [vehicleInfo, setVehicleInfo] = useState('');
  const [partsCost, setPartsCost] = useState('');
  const [laborHours, setLaborHours] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');

  const createEstimate = useCreateRepairEstimate();
  const { data: recentEstimates } = useGetCallerRepairEstimates();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!repairType || !vehicleInfo || !partsCost || !laborHours || !hourlyRate) {
      toast.error('Please fill in all fields');
      return;
    }

    const category = getRepairCategory(repairType);

    try {
      await createEstimate.mutateAsync({
        repairType: category,
        vehicleInfo,
        partsCost: BigInt(partsCost),
        laborHours: parseFloat(laborHours),
        hourlyRate: BigInt(hourlyRate),
      });

      toast.success('Estimate created successfully!');
      setVehicleInfo('');
      setPartsCost('');
      setLaborHours('');
      setHourlyRate('');
    } catch (error) {
      toast.error('Failed to create estimate');
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Repair Cost Estimator
          </CardTitle>
          <CardDescription>Get an estimate for your repair project</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="repairType">Repair Type</Label>
              <Select value={repairType} onValueChange={setRepairType}>
                <SelectTrigger id="repairType">
                  <SelectValue placeholder="Select repair type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oil_change">Oil Change</SelectItem>
                  <SelectItem value="brake_job">Brake Job</SelectItem>
                  <SelectItem value="suspension">Suspension</SelectItem>
                  <SelectItem value="engine_maintenance">Engine Maintenance</SelectItem>
                  <SelectItem value="transmission">Transmission</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="diagnostics">Diagnostics</SelectItem>
                  <SelectItem value="cooling_system">Cooling System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleInfo">Vehicle Information</Label>
              <Textarea
                id="vehicleInfo"
                placeholder="e.g., 2015 Honda Civic, 100k miles"
                value={vehicleInfo}
                onChange={(e) => setVehicleInfo(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="partsCost">Parts Cost ($)</Label>
                <Input
                  id="partsCost"
                  type="number"
                  placeholder="0"
                  value={partsCost}
                  onChange={(e) => setPartsCost(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="laborHours">Labor Hours</Label>
                <Input
                  id="laborHours"
                  type="number"
                  step="0.5"
                  placeholder="0"
                  value={laborHours}
                  onChange={(e) => setLaborHours(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
              <Input
                id="hourlyRate"
                type="number"
                placeholder="0"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={createEstimate.isPending}>
              {createEstimate.isPending ? 'Calculating...' : 'Calculate Estimate'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {recentEstimates && recentEstimates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Estimates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEstimates.slice(0, 5).map((estimate) => (
                <div key={estimate.id.toString()} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{getRepairCategoryLabel(estimate.repairType)}</span>
                    <span className="text-sm text-muted-foreground">{estimate.vehicleInfo}</span>
                  </div>
                  <Separator />
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Parts:</span>
                      <span>${estimate.partsCost.toString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Labor ({estimate.laborHours}h @ ${estimate.hourlyRate.toString()}/h):
                      </span>
                      <span>
                        ${(Number(estimate.hourlyRate) * estimate.laborHours).toFixed(2)}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>${estimate.totalCost.toString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function getRepairCategory(key: string): RepairCategory {
  switch (key) {
    case 'oil_change':
      return { __kind__: 'oilChange', oilChange: null };
    case 'brake_job':
      return { __kind__: 'brakeJob', brakeJob: null };
    case 'suspension':
      return { __kind__: 'suspension', suspension: null };
    case 'engine_maintenance':
      return { __kind__: 'engineMaintenance', engineMaintenance: null };
    case 'transmission':
      return { __kind__: 'transmission', transmission: null };
    case 'electrical':
      return { __kind__: 'electrical', electrical: null };
    case 'diagnostics':
      return { __kind__: 'diagnostics', diagnostics: null };
    case 'cooling_system':
      return { __kind__: 'coolingSystem', coolingSystem: null };
    default:
      return { __kind__: 'other', other: key };
  }
}

function getRepairCategoryLabel(category: RepairCategory): string {
  if ('oilChange' in category) return 'Oil Change';
  if ('brakeJob' in category) return 'Brake Job';
  if ('suspension' in category) return 'Suspension';
  if ('engineMaintenance' in category) return 'Engine Maintenance';
  if ('transmission' in category) return 'Transmission';
  if ('electrical' in category) return 'Electrical';
  if ('diagnostics' in category) return 'Diagnostics';
  if ('coolingSystem' in category) return 'Cooling System';
  if ('other' in category) return category.other;
  return 'Unknown';
}
