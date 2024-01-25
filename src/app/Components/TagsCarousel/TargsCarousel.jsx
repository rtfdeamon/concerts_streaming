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

export default function TargsCarousel() {
  return (
    <div className={styles.carousel}>
    <Carousel className={styles.carouselBlock}>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className={styles.carouselItem}>
                {Array.from({ length: 10 }).map((_, j) => (
                        <div key={j} className={styles.carouselTagItem}>
                        <Card>
                            <Link href={'/tag/Tagj'} className={styles.cardLink}>
                            <span className="text-xl">Tag {j + 1}</span>
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
