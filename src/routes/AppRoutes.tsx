import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/shared/components/layout/Layout'
import { LayoutPublico } from '@/shared/components/layout/LayoutPublic'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { LandingPage } from '@/features/landing/LandingPage'
import { LoginPlaceholderPage } from '@/features/auth/pages/LoginPlaceholderPage'
import { RegistroPage } from '@/features/auth/pages/RegisterPage'
import { SpeciesListPage } from '@/features/species/pages/SpeciesListPage'
import { SpeciesFormPage } from '@/features/species/pages/SpeciesFormPage'
import { ProvincesListPage } from '@/features/province/pages/ProvincesListPage'
import { ProvinceFormPage } from '@/features/province/pages/ProvinceFormPage'
import { LocalityListPage } from '@/features/locality/pages/LocalityListPage'
import { LocalityFormPage } from '@/features/locality/pages/LocalityFormPage'
import { PublisherListPage } from '@/features/publisher/pages/PublisherListPage'
import { PublisherFormPage } from '@/features/publisher/pages/PublisherFormPage'
import { AdopterListPage } from '@/features/adopter/pages/AdopterListPage'
import { AdopterFormPage } from '@/features/adopter/pages/AdopterFormPage'
import { PetListPage } from '@/features/pet/pages/PetListPage'
import { PetFormPage } from '@/features/pet/pages/PetFormPage'
import { AdoptPage } from '@/features/pet/pages/AdoptPage'
import { ApplicationListPage } from '@/features/application/pages/ApplicationListPage'
import { ApplicationFormPage } from '@/features/application/pages/ApplicationFormPage'
import { ApplicationDetailPage } from '@/features/application/pages/ApplicationDetailPage'

export function AppRoutes() {
  return (
    <Routes>
      {/* Public view routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPlaceholderPage />} />
      <Route path="/register" element={<RegistroPage />} />

      {/* Public registration flow */}
      <Route element={<LayoutPublico />}>
        <Route path="/register/adopter" element={<AdopterFormPage modoRegistro />} />
        <Route path="/register/publisher" element={<PublisherFormPage modoRegistro />} />
      </Route>

      {/* Persistent application layout */}
      <Route element={<Layout />}>
        {/* Admin system management */}
        <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
          <Route path="species" element={<SpeciesListPage />} />
          <Route path="species/new" element={<SpeciesFormPage />} />
          <Route path="species/:id/edit" element={<SpeciesFormPage />} />

          <Route path="provinces" element={<ProvincesListPage />} />
          <Route path="provinces/new" element={<ProvinceFormPage />} />
          <Route path="provinces/:id/edit" element={<ProvinceFormPage />} />

          <Route path="localities" element={<LocalityListPage />} />
          <Route path="localities/new" element={<LocalityFormPage />} />
          <Route path="localities/:id/edit" element={<LocalityFormPage />} />

          <Route path="publishers" element={<PublisherListPage />} />
          <Route path="publishers/:id/edit" element={<PublisherFormPage />} />

          <Route path="adopters" element={<AdopterListPage />} />
          <Route path="adopters/:id/edit" element={<AdopterFormPage />} />
        </Route>

        {/* Pet catalog management */}
        <Route element={<ProtectedRoute allowedRoles={['Publisher', 'Admin']} />}>
          <Route path="pets" element={<PetListPage />} />
          <Route path="pets/new" element={<PetFormPage />} />
          <Route path="pets/:id/edit" element={<PetFormPage />} />
        </Route>

        {/* General authenticated modules */}
        <Route element={<ProtectedRoute allowedRoles={['Adopter', 'Admin', 'Publisher']} />}>
          <Route path="adopt" element={<AdoptPage />} />
          <Route path="applications" element={<ApplicationListPage />} />
          <Route path="applications/new" element={<ApplicationFormPage />} />
          <Route path="applications/:id" element={<ApplicationDetailPage />} />
        </Route>
      </Route>
    </Routes>
  )
}