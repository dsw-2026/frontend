import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { RutaProtegida } from './components/RutaProtegida'
import { LandingPage } from './pages/landing/LandingPage'
import { LoginPlaceholderPage } from './pages/landing/LoginPlaceholderPage'
import { RegistroPage } from './pages/landing/RegistroPage'
import { EspeciesListPage } from './pages/especies/EspeciesListPage'
import { EspecieFormPage } from './pages/especies/EspecieFormPage'
import { ProvinciasListPage } from './pages/provincias/ProvinciasListPage'
import { ProvinciaFormPage } from './pages/provincias/ProvinciaFormPage'
import { LocalidadesListPage } from './pages/localidades/LocalidadesListPage'
import { LocalidadFormPage } from './pages/localidades/LocalidadFormPage'
import { PublicadoresListPage } from './pages/publicadores/PublicadoresListPage'
import { PublicadorFormPage } from './pages/publicadores/PublicadorFormPage'
import { AdoptantesListPage } from './pages/adoptantes/AdoptantesListPage'
import { AdoptanteFormPage } from './pages/adoptantes/AdoptanteFormPage'
import { MascotasListPage } from './pages/mascotas/MascotasListPage'
import { MascotaFormPage } from './pages/mascotas/MascotaFormPage'
import { SolicitudesListPage } from './pages/solicitudes/SolicitudesListPage'
import { SolicitudFormPage } from './pages/solicitudes/SolicitudFormPage'
import { SolicitudDetallePage } from './pages/solicitudes/SolicitudDetallePage'
import { AdoptarPage } from './pages/adoptar/AdoptarPage'

// "/" y sus vecinas (login, registro) son públicas, SIN el <Layout> de
// gestión (sin el nav interno) — son la puerta de entrada, antes de
// loguearse. Las rutas /registro/adoptante y /registro/publicador también
// son públicas: reutilizan los formularios de alta, pero fuera de la
// protección, para que alguien SIN cuenta pueda registrarse.
// Todo lo demás vive detrás de RutaProtegida (requiere sesión) y dentro
// de <Layout />.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPlaceholderPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/registro/adoptante" element={<AdoptanteFormPage />} />
        <Route path="/registro/publicador" element={<PublicadorFormPage />} />

        <Route element={<RutaProtegida />}>
          <Route element={<Layout />}>
            <Route path="adoptar" element={<AdoptarPage />} />
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
            <Route path="adoptantes" element={<AdoptantesListPage />} />
            <Route path="adoptantes/nuevo" element={<AdoptanteFormPage />} />
            <Route path="adoptantes/:id/editar" element={<AdoptanteFormPage />} />
            <Route path="mascotas" element={<MascotasListPage />} />
            <Route path="mascotas/nueva" element={<MascotaFormPage />} />
            <Route path="mascotas/:id/editar" element={<MascotaFormPage />} />
            <Route path="solicitudes" element={<SolicitudesListPage />} />
            <Route path="solicitudes/nueva" element={<SolicitudFormPage />} />
            <Route path="solicitudes/:id" element={<SolicitudDetallePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App