# arthist · línea temporal comparada

Historia del arte de todo el mundo junto a la historia de cada sociedad que la hizo posible. Se publica en [arthist.juanalbglz.eu](https://arthist.juanalbglz.eu) (español) y [arthist.juanalbglz.eu/en/](https://arthist.juanalbglz.eu/en/) (inglés). Sitio estático hecho con [Astro](https://astro.build): sin cookies, sin analítica, sin recursos de terceros.

## Cómo está organizada

- **Un solo eje vertical de tiempo**: todos los hitos, de todas las sociedades, ordenados por fecha. Las épocas son marcas sobre el eje; su icono «i» abre una ficha con una imagen y los rasgos sociales y económicos principales.
- **Una columna por sociedad** (África, Canarias, Mesoamérica…). Sin desplegar, cada hito es un punto (rojo = arte, blanco = sociedad) con su título.
- **Desplegar una sociedad** (pulsando su nombre o uno de sus puntos) abre su columna, que pasa al extremo derecho, con las fichas completas: arte a la izquierda, historia social a la derecha. Las demás se pliegan junto al eje de tiempo en franjas estrechas con solo sus puntos, para ver qué pasaba a la vez; en el móvil se ocultan. La sociedad abierta queda en la dirección (`#canarias`), así se puede enlazar.
- **Disciplinas**: filtra los hitos de arte (pintura, escultura, arquitectura…).
- Cada ficha: imagen, Wikipedia, otros enlaces y películas o documentales relacionados. Cada sociedad enlaza a su historia en Wikipedia.

## Añadir o cambiar hitos

Todo está en [`src/data/linea-temporal.yaml`](src/data/linea-temporal.yaml). Copia un bloque, cambia los valores y haz commit (se puede desde la web de GitHub). La cabecera del archivo explica cada campo.

Las épocas y sus fichas están en [`src/data/epocas.yaml`](src/data/epocas.yaml). Las sociedades y disciplinas se definen en [`src/linea-temporal.ts`](src/linea-temporal.ts). Si un hito usa una sociedad o disciplina que no está ahí, la compilación falla y dice cuál falta.

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
