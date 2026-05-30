// ╔══════════════════════════════════════════════════════════════╗
// ║          LoveFlix — ARQUIVO DE CONFIGURAÇÃO DO CASAL         ║
// ║                                                              ║
// ║  ✅ ESTE É O ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR           ║
// ║  📁 As fotos ficam na pasta: couple/photos/                  ║
// ║                                                              ║
// ║  ESTRUTURA DA PASTA couple/:                                 ║
// ║    couple/                                                   ║
// ║    ├── couple.js       ← você está aqui (edite este)         ║
// ║    └── photos/                                               ║
// ║        ├── hero.png    ← foto principal (banner)             ║
// ║        ├── profile.png ← avatar circular (tela de perfil)    ║
// ║        ├── m1.png      ← galeria: foto 1                     ║
// ║        ├── m2.png      ← galeria: foto 2                     ║
// ║        ├── m3.png      ← galeria: foto 3                     ║
// ║        ├── m4.png      ← galeria: foto 4                     ║
// ║        └── m5.png      ← galeria: foto 5 (e timeline)        ║
// ╚══════════════════════════════════════════════════════════════╝

const COUPLE_CONFIG = {

  // ──────────────────────────────────────────────────────────────
  // 👫 IDENTIDADE DO CASAL
  // ──────────────────────────────────────────────────────────────

  names: {
    person1: "Ana",       // ← nome da pessoa 1
    person2: "Carlos"     // ← nome da pessoa 2
  },

  // Título principal exibido no site (ex: "Ana & Carlos")
  coupleTitle: "Ana & Carlos",

  // Subtítulo romântico exibido abaixo do título
  tagline: "1º Grande Amor",

  // ──────────────────────────────────────────────────────────────
  // 🔐 DATA DE INÍCIO — esta é a SENHA de acesso ao site
  // Formato: "AAAA-MM-DD"  →  ex: "2019-03-15" = 15 de março de 2019
  // ──────────────────────────────────────────────────────────────

  startDate: "2019-03-15",

  // ──────────────────────────────────────────────────────────────
  // 🏆 BADGES (selos exibidos no topo do hero)
  // ──────────────────────────────────────────────────────────────

  badges: [
    "❤️ Top 1 Casais Mais Apaixonados",
    "🌟 Amor Eterno"
  ],

  // ──────────────────────────────────────────────────────────────
  // 📝 BIO — texto curto de apresentação (máx. 3 linhas recomendado)
  // ──────────────────────────────────────────────────────────────

  bio: "Te amo não somente pelo que és, mas pelo que sou quando estou contigo. Te amo porque puseste a mão na minha alma e passaste por debaixo das minhas fraquezas e com teu amor fizeste sair à luz toda a beleza que ninguém antes de ti conseguiu encontrar.",

  // ──────────────────────────────────────────────────────────────
  // 🖼️ FOTOS — apenas substitua os arquivos em couple/photos/
  //    Nomes dos arquivos DEVEM permanecer os mesmos
  // ──────────────────────────────────────────────────────────────

  photos: {
    hero:    "couple/photos/hero.png",     // foto principal (banner)
    profile: "couple/photos/profile.png"   // avatar circular
  },

  // ──────────────────────────────────────────────────────────────
  // 🎞️ GALERIA DE MOMENTOS (seção "Melhores Momentos")
  //    → Troque apenas title e label; o src já aponta para couple/photos/
  // ──────────────────────────────────────────────────────────────

  moments: [
    { src: "couple/photos/m1.png", title: "Nossa Primeira Viagem",  label: "Aventura Inesquecível" },
    { src: "couple/photos/m2.png", title: "Jantar Especial",        label: "Noite Perfeita"         },
    { src: "couple/photos/m3.png", title: "Pôr do Sol na Praia",    label: "Paz e Amor"             },
    { src: "couple/photos/m4.png", title: "Nosso Abraço Favorito",  label: "Abraço Eterno"          },
    { src: "couple/photos/m5.png", title: "Dança e Alegria",        label: "Celebrando Nós"         }
  ],

  // ──────────────────────────────────────────────────────────────
  // 🔥 EM ALTA — fotos em destaque no topo da home
  // ──────────────────────────────────────────────────────────────

  hot: [
    { src: "couple/photos/m3.png", title: "Pôr do Sol"        },
    { src: "couple/photos/m1.png", title: "Viagem Juntos"      },
    { src: "couple/photos/m2.png", title: "Jantar Romântico"   }
  ],

  // ──────────────────────────────────────────────────────────────
  // 📖 ABAS DE CONTEÚDO (seção inferior da home)
  // ──────────────────────────────────────────────────────────────

  tabs: {
    historia: {
      label: "História",
      content: "Nossa história começou em 15 de março de 2019, quando dois mundos se encontraram e nunca mais quiseram se separar. Cada dia ao seu lado é uma nova página de um livro lindo que escrevo com o maior prazer do mundo."
    },

    momentos: {
      label: "Momentos",
      content: "Cada sorriso compartilhado, cada aventura vivida, cada silêncio confortável — são esses momentos que guardarei para sempre no coração."
    },

    abracosBeijos: {
      label: "Abraços e Beijos",
      content: "Seu abraço é o lugar mais seguro do mundo. Cada beijo é uma declaração silenciosa de tudo que sinto por você. Poderia ficar assim para sempre."
    },

    cartasDeAmor: {
      label: "Cartas de Amor",
      content: "Amor meu,\n\nNão existe palavra grande o suficiente para descrever o que sinto por você. Você transformou minha vida de uma forma que só almas verdadeiras conseguem. Obrigado por existir, por me escolher todos os dias e por fazer o ordinário se transformar em extraordinário.\n\nSempre seu(sua),\nCom todo meu amor ❤️"
    },

    detalhes: {
      label: "Detalhes",
      // Cada item: { icon, label, value }
      // Use "{{startDate}}" no value para inserir a data automaticamente
      items: [
        { icon: "📅", label: "Juntos desde",           value: "15 de Março de 2019"       },
        { icon: "📍", label: "Onde nos conhecemos",    value: "São Paulo, SP"             },
        { icon: "💑", label: "Primeira viagem juntos", value: "Setembro de 2019"          },
        { icon: "🌟", label: "Conquista favorita",     value: "Nos escolher todo dia"     },
        { icon: "🎵", label: "Nossa música",           value: "Perfect — Ed Sheeran"      }
      ]
    }
  },

  // ──────────────────────────────────────────────────────────────
  // 📅 LINHA DO TEMPO — marcos do relacionamento (cards horizontais)
  //    date: mês e ano do evento   |   icon: emoji representativo
  //    title / description: texto do card
  // ──────────────────────────────────────────────────────────────

  timeline: [
    {
      src: "couple/photos/m4.png",
      date: "Março 2019",
      icon: "✨",
      title: "Primeiro Encontro",
      description: "Dois mundos se encontraram e nunca mais quiseram se separar. Aquele dia mudou nossas vidas para sempre."
    },
    {
      src: "couple/photos/m2.png",
      date: "Abril 2019",
      icon: "💞",
      title: "Primeiro Beijo",
      description: "Debaixo de um céu estrelado, o momento que selou tudo. O começo de algo extraordinário."
    },
    {
      src: "couple/photos/m1.png",
      date: "Setembro 2019",
      icon: "✈️",
      title: "Primeira Viagem Juntos",
      description: "Exploramos o mundo de mãos dadas pela primeira vez. Qualquer lugar é especial ao lado um do outro."
    },
    {
      src: "couple/photos/m5.png",
      date: "Dezembro 2019",
      icon: "🎄",
      title: "Primeiro Natal",
      description: "Entre risos, presentes e muito amor, entendemos que éramos uma família. O melhor Natal das nossas vidas."
    },
    {
      src: "couple/photos/m3.png",
      date: "Março 2021",
      icon: "🏠",
      title: "Nosso Primeiro Lar",
      description: "Construímos nosso cantinho e transformamos quatro paredes em lar. Onde você estiver, é onde eu quero estar."
    },
    {
      src: "couple/photos/hero.png",
      date: "Março 2024",
      icon: "🌟",
      title: "5 Anos de Amor",
      description: "Cinco anos de histórias, aventuras, crescimento e muito amor. O melhor ainda está por vir."
    }
  ],

  // ──────────────────────────────────────────────────────────────
  // 🎬 MODO CINEMA — slideshow fullscreen com música
  // ──────────────────────────────────────────────────────────────

  cinema: {
    enabled: true,
    // ID do vídeo do YouTube para música de fundo (apenas o código após "?v=")
    // Deixe "" para desativar a música
    musicVideoId: "2Vv-BfVoq4g",   // "Perfect" — Ed Sheeran
    autoplayInterval: 5500          // milissegundos por slide (5500 = 5,5 segundos)
  }

};
