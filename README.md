# arthist · línea temporal comparada

Historia del arte de todo el mundo junto a la historia de cada sociedad que la hizo posible. Se publica en [arthist.juanalbglz.eu](https://arthist.juanalbglz.eu) (español) y [arthist.juanalbglz.eu/en/](https://arthist.juanalbglz.eu/en/) (inglés). Sitio estático hecho con [Astro](https://astro.build): sin cookies, sin analítica, sin recursos de terceros.

## Cómo está organizada

- **Un solo eje vertical de tiempo**: todos los hitos, de todas las sociedades, ordenados por fecha. Las épocas son marcas sobre el eje; su icono «i» abre una ficha con una imagen y los rasgos sociales y económicos principales.
- **Una columna por sociedad** (África, Canarias, Mesoamérica…). Sin desplegar, cada hito es un punto (rojo = arte, blanco = sociedad) con su título.
- **Desplegar una sociedad** (pulsando su nombre o uno de sus puntos) abre su columna, que pasa al extremo derecho, con las fichas completas: arte a la izquierda, historia social a la derecha. Las demás se pliegan junto al eje de tiempo en franjas estrechas con solo sus puntos, para ver qué pasaba a la vez; en el móvil se ocultan. La sociedad abierta queda en la dirección (`#canarias`), así se puede enlazar.
- **Disciplinas**: filtra los hitos de arte (pintura, escultura, arquitectura…).
- Cada ficha: imagen, Wikipedia, otros enlaces y películas o documentales relacionados. Cada sociedad enlaza a su historia en Wikipedia.

## Añadir o cambiar contenidos

Todo está en `src/data/`:

| Carpeta o archivo | Qué es |
| --- | --- |
| `hitos/` | Un archivo por hito: obra o movimiento (`pista: arte`), acontecimiento (`pista: mundo`) o término del glosario (`pista: glosario`, archivos `glosario-*.yml`, con enlace a historiadelarte.net). Los botones «Mostrar» de la web encienden y apagan cada pista. |
| `disciplinas/` | Un archivo por expresión artística (pintura, textil…). Salen en el filtro. |
| `sociedades/` | Un archivo por sociedad. Cada una es una columna. |
| `epocas.yaml` | Las épocas del eje y sus fichas informativas. |
| `arte/` | El arte en cada época según el área: qué era, qué podía ser y hacer, y quién lo hacía y de qué vivía. Un archivo por época y área (`reinos--canarias.yml`); sale en la ficha «i» y, si hay una sociedad desplegada de esa área, aparece primero. |

### Con el formulario (recomendado)

1. Entra en [app.pagescms.org](https://app.pagescms.org) con tu cuenta de GitHub y elige `juanalbglz/arthist`, rama `main`.
2. En **Hitos**, **Disciplinas**, **Sociedades** o **Épocas**, pulsa *Add an entry* (o abre una para editarla), rellena el formulario y guarda.
3. Cada guardado es un commit; la web se vuelve a publicar sola en un par de minutos.

La configuración del formulario está en `.pages.yml`. Pages CMS solo se usa para editar: la web publicada no carga nada de terceros.

### A mano

Crea un archivo en `src/data/hitos/` (desde GitHub: *Add file → Create new file*), por ejemplo `tejido-kente.yml`:

```yaml
id: tejido-kente
anio: 1700
fecha: { es: "siglo XVIII", en: "18th century" }   # opcional
pista: arte                       # arte | mundo
sociedad: africa                  # nombre de un archivo de sociedades/
disciplinas: [textil]             # nombres de archivos de disciplinas/
es:
  titulo: "Tejido kente (pueblo asante, Ghana)"
  texto: "Tiras tejidas en telar con colores y dibujos que tienen nombre y significado."
en:                               # opcional; si falta se usa el español
  titulo: "Kente cloth (Asante, Ghana)"
  texto: "Loom-woven strips whose colours and patterns each carry a name and meaning."
wiki: { es: "Kente", en: "Kente cloth" }
exponentes:                       # opcional: artistas principales
  - { nombre: "Nombre", wiki: { es: "Artículo", en: "Article" } }
peliculas:                        # opcional
  - { titulo: "Título", anio: 2010, tipo: documental, direccion: "Nombre" }
enlaces:                          # opcional
  - { titulo: "Museo", url: "https://…" }
```

Para una disciplina nueva, crea `src/data/disciplinas/textil.yml`:

```yaml
id: textil
es: Textil
en: Textiles
orden: 45      # posición en el filtro
```

Si un hito usa una sociedad o disciplina que no existe, la compilación falla y dice cuál falta.

### Imágenes

En cada publicación, `scripts/imagenes.mjs` descarga la imagen libre del artículo de Wikipedia de cada hito y de cada época y la sirve desde la propia web, con autoría y licencia. Para elegir otra, pon en `imagen` el nombre de un archivo de Wikimedia Commons; `imagen: "no"` deja el hito sin imagen.

El enlace de Wikipedia usa la búsqueda con «ir»: si el título existe, abre el artículo; si no, muestra resultados.

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
