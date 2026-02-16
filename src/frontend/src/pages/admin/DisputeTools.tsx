import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardContent } from '@/components/ui/card';

export default function DisputeTools() {
  return (
    <PageLayout>
      <div className="space-y-6">
        <PageTitle>Dispute Resolution Tools</PageTitle>
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No active disputes
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
