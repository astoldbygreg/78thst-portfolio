import { getGalleriesWithCovers } from '@/lib/galleries'
import HomeCarousel from '@/components/HomeCarousel'

export default function Home() {
  const galleries = getGalleriesWithCovers()
  return <HomeCarousel galleries={galleries} />
}
