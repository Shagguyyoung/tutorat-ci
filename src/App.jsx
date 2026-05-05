import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import RecherchePage from "./pages/RecherchePage"
import ProfilPage from "./pages/ProfilPage"
import ConnexionPage from "./pages/ConnexionPage"
import InscriptionPage from "./pages/InscriptionPage"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recherche" element={<RecherchePage />} />
        <Route path="/tuteur/:id" element={<ProfilPage />} />
        <Route path="/connexion" element={<ConnexionPage />} />
        <Route path="/inscription" element={<InscriptionPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App