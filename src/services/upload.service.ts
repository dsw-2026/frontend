import { httpClient } from '../api/httpClient'

interface ImageUpload {
  url: string
}

export const uploadService = {
  uploadImage: (file: File) => {
    const formData = new FormData()
    formData.append('foto', file)
    return httpClient.uploadFile<ImageUpload>('/uploads', formData)
  },
}