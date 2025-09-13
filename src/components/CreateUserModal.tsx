import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, User } from 'lucide-react';
import { useUsers } from '@/context/UserContext';
import { CreateUserRequest } from '@/types/user';
import { useToast } from '@/hooks/use-toast';

interface CreateUserModalProps {
  trigger?: React.ReactNode;
}

export function CreateUserModal({ trigger }: CreateUserModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<CreateUserRequest>({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: {
      street: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { createUser, state } = useUsers();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    if (!formData.address.street.trim()) {
      newErrors.street = 'Street is required';
    }

    if (!formData.address.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.address.zipcode.trim()) {
      newErrors.zipcode = 'Zipcode is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await createUser(formData);
      toast({
        title: "Success!",
        description: "User created successfully",
      });
      setIsOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        address: {
          street: '',
          city: '',
          zipcode: '',
          geo: { lat: '', lng: '' }
        }
      });
      setErrors({});
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create user",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      if (parent === 'address') {
        if (child === 'lat' || child === 'lng') {
          setFormData(prev => ({
            ...prev,
            address: {
              ...prev.address,
              geo: {
                ...prev.address.geo,
                [child]: value
              }
            }
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            address: {
              ...prev.address,
              [child]: value
            }
          }));
        }
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-gradient-card border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5 text-primary" />
            Create New User
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter full name"
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && <span className="text-sm text-destructive">{errors.name}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter email address"
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && <span className="text-sm text-destructive">{errors.email}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter phone number"
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && <span className="text-sm text-destructive">{errors.phone}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Enter company name"
                className={errors.company ? 'border-destructive' : ''}
              />
              {errors.company && <span className="text-sm text-destructive">{errors.company}</span>}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">Address Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street Address *</Label>
                <Input
                  id="street"
                  value={formData.address.street}
                  onChange={(e) => handleInputChange('address.street', e.target.value)}
                  placeholder="Enter street address"
                  className={errors.street ? 'border-destructive' : ''}
                />
                {errors.street && <span className="text-sm text-destructive">{errors.street}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.address.city}
                  onChange={(e) => handleInputChange('address.city', e.target.value)}
                  placeholder="Enter city"
                  className={errors.city ? 'border-destructive' : ''}
                />
                {errors.city && <span className="text-sm text-destructive">{errors.city}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipcode">Zipcode *</Label>
                <Input
                  id="zipcode"
                  value={formData.address.zipcode}
                  onChange={(e) => handleInputChange('address.zipcode', e.target.value)}
                  placeholder="Enter zipcode"
                  className={errors.zipcode ? 'border-destructive' : ''}
                />
                {errors.zipcode && <span className="text-sm text-destructive">{errors.zipcode}</span>}
              </div>

              <div className="space-y-2">
                <Label>Coordinates (Optional)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={formData.address.geo.lat}
                    onChange={(e) => handleInputChange('address.geo.lat', e.target.value)}
                    placeholder="Latitude"
                  />
                  <Input
                    value={formData.address.geo.lng}
                    onChange={(e) => handleInputChange('address.geo.lng', e.target.value)}
                    placeholder="Longitude"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={state.loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={state.loading}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              {state.loading ? 'Creating...' : 'Create User'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}