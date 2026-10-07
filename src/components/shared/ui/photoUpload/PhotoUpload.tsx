import { useState, type ChangeEvent } from 'react'
import { uploadService } from '../../../../services/upload.service'
import { ApiError, API_ORIGIN } from '../../../../api/httpClient'
import './PhotoUpload.css'

interface PhotoUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export function PhotoUpload({ value, onChange, label = 'Imagen' }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)
    try {
      const { url } = await uploadService.uploadImage(file)
      onChange(url)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo subir la imagen')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  const previewUrl = value ? (value.startsWith('http') ? value : `${API_ORIGIN}${value}`) : null

  return (
    <div className="photo-upload">
      {previewUrl && <img src={previewUrl} alt="Vista previa" className="photo-upload-preview" />}
      <div className="photo-upload-controls">
        <label className="btn btn-secondary photo-upload-btn">
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
          <button type="button" className="photo-upload-remove" onClick={() => onChange('')} disabled={uploading}>
            Quitar
          </button>
        )}
      </div>
      {error && <span className="field-error-text">{error}</span>}
    </div>
  )
}