import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardContent } from '@/components/ui/card';

export default function DemandHeatmap() {
  return (
    <PageLayout>
      <div className="space-y-6">
        <PageTitle>Demand Heatmap</PageTitle>
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No demand data available
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
