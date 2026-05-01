import galleryData from './gallery-data.json'

export type Gallery = {
  slug: string
  name: string
  photos: string[]
}

export const GALLERIES: Gallery[] = galleryData

export function getGallery(slug: string): Gallery | undefined {
  return GALLERIES.find((g) => g.slug === slug)
}

export function getGalleriesWithCovers() {
  return GALLERIES.map((g) => ({ slug: g.slug, name: g.name, cover: g.photos[0] }))
}
