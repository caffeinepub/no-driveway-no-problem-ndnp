import { useState } from 'react';
import { useSearchMechanics } from '../../hooks/useQueries';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import MechanicCard from '../../components/mechanics/MechanicCard';
import MechanicFilters from '../../components/mechanics/MechanicFilters';
import { Skeleton } from '@/components/ui/skeleton';

export default function MechanicBrowse() {
  const [filters, setFilters] = useState<any>({});
  const { data: mechanics, isLoading } = useSearchMechanics(filters);

  return (
    <PageLayout>
      <div className="space-y-6">
        <PageTitle>Find a Mechanic</PageTitle>
        <div className="grid lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <MechanicFilters filters={filters} onFiltersChange={setFilters} />
          </aside>
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid md:grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-64" />
                ))}
              </div>
            ) : mechanics && mechanics.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {mechanics.map((mechanic: any) => (
                  <MechanicCard key={mechanic.id?.toString() || Math.random()} mechanic={mechanic} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No mechanics found. Try adjusting your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
