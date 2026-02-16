import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wrench, Warehouse } from 'lucide-react';

export default function MarketplaceModeration() {
  return (
    <PageLayout>
      <div className="space-y-6">
        <PageTitle>Marketplace Moderation</PageTitle>

        <Tabs defaultValue="mechanics">
          <TabsList>
            <TabsTrigger value="mechanics">
              <Wrench className="mr-2 h-4 w-4" />
              Mechanics
            </TabsTrigger>
            <TabsTrigger value="garages">
              <Warehouse className="mr-2 h-4 w-4" />
              Garages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mechanics" className="space-y-4">
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No mechanics pending review
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="garages" className="space-y-4">
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No garages pending review
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
