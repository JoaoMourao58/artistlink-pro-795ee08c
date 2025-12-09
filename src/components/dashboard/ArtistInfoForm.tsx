import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Artist } from '@/hooks/useArtists';
import { Save, User, Image, Share2, Phone, FileText, Video } from 'lucide-react';
import { ImageUpload } from './ImageUpload';

interface ArtistInfoFormProps {
  artist: Artist;
  onSave: (data: Partial<Artist>) => Promise<void>;
  saving?: boolean;
}

export const ArtistInfoForm = ({ artist, onSave, saving }: ArtistInfoFormProps) => {
  const [formData, setFormData] = useState({
    name: artist.name || '',
    genre: artist.genre || '',
    bio: artist.bio || '',
    full_bio: artist.full_bio || '',
    photo_url: artist.photo_url || '',
    banner_url: artist.banner_url || '',
    main_video_url: artist.main_video_url || '',
    whatsapp_number: artist.whatsapp_number || '',
    press_kit_url: artist.press_kit_url || '',
    social_links: artist.social_links || {}
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      social_links: { ...prev.social_links, [platform]: value }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="w-5 h-5 text-primary" />
            Informações Básicas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Artista</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Nome completo ou artístico"
                className="bg-secondary/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genre">Gênero Musical</Label>
              <Input
                id="genre"
                value={formData.genre}
                onChange={(e) => handleChange('genre', e.target.value)}
                placeholder="Ex: MPB, Rock, Sertanejo"
                className="bg-secondary/50 border-border/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio Curta</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              placeholder="Breve descrição do artista (exibida no card)"
              rows={3}
              className="bg-secondary/50 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_bio">Bio Completa</Label>
            <Textarea
              id="full_bio"
              value={formData.full_bio}
              onChange={(e) => handleChange('full_bio', e.target.value)}
              placeholder="Biografia completa do artista (exibida na página)"
              rows={6}
              className="bg-secondary/50 border-border/50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Media */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Image className="w-5 h-5 text-primary" />
            Imagens e Vídeo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Foto Principal</Label>
            <div className="max-w-xs">
              <ImageUpload
                value={formData.photo_url}
                onChange={(url) => handleChange('photo_url', url)}
                folder="artists/photos"
                aspectRatio="square"
                placeholder="Upload da foto do artista"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Banner</Label>
            <div className="max-w-lg">
              <ImageUpload
                value={formData.banner_url}
                onChange={(url) => handleChange('banner_url', url)}
                folder="artists/banners"
                aspectRatio="banner"
                placeholder="Upload do banner"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="main_video_url" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Vídeo Principal (YouTube/Vimeo embed URL)
            </Label>
            <Input
              id="main_video_url"
              value={formData.main_video_url}
              onChange={(e) => handleChange('main_video_url', e.target.value)}
              placeholder="https://www.youtube.com/embed/..."
              className="bg-secondary/50 border-border/50"
            />
            {formData.main_video_url && (
              <div className="mt-2 w-full max-w-md aspect-video rounded-lg overflow-hidden bg-secondary/50">
                <iframe 
                  src={formData.main_video_url} 
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Phone className="w-5 h-5 text-primary" />
            Contato
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp_number">WhatsApp</Label>
              <Input
                id="whatsapp_number"
                value={formData.whatsapp_number}
                onChange={(e) => handleChange('whatsapp_number', e.target.value)}
                placeholder="5511999999999"
                className="bg-secondary/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="press_kit_url" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Press Kit (URL)
              </Label>
              <Input
                id="press_kit_url"
                value={formData.press_kit_url}
                onChange={(e) => handleChange('press_kit_url', e.target.value)}
                placeholder="https://drive.google.com/..."
                className="bg-secondary/50 border-border/50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Share2 className="w-5 h-5 text-primary" />
            Redes Sociais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={formData.social_links.instagram || ''}
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                placeholder="https://instagram.com/..."
                className="bg-secondary/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                value={formData.social_links.facebook || ''}
                onChange={(e) => handleSocialChange('facebook', e.target.value)}
                placeholder="https://facebook.com/..."
                className="bg-secondary/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtube">YouTube</Label>
              <Input
                id="youtube"
                value={formData.social_links.youtube || ''}
                onChange={(e) => handleSocialChange('youtube', e.target.value)}
                placeholder="https://youtube.com/..."
                className="bg-secondary/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="spotify">Spotify</Label>
              <Input
                id="spotify"
                value={formData.social_links.spotify || ''}
                onChange={(e) => handleSocialChange('spotify', e.target.value)}
                placeholder="https://open.spotify.com/artist/..."
                className="bg-secondary/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tiktok">TikTok</Label>
              <Input
                id="tiktok"
                value={formData.social_links.tiktok || ''}
                onChange={(e) => handleSocialChange('tiktok', e.target.value)}
                placeholder="https://tiktok.com/@..."
                className="bg-secondary/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter/X</Label>
              <Input
                id="twitter"
                value={formData.social_links.twitter || ''}
                onChange={(e) => handleSocialChange('twitter', e.target.value)}
                placeholder="https://twitter.com/..."
                className="bg-secondary/50 border-border/50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={saving}
          className="gold-gradient text-primary-foreground px-8"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </div>
    </form>
  );
};
