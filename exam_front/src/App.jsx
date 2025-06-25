import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/home/Home';
import Employes from './pages/liste_employes/Employes';
import EmployeFormPage from './pages/form/EmployeFormPage';
import EmployeDetailPage from './pages/employe/EmployeDetailPage';
import Candidats from './pages/liste_candidats/Candidats';
import CandidatFormPage from './pages/form/CandidatFormPage';
import CandidatDetailPage from './pages/candidat/CandidatDetailPage';
import AbsenceFormPage from './pages/form/AbsenceFormPage';
import CongesFormPage from './pages/form/CongesFormPage';
import { ToastProvider } from './components/Toast';
import './App.css';

function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="employes" element={<Employes />} />
            <Route path="employes/new" element={<EmployeFormPage />} />
            <Route path="employes/edit/:id" element={<EmployeFormPage />} />
            <Route path="employes/view/:id" element={<EmployeDetailPage />} />
            <Route path="candidats" element={<Candidats />} />
            <Route path="candidats/new" element={<CandidatFormPage />} />
            <Route path="candidats/edit/:id" element={<CandidatFormPage />} />
            <Route path="candidats/view/:id" element={<CandidatDetailPage />} />
            <Route path="absences/new" element={<AbsenceFormPage />} />
            <Route path="absences/edit/:id" element={<AbsenceFormPage />} />
            <Route path="conges/new" element={<CongesFormPage />} />
            <Route path="conges/edit/:id" element={<CongesFormPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;


