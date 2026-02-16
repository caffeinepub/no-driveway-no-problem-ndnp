import { useParams, Link } from '@tanstack/react-router';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MechanicProfilePublic() {
  const { mechanicId } = useParams({ from: '/mechanics/$mechanicId' });

  return (
    <PageLayout>
      <div className="space-y-6">
        <PageTitle>Mechanic Profile</PageTitle>

        <Card>
          <CardContent className="py-12 text-center space-y-4">
            <p className="text-muted-foreground">Mechanic profile #{mechanicId}</p>
            <Link to="/mechanics">
              <Button variant="outline">Back to Browse</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
