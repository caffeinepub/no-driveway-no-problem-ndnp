import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function MechanicProfileEditor() {
  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/mechanic">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <PageTitle>Mechanic Profile Editor</PageTitle>
        </div>

        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Mechanic profile editor coming soon
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
