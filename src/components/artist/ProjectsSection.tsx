import { Clock, Users, Music, ChevronRight } from 'lucide-react';
import { Project } from '@/data/artists';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ProjectsSectionProps {
  projects: Project[];
  artistName: string;
}

export const ProjectsSection = ({ projects, artistName }: ProjectsSectionProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 md:py-32 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="gold-text">Shows</span> & Projetos
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conheça os diferentes espetáculos disponíveis de {artistName}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="glass-card overflow-hidden hover-lift cursor-pointer group"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <iframe
                  src={project.videoUrl}
                  title={project.name}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
                <div className="absolute inset-0 bg-background/60 group-hover:bg-background/40 transition-all duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center group-hover:scale-110 transition-transform shadow-gold">
                    <ChevronRight className="w-8 h-8 text-primary-foreground ml-1" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    {project.duration}
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Music className="w-4 h-4 text-primary" />
                    {project.repertoire.length} músicas
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-3xl gold-text">
                  {selectedProject.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Video */}
                <div className="aspect-video rounded-xl overflow-hidden">
                  <iframe
                    src={selectedProject.videoUrl}
                    title={selectedProject.name}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">Sobre o Show</h4>
                  <p className="text-muted-foreground">{selectedProject.description}</p>
                </div>

                {/* Technical Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      Duração
                    </h4>
                    <p className="text-muted-foreground">{selectedProject.duration}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      Ficha Técnica
                    </h4>
                    <p className="text-muted-foreground text-sm">{selectedProject.technicalInfo}</p>
                  </div>
                </div>

                {/* Repertoire */}
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Music className="w-5 h-5 text-primary" />
                    Repertório
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedProject.repertoire.map((song, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 rounded-lg bg-secondary/50 text-sm text-muted-foreground"
                      >
                        {song}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
