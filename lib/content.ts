import { asset } from "@/lib/utils";

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
    // Video nuevo del personaje (Corn_character_holding_elote): se le quitan
    // los primeros 2 s y queda recortado en cuadrado; 48 frames a 12 fps.
    frames: { base: asset("/videos/frames/elote"), count: 48, w: 640, h: 640 },
    bg: "#f5f5f5",
    desc: "El clásico elote asado Mr. Elote, bañado en mayonesa, queso y limón — la base de nuestra receta de siempre.",
  },
  {
    n: "02",
    name: "Takis Blue Heat",
    frames: { base: asset("/videos/frames/takis-blue-heat"), count: 74, w: 640, h: 640 },
    bg: "#eaece3",
    desc: "Elote gratinado coronado con Takis Blue Heat triturados — un toque azul, picante y crocante para los más atrevidos.",
  },
  {
    n: "03",
    name: "Tostielote Flamin Hot",
    frames: { base: asset("/videos/frames/tostielote-flamin-hot"), count: 76, w: 640, h: 640 },
    bg: "#f6f9f7",
    desc: "Elote cargado de Tostitos Flamin' Hot machacados, queso derretido y un toque extra picante.",
  },
  {
    n: "04",
    name: "Tostielote",
    frames: { base: asset("/videos/frames/tostielote"), count: 61, w: 480, h: 640 },
    bg: "#e8e8e9",
    desc: "Nuestra versión insignia con capas de Tostitos crocantes sobre elote gratinado — textura y sabor en cada bocado.",
  },
  {
    n: "05",
    name: "Vaso De Elote",
    frames: { base: asset("/videos/frames/vaso-de-elote"), count: 32, w: 480, h: 640 },
    bg: "#f9f9fa",
    desc: "El esquite de siempre, servido en vaso: grano tierno, mayonesa, queso y limón, listo para llevar.",
  },
  {
    n: "06",
    name: "Volcano",
    // Recortado 64px de la derecha (quedó 576x640): así no se ve cortado el
    // bowl contra el borde.
    frames: { base: asset("/videos/frames/volcano"), count: 61, w: 576, h: 640 },
    bg: "#eceef2",
    desc: "La presentación más espectacular del menú: elote gratinado con un volcán de queso derretido al centro.",
  },
] as const;

