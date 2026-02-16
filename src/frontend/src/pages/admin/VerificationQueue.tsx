import { useGetVerificationQueue, useUpdateVerificationStatus } from '../../hooks/useQueries';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { UserCheck, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function VerificationQueue() {
  const { data: queue } = useGetVerificationQueue();
  const updateStatus = useUpdateVerificationStatus();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const handleApprove = async (userId: string) => {
    try {
      await updateStatus.mutateAsync({ userId, status: 'verified', note });
      toast.success('Verification approved');
      setNote('');
      setSelectedId(null);
    } catch (error) {
      toast.error('Failed to approve verification');
    }
  };

  const handleReject = async (userId: string) => {
    try {
      await updateStatus.mutateAsync({ userId, status: 'rejected', note });
      toast.success('Verification rejected');
      setNote('');
      setSelectedId(null);
    } catch (error) {
      toast.error('Failed to reject verification');
    }
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        <PageTitle>Identity Verification Queue</PageTitle>

        {queue && queue.length > 0 ? (
          <div className="space-y-4">
            {queue.map((item: any) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <UserCheck className="h-5 w-5" />
                      User: {item.userId}
                    </CardTitle>
                    <Badge>{item.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Document submitted: {new Date(item.timestamp).toLocaleDateString()}
                    </p>
                  </div>

                  {selectedId === item.id && (
                    <div className="space-y-2">
                      <Label htmlFor={`note-${item.id}`}>Admin Note (Optional)</Label>
                      <Textarea
                        id={`note-${item.id}`}
                        placeholder="Add a note..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </div>
                  )}

                  <div className="flex gap-2">
                    {selectedId === item.id ? (
                      <>
                        <Button
                          onClick={() => handleApprove(item.userId)}
                          disabled={updateStatus.isPending}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Confirm Approve
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleReject(item.userId)}
                          disabled={updateStatus.isPending}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Confirm Reject
                        </Button>
                        <Button variant="outline" onClick={() => setSelectedId(null)}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => setSelectedId(item.id)}>Review</Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No pending verifications
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
}
