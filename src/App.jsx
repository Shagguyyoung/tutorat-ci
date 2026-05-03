import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import RecherchePage from "./pages/RecherchePage"
import ProfilPage from "./pages/ProfilPage"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recherche" element={<RecherchePage />} />
        <Route path="/tuteur/:id" element={<ProfilPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App