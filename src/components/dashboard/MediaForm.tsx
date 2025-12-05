import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface MediaFormData {
  url: string;
  title?: string;
  caption?: string;
}

interface MediaFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'photo' | 'video';
  initialData?: MediaFormData | null;
  onSave: (data: MediaFormData) => void;
  loading?: boolean;
}

export const MediaForm = ({ open, onOpenChange, type, initialData, onSave, loading }: MediaFormProps) => {
  const [formData, setFormData] = useState<MediaFormData>({
    url: '',
    title: '',
    caption: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ url: '', title: '', caption: '' });
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {initialData ? 'Editar' : 'Adicionar'} {type === 'photo' ? 'Foto' : 'Vídeo'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="url">
              {type === 'photo' ? 'URL da Imagem' : 'URL do Vídeo (YouTube Embed)'}
            </Label>
            <Input
              id="url"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              placeholder={type === 'photo' ? 'https://images.unsplash.com/...' : 'https://www.youtube.com/embed/...'}
              className="mt-1 bg-secondary/50"
              required
            />
          </div>

          <div>
            <Label htmlFor="label">
              {type === 'photo' ? 'Legenda (opcional)' : 'Título (opcional)'}
            </Label>
            <Input
              id="label"
              value={type === 'photo' ? formData.caption : formData.title}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                [type === 'photo' ? 'caption' : 'title']: e.target.value 
              }))}
              placeholder={type === 'photo' ? 'Descrição da foto' : 'Título do vídeo'}
              className="mt-1 bg-secondary/50"
            />
          </div>

          {/* Preview */}
          {formData.url && (
            <div className="rounded-lg overflow-hidden bg-secondary/30">
              {type === 'photo' ? (
                <img src={formData.url} alt="Preview" className="w-full aspect-video object-cover" />
              ) : (
                <iframe
                  src={formData.url}
                  title="Preview"
                  className="w-full aspect-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              )}
            </div>
          )}

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
