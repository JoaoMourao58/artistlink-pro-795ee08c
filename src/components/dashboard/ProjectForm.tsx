import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, X } from 'lucide-react';

interface ProjectFormData {
  name: string;
  description: string;
  video_url: string;
  duration: string;
  technical_info: string;
  repertoire: string[];
  photos: string[];
}

interface ProjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: ProjectFormData | null;
  onSave: (data: ProjectFormData) => void;
  loading?: boolean;
}

export const ProjectForm = ({ open, onOpenChange, initialData, onSave, loading }: ProjectFormProps) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    video_url: '',
    duration: '',
    technical_info: '',
    repertoire: [],
    photos: []
  });
  const [newSong, setNewSong] = useState('');
  const [newPhoto, setNewPhoto] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        description: '',
        video_url: '',
        duration: '',
        technical_info: '',
        repertoire: [],
        photos: []
      });
    }
  }, [initialData, open]);

  const handleAddSong = () => {
    if (newSong.trim()) {
      setFormData(prev => ({ ...prev, repertoire: [...prev.repertoire, newSong.trim()] }));
      setNewSong('');
    }
  };

  const handleRemoveSong = (index: number) => {
    setFormData(prev => ({ ...prev, repertoire: prev.repertoire.filter((_, i) => i !== index) }));
  };

  const handleAddPhoto = () => {
    if (newPhoto.trim()) {
      setFormData(prev => ({ ...prev, photos: [...prev.photos, newPhoto.trim()] }));
      setNewPhoto('');
    }
  };

  const handleRemovePhoto = (index: number) => {
    setFormData(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {initialData ? 'Editar Projeto' : 'Novo Projeto'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome do Projeto</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: O Melhor de Mim"
                className="mt-1 bg-secondary/50"
                required
              />
            </div>
            <div>
              <Label htmlFor="duration">Duração</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="Ex: 90 minutos"
                className="mt-1 bg-secondary/50"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descreva o projeto..."
              className="mt-1 bg-secondary/50 min-h-[100px]"
              required
            />
          </div>

          <div>
            <Label htmlFor="video_url">URL do Vídeo (YouTube Embed)</Label>
            <Input
              id="video_url"
              value={formData.video_url}
              onChange={(e) => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
              placeholder="https://www.youtube.com/embed/..."
              className="mt-1 bg-secondary/50"
            />
          </div>

          <div>
            <Label htmlFor="technical_info">Ficha Técnica</Label>
            <Textarea
              id="technical_info"
              value={formData.technical_info}
              onChange={(e) => setFormData(prev => ({ ...prev, technical_info: e.target.value }))}
              placeholder="Ex: Formação: Voz + Quarteto (Piano, Baixo, Bateria, Guitarra)"
              className="mt-1 bg-secondary/50"
            />
          </div>

          {/* Repertoire */}
          <div>
            <Label>Repertório</Label>
            <div className="flex gap-2 mt-1 mb-2">
              <Input
                value={newSong}
                onChange={(e) => setNewSong(e.target.value)}
                placeholder="Adicionar música..."
                className="bg-secondary/50"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSong())}
              />
              <Button type="button" variant="outline" onClick={handleAddSong} className="shrink-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.repertoire.map((song, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-secondary/50 text-sm flex items-center gap-2"
                >
                  {song}
                  <button type="button" onClick={() => handleRemoveSong(index)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Photos */}
          <div>
            <Label>Fotos (URLs)</Label>
            <div className="flex gap-2 mt-1 mb-2">
              <Input
                value={newPhoto}
                onChange={(e) => setNewPhoto(e.target.value)}
                placeholder="https://..."
                className="bg-secondary/50"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPhoto())}
              />
              <Button type="button" variant="outline" onClick={handleAddPhoto} className="shrink-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {formData.photos.map((photo, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="gold-gradient text-primary-foreground" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
