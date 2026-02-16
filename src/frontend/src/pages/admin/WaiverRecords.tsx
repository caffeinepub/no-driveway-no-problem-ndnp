import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardContent } from '@/components/ui/card';

export default function WaiverRecords() {
  return (
    <PageLayout>
      <div className="space-y-6">
        <PageTitle>Waiver Records</PageTitle>
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No waiver records available
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
