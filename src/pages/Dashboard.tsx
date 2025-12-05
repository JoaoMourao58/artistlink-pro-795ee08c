import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useArtists } from '@/hooks/useArtists';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { 
  Users, Eye, MousePointer, Calendar, 
  LogOut, Plus, Settings, BarChart3,
  ExternalLink, MessageCircle, Pencil
} from 'lucide-react';

const Dashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: artists, isLoading: artistsLoading } = useArtists();

  // Get statistics
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [pageViews, buttonClicks, leads, shows] = await Promise.all([
        supabase.from('page_views').select('id', { count: 'exact', head: true }),
        supabase.from('button_clicks').select('id', { count: 'exact', head: true }),
        supabase.from('leads').select('id', { count: 'exact', head: true }),
        supabase.from('shows').select('id', { count: 'exact', head: true })
      ]);

      return {
        pageViews: pageViews.count || 0,
        buttonClicks: buttonClicks.count || 0,
        leads: leads.count || 0,
        shows: shows.count || 0
      };
    },
    enabled: !!user
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="font-display text-xl font-bold gold-text">ArtistLink Pro</span>
            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Admin</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/" target="_blank" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
              <ExternalLink className="w-4 h-4" />
              Ver Site
            </Link>
            <Button variant="ghost" size="sm" onClick={signOut} className="text-muted-foreground">
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">
            Bem-vindo ao <span className="gold-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">Gerencie seus artistas, projetos e agenda</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Artistas</span>
            </div>
            <div className="font-display text-3xl font-bold">{artists?.length || 0}</div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Visualizações</span>
            </div>
            <div className="font-display text-3xl font-bold">{stats?.pageViews || 0}</div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <MousePointer className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Cliques</span>
            </div>
            <div className="font-display text-3xl font-bold">{stats?.buttonClicks || 0}</div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Shows</span>
            </div>
            <div className="font-display text-3xl font-bold">{stats?.shows || 0}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="font-display text-xl font-bold mb-4">Ações Rápidas</h2>
          <div className="flex flex-wrap gap-3">
            <Button className="gold-gradient text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Novo Artista
            </Button>
            <Button variant="outline" className="glass-button border-border/50">
              <Calendar className="w-4 h-4 mr-2" />
              Gerenciar Agenda
            </Button>
            <Button variant="outline" className="glass-button border-border/50">
              <MessageCircle className="w-4 h-4 mr-2" />
              Ver Leads
            </Button>
            <Button variant="outline" className="glass-button border-border/50">
              <BarChart3 className="w-4 h-4 mr-2" />
              Estatísticas
            </Button>
          </div>
        </div>

        {/* Artists Grid */}
        <div>
          <h2 className="font-display text-xl font-bold mb-4">Artistas Cadastrados</h2>
          
          {artistsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card p-6 animate-pulse">
                  <div className="aspect-video bg-muted rounded-lg mb-4" />
                  <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : artists && artists.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artists.map((artist) => (
                <div key={artist.id} className="glass-card overflow-hidden hover-lift group">
                  <div className="relative aspect-video overflow-hidden">
                    {artist.banner_url ? (
                      <img
                        src={artist.banner_url}
                        alt={artist.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-muted flex items-center justify-center">
                        <Users className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  </div>

                  <div className="p-4">
                    <h3 className="font-display text-lg font-bold mb-1">{artist.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{artist.genre}</p>
                    
                    <div className="flex gap-2">
                      <Link to={`/dashboard/artista/${artist.slug}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full gold-gradient text-primary-foreground border-0">
                          <Pencil className="w-3 h-3 mr-1" />
                          Editar
                        </Button>
                      </Link>
                      <Link to={`/artista/${artist.slug}`} target="_blank">
                        <Button variant="outline" size="sm" className="glass-button border-border/50">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </Link>
                      <Link to={`/contratante/${artist.slug}`} target="_blank">
                        <Button variant="outline" size="sm" className="glass-button border-border/50">
                          <MessageCircle className="w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold mb-2">Nenhum artista cadastrado</h3>
              <p className="text-muted-foreground mb-4">Comece adicionando seu primeiro artista</p>
              <Button className="gold-gradient text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Artista
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
