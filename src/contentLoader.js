const markdownFiles = import.meta.glob('../content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

const aliases = {
  id: 'id',
  number: 'number',
  numero: 'number',
  type: 'type',
  tipo: 'type',
  collection: 'collection',
  coleccion: 'collection',
  title: 'title',
  titulo: 'title',
  subtitle: 'subtitle',
  subtitulo: 'subtitle',
  year: 'year',
  fecha: 'year',
  mood: 'mood',
  moodLabel: 'mood',
  acento: 'accent',
  accent: 'accent',
  color: 'accent',
  className: 'className',
  estilo: 'className',
  note: 'note',
  nota: 'note'
};

function parseValue(value) {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontmatter(source) {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!match) throw new Error('Falta el bloque de metadatos entre --- al inicio del archivo.');

  const metadata = {};
  match[1].split('\n').forEach((line) => {
    const separator = line.indexOf(':');
    if (separator === -1) return;
    const rawKey = line.slice(0, separator).trim();
    const key = aliases[rawKey] || aliases[rawKey.toLowerCase()] || rawKey;
    metadata[key] = parseValue(line.slice(separator + 1));
  });

  return { metadata, body: source.slice(match[0].length) };
}

function readSection(body, names) {
  const heading = new RegExp(`^##\\s+(?:${names.join('|')})\\s*$`, 'im');
  const match = heading.exec(body);
  if (!match) return '';
  const sectionStart = match.index + match[0].length;
  const remainder = body.slice(sectionStart);
  const nextHeading = remainder.search(/^##\s+/m);
  return (nextHeading === -1 ? remainder : remainder.slice(0, nextHeading)).trim();
}

function parseMarkdown(source, filename) {
  const { metadata, body } = parseFrontmatter(source);
  const text = readSection(body, ['Texto', 'Poema', 'Carta']);
  const excerpt = readSection(body, ['Extracto', 'Resumen']);
  const fallbackId = filename.split('/').pop().replace(/\.md$/, '');
  const lines = text.split('\n').map((line) => line.trimEnd());

  return {
    id: metadata.id || fallbackId,
    number: metadata.number || '00',
    type: metadata.type || 'poema',
    collection: metadata.collection || 'lo nuestro',
    title: metadata.title || 'Sin título',
    subtitle: metadata.subtitle || 'para leer despacio',
    year: metadata.year || 'sin fecha',
    mood: metadata.mood || 'para ti',
    accent: metadata.accent || '#C94B5A',
    className: metadata.className || 'rose',
    note: metadata.note || 'Algo que quería guardar contigo.',
    excerpt: excerpt || lines.filter(Boolean).slice(0, 3).join('\n'),
    lines
  };
}

export const poems = Object.entries(markdownFiles)
  .filter(([, source]) => source.trimStart().startsWith('---'))
  .map(([filename, source]) => parseMarkdown(source, filename))
  .sort((a, b) => String(a.number).localeCompare(String(b.number), undefined, { numeric: true }));
