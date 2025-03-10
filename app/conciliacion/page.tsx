import Link from "next/link"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"

export default function ConciliacionPage() {
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
              <RefreshCw className="h-8 w-8" />
              Conciliación Bancaria
            </h1>
            <p className="mt-2 text-muted-foreground">
              Realice conciliaciones bancarias y verifique sus registros contables
            </p>
          </div>

          <div className="rounded-lg border p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Módulo de Conciliación Bancaria</h2>
            <p className="text-muted-foreground mb-4">
              Aquí puede realizar la conciliación entre sus registros contables y los extractos bancarios, identificar
              diferencias y generar informes de conciliación.
            </p>
            <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">Contenido del módulo de conciliación bancaria</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
