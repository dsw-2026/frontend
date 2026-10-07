
import { publisherService } from '../../../../services/publisher.service'

export function loadAllPublishers() {
  return publisherService.getAll()
}

export function deletePublisher(id: number) {
  return publisherService.remove(id)
}