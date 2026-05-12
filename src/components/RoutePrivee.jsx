import { Navigate } from "react-router-dom"
import { useAuth } from "../AuthContext"

export default function RoutePrivee({ children, role }) {
  const { utilisateur, chargement } = useAuth()

  // Attendre que le contexte soit chargé
  if (chargement) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // Non connecté → rediriger vers connexion
  if (!utilisateur) {
    return <Navigate to="/connexion" replace />
  }

  // Mauvais rôle → rediriger vers le bon dashboard
  if (role && utilisateur.role !== role) {
    if (utilisateur.role === "tuteur") return <Navigate to="/dashboard-tuteur" replace />
    if (utilisateur.role === "eleve") return <Navigate to="/dashboard" replace />
  }

  return children
}