// Configuración de la línea temporal comparada (arthist.juanalbglz.eu).
// Los contenidos están en src/data/ (hitos/, sociedades/, disciplinas/ y epocas.yaml);
// aquí solo quedan los textos fijos de la página.
export type Lang = 'es' | 'en';

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

// Pages CMS guarda las referencias como ruta de archivo («src/data/sociedades/canarias.yml»);
// a mano se escribe solo «canarias». Esto deja siempre el nombre corto.
export const clave = (v: string) => v.replace(/^.*\//, '').replace(/\.ya?ml$/, '');

// Enlace a Wikipedia que abre el artículo si el título existe y, si no, la búsqueda.
export const wikiUrl = (lang: Lang, titulo: string) =>
  `https://${lang}.wikipedia.org/w/index.php?title=Special:Search&go=Go&search=${encodeURIComponent(titulo)}`;
