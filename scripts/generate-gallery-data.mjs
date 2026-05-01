import { readdirSync, existsSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const GALLERIES = [
  { slug: 'footlocker-x-converse-2024', name: 'Foot Locker × Converse' },
  { slug: 'adidas', name: 'Adidas' },
  { slug: 'alex-for-puma', name: 'Alex for Puma' },
  { slug: 'steven-for-reebok', name: 'Steven for Reebok' },
  { slug: 'joe-greer-x-patron', name: 'Joe Greer × Patrón' },
  { slug: 'burger-express', name: 'Burger Express' },
  { slug: 'commercial-work', name: 'Commercial Work' },
  { slug: 'yakuza-boss-new-collection', name: 'Yakuza Boss' },
  { slug: 'bonez-brimz-x-capanova', name: 'Bonez Brimz × Capanova' },
  { slug: 'famcap-store', name: 'Famcap Store' },
  { slug: 'pressure', name: 'Pressure' },
  { slug: 'blue-deens', name: 'Blue Deens' },
  { slug: 'rob', name: 'Rob' },
  { slug: 'nina-simone', name: 'Nina Simone' },
  { slug: 'emyah', name: 'Emyah' },
  { slug: 'onajide-1', name: 'Onajide' },
  { slug: 'onajide', name: 'Onajide II' },
  { slug: 'amir-katie', name: 'Amir & Katie' },
  { slug: 'yaris', name: 'Yaris' },
  { slug: 'khadija-amai', name: 'Khadija & Amai' },
  { slug: 'wayne', name: 'Wayne' },
  { slug: 'diana', name: 'Diana' },
  { slug: 'dashawn', name: 'Dashawn' },
  { slug: 'azia', name: 'Azia' },
  { slug: 'femi', name: 'Femi' },
  { slug: 'tosin', name: 'Tosin' },
  { slug: 'nyasia', name: 'Nyasia' },
  { slug: 'jewelz', name: 'Jewelz' },
  { slug: 'natalia', name: 'Natalia' },
  { slug: 'deena-lonnie', name: 'Deena & Lonnie' },
  { slug: 'kawame', name: 'Kawame' },
  { slug: 'lo', name: 'Lo' },
  { slug: 'rebia', name: 'Rebia' },
  { slug: 'denzel', name: 'Denzel' },
  { slug: 'new-york', name: 'New York' },
  { slug: 'maggi', name: 'Maggi' },
  { slug: 'maggi-1', name: 'Maggi II' },
  { slug: 'maggi-part-3', name: 'Maggi III' },
  { slug: 'melasia', name: 'Melasia II' },
  { slug: 'melasia-2020', name: 'Melasia' },
  { slug: 'kritika', name: 'Kritika' },
  { slug: 'maggie-fall', name: 'Maggie' },
  { slug: 'toni-2020', name: 'Toni' },
  { slug: 'eden', name: 'Eden' },
  { slug: 'kelsi', name: 'Kelsi' },
  { slug: 'lanie', name: 'Lanie' },
  { slug: 'natasha', name: 'Natasha' },
  { slug: 'family-portraits', name: 'Family Portraits' },
  { slug: 'mias-90s-theme-birthday', name: "Mia's 90s Birthday" },
  { slug: 'facetime-shoots', name: 'FaceTime Shoots' },
  { slug: 'media', name: 'Media' },
]

const data = GALLERIES.map((g) => {
  const dir = join(root, 'public', 'photos', g.slug)
  const photos = existsSync(dir)
    ? readdirSync(dir)
        .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
        .sort()
        .map((f) => `/photos/${g.slug}/${f}`)
    : []
  return { ...g, photos }
}).filter((g) => g.photos.length > 0)

writeFileSync(join(root, 'lib', 'gallery-data.json'), JSON.stringify(data, null, 2))
console.log(`Generated gallery-data.json — ${data.length} galleries, ${data.reduce((n, g) => n + g.photos.length, 0)} photos`)

// Also write a slim meta file (slug + name only) for the nav drawer
const meta = data.map(({ slug, name }) => ({ slug, name }))
writeFileSync(join(root, 'lib', 'gallery-meta.json'), JSON.stringify(meta, null, 2))
console.log(`Generated gallery-meta.json — ${meta.length} entries`)
