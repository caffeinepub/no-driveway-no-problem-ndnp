import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => Promise<void> | void;
  accept?: string;
  maxFiles?: number;
  maxSizeMB?: number;
  multiple?: boolean;
}

export default function FileUploader({
  onFilesSelected,
  accept = '*',
  maxFiles = 1,
  maxSizeMB = 10,
  multiple = false,
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (files: FileList): File[] => {
    const validFiles: File[] = [];
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    for (let i = 0; i < files.length && validFiles.length < maxFiles; i++) {
      const file = files[i];
      
      if (file.size > maxSizeBytes) {
        toast.error(`${file.name} is too large. Max size: ${maxSizeMB}MB`);
        continue;
      }

      validFiles.push(file);
    }

    return validFiles;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const validFiles = validateFiles(files);
    if (validFiles.length === 0) return;

    setUploading(true);
    setProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 100);

      await onFilesSelected(validFiles);

      clearInterval(progressInterval);
      setProgress(100);

      setTimeout(() => {
        setUploading(false);
        setProgress(0);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }, 500);
    } catch (error) {
      setUploading(false);
      setProgress(0);
      toast.error('Upload failed');
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button
          type="button"
          variant="outline"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          asChild
        >
          <span className="cursor-pointer">
            <Upload className="mr-2 h-4 w-4" />
            {uploading ? 'Uploading...' : 'Choose Files'}
          </span>
        </Button>
      </label>
      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-xs text-muted-foreground">{progress}% uploaded</p>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        Max {maxFiles} file(s), up to {maxSizeMB}MB each
      </p>
    </div>
  );
}
