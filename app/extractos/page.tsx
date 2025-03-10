import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"

export default function ExtractosPage() {
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
              <FileText className="h-8 w-8" />
              Extractos Bancarios
            </h1>
            <p className="mt-2 text-muted-foreground">Gestione y genere extractos bancarios de sus cuentas</p>
          </div>

          <div className="rounded-lg border p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Módulo de Extractos Bancarios</h2>
            <p className="text-muted-foreground mb-4">
              Aquí puede generar reportes de extractos bancarios, visualizar movimientos y exportar la información en
              diferentes formatos.
            </p>
            <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">Contenido del módulo de extractos bancarios</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

