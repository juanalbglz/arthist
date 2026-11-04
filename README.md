# arthist · línea temporal comparada

Historia del arte de todo el mundo junto a la historia de cada sociedad que la hizo posible. Se publica en [arthist.juanalbglz.eu](https://arthist.juanalbglz.eu) (español) y [arthist.juanalbglz.eu/en/](https://arthist.juanalbglz.eu/en/) (inglés). Sitio estático hecho con [Astro](https://astro.build): sin cookies, sin analítica, sin recursos de terceros.

## Cómo está organizada

- **Épocas** (tiempo profundo, aldeas y estados, reinos, conquistas…): cada una es una sección.
- Dentro de cada época, un **carril por sociedad** (África, Canarias, Mesoamérica…): a la izquierda su arte, a la derecha lo que le pasaba a esa sociedad. Los carriles se pliegan y despliegan.
- **Sociedad en foco**: abre su carril, lo pone el primero y pliega el resto.
- **Disciplinas**: filtra los hitos de arte (pintura, escultura, arquitectura…).
- Cada hito enlaza a su artículo de Wikipedia, y cada carril a la historia de esa sociedad.

## Añadir o cambiar hitos

Todo está en [`src/data/linea-temporal.yaml`](src/data/linea-temporal.yaml). Copia un bloque, cambia los valores y haz commit (se puede desde la web de GitHub). La cabecera del archivo explica cada campo.

Las sociedades, disciplinas y épocas se definen en [`src/linea-temporal.ts`](src/linea-temporal.ts). Si un hito usa una sociedad o disciplina que no está ahí, la compilación falla y dice cuál falta.

El enlace de Wikipedia usa la búsqueda con «ir»: si el título existe, abre el artículo; si no, muestra resultados. Así un título aproximado nunca deja un enlace roto.

## Trabajar en local

```sh
npm install
npm run dev     # http://localhost:4321
npm run build   # genera dist/
```

## Publicación

El workflow `.github/workflows/deploy.yml` construye y publica en cada push a `main`. Configuración única:

1. En GitHub: *Settings → Pages → Source: GitHub Actions*, y en *Custom domain* escribe `arthist.juanalbglz.eu` (activa *Enforce HTTPS* cuando aparezca).
2. En el DNS (Porkbun): un `CNAME` de `arthist` a `juanalbglz.github.io`.
