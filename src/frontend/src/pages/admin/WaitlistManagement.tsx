import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardContent } from '@/components/ui/card';

export default function WaitlistManagement() {
  return (
    <PageLayout>
      <div className="space-y-6">
        <PageTitle>Waitlist Management</PageTitle>
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No waitlist entries
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
