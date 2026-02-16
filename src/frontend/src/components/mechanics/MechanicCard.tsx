import { useNavigate } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign, Star } from 'lucide-react';
import MechanicVerificationBadges from './MechanicVerificationBadges';
import type { MechanicProfile } from '../../lib/types';

interface MechanicCardProps {
  mechanic: MechanicProfile | any;
}

export default function MechanicCard({ mechanic }: MechanicCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: '/mechanics/$mechanicId', params: { mechanicId: mechanic.id?.toString() || '0' } });
  };

  return (
    <Card className="cursor-pointer hover:border-primary transition-colors" onClick={handleClick}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>{mechanic.name || 'Unknown Mechanic'}</CardTitle>
          <MechanicVerificationBadges status={mechanic.verificationStatus || 'pending'} />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {mechanic.location || 'Unknown Location'}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Rate:</span>
          <span className="font-semibold">${mechanic.hourlyRate?.toString() || '0'}/hr</span>
        </div>
        {mechanic.rating && (
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{mechanic.rating}</span>
          </div>
        )}
        {mechanic.specialization && mechanic.specialization.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {mechanic.specialization.slice(0, 2).map((spec: string) => (
              <Badge key={spec} variant="secondary" className="text-xs">
                {spec}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
