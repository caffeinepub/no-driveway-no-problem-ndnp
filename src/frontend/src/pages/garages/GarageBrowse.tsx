import { useState } from 'react';
import { useSearchGarages } from '../../hooks/useQueries';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import GarageCard from '../../components/garages/GarageCard';
import GarageFilters from '../../components/garages/GarageFilters';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutGrid, Map } from 'lucide-react';
import ComingSoonBadge from '../../components/coming-soon/ComingSoonBadge';

export default function GarageBrowse() {
  const [filters, setFilters] = useState<any>({});
  const { data: garages, isLoading } = useSearchGarages(filters);

  return (
    <PageLayout>
      <div className="space-y-6">
        <PageTitle>Rent a Garage Bay</PageTitle>
        
        <Tabs defaultValue="list" className="w-full">
          <TabsList>
            <TabsTrigger value="list">
              <LayoutGrid className="mr-2 h-4 w-4" />
              List View
            </TabsTrigger>
            <TabsTrigger value="map">
              <Map className="mr-2 h-4 w-4" />
              Map View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-6">
            <div className="grid lg:grid-cols-4 gap-6">
              <aside className="lg:col-span-1">
                <GarageFilters filters={filters} onFiltersChange={setFilters} />
              </aside>
              <div className="lg:col-span-3">
                {isLoading ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-80" />
                    ))}
                  </div>
                ) : garages && garages.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {garages.map((garage: any) => (
                      <GarageCard key={garage.id?.toString() || Math.random()} garage={garage} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    No garages found. Try adjusting your filters.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="map" className="mt-6">
            <div className="h-[600px] bg-muted rounded-lg flex flex-col items-center justify-center gap-4">
              <ComingSoonBadge />
              <p className="text-muted-foreground">Map view coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