// Fotos generales que mandó el cliente (numeradas como en su zip, #19–#55),
// convertidas a JPG de 1100px. Cada una lleva el texto de la categoría a la
// que pertenece; la galería las va agrandando una por una al hacer scroll.
export const GALLERY = [
  { src: asset("/images/galeria/19.jpg"), srcSm: asset("/images/galeria/19-sm.jpg"), alt: "Sucursal Mr. Elote con su diseño de marca" },
  { src: asset("/images/galeria/20.jpg"), srcSm: asset("/images/galeria/20-sm.jpg"), alt: "Clientes disfrutando productos Mr. Elote" },
  { src: asset("/images/galeria/21.jpg"), srcSm: asset("/images/galeria/21-sm.jpg"), alt: "Clientes disfrutando productos Mr. Elote" },
  { src: asset("/images/galeria/22.jpg"), srcSm: asset("/images/galeria/22-sm.jpg"), alt: "Inauguración de una sucursal Mr. Elote" },
  { src: asset("/images/galeria/23.jpg"), srcSm: asset("/images/galeria/23-sm.jpg"), alt: "Inauguración de una sucursal Mr. Elote" },
  { src: asset("/images/galeria/24.jpg"), srcSm: asset("/images/galeria/24-sm.jpg"), alt: "Inauguración de una sucursal Mr. Elote" },
  { src: asset("/images/galeria/25.jpg"), srcSm: asset("/images/galeria/25-sm.jpg"), alt: "Inauguración de una sucursal Mr. Elote" },
  { src: asset("/images/galeria/26.jpg"), srcSm: asset("/images/galeria/26-sm.jpg"), alt: "Clientes disfrutando productos Mr. Elote" },
  { src: asset("/images/galeria/27.jpg"), srcSm: asset("/images/galeria/27-sm.jpg"), alt: "Clientes disfrutando productos Mr. Elote" },
  { src: asset("/images/galeria/28.jpg"), srcSm: asset("/images/galeria/28-sm.jpg"), alt: "Clientes disfrutando productos Mr. Elote" },
  { src: asset("/images/galeria/29.jpg"), srcSm: asset("/images/galeria/29-sm.jpg"), alt: "Clientes disfrutando productos Mr. Elote" },
  { src: asset("/images/galeria/30.jpg"), srcSm: asset("/images/galeria/30-sm.jpg"), alt: "Mariachi en la apertura de una sucursal Mr. Elote" },
  { src: asset("/images/galeria/31.jpg"), srcSm: asset("/images/galeria/31-sm.jpg"), alt: "Sucursal Mr. Elote en plaza comercial" },
  { src: asset("/images/galeria/32.jpg"), srcSm: asset("/images/galeria/32-sm.jpg"), alt: "Inauguración de una sucursal Mr. Elote" },
  { src: asset("/images/galeria/33.jpg"), srcSm: asset("/images/galeria/33-sm.jpg"), alt: "Inauguración de una sucursal Mr. Elote" },
  { src: asset("/images/galeria/34.jpg"), srcSm: asset("/images/galeria/34-sm.jpg"), alt: "Clientes disfrutando productos Mr. Elote" },
  { src: asset("/images/galeria/35.jpg"), srcSm: asset("/images/galeria/35-sm.jpg"), alt: "Clientes disfrutando productos Mr. Elote" },
  { src: asset("/images/galeria/36.jpg"), srcSm: asset("/images/galeria/36-sm.jpg"), alt: "Mariachi en la apertura de una sucursal Mr. Elote" },
  { src: asset("/images/galeria/37.jpg"), srcSm: asset("/images/galeria/37-sm.jpg"), alt: "Clientes disfrutando productos Mr. Elote" },
  { src: asset("/images/galeria/38.jpg"), srcSm: asset("/images/galeria/38-sm.jpg"), alt: "Mariachi en la apertura de una sucursal Mr. Elote" },
  { src: asset("/images/galeria/39.jpg"), srcSm: asset("/images/galeria/39-sm.jpg"), alt: "Mariachi en la apertura de una sucursal Mr. Elote" },
  { src: asset("/images/galeria/40.jpg"), srcSm: asset("/images/galeria/40-sm.jpg"), alt: "Sucursal Mr. Elote en plaza comercial" },
  { src: asset("/images/galeria/41.jpg"), srcSm: asset("/images/galeria/41-sm.jpg"), alt: "Clientes disfrutando productos Mr. Elote" },
  { src: asset("/images/galeria/42.jpg"), srcSm: asset("/images/galeria/42-sm.jpg"), alt: "Sucursal Mr. Elote en plaza comercial" },
  { src: asset("/images/galeria/43.jpg"), srcSm: asset("/images/galeria/43-sm.jpg"), alt: "Mariachi en la apertura de una sucursal Mr. Elote" },
  { src: asset("/images/galeria/44.jpg"), srcSm: asset("/images/galeria/44-sm.jpg"), alt: "Sucursal Mr. Elote en plaza comercial" },
  { src: asset("/images/galeria/45.jpg"), srcSm: asset("/images/galeria/45-sm.jpg"), alt: "Clientes disfrutando productos Mr. Elote" },
  { src: asset("/images/galeria/46.jpg"), srcSm: asset("/images/galeria/46-sm.jpg"), alt: "Inauguración de una sucursal Mr. Elote" },
  { src: asset("/images/galeria/47.jpg"), srcSm: asset("/images/galeria/47-sm.jpg"), alt: "Clientes disfrutando productos Mr. Elote" },
  { src: asset("/images/galeria/48.jpg"), srcSm: asset("/images/galeria/48-sm.jpg"), alt: "Sucursal Mr. Elote con su diseño de marca" },
  { src: asset("/images/galeria/49.jpg"), srcSm: asset("/images/galeria/49-sm.jpg"), alt: "Sucursal Mr. Elote con su diseño de marca" },
  { src: asset("/images/galeria/50.jpg"), srcSm: asset("/images/galeria/50-sm.jpg"), alt: "Inauguración de una sucursal Mr. Elote" },
  { src: asset("/images/galeria/51.jpg"), srcSm: asset("/images/galeria/51-sm.jpg"), alt: "Clientes disfrutando productos Mr. Elote" },
  { src: asset("/images/galeria/52.jpg"), srcSm: asset("/images/galeria/52-sm.jpg"), alt: "Sucursal Mr. Elote con su diseño de marca" },
  { src: asset("/images/galeria/53.jpg"), srcSm: asset("/images/galeria/53-sm.jpg"), alt: "Clientes disfrutando productos Mr. Elote" },
  { src: asset("/images/galeria/54.jpg"), srcSm: asset("/images/galeria/54-sm.jpg"), alt: "Clientes disfrutando productos Mr. Elote" },
  { src: asset("/images/galeria/55.jpg"), srcSm: asset("/images/galeria/55-sm.jpg"), alt: "Sucursal Mr. Elote junto a un Oxxo" },
] as const;

export const PLANS = [
  {
    image: asset("/images/plan-1.jpg"),
    badge: "Hazlo tú mismo",
    name: "Punto Xpress",
    price: "$138,000",
    size: "25–30 m²",
    modality: "Isla comercial, kiosco, local a pie de calle o espacio en almacén tipo Walmart.",
    featured: false,
    note: null as string | null,
  },
  {
    image: asset("/images/plan-2.jpg"),
    badge: "Hazlo tú mismo",
    name: "Punto Mr.",
    price: "$168,000",
    size: "30–70 m²",
    modality: "Local a pie de calle o espacio en plaza comercial.",
    featured: true,
    note: null as string | null,
  },
  {
    image: asset("/images/plan-3.jpg"),
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
