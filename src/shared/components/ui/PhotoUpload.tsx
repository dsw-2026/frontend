import { useState, type ChangeEvent } from 'react'
import { uploadService } from '@/shared/api/upload.service'
import { ApiError, API_ORIGIN } from '@/shared/api/httpClient'

interface FotoUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export function FotoUpload({ value, onChange, label = 'Imagen' }: FotoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const archivo = event.target.files?.[0]
    if (!archivo) return

    setUploading(true)
    setError(null)
    try {
      const { url } = await uploadService.uploadImage(archivo)
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
    <div className="flex flex-col gap-3">
      {previewUrl && (
        <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-sm">
          <img
            src={previewUrl}
            alt="Vista previa"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        <label className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 select-none">
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
          <button
            type="button"
            onClick={() => onChange('')}
            disabled={uploading}
            className="px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            Quitar
          </button>
        )}
      </div>

      {error && (
        <span className="text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </span>
      )}
    </div>
  )
}