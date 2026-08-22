import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { EspeciesListPage } from './pages/especies/EspeciesListPage'
import { EspecieFormPage } from './pages/especies/EspecieFormPage'
import { ProvinciasListPage } from './pages/provincias/ProvinciasListPage'
import { ProvinciaFormPage } from './pages/provincias/ProvinciaFormPage'
import { LocalidadesListPage } from './pages/localidades/LocalidadesListPage'
import { LocalidadFormPage } from './pages/localidades/LocalidadFormPage'
import { PublicadoresListPage } from './pages/publicadores/PublicadoresListPage'
import { PublicadorFormPage } from './pages/publicadores/PublicadorFormPage'

// Todas las rutas viven bajo <Layout />, que pone el header/nav una sola
// vez y renderiza la página activa dentro de <Outlet />.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/especies" replace />} />
          <Route path="especies" element={<EspeciesListPage />} />
          <Route path="especies/nueva" element={<EspecieFormPage />} />
          <Route path="especies/:id/editar" element={<EspecieFormPage />} />
          <Route path="provincias" element={<ProvinciasListPage />} />
          <Route path="provincias/nueva" element={<ProvinciaFormPage />} />
          <Route path="provincias/:id/editar" element={<ProvinciaFormPage />} />
          <Route path="localidades" element={<LocalidadesListPage />} />
          <Route path="localidades/nueva" element={<LocalidadFormPage />} />
          <Route path="localidades/:id/editar" element={<LocalidadFormPage />} />
          <Route path="publicadores" element={<PublicadoresListPage />} />
          <Route path="publicadores/nuevo" element={<PublicadorFormPage />} />
          <Route path="publicadores/:id/editar" element={<PublicadorFormPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
