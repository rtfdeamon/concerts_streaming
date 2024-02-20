'use client'
import * as React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from '@/shadComponents/ui/carousel'
import { Card, CardContent } from "@/shadComponents/ui/card"
import styles from './TagsCarousel.module.scss'
import Link from "next/link"

export default function TagsCarousel() {
  const tags = [
    ['Today',
    'This Week',
    'This Month',
    'Choose Dates',
    'Live Streams',
    'Alternative',
    'Blues',
    'Christian/Gospel',
    'Classical'],
    ['Country',
    'Electronic',
    'Folk',
    'Hip Hop',
    'Jazz',
    'Latin',
    'Metal',
    'Pop',
    'Punk'],
    ['R&B/Soul',
    'Reggae',
    'Rock',
    'All Genres']
  ]

  return (
    <div className={styles.carousel}>
    <Carousel className={styles.carouselBlock}>
          <CarouselContent>
                {tags.map((tag, i) => (
                  <CarouselItem key={i} className={styles.carouselItem}>
                   {tag.map((t, j) => (
                      <div key={j} className={styles.carouselTagItem}>
                      <Card>
                          <Link href={'/tag/Tagj'} className={styles.cardLink}>
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
    </div>
  )
}
