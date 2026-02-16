import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerBookings, useGetCallerTransactions } from '../../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, DollarSign, MessageSquare, Star } from 'lucide-react';
import TransactionStatusBadge from '../../components/payments/TransactionStatusBadge';

export default function CustomerDashboard() {
  const { identity, login } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: bookings } = useGetCallerBookings();
  const { data: transactions } = useGetCallerTransactions();

  if (!identity) {
    return (
      <PageLayout>
        <div className="space-y-6">
          <PageTitle>Customer Dashboard</PageTitle>
          <Card>
            <CardContent className="py-12 text-center space-y-4">
              <p className="text-muted-foreground">Please sign in to view your dashboard</p>
              <Button onClick={login}>Sign In</Button>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }

  const recentTransactions = (transactions || []).slice(0, 3);

  return (
    <PageLayout>
      <div className="space-y-6">
        <PageTitle>Customer Dashboard</PageTitle>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                My Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {bookings && bookings.length > 0
                  ? `You have ${bookings.length} booking(s)`
                  : 'No active bookings'}
              </p>
              <Button variant="outline" className="w-full">
                View All Bookings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Pending Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">No pending reviews</p>
              <Button variant="outline" className="w-full" disabled>
                View Reviews
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Recent Transactions
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate({ to: '/payments/transactions' })}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentTransactions.length > 0 ? (
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id.toString()}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">Booking #{transaction.bookingId.toString()}</p>
                      <p className="text-sm text-muted-foreground">
                        ${Number(transaction.amount).toFixed(2)}
                      </p>
                    </div>
                    <TransactionStatusBadge status={transaction.status} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No transactions yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
