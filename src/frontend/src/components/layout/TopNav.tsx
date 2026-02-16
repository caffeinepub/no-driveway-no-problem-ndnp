import { Link, useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useIsCallerAdmin } from '../../hooks/useQueries';
import LoginButton from '../auth/LoginButton';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Wrench, Warehouse, User, Shield, Clock } from 'lucide-react';
import { useState } from 'react';
import { Role } from '../../backend';

export default function TopNav() {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: isAdmin } = useIsCallerAdmin();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = !!identity;
  const hasRole = (role: Role) => userProfile?.roles.includes(role) || false;

  const NavLinks = () => (
    <>
      <Link to="/mechanics">
        <Button variant="ghost" size="sm">
          <Wrench className="mr-2 h-4 w-4" />
          Find Mechanics
        </Button>
      </Link>
      <Link to="/garages">
        <Button variant="ghost" size="sm">
          <Warehouse className="mr-2 h-4 w-4" />
          Rent Garages
        </Button>
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/assets/generated/ndnp-logo.dim_512x512.png" alt="NDNP" className="h-10 w-10" />
            <span className="font-bold text-xl hidden sm:inline-block">NDNP</span>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            <NavLinks />
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated && userProfile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">{userProfile.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Dashboards</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {hasRole(Role.customer) && (
                  <DropdownMenuItem onClick={() => navigate({ to: '/dashboard/customer' })}>
                    Customer Dashboard
                  </DropdownMenuItem>
                )}
                {hasRole(Role.mechanic) && (
                  <DropdownMenuItem onClick={() => navigate({ to: '/dashboard/mechanic' })}>
                    Mechanic Dashboard
                  </DropdownMenuItem>
                )}
                {hasRole(Role.garageOwner) && (
                  <DropdownMenuItem onClick={() => navigate({ to: '/dashboard/garage-owner' })}>
                    Garage Owner Dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate({ to: '/settings/membership' })}>
                  Membership Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: '/coming-soon' })}>
                  <Clock className="mr-2 h-4 w-4" />
                  Coming Soon Features
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate({ to: '/dashboard/admin' })}>
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <div className="hidden md:block">
            <LoginButton />
          </div>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <NavLinks />
                <div className="pt-4 border-t">
                  <LoginButton />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
