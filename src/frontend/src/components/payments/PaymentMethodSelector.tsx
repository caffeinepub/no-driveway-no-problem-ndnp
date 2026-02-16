import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function PaymentMethodSelector() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Test Mode – Internal Ledger Active</strong>
            <br />
            Payments are processed through an internal escrow system. Funds will be held securely
            until service completion.
          </AlertDescription>
        </Alert>

        <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/50">
          <CreditCard className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="font-medium">Internal Escrow Ledger</p>
            <p className="text-sm text-muted-foreground">
              Secure payment processing with escrow protection
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
