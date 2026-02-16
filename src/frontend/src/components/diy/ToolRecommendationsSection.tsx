import { useState } from 'react';
import { useGetAllToolRecommendations } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Wrench, Package, Save } from 'lucide-react';
import { toast } from 'sonner';
import type { RepairCategory } from '../../backend';

export default function ToolRecommendationsSection() {
  const { data: recommendations, isLoading } = useGetAllToolRecommendations();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const selectedRecommendation = recommendations?.find((r) => {
    const categoryKey = getCategoryKey(r.category);
    return categoryKey === selectedCategory;
  });

  const handleSave = () => {
    toast.success('Tool recommendations saved to your session!');
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Select Repair Type</CardTitle>
          <CardDescription>Choose your repair to see recommended tools and consumables</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a repair type" />
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
        </CardContent>
      </Card>

      {selectedRecommendation && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Recommended Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedRecommendation.tools.map((tool) => (
                  <Badge key={tool} variant="secondary">
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Consumables Needed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedRecommendation.consumables.map((item) => (
                  <Badge key={item} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save to My Session
          </Button>
        </>
      )}

      {!selectedCategory && (
        <div className="text-center py-8 text-muted-foreground">
          Select a repair type to see recommendations
        </div>
      )}
    </div>
  );
}

function getCategoryKey(category: RepairCategory): string {
  if ('oilChange' in category) return 'oil_change';
  if ('brakeJob' in category) return 'brake_job';
  if ('suspension' in category) return 'suspension';
  if ('engineMaintenance' in category) return 'engine_maintenance';
  if ('transmission' in category) return 'transmission';
  if ('electrical' in category) return 'electrical';
  if ('diagnostics' in category) return 'diagnostics';
  if ('coolingSystem' in category) return 'cooling_system';
  if ('other' in category) return `other:${category.other}`;
  return '';
}
