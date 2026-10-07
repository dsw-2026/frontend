import { publisherService } from '../../../../services/publisher.service'
import { localityService } from '../../../../services/locality.service'
import type { PublisherInput } from '../../../../models/publisher'

export async function loadPublisherFormData(id?: number) {
  const [localities, publisher] = await Promise.all([
    localityService.getAll(),
    id !== undefined ? publisherService.getById(id) : Promise.resolve(null),
  ])
  return { localities, publisher }
}

export function savePublisher(id: number | undefined, values: PublisherInput) {
  return id !== undefined ? publisherService.update(id, values) : publisherService.create(values)
}