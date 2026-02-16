import { useState, useEffect } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../../hooks/useQueries';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import type { Role } from '../../backend';

export default function ProfileSetupModal() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const saveMutation = useSaveCallerUserProfile();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState<Role[]>(['customer' as Role]);

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (roles.length === 0) {
      toast.error('Please select at least one role');
      return;
    }

    try {
      await saveMutation.mutateAsync({
        name: name.trim(),
        email: email.trim(),
        roles,
      });
      toast.success('Profile created successfully!');
    } catch (error) {
      toast.error('Failed to create profile');
      console.error(error);
    }
  };

  const toggleRole = (role: Role) => {
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  return (
    <Dialog open={showProfileSetup}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Welcome to NDNP!</DialogTitle>
          <DialogDescription>
            Let's set up your profile to get started.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label>I want to use NDNP as: *</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="customer"
                  checked={roles.includes('customer' as Role)}
                  onCheckedChange={() => toggleRole('customer' as Role)}
                />
                <label htmlFor="customer" className="text-sm cursor-pointer">
                  Customer (find mechanics & rent garages)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="mechanic"
                  checked={roles.includes('mechanic' as Role)}
                  onCheckedChange={() => toggleRole('mechanic' as Role)}
                />
                <label htmlFor="mechanic" className="text-sm cursor-pointer">
                  Mechanic (offer services)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="garageOwner"
                  checked={roles.includes('garageOwner' as Role)}
                  onCheckedChange={() => toggleRole('garageOwner' as Role)}
                />
                <label htmlFor="garageOwner" className="text-sm cursor-pointer">
                  Garage Owner (rent out space)
                </label>
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={saveMutation.isPending}>
            {saveMutation.isPending ? 'Creating Profile...' : 'Get Started'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
