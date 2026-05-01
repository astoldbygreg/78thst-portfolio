import { readdirSync, existsSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const GALLERIES = [
  { slug: 'footlocker-x-converse-2024', name: 'Foot Locker × Converse' },
  { slug: 'adidas', name: 'Adidas' },
  { slug: 'joe-greer-x-patron', name: 'Joe Greer × Patrón' },
  { slug: 'burger-express', name: 'Burger Express' },
  { slug: 'rob', name: 'Rob' },
  { slug: 'nina-simone', name: 'Nina Simone' },
  { slug: 'emyah', name: 'Emyah' },
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
