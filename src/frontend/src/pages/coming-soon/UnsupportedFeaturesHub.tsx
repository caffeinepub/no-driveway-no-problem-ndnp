import { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, MapPin } from 'lucide-react';
import ComingSoonBadge from '../../components/coming-soon/ComingSoonBadge';
import SimulatedFlowModal from '../../components/coming-soon/SimulatedFlowModal';

export default function UnsupportedFeaturesHub() {
  const [showSimulation, setShowSimulation] = useState(false);
  const [simulationTitle, setSimulationTitle] = useState('');
  const [simulationSteps, setSimulationSteps] = useState<string[]>([]);

  const features = [
    {
      title: 'In-App Messaging',
      description: 'Chat directly with mechanics and garage owners',
      icon: MessageSquare,
      steps: [
        'Select a conversation',
        'Type your message',
        'Send and receive messages in real-time',
        'View message history',
      ],
    },
    {
      title: 'Real-Time Tracking',
      description: 'Track mechanic arrival in real-time',
      icon: MapPin,
      steps: [
        'Mechanic accepts your booking',
        'View mechanic location on map',
        'Get ETA updates',
        'Receive arrival notification',
      ],
    },
  ];

  const handleFeatureClick = (feature: typeof features[0]) => {
    setSimulationTitle(feature.title);
    setSimulationSteps(feature.steps);
    setShowSimulation(true);
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        <div>
          <PageTitle>Features in Development</PageTitle>
          <p className="text-muted-foreground mt-2">
            These features are currently in development and will be available soon
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <feature.icon className="h-5 w-5" />
                    {feature.title}
                  </CardTitle>
                  <ComingSoonBadge />
                </div>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleFeatureClick(feature)}
                >
                  Preview Feature
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <SimulatedFlowModal
        open={showSimulation}
        onOpenChange={setShowSimulation}
        title={simulationTitle}
        steps={simulationSteps}
      />
    </PageLayout>
  );
}
