// Configuración de la línea temporal comparada (arthist.juanalbglz.eu).
// Los hitos están en src/data/linea-temporal.yaml; aquí se definen las listas que usan.
export type Lang = 'es' | 'en';

type Bi = Record<Lang, string>;

// Sociedades o áreas culturales. Cada una es una columna que se despliega o se pliega;
// salen en este orden, de izquierda a derecha.
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

// Las épocas (nombre, fechas y ficha informativa) están en src/data/epocas.yaml.

export const TEXTOS = {
  es: {
    titulo: 'Línea temporal comparada',
    intro: 'La historia del arte de todo el mundo junto a la historia de cada sociedad que la hizo posible, sobre un solo eje de tiempo. Cada columna es una sociedad: despliégala para ver su arte y lo que le pasaba; las demás se pliegan, pero sus puntos siguen marcando qué ocurría a la vez.',
    tiempo: 'Tiempo',
    pista: 'Pulsa una sociedad o un punto para desplegarla.',
    disciplinas: 'Disciplinas',
    todas: 'Todas',
    arte: 'Arte',
    mundo: 'Sociedad',
    historia: 'Historia en Wikipedia',
    verTambien: 'Para ver',
    infoEpoca: (n: string) => `Información sobre la época: ${n}`,
    sociedad: 'Sociedad',
    economia: 'Economía',
    cerrar: 'Cerrar',
    tipos: { pelicula: 'película', documental: 'documental', corto: 'cortometraje' },
    imagen: 'Imagen',
    nota: 'Muestra inicial. Las fechas antiguas son aproximadas y algunas están en debate.',
    ac: (n: number) => `${n.toLocaleString('es-ES')} a. C.`,
  },
  en: {
    titulo: 'Comparative timeline',
    intro: 'Art history from around the world next to the history of each society that made it possible, on a single time axis. Each column is a society: expand it to see its art and what was happening to it; the others fold away, but their dots still mark what was going on at the same time.',
    tiempo: 'Time',
    pista: 'Tap a society or a dot to expand it.',
    disciplinas: 'Disciplines',
    todas: 'All',
    arte: 'Art',
    mundo: 'Society',
    historia: 'History on Wikipedia',
    verTambien: 'To watch',
    infoEpoca: (n: string) => `About this period: ${n}`,
    sociedad: 'Society',
    economia: 'Economy',
    cerrar: 'Close',
    tipos: { pelicula: 'film', documental: 'documentary', corto: 'short film' },
    imagen: 'Image',
    nota: 'Initial sample. Ancient dates are approximate and some are debated.',
    ac: (n: number) => `${n.toLocaleString('en-GB')} BCE`,
  },
};

// Enlace a Wikipedia que abre el artículo si el título existe y, si no, la búsqueda.
export const wikiUrl = (lang: Lang, titulo: string) =>
  `https://${lang}.wikipedia.org/w/index.php?title=Special:Search&go=Go&search=${encodeURIComponent(titulo)}`;
