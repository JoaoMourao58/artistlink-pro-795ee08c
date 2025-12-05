import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useArtist, useArtistProjects, useArtistPhotos, useArtistVideos, Project, Photo, Video } from '@/hooks/useArtists';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent 
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { SortableItem } from '@/components/dashboard/SortableItem';
import { ProjectForm } from '@/components/dashboard/ProjectForm';
import { MediaForm } from '@/components/dashboard/MediaForm';
import { 
  ArrowLeft, Plus, Music, Image, Video as VideoIcon, 
  ExternalLink, Clock, Users, Save, Eye
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ArtistEditor = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: artist, isLoading: artistLoading } = useArtist(slug || '');
  const { data: projects } = useArtistProjects(artist?.id || '');
  const { data: photos } = useArtistPhotos(artist?.id || '');
  const { data: videos } = useArtistVideos(artist?.id || '');

  const [localProjects, setLocalProjects] = useState<Project[]>([]);
  const [localPhotos, setLocalPhotos] = useState<Photo[]>([]);
  const [localVideos, setLocalVideos] = useState<Video[]>([]);

  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [photoFormOpen, setPhotoFormOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [videoFormOpen, setVideoFormOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);

  const [deleteDialog, setDeleteDialog] = useState<{ type: string; id: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (projects) setLocalProjects([...projects]);
  }, [projects]);

  useEffect(() => {
    if (photos) setLocalPhotos([...photos]);
  }, [photos]);

  useEffect(() => {
    if (videos) setLocalVideos([...videos]);
  }, [videos]);

  const handleDragEnd = (event: DragEndEvent, type: 'projects' | 'photos' | 'videos') => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    if (type === 'projects') {
      setLocalProjects((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    } else if (type === 'photos') {
      setLocalPhotos((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    } else {
      setLocalVideos((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const saveOrder = async (type: 'projects' | 'photos' | 'videos') => {
    setSaving(true);
    try {
      const items = type === 'projects' ? localProjects : type === 'photos' ? localPhotos : localVideos;
      const updates = items.map((item, index) => ({
        id: item.id,
        sort_order: index
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from(type)
          .update({ sort_order: update.sort_order })
          .eq('id', update.id);
        
        if (error) throw error;
      }

      toast({ title: 'Ordem salva com sucesso!' });
      queryClient.invalidateQueries({ queryKey: [type, artist?.id] });
    } catch (error) {
      toast({ title: 'Erro ao salvar ordem', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveProject = async (data: any) => {
    setSaving(true);
    try {
      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(data)
          .eq('id', editingProject.id);
        if (error) throw error;
        toast({ title: 'Projeto atualizado!' });
      } else {
        const { error } = await supabase
          .from('projects')
          .insert({ ...data, artist_id: artist?.id, sort_order: localProjects.length });
        if (error) throw error;
        toast({ title: 'Projeto criado!' });
      }
      setProjectFormOpen(false);
      setEditingProject(null);
      queryClient.invalidateQueries({ queryKey: ['projects', artist?.id] });
    } catch (error) {
      toast({ title: 'Erro ao salvar projeto', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleSavePhoto = async (data: any) => {
    setSaving(true);
    try {
      if (editingPhoto) {
        const { error } = await supabase
          .from('photos')
          .update({ url: data.url, caption: data.caption })
          .eq('id', editingPhoto.id);
        if (error) throw error;
        toast({ title: 'Foto atualizada!' });
      } else {
        const { error } = await supabase
          .from('photos')
          .insert({ url: data.url, caption: data.caption, artist_id: artist?.id, sort_order: localPhotos.length });
        if (error) throw error;
        toast({ title: 'Foto adicionada!' });
      }
      setPhotoFormOpen(false);
      setEditingPhoto(null);
      queryClient.invalidateQueries({ queryKey: ['photos', artist?.id] });
    } catch (error) {
      toast({ title: 'Erro ao salvar foto', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveVideo = async (data: any) => {
    setSaving(true);
    try {
      if (editingVideo) {
        const { error } = await supabase
          .from('videos')
          .update({ url: data.url, title: data.title })
          .eq('id', editingVideo.id);
        if (error) throw error;
        toast({ title: 'Vídeo atualizado!' });
      } else {
        const { error } = await supabase
          .from('videos')
          .insert({ url: data.url, title: data.title, artist_id: artist?.id, sort_order: localVideos.length });
        if (error) throw error;
        toast({ title: 'Vídeo adicionado!' });
      }
      setVideoFormOpen(false);
      setEditingVideo(null);
      queryClient.invalidateQueries({ queryKey: ['videos', artist?.id] });
    } catch (error) {
      toast({ title: 'Erro ao salvar vídeo', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteDialog) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from(deleteDialog.type as any)
        .delete()
        .eq('id', deleteDialog.id);
      if (error) throw error;
      toast({ title: 'Item removido!' });
      queryClient.invalidateQueries({ queryKey: [deleteDialog.type, artist?.id] });
    } catch (error) {
      toast({ title: 'Erro ao remover', variant: 'destructive' });
    } finally {
      setSaving(false);
      setDeleteDialog(null);
    }
  };

  if (authLoading || artistLoading || !artist) {
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
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 hover:bg-secondary/50 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-display text-lg font-bold">{artist.name}</h1>
              <p className="text-xs text-muted-foreground">Editor de Página</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link to={`/artista/${artist.slug}`} target="_blank">
              <Button variant="outline" size="sm" className="glass-button border-border/50">
                <Eye className="w-4 h-4 mr-2" />
                Ver Página
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="projects" className="gap-2">
              <Music className="w-4 h-4" />
              Projetos
            </TabsTrigger>
            <TabsTrigger value="photos" className="gap-2">
              <Image className="w-4 h-4" />
              Fotos
            </TabsTrigger>
            <TabsTrigger value="videos" className="gap-2">
              <VideoIcon className="w-4 h-4" />
              Vídeos
            </TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">Projetos / Shows</h2>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => saveOrder('projects')}
                  disabled={saving}
                  className="glass-button border-border/50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Ordem
                </Button>
                <Button 
                  onClick={() => { setEditingProject(null); setProjectFormOpen(true); }}
                  className="gold-gradient text-primary-foreground"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Projeto
                </Button>
              </div>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, 'projects')}>
              <SortableContext items={localProjects.map(p => p.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  {localProjects.map((project) => (
                    <SortableItem
                      key={project.id}
                      id={project.id}
                      onEdit={() => { setEditingProject(project); setProjectFormOpen(true); }}
                      onDelete={() => setDeleteDialog({ type: 'projects', id: project.id })}
                    >
                      <div className="flex items-center gap-4">
                        {project.video_url && (
                          <div className="w-24 aspect-video rounded-lg overflow-hidden bg-secondary/50 shrink-0">
                            <iframe src={project.video_url} className="w-full h-full pointer-events-none" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <h3 className="font-semibold truncate">{project.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {project.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Music className="w-3 h-3" />
                              {project.repertoire?.length || 0} músicas
                            </span>
                          </div>
                        </div>
                      </div>
                    </SortableItem>
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {localProjects.length === 0 && (
              <div className="glass-card p-12 text-center">
                <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum projeto cadastrado</p>
              </div>
            )}
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">Galeria de Fotos</h2>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => saveOrder('photos')}
                  disabled={saving}
                  className="glass-button border-border/50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Ordem
                </Button>
                <Button 
                  onClick={() => { setEditingPhoto(null); setPhotoFormOpen(true); }}
                  className="gold-gradient text-primary-foreground"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Foto
                </Button>
              </div>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, 'photos')}>
              <SortableContext items={localPhotos.map(p => p.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  {localPhotos.map((photo) => (
                    <SortableItem
                      key={photo.id}
                      id={photo.id}
                      onEdit={() => { setEditingPhoto(photo); setPhotoFormOpen(true); }}
                      onDelete={() => setDeleteDialog({ type: 'photos', id: photo.id })}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary/50 shrink-0">
                          <img src={photo.url} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-muted-foreground truncate">{photo.caption || photo.url}</p>
                        </div>
                      </div>
                    </SortableItem>
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {localPhotos.length === 0 && (
              <div className="glass-card p-12 text-center">
                <Image className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhuma foto cadastrada</p>
              </div>
            )}
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">Galeria de Vídeos</h2>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => saveOrder('videos')}
                  disabled={saving}
                  className="glass-button border-border/50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Ordem
                </Button>
                <Button 
                  onClick={() => { setEditingVideo(null); setVideoFormOpen(true); }}
                  className="gold-gradient text-primary-foreground"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Vídeo
                </Button>
              </div>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, 'videos')}>
              <SortableContext items={localVideos.map(v => v.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  {localVideos.map((video) => (
                    <SortableItem
                      key={video.id}
                      id={video.id}
                      onEdit={() => { setEditingVideo(video); setVideoFormOpen(true); }}
                      onDelete={() => setDeleteDialog({ type: 'videos', id: video.id })}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-32 aspect-video rounded-lg overflow-hidden bg-secondary/50 shrink-0">
                          <iframe src={video.url} className="w-full h-full pointer-events-none" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold truncate">{video.title || 'Vídeo'}</h3>
                          <p className="text-sm text-muted-foreground truncate">{video.url}</p>
                        </div>
                      </div>
                    </SortableItem>
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {localVideos.length === 0 && (
              <div className="glass-card p-12 text-center">
                <VideoIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum vídeo cadastrado</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Forms */}
      <ProjectForm
        open={projectFormOpen}
        onOpenChange={setProjectFormOpen}
        initialData={editingProject ? {
          name: editingProject.name,
          description: editingProject.description,
          video_url: editingProject.video_url || '',
          duration: editingProject.duration || '',
          technical_info: editingProject.technical_info || '',
          repertoire: editingProject.repertoire || [],
          photos: editingProject.photos || []
        } : null}
        onSave={handleSaveProject}
        loading={saving}
      />

      <MediaForm
        open={photoFormOpen}
        onOpenChange={setPhotoFormOpen}
        type="photo"
        initialData={editingPhoto ? { url: editingPhoto.url, caption: editingPhoto.caption || '' } : null}
        onSave={handleSavePhoto}
        loading={saving}
      />

      <MediaForm
        open={videoFormOpen}
        onOpenChange={setVideoFormOpen}
        type="video"
        initialData={editingVideo ? { url: editingVideo.url, title: editingVideo.title || '' } : null}
        onSave={handleSaveVideo}
        loading={saving}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteDialog} onOpenChange={() => setDeleteDialog(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ArtistEditor;
