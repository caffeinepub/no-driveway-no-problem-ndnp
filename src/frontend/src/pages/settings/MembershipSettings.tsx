import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetMembershipStatus } from '../../hooks/useQueries';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown } from 'lucide-react';

export default function MembershipSettings() {
  const { identity, login } = useInternetIdentity();
  const { data: membership } = useGetMembershipStatus();

  if (!identity) {
    return (
      <PageLayout>
        <div className="space-y-6">
          <PageTitle>Membership Settings</PageTitle>
          <Card>
            <CardContent className="py-12 text-center space-y-4">
              <p className="text-muted-foreground">Please sign in to manage membership</p>
              <Button onClick={login}>Sign In</Button>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <PageTitle>Membership Settings</PageTitle>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  DIY Membership
                </CardTitle>
                <Badge>{membership ? 'Active' : 'Inactive'}</Badge>
              </div>
              <CardDescription>Get discounts on garage rentals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• 15% off all garage rentals</li>
                <li>• Priority booking access</li>
                <li>• Extended rental hours</li>
              </ul>
              <Button variant="outline">Manage DIY Membership</Button>
              <p className="text-xs text-muted-foreground">
                Billing managed externally
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  Pro Membership (Mechanics)
                </CardTitle>
                <Badge variant="secondary">For Mechanics</Badge>
              </div>
              <CardDescription>Enhanced visibility and features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Reduced platform fees</li>
                <li>• Priority in search results</li>
                <li>• Advanced analytics</li>
              </ul>
              <Button variant="outline">Manage Pro Membership</Button>
              <p className="text-xs text-muted-foreground">
                Billing managed externally
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
