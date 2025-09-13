import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsers } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Mail,
  Phone,
  Building,
  MapPin,
  Globe,
  User,
  Edit,
  Trash2,
  ExternalLink
} from 'lucide-react';

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getUserById, deleteUser, state } = useUsers();

  const user = id ? getUserById(id) : null;

  useEffect(() => {
    if (!user && !state.loading) {
      navigate('/');
    }
  }, [user, state.loading, navigate]);

  const handleDelete = async () => {
    if (user && window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(user.id);
      navigate('/');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">User not found</h2>
          <p className="text-muted-foreground mb-4">The user you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-secondary border-b border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="hover:bg-primary/20"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {user.name}
                </h1>
                <p className="text-muted-foreground">User Details</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="hover:bg-primary/20">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="outline"
                onClick={handleDelete}
                className="hover:bg-destructive/20 hover:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p className="text-lg font-medium">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Username</label>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">@{user.username}</Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <a href={`mailto:${user.email}`} className="text-primary hover:underline">
                        {user.email}
                      </a>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <a href={`tel:${user.phone}`} className="text-primary hover:underline">
                        {user.phone}
                      </a>
                    </div>
                  </div>
                  {user.website && (
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-muted-foreground">Website</label>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-primary" />
                        <a
                          href={`https://${user.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          {user.website}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Company Information */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Company Name</label>
                  <p className="text-lg font-medium">{user.company.name}</p>
                </div>
                {user.company.catchPhrase && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Slogan</label>
                    <p className="italic text-muted-foreground">"{user.company.catchPhrase}"</p>
                  </div>
                )}
                {user.company.bs && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Business Focus</label>
                    <p className="text-sm">{user.company.bs}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Address & Location */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Street Address</label>
                  <p>{user.address.street}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">City</label>
                  <p>{user.address.city}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Zipcode</label>
                  <p>{user.address.zipcode}</p>
                </div>
                {user.address.geo.lat && user.address.geo.lng && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Coordinates</label>
                    <div className="flex gap-2 text-xs font-mono bg-muted p-2 rounded">
                      <span>Lat: {user.address.geo.lat}</span>
                      <span>Lng: {user.address.geo.lng}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Phone
                </Button>
                {user.website && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-2 h-4 w-4" />
                      Visit Website
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}