import { Link } from '@tanstack/react-router';
import { useIsCallerAdmin } from '../../hooks/useQueries';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Shield,
  Star,
  Users,
  CheckCircle,
  FileText,
  AlertCircle,
  DollarSign,
  TrendingUp,
  UserCheck,
  ListChecks,
  MapPin,
  Ban,
} from 'lucide-react';

export default function AdminDashboard() {
  const { data: isAdmin } = useIsCallerAdmin();

  if (!isAdmin) {
    return null;
  }

  const adminTools = [
    {
      title: 'Marketplace Moderation',
      description: 'Review and approve mechanic profiles and garage listings',
      icon: Shield,
      link: '/admin/moderation',
    },
    {
      title: 'Review Moderation',
      description: 'Approve or hide user reviews',
      icon: Star,
      link: '/admin/reviews',
    },
    {
      title: 'User Role Management',
      description: 'Manage user roles and permissions',
      icon: Users,
      link: '/admin/roles',
    },
    {
      title: 'Identity Verification',
      description: 'Review and approve identity verification submissions',
      icon: UserCheck,
      link: '/admin/verification',
    },
    {
      title: 'Insurance Review',
      description: 'Review and approve insurance documents',
      icon: CheckCircle,
      link: '/admin/insurance',
    },
    {
      title: 'Waiver Records',
      description: 'View signed waiver records',
      icon: FileText,
      link: '/admin/waivers',
    },
    {
      title: 'Dispute Resolution',
      description: 'Manage and resolve user disputes',
      icon: AlertCircle,
      link: '/admin/disputes',
    },
    {
      title: 'Revenue Tracking',
      description: 'View revenue and configure fee rates',
      icon: DollarSign,
      link: '/admin/revenue',
    },
    {
      title: 'Featured Boost Management',
      description: 'Approve and manage featured mechanic boosts',
      icon: TrendingUp,
      link: '/admin/featured-boost',
    },
    {
      title: 'Waitlist Management',
      description: 'Manage waitlist entries and invitations',
      icon: ListChecks,
      link: '/admin/waitlist',
    },
    {
      title: 'Demand Heatmap',
      description: 'View demand aggregation by location',
      icon: MapPin,
      link: '/admin/demand',
    },
    {
      title: 'No-Show Penalties',
      description: 'Review and manage no-show penalties',
      icon: Ban,
      link: '/admin/no-show-penalties',
    },
  ];

  return (
    <PageLayout>
      <div className="space-y-6">
        <PageTitle>Admin Dashboard</PageTitle>
        <p className="text-muted-foreground">
          Manage all aspects of the NDNP marketplace
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {adminTools.map((tool) => (
            <Card key={tool.link} className="hover:border-primary transition-colors">
              <CardHeader>
                <tool.icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={tool.link}>
                  <Button variant="outline" className="w-full">
                    Open
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
