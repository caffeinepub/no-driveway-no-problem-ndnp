import { Link } from '@tanstack/react-router';
import PageLayout from '../components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';

export default function AccessDenied() {
  return (
    <PageLayout maxWidth="md">
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full">
          <CardHeader className="text-center">
            <ShieldAlert className="h-16 w-16 text-destructive mx-auto mb-4" />
            <CardTitle className="text-2xl">Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground text-center">
              This page requires specific roles or permissions. Please sign in with an authorized account or contact support.
            </p>
            <div className="flex gap-2 justify-center">
              <Link to="/">
                <Button>Go Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
