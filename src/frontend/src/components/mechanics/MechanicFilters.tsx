import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { MechanicSearchFilter, Verification } from '../../lib/types';

interface MechanicFiltersProps {
  filters: MechanicSearchFilter;
  onFiltersChange: (filters: MechanicSearchFilter) => void;
}

export default function MechanicFilters({ filters, onFiltersChange }: MechanicFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Enter city or zip"
            value={filters.location || ''}
            onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialization">Specialization</Label>
          <Input
            id="specialization"
            placeholder="e.g., Brakes, Engine"
            value={filters.specialization || ''}
            onChange={(e) => onFiltersChange({ ...filters, specialization: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Hourly Rate Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minRate || ''}
              onChange={(e) => onFiltersChange({ ...filters, minRate: Number(e.target.value) })}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxRate || ''}
              onChange={(e) => onFiltersChange({ ...filters, maxRate: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="verification">Verification Status</Label>
          <Select
            value={filters.verificationStatus || ''}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, verificationStatus: value as Verification })
            }
          >
            <SelectTrigger id="verification">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
