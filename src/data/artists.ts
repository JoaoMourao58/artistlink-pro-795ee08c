export interface Project {
  id: string;
  name: string;
  description: string;
  videoUrl: string;
  duration: string;
  technicalInfo: string;
  repertoire: string[];
  photos: string[];
}

export interface Show {
  id: string;
  date: string;
  city: string;
  venue: string;
  status: 'confirmed' | 'available';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  photo?: string;
}

export interface Artist {
  id: string;
  slug: string;
  name: string;
  genre: string;
  bio: string;
  fullBio: string;
  bannerUrl: string;
  photoUrl: string;
  mainVideoUrl: string;
  whatsappNumber: string;
  projects: Project[];
  shows: Show[];
  testimonials: Testimonial[];
  photos: string[];
  videos: string[];
  socialLinks: {
    spotify?: string;
    instagram?: string;
    youtube?: string;
    facebook?: string;
    website?: string;
  };
  pressKitUrl?: string;
}

export const artists: Artist[] = [
  {
    id: '1',
    slug: 'altemar-dutra-jr',
    name: 'Altemar Dutra Jr',
    genre: 'Música Romântica • MPB • Standards',
    bio: 'Um dos maiores intérpretes da música romântica brasileira, filho do lendário Altemar Dutra.',
    fullBio: `Altemar Dutra Jr. é um cantor e compositor brasileiro, filho do lendário Altemar Dutra. Com uma carreira consolidada de mais de 30 anos, ele mantém vivo o legado de seu pai enquanto constrói sua própria identidade artística única.

Sua voz marcante e interpretações emocionantes conquistaram públicos em todo o Brasil e no exterior. Altemar Jr. é conhecido por sua versatilidade, transitando com maestria entre a música romântica brasileira, standards internacionais e MPB.

Com apresentações em grandes teatros, casas de show e eventos corporativos, Altemar Dutra Jr. oferece espetáculos memoráveis que emocionam e encantam plateias de todas as idades.`,
    bannerUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=800&fit=crop',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&face',
    mainVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    whatsappNumber: '5511999999999',
    projects: [
      {
        id: 'p1',
        name: 'O Melhor de Mim',
        description: 'Um show intimista com os maiores sucessos da carreira de Altemar Dutra Jr., incluindo clássicos eternizados por seu pai e canções autorais que marcaram sua trajetória.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '90 minutos',
        technicalInfo: 'Formação: Voz + Quarteto (Piano, Baixo, Bateria, Guitarra) | Rider técnico disponível',
        repertoire: [
          'Brigas', 'Eu Te Amo', 'Sentimental Demais', 'Como Uma Onda', 
          'Se Deus Me Ouvisse', 'Perdoa-me', 'A Viagem', 'Você'
        ],
        photos: [
          'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
          'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800'
        ]
      },
      {
        id: 'p2',
        name: 'Altemar Canta Sinatra',
        description: 'Uma homenagem ao maior crooner de todos os tempos. Frank Sinatra revisitado com a voz inconfundível de Altemar Dutra Jr., acompanhado de big band.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '120 minutos',
        technicalInfo: 'Formação: Voz + Big Band (15 músicos) | Produção completa incluída',
        repertoire: [
          'My Way', 'New York, New York', 'Fly Me to the Moon', 'The Way You Look Tonight',
          'Strangers in the Night', 'Come Fly With Me', 'That\'s Life', 'I\'ve Got You Under My Skin'
        ],
        photos: [
          'https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=800',
          'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800'
        ]
      },
      {
        id: 'p3',
        name: 'Carnaval de Marchinhas',
        description: 'As mais animadas marchinhas de carnaval em um show contagiante. Ideal para bailes, festas e eventos de carnaval.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '60-90 minutos',
        technicalInfo: 'Formação: Voz + Bandinha (7 músicos) | Animadores e passistas opcionais',
        repertoire: [
          'Aurora', 'Cidade Maravilhosa', 'Mamãe Eu Quero', 'Ó Abre Alas',
          'Bandeira Branca', 'Cachaça', 'Touradas em Madri', 'Sassaricando'
        ],
        photos: [
          'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800'
        ]
      },
      {
        id: 'p4',
        name: 'Celebração da Vida',
        description: 'Um espetáculo emocionante que celebra a vida através da música. Sucessos nacionais e internacionais que marcaram gerações.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '90 minutos',
        technicalInfo: 'Formação: Voz + Trio ou Quinteto | Adaptável ao evento',
        repertoire: [
          'What a Wonderful World', 'Trem das Onze', 'Aquarela do Brasil', 'Eu Sei Que Vou Te Amar',
          'Carinhoso', 'Wave', 'The Girl from Ipanema', 'Mas Que Nada'
        ],
        photos: [
          'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800'
        ]
      }
    ],
    shows: [
      { id: 's1', date: '2024-02-14', city: 'São Paulo', venue: 'Teatro Municipal', status: 'confirmed' },
      { id: 's2', date: '2024-02-28', city: 'Rio de Janeiro', venue: 'Vivo Rio', status: 'confirmed' },
      { id: 's3', date: '2024-03-15', city: 'Belo Horizonte', venue: 'Palácio das Artes', status: 'available' },
      { id: 's4', date: '2024-03-22', city: 'Curitiba', venue: 'Teatro Guaíra', status: 'available' },
      { id: 's5', date: '2024-04-05', city: 'Porto Alegre', venue: 'Auditório Araújo Vianna', status: 'available' }
    ],
    testimonials: [
      {
        id: 't1',
        name: 'Maria Helena Santos',
        role: 'Produtora Cultural - SESC São Paulo',
        text: 'Altemar Dutra Jr. entregou um show impecável. Profissionalismo exemplar e uma performance que emocionou toda a plateia. Já estamos negociando a próxima temporada.',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
      },
      {
        id: 't2',
        name: 'Roberto Carvalho',
        role: 'Secretário de Cultura - Prefeitura de Campinas',
        text: 'O evento foi um sucesso absoluto. A apresentação do Altemar superou todas as expectativas. Público lotou a praça e pediu bis várias vezes.',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
      }
    ],
    photos: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800',
      'https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=800',
      'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800',
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800'
    ],
    videos: [
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
      'https://www.youtube.com/embed/dQw4w9WgXcQ'
    ],
    socialLinks: {
      spotify: 'https://spotify.com',
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com',
      facebook: 'https://facebook.com'
    },
    pressKitUrl: '#'
  }
];

export const getArtistBySlug = (slug: string): Artist | undefined => {
  return artists.find(artist => artist.slug === slug);
};
