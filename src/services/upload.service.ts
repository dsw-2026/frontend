import { httpClient } from '../api/httpClient'

interface SubidaImagen {
  url: string
}

export const uploadService = {
  subirImagen: (archivo: File) => {
    const formData = new FormData()
    // "foto" tiene que coincidir con el nombre de campo que espera
    // multer del lado del backend (ver upload.single('foto')).
    formData.append('foto', archivo)
    return httpClient.uploadFile<SubidaImagen>('/uploads', formData)
  },
}
