import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerTransactions } from '../../hooks/useQueries';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TransactionHistoryList from '../../components/payments/TransactionHistoryList';
import { Skeleton } from '@/components/ui/skeleton';

export default function TransactionHistory() {
  const { identity, login } = useInternetIdentity();
  const { data: transactions, isLoading } = useGetCallerTransactions();

  if (!identity) {
    return (
      <PageLayout>
        <div className="space-y-6">
          <PageTitle>Transaction History</PageTitle>
          <Card>
            <CardContent className="py-12 text-center space-y-4">
              <p className="text-muted-foreground">Please sign in to view your transaction history</p>
              <Button onClick={login}>Sign In</Button>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }

  if (isLoading) {
    return (
      <PageLayout>
        <div className="space-y-6">
          <PageTitle>Transaction History</PageTitle>
          <Card>
            <CardContent className="py-12 space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <div>
          <PageTitle>Transaction History</PageTitle>
          <p className="text-muted-foreground mt-2">
            View all your payment transactions and escrow activity
          </p>
        </div>
        <TransactionHistoryList transactions={transactions || []} />
      </div>
    </PageLayout>
  );
}
