"use client"

import { useState } from "react"
import { FileUpload } from "@/app/conciliacion/file-processor/file-upload"
import { Button } from "@/app/conciliacion/file-processor/ui/button"
import { ThemeToggle } from "@/app/conciliacion/file-processor/theme-toggle"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export default function FilesProcessorPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handleProcessFiles = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Por favor, selecciona al menos un archivo para procesar.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append("files", file)
      })

      const response = await fetch("/api/process", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Error al procesar los archivos")
      }

      const data = await response.json()

      toast({
        title: "Éxito",
        description: `${files.length} archivo(s) procesado(s) correctamente.`,
      })

      // Aquí puedes manejar la respuesta del backend
      console.log(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al procesar los archivos.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Procesador de Archivos</h1>
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline">Volver al Menú</Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <div className="grid gap-8">
        <FileUpload
          files={files}
          setFiles={setFiles}
          maxFiles={10}
          maxSize={10 * 1024 * 1024} // 10MB
        />

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Archivos seleccionados ({files.length})</h2>
          {files.length > 0 ? (
            <ul className="border rounded-lg p-4 space-y-2">
              {files.map((file, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{file.name}</span>
                  <span className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No hay archivos seleccionados</p>
          )}
        </div>

        <Button
          onClick={handleProcessFiles}
          disabled={isProcessing || files.length === 0}
          className="w-full py-6 text-lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Procesando...
            </>
          ) : (
            "Procesar Archivos"
          )}
        </Button>
      </div>
    </div>
  )
}

