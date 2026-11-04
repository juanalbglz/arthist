import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { clave } from './linea-temporal';

const texto = z.object({ titulo: z.string(), texto: z.string() });
const bi = z.object({ es: z.string(), en: z.string() });
// Pares es/en que pueden quedar a medias (el formulario guarda los campos vacíos como null).
const biOpt = z.object({ es: z.string().nullish(), en: z.string().nullish() }).nullish();

// Un archivo por hito en src/data/hitos/. El nombre del archivo no importa: manda el campo «id».
const idDeArchivo = ({ entry, data }: { entry: string; data: Record<string, unknown> }) =>
  typeof data.id === 'string' && data.id ? data.id : entry.replace(/\.ya?ml$/, '');

const hitos = defineCollection({
  loader: glob({ base: './src/data/hitos', pattern: '**/*.{yml,yaml}', generateId: idDeArchivo }),
  schema: z.object({
    anio: z.number(),
    fecha: biOpt,
    pista: z.enum(['arte', 'mundo']),
    sociedad: z.string().transform(clave),
    disciplinas: z.array(z.string().transform(clave)).nullish().transform((x) => x ?? []),
    wiki: biOpt,
    // Archivo de Wikimedia Commons, o «no» para no poner imagen (ver scripts/imagenes.mjs).
    imagen: z.union([z.string(), z.literal(false)]).nullish(),
    // Artistas principales de la corriente u obra, con su artículo de Wikipedia.
    exponentes: z.array(z.object({ nombre: z.string(), wiki: biOpt })).nullish().transform((x) => x ?? []),
    enlaces: z.array(z.object({ titulo: z.string(), url: z.string().url() })).nullish().transform((x) => x ?? []),
    peliculas: z.array(z.object({
      titulo: z.string(),
      anio: z.number(),
      tipo: z.enum(['pelicula', 'documental', 'corto']),
      direccion: z.string().nullish(),
      // Título del artículo de Wikipedia si no coincide con el de la película.
      wiki: z.string().nullish(),
    })).nullish().transform((x) => x ?? []),
    es: texto,
    // El inglés es opcional: si falta, se usa el español.
    en: z.object({ titulo: z.string().nullish(), texto: z.string().nullish() }).nullish(),
  }),
});

// Sociedades (columnas) y disciplinas: un archivo por cada una; «orden» decide la posición.
const sociedades = defineCollection({
  loader: glob({ base: './src/data/sociedades', pattern: '**/*.{yml,yaml}', generateId: idDeArchivo }),
  schema: z.object({ orden: z.number().nullish().transform((x) => x ?? 999), es: z.string(), en: z.string().nullish(), wiki: biOpt }),
});
const disciplinas = defineCollection({
  loader: glob({ base: './src/data/disciplinas', pattern: '**/*.{yml,yaml}', generateId: idDeArchivo }),
  schema: z.object({ orden: z.number().nullish().transform((x) => x ?? 999), es: z.string(), en: z.string().nullish() }),
});

// Épocas: src/data/epocas.yaml
const ficha = z.object({ nombre: z.string(), rango: z.string(), social: z.array(z.string()), economia: z.array(z.string()) });
const epocas = defineCollection({
  loader: file('src/data/epocas.yaml'),
  schema: z.object({
    hasta: z.number().nullish(),
    wiki: biOpt,
    imagen: z.union([z.string(), z.literal(false)]).nullish(),
    es: ficha,
    en: ficha,
  }),
});

// El arte en cada época según el área: un archivo por época y área en src/data/arte/.
const arteTexto = z.object({ area: z.string(), concepto: z.string(), funcion: z.string(), artista: z.string() });
const arte = defineCollection({
  loader: glob({ base: './src/data/arte', pattern: '**/*.{yml,yaml}', generateId: idDeArchivo }),
  schema: z.object({
    epoca: z.string().transform(clave),
    // Columnas a las que se aplica; al desplegar una de ellas, su área sale primero en la ficha.
    sociedades: z.array(z.string().transform(clave)).nullish().transform((x) => x ?? []),
    es: arteTexto,
    en: z.object({ area: z.string().nullish(), concepto: z.string().nullish(), funcion: z.string().nullish(), artista: z.string().nullish() }).nullish(),
  }),
});

export const collections = { hitos, epocas, sociedades, disciplinas, arte };
