import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardContent } from '@/components/ui/card';

export default function NoShowPenalties() {
  return (
    <PageLayout>
      <div className="space-y-6">
        <PageTitle>No-Show Penalties</PageTitle>
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No penalties recorded
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
