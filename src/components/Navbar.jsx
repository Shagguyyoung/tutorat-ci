import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react"
import { useAuth } from "../AuthContext"

export default function Navbar() {
  const [menuOuvert, setMenuOuvert] = useState(false)
  const { utilisateur, deconnexion } = useAuth()
  const navigate = useNavigate()

  function handleDeconnexion() {
    deconnexion()
    navigate("/")
    setMenuOuvert(false)
  }

  function lienDashboard() {
    if (utilisateur?.role === "tuteur") return "/dashboard-tuteur"
    if (utilisateur?.role === "admin") return "/admin"
    return "/dashboard"
  }

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-xl font-extrabold text-violet-600">
          Tutorat<span className="text-gray-900">CI</span>
        </Link>

        {/* Liens desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-600 hover:text-violet-600 transition-colors text-sm font-medium">
            Accueil
          </Link>
          <Link to="/recherche" className="text-gray-600 hover:text-violet-600 transition-colors text-sm font-medium">
            Trouver un tuteur
          </Link>
          {!utilisateur && (
            <Link to="/devenir-tuteur" className="text-gray-600 hover:text-violet-600 transition-colors text-sm font-medium">
              Devenir tuteur
            </Link>
          )}
        </div>

        {/* Boutons droite */}
        <div className="hidden md:flex items-center gap-3">

          {utilisateur ? (
            // Utilisateur connecté
            <>
              <Link
                to={lienDashboard()}
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-violet-600 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                {utilisateur.prenom}
              </Link>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                utilisateur.role === "tuteur"
                  ? "bg-violet-100 text-violet-700"
                  : utilisateur.role === "admin"
                  ? "bg-red-100 text-red-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}>
                {utilisateur.role === "tuteur" ? "Tuteur" : utilisateur.role === "admin" ? "Admin" : "Élève"}
              </span>
              <button
                onClick={handleDeconnexion}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            // Non connecté
            <>
              <Link
                to="/connexion"
                className="text-sm font-semibold text-gray-700 hover:text-violet-600 transition-colors"
              >
                Connexion
              </Link>
              <Link
                to="/inscription"
                className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                S'inscrire
              </Link>
            </>
          )}

        </div>

        {/* Bouton menu mobile */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMenuOuvert(!menuOuvert)}
        >
          {menuOuvert ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOuvert && (
        <div className="md:hidden mt-4 flex flex-col gap-4 px-2 pb-4 border-t border-gray-100 pt-4">
          <Link to="/" className="text-gray-700 font-medium" onClick={() => setMenuOuvert(false)}>Accueil</Link>
          <Link to="/recherche" className="text-gray-700 font-medium" onClick={() => setMenuOuvert(false)}>Trouver un tuteur</Link>

          {utilisateur ? (
            <>
              <Link
                to={lienDashboard()}
                className="text-gray-700 font-medium"
                onClick={() => setMenuOuvert(false)}
              >
                Mon dashboard
              </Link>
              <button
                onClick={handleDeconnexion}
                className="text-left text-red-500 font-medium"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/connexion" className="text-gray-700 font-medium" onClick={() => setMenuOuvert(false)}>Connexion</Link>
              <Link
                to="/inscription"
                className="bg-violet-600 text-white text-center font-semibold px-4 py-2 rounded-xl"
                onClick={() => setMenuOuvert(false)}
              >
                S'inscrire
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}