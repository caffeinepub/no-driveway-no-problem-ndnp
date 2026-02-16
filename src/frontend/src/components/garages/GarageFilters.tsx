import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import type { GarageSearchFilter } from '../../lib/types';

interface GarageFiltersProps {
  filters: GarageSearchFilter;
  onFiltersChange: (filters: GarageSearchFilter) => void;
}

export default function GarageFilters({ filters, onFiltersChange }: GarageFiltersProps) {
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
          <Label>Price Range (Hourly)</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minHourlyRate || ''}
              onChange={(e) =>
                onFiltersChange({ ...filters, minHourlyRate: Number(e.target.value) })
              }
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxHourlyRate || ''}
              onChange={(e) =>
                onFiltersChange({ ...filters, maxHourlyRate: Number(e.target.value) })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Requirements</Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="deposit"
              checked={filters.depositRequired}
              onCheckedChange={(checked) =>
                onFiltersChange({ ...filters, depositRequired: !!checked })
              }
            />
            <Label htmlFor="deposit" className="text-sm cursor-pointer">
              Deposit Required
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="waiver"
              checked={filters.waiverRequired}
              onCheckedChange={(checked) =>
                onFiltersChange({ ...filters, waiverRequired: !!checked })
              }
            />
            <Label htmlFor="waiver" className="text-sm cursor-pointer">
              Waiver Required
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
