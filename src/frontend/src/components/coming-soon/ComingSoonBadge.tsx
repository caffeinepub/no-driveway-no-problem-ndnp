import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface ComingSoonBadgeProps {
  className?: string;
}

export default function ComingSoonBadge({ className }: ComingSoonBadgeProps) {
  return (
    <Badge variant="secondary" className={className}>
      <Clock className="mr-1 h-3 w-3" />
      Coming Soon
    </Badge>
  );
}
