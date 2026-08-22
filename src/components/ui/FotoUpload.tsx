import { useState, type ChangeEvent } from 'react'
import { uploadService } from '../../services/upload.service'
import { ApiError, API_ORIGIN } from '../../api/httpClient'
import './FotoUpload.css'

interface FotoUploadProps {
  // El valor guardado en el formulario: una URL relativa ("/uploads/x.png")
  // si se subió con este componente, o una URL absoluta si viene de un
  // registro cargado antes de que existiera esta funcionalidad.
  value: string
  onChange: (url: string) => void
  label?: string
}

// Componente "casi dumb": no sabe nada de Publicador/Adoptante/Mascota —
// solo sabe subir un archivo y devolver la URL resultante. El formulario
// que lo usa (PublicadorForm, etc.) sigue guardando esa URL en el mismo
// campo de texto que ya tenía, sin cambios de modelo.
export function FotoUpload({ value, onChange, label = 'Imagen' }: FotoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const archivo = event.target.files?.[0]
    if (!archivo) return

    setUploading(true)
    setError(null)
    try {
      const { url } = await uploadService.subirImagen(archivo)
      onChange(url)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo subir la imagen')
    } finally {
      setUploading(false)
      // Permite volver a elegir el mismo archivo (ej: después de un
      // error) — sin esto, el navegador no dispara onChange si es el
      // mismo archivo dos veces seguidas.
      event.target.value = ''
    }
  }

  // value puede ser relativa (la sube este componente) o absoluta (un
  // registro viejo con una URL externa pegada a mano). Solo se le
  // antepone el origin si hace falta.
  const previewUrl = value ? (value.startsWith('http') ? value : `${API_ORIGIN}${value}`) : null

  return (
    <div className="foto-upload">
      {previewUrl && <img src={previewUrl} alt="Vista previa" className="foto-upload-preview" />}
      <div className="foto-upload-controls">
        <label className="btn btn-secondary foto-upload-btn">
          {uploading ? 'Subiendo…' : previewUrl ? `Cambiar ${label.toLowerCase()}` : `Elegir ${label.toLowerCase()}`}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            disabled={uploading}
            hidden
          />
        </label>
        {previewUrl && (
          <button type="button" className="foto-upload-quitar" onClick={() => onChange('')} disabled={uploading}>
            Quitar
          </button>
        )}
      </div>
      {error && <span className="field-error-text">{error}</span>}
    </div>
  )
}
