import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard, MessageSquare } from "lucide-react";
import { useAuth } from "../AuthContext";

export default function Navbar() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const { utilisateur, deconnexion } = useAuth();
  const navigate = useNavigate();

  function handleDeconnexion() {
    deconnexion();
    navigate("/");
    setMenuOuvert(false);
  }

  function lienDashboard() {
    if (utilisateur?.role === "tuteur") return "/dashboard-tuteur";
    if (utilisateur?.role === "admin") return "/admin";
    return "/dashboard";
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-md transition-transform group-hover:rotate-12">
              T
            </div>
            <div className="font-black text-3xl tracking-tighter">
              tutorat<span className="text-violet-600">CI</span>
            </div>
          </Link>

          {/* Liens Desktop */}
          <div className="hidden md:flex items-center gap-9">
            <Link 
              to="/" 
              className="text-zinc-600 hover:text-zinc-900 font-medium transition-colors"
            >
              Accueil
            </Link>
            <Link 
              to="/recherche" 
              className="text-zinc-600 hover:text-zinc-900 font-medium transition-colors"
            >
              Trouver un tuteur
            </Link>
            {!utilisateur && (
              <Link 
                to="/devenir-tuteur" 
                className="text-zinc-600 hover:text-zinc-900 font-medium transition-colors"
              >
                Devenir tuteur
              </Link>
            )}
          </div>

          {/* Zone droite - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {utilisateur ? (
              <>
                {/* Messages */}
                <Link
                  to="/messages"
                  className="p-3 text-zinc-500 hover:text-violet-600 hover:bg-violet-50 rounded-2xl transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                </Link>

                {/* Dashboard + Nom */}
                <Link
                  to={lienDashboard()}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-50 rounded-2xl transition-all group"
                >
                  <LayoutDashboard className="w-5 h-5 text-zinc-500 group-hover:text-violet-600" />
                  <div>
                    <p className="text-sm font-semibold text-zinc-800">{utilisateur.prenom}</p>
                    <p className="text-[10px] text-zinc-400 -mt-1">Tableau de bord</p>
                  </div>
                </Link>

                {/* Badge Role */}
                <span className={`text-xs font-bold px-4 py-1.5 rounded-full ${
                  utilisateur.role === "tuteur"
                    ? "bg-violet-100 text-violet-700"
                    : utilisateur.role === "admin"
                    ? "bg-red-100 text-red-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}>
                  {utilisateur.role === "tuteur" ? "Tuteur" : utilisateur.role === "admin" ? "Admin" : "Élève"}
                </span>

                {/* Déconnexion */}
                <button
                  onClick={handleDeconnexion}
                  className="p-3 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/connexion"
                  className="px-6 py-2.5 text-sm font-semibold text-zinc-700 hover:text-zinc-900 transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  to="/inscription"
                  className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-6 py-2.5 rounded-2xl transition-all active:scale-95"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          {/* Bouton Mobile */}
          <button
            className="md:hidden p-3 text-zinc-600"
            onClick={() => setMenuOuvert(!menuOuvert)}
          >
            {menuOuvert ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuOuvert && (
        <div className="md:hidden border-t bg-white px-6 py-6">
          <div className="flex flex-col gap-5">
            <Link to="/" className="text-lg font-medium" onClick={() => setMenuOuvert(false)}>Accueil</Link>
            <Link to="/recherche" className="text-lg font-medium" onClick={() => setMenuOuvert(false)}>Trouver un tuteur</Link>

            {utilisateur ? (
              <>
                <Link 
                  to={lienDashboard()} 
                  className="text-lg font-medium" 
                  onClick={() => setMenuOuvert(false)}
                >
                  Mon Dashboard
                </Link>
                <Link 
                  to="/messages" 
                  className="text-lg font-medium" 
                  onClick={() => setMenuOuvert(false)}
                >
                  Messages
                </Link>
                <button
                  onClick={handleDeconnexion}
                  className="text-left text-red-600 font-medium text-lg"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/connexion" className="text-lg font-medium" onClick={() => setMenuOuvert(false)}>Connexion</Link>
                <Link 
                  to="/inscription" 
                  className="bg-violet-600 text-white text-center font-semibold py-3.5 rounded-2xl mt-4"
                  onClick={() => setMenuOuvert(false)}
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}