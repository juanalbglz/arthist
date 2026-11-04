import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';
import { SOCIEDADES, DISCIPLINAS } from './linea-temporal';

const texto = z.object({ titulo: z.string(), texto: z.string() });
const bi = z.object({ es: z.string(), en: z.string() });

// Línea temporal comparada: src/data/linea-temporal.yaml
const hitos = defineCollection({
  loader: file('src/data/linea-temporal.yaml'),
  schema: z.object({
    año: z.number(),
    fecha: bi.optional(),
    pista: z.enum(['arte', 'mundo']),
    sociedad: z.string().refine((s) => s in SOCIEDADES, (s) => ({ message: `Sociedad desconocida: ${s} (añádela en src/linea-temporal.ts)` })),
    disciplinas: z.array(z.string().refine((d) => d in DISCIPLINAS, (d) => ({ message: `Disciplina desconocida: ${d}` }))).default([]),
    wiki: bi.optional(),
    // Archivo de Wikimedia Commons, o «no» para no poner imagen (ver scripts/imagenes.mjs).
    imagen: z.union([z.string(), z.literal(false)]).optional(),
    enlaces: z.array(z.object({ titulo: z.string(), url: z.string().url() })).default([]),
    peliculas: z.array(z.object({
      titulo: z.string(),
      año: z.number(),
      tipo: z.enum(['pelicula', 'documental', 'corto']),
      direccion: z.string().optional(),
      // Título del artículo de Wikipedia si no coincide con el de la película.
      wiki: z.string().optional(),
    })).default([]),
    es: texto,
    en: texto,
  }),
});

export const collections = { hitos };
