import { useState } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerDisputes, useCreateDispute } from '../../hooks/useQueries';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Disputes() {
  const { identity, login } = useInternetIdentity();
  const { data: disputes } = useGetCallerDisputes();
  const createDispute = useCreateDispute();
  const [open, setOpen] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId || !reason) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await createDispute.mutateAsync({
        bookingId: BigInt(bookingId),
        reason,
      });
      toast.success('Dispute opened successfully');
      setOpen(false);
      setBookingId('');
      setReason('');
    } catch (error: any) {
      console.error('Create dispute error:', error);
      toast.error(error.message || 'Failed to open dispute');
    }
  };

  if (!identity) {
    return (
      <PageLayout>
        <div className="space-y-6">
          <PageTitle>Disputes</PageTitle>
          <Card>
            <CardContent className="py-12 text-center space-y-4">
              <p className="text-muted-foreground">Please sign in to view disputes</p>
              <Button onClick={login}>Sign In</Button>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <PageTitle>My Disputes</PageTitle>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <AlertTriangle className="mr-2 h-4 w-4" />
                Open Dispute
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Open a Dispute</DialogTitle>
                <DialogDescription>
                  Provide details about the issue with your booking
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bookingId">Booking ID</Label>
                  <Input
                    id="bookingId"
                    type="number"
                    placeholder="Enter booking ID"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea
                    id="reason"
                    placeholder="Describe the issue..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={createDispute.isPending}>
                  {createDispute.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Dispute'
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Active Disputes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {disputes && disputes.length > 0 ? (
              <p className="text-muted-foreground">{disputes.length} active dispute(s)</p>
            ) : (
              <p className="text-muted-foreground text-center py-8">No active disputes</p>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
