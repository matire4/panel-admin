import { BarChart3, FileText, RefreshCw } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { OptionCard } from "@/components/option-card"
import { ImageCarousel } from "@/components/image-carousel"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Panel de Administración</h1>
            <p className="mt-2 text-lg text-muted-foreground">Seleccione una opción para continuar</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {/* Opciones de navegación */}
            <OptionCard
              title="Realizar extractos bancarios"
              href="/extractos"
              icon={FileText}
            />
            <OptionCard
              title="Realizar conciliación bancaria"
              href="/conciliacion"
              icon={RefreshCw}
            />
            <OptionCard
              title="Consultar EERR"
              href="/eerr"
              icon={BarChart3}
            />
          </div>

          <div className="mb-8">
            <ImageCarousel />
          </div>
        </div>
      </main>
    </div>
  )
}
