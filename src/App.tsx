import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AppRoutes } from '@/routes/AppRoutes'
import { ThemeProvider } from '@/shared/context/ThemeProvider'
import { useTheme } from '@/shared/context/useTheme'

function ToasterWithTheme() {
  const { theme } = useTheme()
  return <Toaster position="top-right" richColors closeButton theme={theme} />
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ToasterWithTheme />
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}