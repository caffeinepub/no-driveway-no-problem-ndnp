import { Link } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import PageLayout from '../components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Wrench, Warehouse, CheckCircle, Shield, Clock, MapPin, Zap } from 'lucide-react';
import { SiFacebook, SiX, SiInstagram } from 'react-icons/si';

export default function Landing() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <PageLayout>
          <div className="text-center space-y-6">
            <img
              src="/assets/generated/ndnp-logo.dim_512x512.png"
              alt="NDNP Logo"
              className="h-24 w-24 mx-auto"
            />
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              No Driveway? No Problem.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with trusted mechanics and rent professional garage space for your DIY projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/fix-my-car">
                <Button size="lg" className="w-full sm:w-auto">
                  <Zap className="mr-2 h-5 w-5" />
                  Fix My Car
                </Button>
              </Link>
              <Link to="/mechanics">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Wrench className="mr-2 h-5 w-5" />
                  Find a Mechanic
                </Button>
              </Link>
              <Link to="/garages">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Warehouse className="mr-2 h-5 w-5" />
                  Rent a Garage Bay
                </Button>
              </Link>
            </div>
          </div>
        </PageLayout>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <PageLayout>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose NDNP?</h2>
            <p className="text-muted-foreground">Modern, trustworthy, and built for car enthusiasts</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Verified Professionals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All mechanics are verified with certifications, insurance, and background checks.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Clock className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Flexible Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Book instantly or request custom quotes. Rent garage space by the hour or day.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <MapPin className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Local & Convenient</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Find mechanics and garage spaces near you with our interactive map search.
                </p>
              </CardContent>
            </Card>
          </div>
        </PageLayout>
      </section>

      {/* Marketplace Tiles */}
      <section className="py-16">
        <PageLayout>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <Wrench className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">For Customers</CardTitle>
                <CardDescription>Find trusted mechanics for your vehicle</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Browse verified mechanics by specialty and location</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>View ratings, reviews, and before/after photos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Get instant quotes or book emergency repairs</span>
                  </li>
                </ul>
                <Link to="/mechanics">
                  <Button className="w-full">Browse Mechanics</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Warehouse className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">For DIY Enthusiasts</CardTitle>
                <CardDescription>Rent professional garage space</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Access lifts, tools, and professional equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Rent by the hour or day at affordable rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Find spaces with welding, air compressors, and more</span>
                  </li>
                </ul>
                <Link to="/garages">
                  <Button className="w-full">Browse Garages</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </PageLayout>
      </section>

      {/* CTA for Providers */}
      <section className="py-16 bg-primary/5">
        <PageLayout>
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">Join Our Community</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Are you a mechanic or garage owner? Start earning by offering your services or space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard/mechanic">
                    <Button size="lg" variant="outline">Become a Mechanic</Button>
                  </Link>
                  <Link to="/dashboard/garage-owner">
                    <Button size="lg" variant="outline">List Your Garage</Button>
                  </Link>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Sign in to get started</p>
              )}
            </div>
          </div>
        </PageLayout>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30">
        <PageLayout>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} NDNP. Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'ndnp-app'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                caffeine.ai
              </a>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <SiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <SiX className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <SiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </PageLayout>
      </footer>
    </div>
  );
}
