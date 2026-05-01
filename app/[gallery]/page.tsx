import { GALLERIES, getGallery } from '@/lib/galleries'
import GalleryCarousel from '@/components/GalleryCarousel'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return GALLERIES.map((g) => ({ gallery: g.slug }))
}

export default async function GalleryPage({ params }: { params: Promise<{ gallery: string }> }) {
  const { gallery } = await params
  const meta = getGallery(gallery)
  if (!meta || !meta.photos.length) notFound()

  return <GalleryCarousel photos={meta.photos} name={meta.name} />
}
