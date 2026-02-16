import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ExternalBlob } from '../../backend';

interface GaragePhotoGalleryProps {
  photos: ExternalBlob[];
}

export default function GaragePhotoGallery({ photos }: GaragePhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (photos.length === 0) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-lg">
        <img
          src="/assets/generated/garage-placeholder.dim_1200x800.png"
          alt="Garage"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const handlePrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % photos.length);
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        {photos.slice(0, 4).map((photo, index) => (
          <div
            key={index}
            className="aspect-video overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={photo.getDirectURL()}
              alt={`Garage photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="max-w-4xl">
          {selectedIndex !== null && (
            <div className="relative">
              <img
                src={photos[selectedIndex].getDirectURL()}
                alt={`Garage photo ${selectedIndex + 1}`}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handlePrevious}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleNext}
                  className="rounded-full"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
