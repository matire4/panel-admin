import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]

    if (files.length === 0) {
      return NextResponse.json({ error: "No se han proporcionado archivos" }, { status: 400 })
    }

    // Conectar con tu backend de Flask
    const flaskUrl = process.env.FLASK_API_URL || "http://localhost:5000/generar_extracto"

    // Crear un nuevo FormData para enviar a Flask
    const flaskFormData = new FormData()

    // Añadir cada archivo al FormData
    files.forEach((file, index) => {
      flaskFormData.append(`file_${index}`, file)
    })

    // Realizar la petición a tu API Flask
    const flaskResponse = await fetch(flaskUrl, {
      method: "POST",
      body: flaskFormData,
    })

    if (!flaskResponse.ok) {
      const errorText = await flaskResponse.text()
      throw new Error(`Error en el servidor Flask: ${errorText}`)
    }

    const flaskData = await flaskResponse.json()
    return NextResponse.json(flaskData)
  } catch (error) {
    console.error("Error al procesar los archivos:", error)
    return NextResponse.json({ error: "Error al procesar los archivos" }, { status: 500 })
  }
}

