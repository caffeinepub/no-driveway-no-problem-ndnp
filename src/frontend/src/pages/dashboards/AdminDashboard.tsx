import { useNavigate } from '@tanstack/react-router';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  FileCheck,
  Shield,
  MessageSquare,
  Star,
  DollarSign,
  TrendingUp,
  Zap,
  Clock,
  MapPin,
  AlertTriangle,
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const tools = [
    {
      title: 'Marketplace Moderation',
      description: 'Review and approve mechanic and garage listings',
      icon: FileCheck,
      path: '/admin/moderation',
    },
    {
      title: 'Review Moderation',
      description: 'Moderate user reviews and ratings',
      icon: Star,
      path: '/admin/reviews',
    },
    {
      title: 'User Role Management',
      description: 'View and understand user role assignments',
      icon: Users,
      path: '/admin/roles',
    },
    {
      title: 'Verification Queue',
      description: 'Review mechanic certifications and documents',
      icon: Shield,
      path: '/admin/verification',
    },
    {
      title: 'Insurance Review',
      description: 'Review and approve insurance documents',
      icon: FileCheck,
      path: '/admin/insurance',
    },
    {
      title: 'Waiver Records',
      description: 'View signed liability waivers',
      icon: FileCheck,
      path: '/admin/waivers',
    },
    {
      title: 'Dispute Tools',
      description: 'Manage and resolve user disputes',
      icon: MessageSquare,
      path: '/admin/disputes',
    },
    {
      title: 'Escrow Transactions',
      description: 'Manage escrow payments and fund releases',
      icon: DollarSign,
      path: '/admin/escrow-transactions',
    },
    {
      title: 'Revenue Tracking',
      description: 'Monitor platform revenue and commissions',
      icon: TrendingUp,
      path: '/admin/revenue',
    },
    {
      title: 'Featured Boost Management',
      description: 'Manage featured listings and boosts',
      icon: Zap,
      path: '/admin/featured-boost',
    },
    {
      title: 'Waitlist Management',
      description: 'Manage provider waitlist and approvals',
      icon: Clock,
      path: '/admin/waitlist',
    },
    {
      title: 'Demand Heatmap',
      description: 'View service demand by location',
      icon: MapPin,
      path: '/admin/demand',
    },
    {
      title: 'No-Show Penalties',
      description: 'Manage no-show penalties and resolutions',
      icon: AlertTriangle,
      path: '/admin/no-show-penalties',
    },
  ];

  return (
    <PageLayout>
      <div className="space-y-6">
        <PageTitle>Admin Dashboard</PageTitle>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Card key={tool.path} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <tool.icon className="h-5 w-5" />
                  {tool.title}
                </CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate({ to: tool.path })}
                >
                  Open Tool
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
