import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Camera, Upload, Sparkles } from 'lucide-react';
import ComingSoonBadge from '../../components/coming-soon/ComingSoonBadge';
import { toast } from 'sonner';

export default function FixMyCarIntake() {
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = () => {
    if (!description.trim()) {
      toast.error('Please describe your issue');
      return;
    }

    toast.success('Issue submitted! Analyzing...');
    setTimeout(() => {
      navigate({ to: '/fix-my-car/results' });
    }, 1000);
  };

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <PageTitle>Fix My Car</PageTitle>
        <p className="text-muted-foreground">
          Tell us what's wrong and we'll help you find the right solution
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Describe Your Issue</CardTitle>
            <CardDescription>
              Upload photos or videos and describe what's happening with your vehicle
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">What's wrong with your car?</Label>
              <Textarea
                id="description"
                placeholder="e.g., Strange noise when braking, check engine light on, leaking fluid..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="media">Upload Photos or Videos</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <input
                  id="media"
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="media" className="cursor-pointer">
                  <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Images or videos (max 10MB each)
                  </p>
                </label>
              </div>
              {files.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {files.length} file(s) selected
                </p>
              )}
            </div>

            <Card className="bg-muted/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    AI Pre-Diagnosis
                  </CardTitle>
                  <ComingSoonBadge />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our AI will analyze your description and photos to provide an initial diagnosis
                  and estimated repair cost.
                </p>
              </CardContent>
            </Card>

            <Button onClick={handleSubmit} size="lg" className="w-full">
              <Upload className="mr-2 h-5 w-5" />
              Get Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
