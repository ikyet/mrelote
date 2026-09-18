import { asset } from "@/lib/utils";

export const WHATSAPP_NUMBER = "525564723996";

export const NAV_LINKS = [
  { href: "#inicio", label: "Inicio", id: "inicio" },
  { href: "#quienes-somos", label: "Quiénes somos", id: "quienes-somos" },
  { href: "#experiencia", label: "Conoce más", id: "experiencia" },
  { href: "#franquicia", label: "Franquicias", id: "franquicia" },
] as const;

// Nombres y textos tal cual los mandó el cliente (18-sep). "image": foto
// real del producto (900x1125, 4:5), de su zip "fotos productos pagina web"
// (1.jpg–4.jpg, en este mismo orden).
export const PRODUCTS = [
  {
    n: "01",
    name: "French-Squite-Fries",
    image: asset("/images/productos/french-squite-fries.jpg"),
    desc: "Una combinación única que reúne lo mejor de dos antojos: papas a la francesa y nuestro clásico esquite. Un platillo diferente, abundante y lleno de sabor, creado para disfrutar Mr. Elote de una forma totalmente nueva.",
  },
  {
    n: "02",
    name: "Volcano",
    image: asset("/images/productos/volcano.jpg"),
    desc: "Un esquite bañado en queso cheddar y acompañado de papas crujientes. Una combinación llena de sabor, creada para quienes siempre quieren llevar su antojo al siguiente nivel.",
  },
  {
    n: "03",
    name: "Elote Revolcado",
    image: asset("/images/productos/elote-revolcado.jpg"),
    desc: "No es nuevo, pero nunca puede faltar. Un clásico de Mr. Elote cubierto con tus papas trituradas favoritas, lleno de textura, sabor y ese toque monchoso que lo hace irresistible.",
  },
  {
    n: "04",
    name: "Esquite",
    image: asset("/images/productos/esquite.jpg"),
    desc: "El clásico que nunca falla. Granos de elote llenos de sabor, preparados con los ingredientes que todos conocemos y amamos. Sencillo, delicioso y siempre indispensable en Mr. Elote.",
  },
] as const;

// Fotos generales que mandó el cliente (numeradas como en su zip, #19–#55),
// en dos tamaños (1100px escritorio, 700px celular). La galería las va
// agrandando una por una al hacer scroll, con una sola frase fija.
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
    imagePosition: "center",
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
    // Foto vertical: se encuadra arriba para que se vea el letrero.
    imagePosition: "center top",
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
    imagePosition: "center",
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
