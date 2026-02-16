import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetIdentityVerificationStatus } from '../../hooks/useQueries';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserCheck, Upload } from 'lucide-react';

export default function IdentityVerification() {
  const { identity, login } = useInternetIdentity();
  const { data: status } = useGetIdentityVerificationStatus();

  if (!identity) {
    return (
      <PageLayout>
        <div className="space-y-6">
          <PageTitle>Identity Verification</PageTitle>
          <Card>
            <CardContent className="py-12 text-center space-y-4">
              <p className="text-muted-foreground">Please sign in to verify your identity</p>
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
        <PageTitle>Identity Verification</PageTitle>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Verification Status
              </CardTitle>
              <Badge>{status || 'Not Submitted'}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Upload a government-issued ID to verify your identity and unlock additional features.
            </p>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
