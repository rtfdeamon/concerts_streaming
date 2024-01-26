'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shadComponents/ui/carousel'
import { Card } from "@/shadComponents/ui/card"
import Show from '../../../../public/show.jpg'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Recommendations.module.scss'

export default function Recommendations() {
  const tags = [
    ['Show 1',
    'Show 2',
    'Show 3',],
    ['Show 1',
    'Show 2',
    'Show 3',],
    ['Show 1',
    'Show 2',
    'Show 3']
  ]
  return (
    <>
        <section className={styles.section}>
            <h5 className={styles.title}>Most popular shows</h5>
            <Carousel className={styles.carouselBlock}>
          <CarouselContent>
                {tags.map((tag, i) => (
                  <CarouselItem key={i} className={styles.carouselItem}>
                   {tag.map((t, j) => (
                      <div key={j} className={styles.carouselTagItem}>
                      <Card>
                          <Link href={'/tag/Tagj'} className={styles.cardLink}>
                            <Image src={Show} width={400} height={500} alt={t} />
                            <span className={styles.cardText}>{t}</span>
                          </Link>
                      </Card>
                      </div>
                    ))}
                  </CarouselItem>
                ))}
        </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
        </section>
    </>
  )
}
