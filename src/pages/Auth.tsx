import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  fullName: z.string().optional()
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const validateForm = () => {
    try {
      authSchema.parse({ email, password, fullName: !isLogin ? fullName : undefined });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: 'Erro ao entrar',
            description: error.message === 'Invalid login credentials' 
              ? 'Email ou senha incorretos' 
              : error.message,
            variant: 'destructive'
          });
        } else {
          toast({ title: 'Bem-vindo!', description: 'Login realizado com sucesso.' });
          navigate('/dashboard');
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          toast({
            title: 'Erro ao cadastrar',
            description: error.message.includes('already registered')
              ? 'Este email já está cadastrado'
              : error.message,
            variant: 'destructive'
          });
        } else {
          toast({ title: 'Conta criada!', description: 'Você já pode fazer login.' });
          navigate('/dashboard');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold mb-2">
            <span className="gold-text">ArtistLink</span> Pro
          </h1>
          <p className="text-muted-foreground">Painel Administrativo</p>
        </div>

        {/* Form Card */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-display font-bold mb-6 text-center">
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Seu nome"
                  className="mt-1 bg-secondary/50 border-border"
                />
                {errors.fullName && (
                  <p className="text-destructive text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="mt-1 bg-secondary/50 border-border"
              />
              {errors.email && (
                <p className="text-destructive text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Senha</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-secondary/50 border-border pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-destructive text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full gold-gradient text-primary-foreground font-semibold"
            >
              {loading ? (
                'Carregando...'
              ) : isLogin ? (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Criar Conta
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entre'}
            </button>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Voltar para o site
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
