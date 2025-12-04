import { Download, FileText, Image, Video, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PressKitSectionProps {
  artistName: string;
  pressKitUrl?: string;
}

export const PressKitSection = ({ artistName, pressKitUrl }: PressKitSectionProps) => {
  return (
    <section id="presskit" className="py-20 md:py-32 bg-secondary/30">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title">
            <span className="gold-text">Press Kit</span> Profissional
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Material completo para divulgação: releases, fotos em alta resolução, vídeos e informações técnicas
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6 text-center">
              <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Releases</h3>
              <p className="text-sm text-muted-foreground">
                Textos completos para imprensa e divulgação
              </p>
            </div>

            <div className="glass-card p-6 text-center">
              <Image className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Fotos HD</h3>
              <p className="text-sm text-muted-foreground">
                Imagens profissionais em alta resolução
              </p>
            </div>

            <div className="glass-card p-6 text-center">
              <Video className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Vídeos</h3>
              <p className="text-sm text-muted-foreground">
                Performances e teasers para divulgação
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gold-gradient text-primary-foreground font-semibold text-lg px-8 shadow-gold hover:opacity-90 transition-opacity"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Press Kit
            </Button>

            <Button 
              variant="outline" 
              size="lg"
              className="glass-button border-border/50 text-lg px-8"
            >
              <QrCode className="mr-2 h-5 w-5" />
              Gerar QR Code
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
