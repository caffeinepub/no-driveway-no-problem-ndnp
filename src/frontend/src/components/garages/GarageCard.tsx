import { useNavigate } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign } from 'lucide-react';
import type { GarageListing } from '../../lib/types';

interface GarageCardProps {
  garage: GarageListing | any;
}

export default function GarageCard({ garage }: GarageCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: '/garages/$garageId', params: { garageId: garage.id?.toString() || '0' } });
  };

  return (
    <Card className="cursor-pointer hover:border-primary transition-colors" onClick={handleClick}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {garage.location || 'Unknown Location'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Hourly:</span>
          <span className="font-semibold">${garage.hourlyRate?.toString() || '0'}/hr</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Daily:</span>
          <span className="font-semibold">${garage.dailyRate?.toString() || '0'}/day</span>
        </div>
        {garage.tools && garage.tools.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {garage.tools.slice(0, 3).map((tool: string) => (
              <Badge key={tool} variant="secondary" className="text-xs">
                {tool}
              </Badge>
            ))}
            {garage.tools.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{garage.tools.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
