import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { AuthProvider } from "./AuthContext"
import Navbar from "./components/Navbar"
import RoutePrivee from "./components/RoutePrivee"
import HomePage from "./pages/HomePage"
import RecherchePage from "./pages/RecherchePage"
import ProfilPage from "./pages/ProfilPage"
import ConnexionPage from "./pages/ConnexionPage"
import InscriptionPage from "./pages/InscriptionPage"
import DashboardPage from "./pages/DashboardPage"
import DashboardTuteurPage from "./pages/DashboardTuteurPage"
import ReservationPage from "./pages/ReservationPage"
import Footer from "./components/Footer"
import MessageriePage from "./pages/MessageriePage"

function AppContent() {
  const location = useLocation()

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          {/* Routes publiques */}
          <Route path="/" element={<HomePage />} />
          <Route path="/recherche" element={<RecherchePage />} />
          <Route path="/tuteur/:id" element={<ProfilPage />} />
          <Route path="/connexion" element={<ConnexionPage />} />
          <Route path="/inscription" element={<InscriptionPage />} />

          {/* Routes privées — élève */}
          <Route path="/dashboard" element={
            <RoutePrivee role="eleve">
              <DashboardPage />
            </RoutePrivee>
          } />
          <Route path="/reserver/:id" element={
            <RoutePrivee role="eleve">
              <ReservationPage />
            </RoutePrivee>
          } />

          {/* Routes privées — tuteur */}
          <Route path="/dashboard-tuteur" element={
            <RoutePrivee role="tuteur">
              <DashboardTuteurPage />
            </RoutePrivee>
          } />

          {/* Routes privées — messages */}
          <Route path="/messages" element={
            <RoutePrivee>
              <MessageriePage />
            </RoutePrivee>
          } />
          <Route path="/messages/:userId" element={
            <RoutePrivee>
              <MessageriePage />
            </RoutePrivee>
          } />

        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App