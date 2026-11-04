// Configuración de la línea temporal comparada (/linea-temporal/ y /en/timeline/).
// Los hitos están en src/data/linea-temporal.yaml; aquí se definen las listas que usan.
export type Lang = 'es' | 'en';

type Bi = Record<Lang, string>;

// Sociedades o áreas culturales. Cada una es un carril que se abre o se pliega.
// «wiki» es el artículo general de su historia en cada idioma.
export const SOCIEDADES: Record<string, { nombre: Bi; wiki: Bi }> = {
  africa: { nombre: { es: 'África', en: 'Africa' }, wiki: { es: 'Historia de África', en: 'History of Africa' } },
  canarias: { nombre: { es: 'Canarias', en: 'Canary Islands' }, wiki: { es: 'Historia de Canarias', en: 'History of the Canary Islands' } },
  mesoamerica: { nombre: { es: 'Mesoamérica', en: 'Mesoamerica' }, wiki: { es: 'Mesoamérica', en: 'Mesoamerica' } },
  andes: { nombre: { es: 'Andes', en: 'Andes' }, wiki: { es: 'Civilizaciones andinas', en: 'Andean civilizations' } },
  caribe: { nombre: { es: 'Caribe', en: 'Caribbean' }, wiki: { es: 'Historia del Caribe', en: 'History of the Caribbean' } },
  atlantico: { nombre: { es: 'Mundo atlántico', en: 'Atlantic world' }, wiki: { es: 'Historia atlántica', en: 'Atlantic history' } },
  'asia-occidental': { nombre: { es: 'Asia occidental', en: 'Western Asia' }, wiki: { es: 'Antiguo Oriente Próximo', en: 'Ancient Near East' } },
  'sudeste-asiatico': { nombre: { es: 'Sudeste asiático', en: 'Southeast Asia' }, wiki: { es: 'Historia del Sudeste Asiático', en: 'History of Southeast Asia' } },
  japon: { nombre: { es: 'Japón', en: 'Japan' }, wiki: { es: 'Historia de Japón', en: 'History of Japan' } },
  europa: { nombre: { es: 'Europa', en: 'Europe' }, wiki: { es: 'Historia de Europa', en: 'History of Europe' } },
};

export const DISCIPLINAS: Record<string, Bi> = {
  rupestre: { es: 'Arte rupestre', en: 'Rock art' },
  dibujo: { es: 'Dibujo', en: 'Drawing' },
  pintura: { es: 'Pintura', en: 'Painting' },
  escultura: { es: 'Escultura', en: 'Sculpture' },
  ceramica: { es: 'Cerámica', en: 'Ceramics' },
  metal: { es: 'Metal y fundición', en: 'Metalwork' },
  grabado: { es: 'Grabado', en: 'Printmaking' },
  arquitectura: { es: 'Arquitectura', en: 'Architecture' },
  instalacion: { es: 'Instalación', en: 'Installation' },
  escenicas: { es: 'Artes vivas', en: 'Live arts' },
};

// Épocas: cada hito cae en la primera cuyo «hasta» (año, sin incluir) sea mayor que el suyo.
export const EPOCAS: { id: string; hasta: number; nombre: Bi; rango: Bi }[] = [
  { id: 'tiempo-profundo', hasta: -10000, nombre: { es: 'Tiempo profundo', en: 'Deep time' }, rango: { es: 'hasta 10.000 a. C.', en: 'to 10,000 BCE' } },
  { id: 'aldeas-ciudades', hasta: 500, nombre: { es: 'Aldeas, ciudades y estados', en: 'Villages, cities and states' }, rango: { es: '10.000 a. C.–500', en: '10,000 BCE–500 CE' } },
  { id: 'reinos', hasta: 1400, nombre: { es: 'Reinos e imperios', en: 'Kingdoms and empires' }, rango: { es: '500–1400', en: '500–1400' } },
  { id: 'conquistas', hasta: 1800, nombre: { es: 'Conquistas y colonialismo', en: 'Conquest and colonialism' }, rango: { es: '1400–1800', en: '1400–1800' } },
  { id: 'imperios-coloniales', hasta: 1945, nombre: { es: 'Revoluciones e imperios coloniales', en: 'Revolutions and colonial empires' }, rango: { es: '1800–1945', en: '1800–1945' } },
  { id: 'descolonizaciones', hasta: Infinity, nombre: { es: 'Descolonizaciones y mundo global', en: 'Decolonisation and a global world' }, rango: { es: '1945–hoy', en: '1945–today' } },
];

export const TEXTOS = {
  es: {
    titulo: 'Línea temporal comparada',
    intro: 'La historia del arte de todo el mundo junto a la historia de cada sociedad que la hizo posible. Cada carril es una sociedad: a la izquierda su arte, a la derecha lo que le pasaba.',
    disciplinas: 'Disciplinas',
    foco: 'Sociedad en foco',
    todas: 'Todas',
    arte: 'Arte',
    mundo: 'Sociedad',
    historia: 'Historia en Wikipedia',
    nada: 'Ningún hito de arte de estas disciplinas en esta época.',
    nota: 'Muestra inicial. Las fechas antiguas son aproximadas y algunas están en debate.',
    ac: (n: number) => `${n.toLocaleString('es-ES')} a. C.`,
    cuenta: (a: number, m: number) => `${a} de arte · ${m} de sociedad`,
  },
  en: {
    titulo: 'Comparative timeline',
    intro: 'Art history from around the world next to the history of each society that made it possible. Each lane is a society: its art on the left, what was happening to it on the right.',
    disciplinas: 'Disciplines',
    foco: 'Society in focus',
    todas: 'All',
    arte: 'Art',
    mundo: 'Society',
    historia: 'History on Wikipedia',
    nada: 'No art from these disciplines in this period.',
    nota: 'Initial sample. Ancient dates are approximate and some are debated.',
    ac: (n: number) => `${n.toLocaleString('en-GB')} BCE`,
    cuenta: (a: number, m: number) => `${a} art · ${m} society`,
  },
};

// Enlace a Wikipedia que abre el artículo si el título existe y, si no, la búsqueda.
export const wikiUrl = (lang: Lang, titulo: string) =>
  `https://${lang}.wikipedia.org/w/index.php?title=Special:Search&go=Go&search=${encodeURIComponent(titulo)}`;
