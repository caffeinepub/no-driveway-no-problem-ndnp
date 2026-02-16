import { Badge } from '@/components/ui/badge';
import { TransactionStatus } from '../../lib/types';

interface TransactionStatusBadgeProps {
  status: TransactionStatus;
}

export default function TransactionStatusBadge({ status }: TransactionStatusBadgeProps) {
  const getVariant = () => {
    switch (status) {
      case TransactionStatus.released:
        return 'default';
      case TransactionStatus.held:
        return 'secondary';
      case TransactionStatus.refunded:
        return 'outline';
      case TransactionStatus.disputed:
        return 'destructive';
      case TransactionStatus.pending:
      default:
        return 'secondary';
    }
  };

  const getLabel = () => {
    switch (status) {
      case TransactionStatus.pending:
        return 'Pending';
      case TransactionStatus.held:
        return 'Held';
      case TransactionStatus.released:
        return 'Released';
      case TransactionStatus.refunded:
        return 'Refunded';
      case TransactionStatus.disputed:
        return 'Disputed';
      default:
        return 'Unknown';
    }
  };

  return <Badge variant={getVariant()}>{getLabel()}</Badge>;
}
