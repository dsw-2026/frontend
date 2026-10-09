import { httpClient } from '@/shared/api/httpClient'

interface UploadedImage {
  url: string
}

export const uploadService = {
  uploadImage: (file: File) => {
    const formData = new FormData()
    formData.append('foto', file)
    return httpClient.uploadFile<UploadedImage>('/uploads', formData)
  },
}
