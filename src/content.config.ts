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
    es: texto,
    en: texto,
  }),
});

export const collections = { hitos };
