import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardContent } from '@/components/ui/card';

export default function InsuranceReview() {
  return (
    <PageLayout>
      <div className="space-y-6">
        <PageTitle>Insurance Review</PageTitle>
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No insurance documents pending review
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
