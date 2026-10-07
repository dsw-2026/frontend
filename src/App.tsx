import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Layout } from './components/shared/layout/layout/Layout'
import { PublicLayout } from './components/shared/layout/publicLayout/PublicLayout'
import { ProtectedRoute } from './components/auth/protected/ProtectedRoute'
import { Login } from './components/auth/login/Login'
import { Register } from './components/auth/register/Register'
import { Landing } from './components/landing/Landing'

import { SpeciesList } from './components/biz/species/speciesList/SpeciesList'
import { SpeciesForm } from './components/biz/species/speciesForm/SpeciesForm'
import { ProvinceList } from './components/biz/province/provinceList/ProvinceList'
import { ProvinceForm } from './components/biz/province/provinceForm/ProvinceForm'
import { LocalityList } from './components/biz/locality/localityList/LocalityList'
import { LocalityForm } from './components/biz/locality/localityForm/LocalityForm'
import { PublisherList } from './components/biz/publisher/publisherList/PublisherList'
import { PublisherForm } from './components/biz/publisher/publisherForm/PublisherForm'
import { AdopterList } from './components/biz/adopter/adopterList/AdopterList'
import { AdopterForm } from './components/biz/adopter/adopterForm/AdopterForm'
import { PetList } from './components/biz/pet/petList/PetList'
import { PetForm } from './components/biz/pet/petForm/PetForm'
import { AdoptionView } from './components/biz/adoption/adoptionView/AdoptionView'
import { ApplicationList } from './components/biz/application/applicationList/ApplicationList'
import { ApplicationForm } from './components/biz/application/applicationForm/ApplicationForm'
import { ApplicationDetails } from './components/biz/application/applicationDetails/ApplicationDetails'
// import { PageNotFound } from './components/pageNotFound/PageNotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PublicLayout />}>
          <Route path="/register/adopter" element={<AdopterForm registrationMode />} />
          <Route path="/register/publisher" element={<PublisherForm registrationMode />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="adopt" element={<AdoptionView />} />

            <Route path="species" element={<SpeciesList />} />
            <Route path="species/new" element={<SpeciesForm />} />
            <Route path="species/:id/edit" element={<SpeciesForm />} />

            <Route path="provinces" element={<ProvinceList />} />
            <Route path="provinces/new" element={<ProvinceForm />} />
            <Route path="provinces/:id/edit" element={<ProvinceForm />} />

            <Route path="localities" element={<LocalityList />} />
            <Route path="localities/new" element={<LocalityForm />} />
            <Route path="localities/:id/edit" element={<LocalityForm />} />

            <Route path="publishers" element={<PublisherList />} />
            <Route path="publishers/:id/edit" element={<PublisherForm />} />

            <Route path="adopters" element={<AdopterList />} />
            <Route path="adopters/:id/edit" element={<AdopterForm />} />

            <Route path="pets" element={<PetList />} />
            <Route path="pets/new" element={<PetForm />} />
            <Route path="pets/:id/edit" element={<PetForm />} />

            <Route path="applications" element={<ApplicationList />} />
            <Route path="applications/new" element={<ApplicationForm />} />
            <Route path="applications/:id" element={<ApplicationDetails />} />
          </Route>
        </Route>

        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App