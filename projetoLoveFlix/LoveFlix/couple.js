// ============================================================
//  LoveFlix — Arquivo de Configuração do Casal
//  Este é o ÚNICO arquivo que precisa ser editado para
//  personalizar o site para cada casal.
// ============================================================

const COUPLE_CONFIG = {
  // --- Identidade ---
  names: {
    person1: "Ana",
    person2: "Carlos"
  },
  coupleTitle: "Ana & Carlos",
  tagline: "1º Grande Amor",

  // --- DATA DE INÍCIO — esta é a senha de acesso ao site ---
  // Formato: "AAAA-MM-DD"
  startDate: "2019-03-15",

  // --- Badges exibidos abaixo do título ---
  badges: [
    "❤️ Top 1 Casais Mais Apaixonados",
    "🌟 Amor Eterno"
  ],

  // --- Texto de bio (máx. 3 linhas recomendado) ---
  bio: "Te amo não somente pelo que és, mas pelo que sou quando estou contigo. Te amo porque puseste a mão na minha alma e passaste por debaixo das minhas fraquezas e com teu amor fizeste sair à luz toda a beleza que ninguém antes de ti conseguiu encontrar.",

  // --- Fotos ---
  photos: {
    // Foto principal do hero (banner)
    hero: "img/hero.png",
    // Avatar circular na tela de seleção de perfil
    profile: "img/profile.png"
  },

  // --- Galeria de Momentos (seção "Melhores Momentos") ---
  moments: [
    { src: "img/m1.png", title: "Nossa Primeira Viagem",  label: "Aventura Inesquecível" },
    { src: "img/m2.png", title: "Jantar Especial",        label: "Noite Perfeita" },
    { src: "img/m3.png", title: "Pôr do Sol na Praia",    label: "Paz e Amor" },
    { src: "img/m4.png", title: "Nosso Abraço Favorito",  label: "Abraço Eterno" },
    { src: "img/m5.png", title: "Dança e Alegria",        label: "Celebrando Nós" }
  ],

  // --- Seção "Em Alta" (momentos em destaque no topo) ---
  hot: [
    { src: "img/m3.png", title: "Pôr do Sol" },
    { src: "img/m1.png", title: "Viagem Juntos" },
    { src: "img/m2.png", title: "Jantar Romântico" }
  ],

  // --- Abas de conteúdo (seção inferior do home) ---
  // Cada aba pode ter um texto ou lista de itens
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
      items: [
        { icon: "📅", label: "Juntos desde", value: "15 de Março de 2019" },
        { icon: "📍", label: "Onde nos conhecemos", value: "São Paulo, SP" },
        { icon: "💑", label: "Primeira viagem juntos", value: "Setembro de 2019" },
        { icon: "🌟", label: "Conquista favorita", value: "Nos escolher todo dia" },
        { icon: "🎵", label: "Nossa música", value: "Perfect — Ed Sheeran" }
      ]
    }
  },

  // --- Timeline do Relacionamento (seção horizontal de cards) ---
  // Cada marco do relacionamento — do primeiro encontro até hoje
  timeline: [
    {
      src: "img/m4.png",
      date: "Março 2019",
      icon: "✨",
      title: "Primeiro Encontro",
      description: "Dois mundos se encontraram e nunca mais quiseram se separar. Aquele dia mudou nossas vidas para sempre."
    },
    {
      src: "img/m2.png",
      date: "Abril 2019",
      icon: "💞",
      title: "Primeiro Beijo",
      description: "Debaixo de um céu estrelado, o momento que selou tudo. O começo de algo extraordinário."
    },
    {
      src: "img/m1.png",
      date: "Setembro 2019",
      icon: "✈️",
      title: "Primeira Viagem Juntos",
      description: "Exploramos o mundo de mãos dadas pela primeira vez. Qualquer lugar é especial ao lado um do outro."
    },
    {
      src: "img/m5.png",
      date: "Dezembro 2019",
      icon: "🎄",
      title: "Primeiro Natal",
      description: "Entre risos, presentes e muito amor, entendemos que éramos uma família. O melhor Natal das nossas vidas."
    },
    {
      src: "img/m3.png",
      date: "Março 2021",
      icon: "🏠",
      title: "Nosso Primeiro Lar",
      description: "Construímos nosso cantinho e transformamos quatro paredes em lar. Onde você estiver, é onde eu quero estar."
    },
    {
      src: "img/hero.png",
      date: "Março 2024",
      icon: "🌟",
      title: "5 Anos de Amor",
      description: "Cinco anos de histórias, aventuras, crescimento e muito amor. O melhor ainda está por vir."
    }
  ],

  // --- Modo Cinema ---
  // O botão "Ver Nossa História" ativa um slideshow fullscreen com Ken Burns e música
  cinema: {
    enabled: true,
    // ID do vídeo no YouTube para música de fundo (só o código, ex: "2Vv-BfVoq4g")
    // Deixe "" para desativar a música
    musicVideoId: "2Vv-BfVoq4g",   // "Perfect" — Ed Sheeran
    autoplayInterval: 5500,          // milissegundos por slide (5.5s)
  }
};
