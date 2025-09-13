import { User } from '@/types/user';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Building, MapPin, Eye, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/users/${user.id}`);
  };

  return (
    <Card className="group relative overflow-hidden bg-gradient-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-border/50">
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {user.name}
            </h3>
            <Badge variant="secondary" className="text-xs">
              @{user.username}
            </Badge>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleViewDetails}
              className="h-8 w-8 p-0 hover:bg-primary/20"
            >
              <Eye className="h-4 w-4" />
            </Button>
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(user)}
                className="h-8 w-8 p-0 hover:bg-primary/20"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(user)}
                className="h-8 w-8 p-0 hover:bg-destructive/20"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4 text-primary" />
            <span className="text-sm truncate">{user.email}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4 text-primary" />
            <span className="text-sm">{user.phone}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building className="h-4 w-4 text-primary" />
            <span className="text-sm truncate">{user.company.name}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm truncate">{user.address.city}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground italic">
            "{user.company.catchPhrase}"
          </p>
        </div>
      </CardContent>
    </Card>
  );
}