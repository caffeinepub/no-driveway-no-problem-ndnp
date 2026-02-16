import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import type { Verification } from '../../lib/types';

interface MechanicVerificationBadgesProps {
  status: Verification;
}

export default function MechanicVerificationBadges({ status }: MechanicVerificationBadgesProps) {
  if (status === 'verified') {
    return (
      <Badge variant="default" className="bg-green-500">
        <CheckCircle className="mr-1 h-3 w-3" />
        Verified
      </Badge>
    );
  }

  if (status === 'pending') {
    return (
      <Badge variant="secondary">
        <Clock className="mr-1 h-3 w-3" />
        Pending
      </Badge>
    );
  }

  return (
    <Badge variant="destructive">
      <XCircle className="mr-1 h-3 w-3" />
      Rejected
    </Badge>
  );
}
