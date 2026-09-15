export const WHATSAPP_NUMBER = "525564723996";

export const NAV_LINKS = [
  { href: "#inicio", label: "Inicio", id: "inicio" },
  { href: "#quienes-somos", label: "Quiénes somos", id: "quienes-somos" },
  { href: "#experiencia", label: "Conoce más", id: "experiencia" },
  { href: "#franquicia", label: "Franquicias", id: "franquicia" },
] as const;

// NOTA: los nombres son los que Luis confirmó (títulos de los videos que
// mandó). Las descripciones son un borrador nuestro para tener algo de texto
// mientras Luis confirma o ajusta la redacción real de cada producto.
// "frames": secuencia de imágenes (no video) que dibuja el módulo de
// Experiencia en un <canvas>, un frame por posición de scroll — la misma
// técnica que el proyecto de referencia de Nescafé, en vez de un <video>
// buscando por currentTime. base = carpeta bajo /public/videos/frames/,
// count = cuántos frame-NNN.webp hay, w/h = tamaño real de esos webp
// (se dibujan tal cual en el canvas, que usa object-fit:cover por CSS).
// "bg": color de fondo real de esos frame-NNN.webp (medido con un script
// que muestrea las esquinas superiores de todos los cuadros de cada
// producto) — cada producto tiene el suyo, ya no un color único para
// los 6. Se usa como fondo de la tarjeta que envuelve el texto+escena de
// ese producto (ver "Tarjeta con marco negro" en components/site/experiencia.tsx).
// Los .mp4 originales (de donde salieron estos frames con ffmpeg) ya no se
// usan en la página y se quitaron de /public/videos — si algún día hace
// falta re-extraer los frames con otro ajuste, pide de nuevo los videos
// fuente o revisa el historial del proyecto.
export const PRODUCTS = [
  {
    n: "01",
    name: "Elote",
    frames: { base: "/videos/frames/elote", count: 61, w: 640, h: 640 },
    bg: "#f1f1f7",
    desc: "El clásico elote asado Mr. Elote, bañado en mayonesa, queso y limón — la base de nuestra receta de siempre.",
  },
  {
    n: "02",
    name: "Takis Blue Heat",
    frames: { base: "/videos/frames/takis-blue-heat", count: 74, w: 640, h: 640 },
    bg: "#ebece7",
    desc: "Elote gratinado coronado con Takis Blue Heat triturados — un toque azul, picante y crocante para los más atrevidos.",
  },
  {
    n: "03",
    name: "Tostielote Flamin Hot",
    frames: { base: "/videos/frames/tostielote-flamin-hot", count: 76, w: 640, h: 640 },
    bg: "#f7f8f7",
    desc: "Elote cargado de Tostitos Flamin' Hot machacados, queso derretido y un toque extra picante.",
  },
  {
    n: "04",
    name: "Tostielote",
    frames: { base: "/videos/frames/tostielote", count: 61, w: 480, h: 640 },
    bg: "#e5e4e5",
    desc: "Nuestra versión insignia con capas de Tostitos crocantes sobre elote gratinado — textura y sabor en cada bocado.",
  },
  {
    n: "05",
    name: "Vaso De Elote",
    frames: { base: "/videos/frames/vaso-de-elote", count: 32, w: 480, h: 640 },
    bg: "#f9f9fa",
    desc: "El esquite de siempre, servido en vaso: grano tierno, mayonesa, queso y limón, listo para llevar.",
  },
  {
    n: "06",
    name: "Volcano",
    frames: { base: "/videos/frames/volcano", count: 61, w: 640, h: 640 },
    bg: "#efeef5",
    desc: "La presentación más espectacular del menú: elote gratinado con un volcán de queso derretido al centro.",
  },
] as const;

export const GALLERY = [
  {
    src: "/images/oxxo.jpg",
    alt: "Sucursal Mr. Elote junto a un Oxxo y un Pasteko",
    caption: "Spots a lado de los grandes como Oxxo",
    w: 828,
    h: 787,
    hideOnMobile: false,
  },
  {
    src: "/images/stadium.jpg",
    alt: "Punto Mr. Elote atendiendo clientes en un estadio",
    caption: "Mr. Elote está en crecimiento",
    w: 1692,
    h: 1124,
    hideOnMobile: false,
  },
  {
    src: "/images/mall.jpg",
    alt: "Sucursal Mr. Elote dentro de plaza comercial",
    caption: "Ambiente familiar",
    w: 991,
    h: 1128,
    hideOnMobile: true,
  },
  {
    src: "/images/opening440.jpg",
    alt: "Apertura de una nueva sucursal Mr. Elote con música en vivo",
    caption: "Modalidad tipo isla de plaza comercial",
    w: 1500,
    h: 1800,
    hideOnMobile: false,
  },
  {
    src: "/images/mariachi.jpg",
    alt: "Mariachi amenizando la apertura de una sucursal Mr. Elote",
    caption: "El mariachi no puede faltar en una gran apertura",
    w: 1252,
    h: 887,
    hideOnMobile: false,
  },
  {
    src: "/images/hero-kiosk.jpg",
    alt: "Kiosco Mr. Elote al atardecer, con su letrero de neón — la misma foto de la intro del sitio",
    caption: "Diseño de marca en cada rincón",
    w: 1114,
    h: 1412,
    hideOnMobile: false,
  },
] as const;

export const PLANS = [
  {
    image: "/images/opening138.jpg",
    badge: "Hazlo tú mismo",
    name: "Punto Xpress",
    price: "$138,000",
    size: "25–30 m²",
    modality: "Isla comercial, kiosco, local a pie de calle o espacio en almacén tipo Walmart.",
    featured: false,
    note: null as string | null,
  },
  {
    image: "/images/mall-card.jpg",
    badge: "Hazlo tú mismo",
    name: "Punto Mr.",
    price: "$168,000",
    size: "30–70 m²",
    modality: "Local a pie de calle o espacio en plaza comercial.",
    featured: true,
    note: null as string | null,
  },
  {
    image: "/images/mariachi.jpg",
    badge: "Llave en mano",
    name: "Punto Xpress",
    price: "$440,000",
    size: "25–30 m²",
    modality: "Isla comercial, kiosco, local a pie de calle o espacio en almacén tipo Walmart.",
    featured: false,
    note: "*Consulta restricciones.",
  },
] as const;

export const PLAN_INCLUDES = [
  "Manual de procedimientos",
  "Recetarios",
  "Capacitación a dueños y primeros empleados",
  "Contrato de franquicia por 5 años",
  "Asesoría técnica del equipo de arquitectura",
  "Ayuda en plataformas (Uber, Rappi, Didi)",
  "Campaña publicitaria de apertura",
];
