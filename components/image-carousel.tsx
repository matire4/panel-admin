"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const images = [
  {
    src: "/ALMA_NEGRA.png", // Ruta de la imagen en la carpeta public
    alt: "Botella y copa de vino Alma Negra",
  },
  {
    src: "/Barricas de vino alma negra.png", // Ruta de la imagen en la carpeta public
    alt: "Barricas de vino Alma Negra",
  },
  {
    src: "/D_NQ_NP_989988-MLA81072140409_112024-O.webp", // Ruta de la imagen en la carpeta public
    alt: "Logo Alma Negra",
  },
]

export function ImageCarousel() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((current) => (current === 0 ? images.length - 1 : current - 1))
  const next = () => setCurrent((current) => (current === images.length - 1 ? 0 : current + 1))

  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0 relative">
        <div className="overflow-hidden rounded-lg relative aspect-[16/9] md:aspect-[21/9]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image.src || "/placeholder.svg"} // Se usa la ruta de la imagen desde public
                alt={image.alt}
                fill
                className="object-cover"
                // priority={index === 0}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm"
            onClick={prev}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Anterior</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm"
            onClick={next}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Siguiente</span>
          </Button>
        </div>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <Button
              key={index}
              variant="outline"
              size="icon"
              className={`h-2 w-2 rounded-full p-0 ${
                index === current ? "bg-primary" : "bg-background/80 backdrop-blur-sm"
              }`}
              onClick={() => setCurrent(index)}
            >
              <span className="sr-only">Ir a la diapositiva {index + 1}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
