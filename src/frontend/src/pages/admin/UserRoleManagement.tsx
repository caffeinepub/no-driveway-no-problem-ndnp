import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function UserRoleManagement() {
  return (
    <PageLayout>
      <div className="space-y-6">
        <PageTitle>User Role Management</PageTitle>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Users can self-assign Customer, Mechanic, and Garage Owner roles during profile setup. Admin role assignment is restricted.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Role Information</CardTitle>
            <CardDescription>
              Current role management system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Customer</h3>
              <p className="text-sm text-muted-foreground">
                Can browse and book mechanics, rent garage spaces, and leave reviews.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Mechanic</h3>
              <p className="text-sm text-muted-foreground">
                Can create mechanic profiles, receive bookings, and manage availability.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Garage Owner</h3>
              <p className="text-sm text-muted-foreground">
                Can create garage listings, manage availability, and receive rental requests.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Admin</h3>
              <p className="text-sm text-muted-foreground">
                Can moderate content, manage verifications, and access admin tools. Not self-assignable.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
