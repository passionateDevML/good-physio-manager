
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LockKeyhole, UserCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // This is a mock login - in a real app, connect to a backend
      if (email === 'admin@goodphysio.com' && password === 'admin123') {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur le tableau de bord",
        });
        
        // Store user info in localStorage (for demo purposes only)
        localStorage.setItem('user', JSON.stringify({
          email,
          role: 'admin',
          name: 'Administrateur',
        }));
        
        setTimeout(() => {
          navigate('/admin');
        }, 1000);
      } else {
        toast({
          variant: "destructive",
          title: "Échec de la connexion",
          description: "Email ou mot de passe incorrect",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur s'est produite lors de la connexion",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-physio-50 to-physio-100 p-4">
      <div className="w-full max-w-md animate-fade-in animate-slide-up">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-physio-400 to-physio-600 flex items-center justify-center text-white font-bold">
              GP
            </div>
            <span className="text-xl font-semibold text-foreground">Good Physio</span>
          </div>
        </div>
        
        <Card className="shadow-soft">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Connexion</CardTitle>
            <CardDescription className="text-center">
              Entrez vos identifiants pour accéder à votre compte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemple@goodphysio.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Button variant="link" className="p-0 h-auto text-xs" type="button">
                    Mot de passe oublié?
                  </Button>
                </div>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-physio-500 hover:bg-physio-600"
                disabled={isLoading}
              >
                {isLoading ? 'Connexion en cours...' : 'Se connecter'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Contactez l'administrateur pour créer un compte.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
