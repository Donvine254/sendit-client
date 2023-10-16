import Image from 'next/image'
import { Hero, HomeComponent } from '@/components'

export default function Home() {
  
  return (
     <>
    <Hero/>
    <div className="divider divide-dotted"></div>
   <HomeComponent/>
    </>
  )
}
