import { useState } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Wrench, Calculator, Video, BookOpen } from 'lucide-react';
import ToolRecommendationsSection from './ToolRecommendationsSection';
import RepairCostEstimatorSection from './RepairCostEstimatorSection';
import VideoConsultationComingSoon from './VideoConsultationComingSoon';

interface DIYSupportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DIYSupportModal({ open, onOpenChange }: DIYSupportModalProps) {
  const { identity, login } = useInternetIdentity();
  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <DialogDescription>
              Please sign in to access DIY support features.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Button onClick={login} className="w-full">
              Sign In
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Need Help While DIY?
          </DialogTitle>
          <DialogDescription>
            Get tool recommendations, cost estimates, and expert consultation.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tools">
              <BookOpen className="mr-2 h-4 w-4" />
              Tools
            </TabsTrigger>
            <TabsTrigger value="estimator">
              <Calculator className="mr-2 h-4 w-4" />
              Estimator
            </TabsTrigger>
            <TabsTrigger value="consultation">
              <Video className="mr-2 h-4 w-4" />
              Consultation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tools" className="space-y-4">
            <ToolRecommendationsSection />
          </TabsContent>

          <TabsContent value="estimator" className="space-y-4">
            <RepairCostEstimatorSection />
          </TabsContent>

          <TabsContent value="consultation" className="space-y-4">
            <VideoConsultationComingSoon />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
