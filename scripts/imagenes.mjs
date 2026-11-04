// Descarga una imagen libre por hito desde Wikimedia Commons y la guarda en la web,
// para que la página no pida nada a terceros al visitarla.
//
// - Por defecto usa la imagen principal del artículo de Wikipedia del hito (campo «wiki»),
//   solo si tiene licencia libre.
// - En el YAML, «imagen: "Archivo.jpg"» fuerza un archivo concreto de Commons
//   e «imagen: no» deja el hito sin imagen.
//
// También busca la imagen de cada época (src/data/epocas.yaml).
// Escribe public/imagenes/<id>.<ext> y src/data/imagenes.json (créditos y licencias).
// Si no hay red, avisa y sigue: la web se construye sin imágenes.
import fs from 'node:fs/promises';
import yaml from 'js-yaml';

const UA = 'arthist.juanalbglz.eu build (https://github.com/juanalbglz/arthist)';
const ANCHO = 640;
const dir = 'public/imagenes';
const salida = 'src/data/imagenes.json';

// Un archivo por hito en src/data/hitos/.
const carpeta = 'src/data/hitos';
const hitos = [];
for (const f of (await fs.readdir(carpeta)).filter((f) => /\.ya?ml$/.test(f))) {
  const h = yaml.load(await fs.readFile(`${carpeta}/${f}`, 'utf8'));
  hitos.push({ ...h, id: h.id || f.replace(/\.ya?ml$/, '') });
}
// Las épocas también llevan imagen; se guardan como «epoca-<id>».
const epocas = yaml.load(await fs.readFile('src/data/epocas.yaml', 'utf8'));
const elementos = [...hitos, ...epocas.map((e) => ({ ...e, id: `epoca-${e.id}` }))];
await fs.mkdir(dir, { recursive: true });

const api = async (host, params) => {
  const url = `https://${host}/w/api.php?` + new URLSearchParams({ format: 'json', formatversion: '2', origin: '*', ...params });
  const r = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(20000) });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
};

// Nombre del archivo de la imagen principal de un artículo (solo licencias libres).
async function imagenDeArticulo(lang, titulo) {
  const j = await api(`${lang}.wikipedia.org`, { action: 'query', prop: 'pageimages', piprop: 'name', pilicense: 'free', redirects: '1', titles: titulo });
  return j.query?.pages?.[0]?.pageimage;
}

const limpiar = (html = '') => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

const creditos = {};
let ok = 0;
for (const h of elementos) {
  if (h.imagen === false || h.imagen === 'no') continue;
  try {
    let archivo = typeof h.imagen === 'string' ? h.imagen.replace(/^(File|Archivo):/, '') : undefined;
    if (!archivo && h.wiki?.en) archivo = await imagenDeArticulo('en', h.wiki.en);
    if (!archivo && h.wiki?.es) archivo = await imagenDeArticulo('es', h.wiki.es);
    if (!archivo) continue;
    const j = await api('commons.wikimedia.org', {
      action: 'query', prop: 'imageinfo', iiprop: 'url|extmetadata|mime', iiurlwidth: String(ANCHO), titles: `File:${archivo}`,
    });
    const info = j.query?.pages?.[0]?.imageinfo?.[0];
    if (!info?.thumburl) continue;
    const m = info.extmetadata ?? {};
    const ext = info.thumburl.match(/\.(jpe?g|png|gif|webp)$/i)?.[1]?.toLowerCase() ?? 'jpg';
    const img = await fetch(info.thumburl, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000) });
    if (!img.ok) continue;
    const nombre = `${h.id}.${ext}`;
    await fs.writeFile(`${dir}/${nombre}`, Buffer.from(await img.arrayBuffer()));
    creditos[h.id] = {
      src: `/imagenes/${nombre}`,
      ancho: info.thumbwidth, alto: info.thumbheight,
      autor: limpiar(m.Artist?.value) || 'Autoría desconocida',
      licencia: limpiar(m.LicenseShortName?.value),
      fuente: info.descriptionurl,
    };
    ok++;
  } catch (e) {
    console.warn(`imagenes: ${h.id}: ${e.message}`);
  }
}
await fs.writeFile(salida, JSON.stringify(creditos, null, 2) + '\n');
console.log(`imagenes: ${ok} de ${elementos.length} hitos y épocas con imagen`);
