import Link from "next/link"
import { ArrowLeft, BarChart3 } from "lucide-react"

import { Button } from "@/app/conciliacion/file-processor/ui/button"
import { Navbar } from "@/components/navbar"

export default function EERRPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al panel
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BarChart3 className="h-8 w-8" />
              Estados de Resultados (EERR)
            </h1>
            <p className="mt-2 text-muted-foreground">Consulte y analice los estados de resultados de su empresa</p>
          </div>

          <div className="rounded-lg border p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Módulo de Estados de Resultados</h2>
            <p className="text-muted-foreground mb-4">
              Aquí puede visualizar los estados de resultados, analizar ingresos y gastos, y generar reportes
              financieros detallados.
            </p>
            <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">Contenido del módulo de estados de resultados</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

