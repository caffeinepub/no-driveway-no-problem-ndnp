import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerDisputes } from '../../hooks/useQueries';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Disputes() {
  const { identity, login } = useInternetIdentity();
  const { data: disputes } = useGetCallerDisputes();

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
        <PageTitle>My Disputes</PageTitle>
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            {disputes && disputes.length > 0
              ? `${disputes.length} active dispute(s)`
              : 'No active disputes'}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
