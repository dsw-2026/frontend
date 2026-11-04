import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Without vitest globals, RTL doesn't auto-clean the DOM between tests.
afterEach(() => {
  cleanup()
})