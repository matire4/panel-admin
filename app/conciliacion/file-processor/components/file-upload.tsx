"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  files: File[]
  setFiles: (files: File[]) => void
  maxFiles?: number
  maxSize?: number
  acceptedFileTypes?: string[]
}

export function FileUpload({
  files,
  setFiles,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB default
  acceptedFileTypes = [".xlsx", ".xls"], // Solo archivos Excel por defecto
}: FileUploadProps) {
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null)

      if (acceptedFiles.length + files.length > maxFiles) {
        setError(`No puedes subir más de ${maxFiles} archivos.`)
        return
      }

      const oversizedFiles = acceptedFiles.filter((file) => file.size > maxSize)
      if (oversizedFiles.length > 0) {
        setError(`Algunos archivos exceden el tamaño máximo de ${(maxSize / 1024 / 1024).toFixed(0)}MB.`)
        return
      }

      // Verificar que sean archivos Excel
      const invalidFiles = acceptedFiles.filter((file) => {
        const extension = file.name.split(".").pop()?.toLowerCase() || ""
        return !acceptedFileTypes.includes(`.${extension}`)
      })

      if (invalidFiles.length > 0) {
        setError(`Solo se permiten archivos Excel (.xlsx, .xls).`)
        return
      }

      setFiles([...files, ...acceptedFiles])
    },
    [files, setFiles, maxFiles, maxSize, acceptedFileTypes],
  )

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
    },
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground/25 hover:border-primary/50",
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <h3 className="text-lg font-medium">
            {isDragActive ? "Suelta los archivos Excel aquí" : "Arrastra y suelta archivos Excel aquí"}
          </h3>
          <p className="text-sm text-muted-foreground">
            o <span className="text-primary font-medium">haz clic para seleccionar</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Solo archivos Excel (.xlsx, .xls), máximo {maxFiles} archivos, {(maxSize / 1024 / 1024).toFixed(0)}MB por
            archivo
          </p>
        </div>
      </div>

      {error && <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md text-sm">{error}</div>}

      {files.length > 0 && (
        <div className="space-y-2">
          <ul className="border rounded-lg p-4 space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{file.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(index)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <Button
            variant="outline"
            className="w-full"
            onClick={(e) => {
              e.preventDefault()
              setFiles([])
            }}
          >
            Limpiar todos los archivos
          </Button>
        </div>
      )}
    </div>
  )
}

