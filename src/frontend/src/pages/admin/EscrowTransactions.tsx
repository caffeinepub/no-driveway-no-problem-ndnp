import { useState } from 'react';
import { useGetAllTransactions, useReleaseFunds, useRefundTransaction } from '../../hooks/useQueries';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TransactionStatusBadge from '../../components/payments/TransactionStatusBadge';
import { TransactionStatus } from '../../lib/types';
import { DollarSign, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export default function EscrowTransactions() {
  const { data: transactions, isLoading } = useGetAllTransactions();
  const releaseFunds = useReleaseFunds();
  const refundTransaction = useRefundTransaction();
  const [filter, setFilter] = useState<'all' | 'held' | 'pending'>('all');

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const formatAmount = (amount: bigint) => {
    return `$${Number(amount).toFixed(2)}`;
  };

  const handleReleaseFunds = async (transactionId: bigint) => {
    try {
      await releaseFunds.mutateAsync(transactionId);
      toast.success('Funds released successfully');
    } catch (error: any) {
      console.error('Release funds error:', error);
      if (error.message?.includes('Unauthorized')) {
        toast.error('Access denied. Admin privileges required.');
      } else {
        toast.error(error.message || 'Failed to release funds');
      }
    }
  };

  const handleRefund = async (transactionId: bigint) => {
    try {
      await refundTransaction.mutateAsync(transactionId);
      toast.success('Transaction refunded successfully');
    } catch (error: any) {
      console.error('Refund error:', error);
      if (error.message?.includes('Unauthorized')) {
        toast.error('Access denied. Admin privileges required.');
      } else {
        toast.error(error.message || 'Failed to refund transaction');
      }
    }
  };

  const filteredTransactions = (transactions || []).filter((t) => {
    if (filter === 'all') return true;
    if (filter === 'held') return t.status === TransactionStatus.held;
    if (filter === 'pending') return t.status === TransactionStatus.pending;
    return true;
  });

  const canRelease = (status: TransactionStatus) => status === TransactionStatus.held;
  const canRefund = (status: TransactionStatus) =>
    status === TransactionStatus.held || status === TransactionStatus.released;

  if (isLoading) {
    return (
      <PageLayout>
        <div className="space-y-6">
          <PageTitle>Escrow Transactions</PageTitle>
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
          <PageTitle>Escrow Transactions</PageTitle>
          <p className="text-muted-foreground mt-2">
            Manage escrow transactions and release or refund funds
          </p>
        </div>

        <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
          <TabsList>
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="held">Held</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  {filter === 'all'
                    ? 'All Transactions'
                    : filter === 'held'
                    ? 'Held in Escrow'
                    : 'Pending Transactions'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredTransactions.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No transactions found</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Booking ID</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id.toString()}>
                          <TableCell className="font-mono">
                            #{transaction.id.toString().slice(0, 8)}
                          </TableCell>
                          <TableCell className="font-mono">
                            #{transaction.bookingId.toString()}
                          </TableCell>
                          <TableCell className="font-semibold">
                            {formatAmount(transaction.amount)}
                          </TableCell>
                          <TableCell>
                            <TransactionStatusBadge status={transaction.status} />
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(transaction.createdAt)}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {canRelease(transaction.status) && (
                                <Button
                                  size="sm"
                                  onClick={() => handleReleaseFunds(transaction.id)}
                                  disabled={releaseFunds.isPending}
                                >
                                  {releaseFunds.isPending ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    'Release'
                                  )}
                                </Button>
                              )}
                              {canRefund(transaction.status) && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleRefund(transaction.id)}
                                  disabled={refundTransaction.isPending}
                                >
                                  {refundTransaction.isPending ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    'Refund'
                                  )}
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
