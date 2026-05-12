import { createContext, useContext, useState, useEffect } from "react"
import api from "./api"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [utilisateur, setUtilisateur] = useState(null)
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    // Vérifier si un utilisateur est déjà connecté au chargement
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")
    if (token && user) {
      setUtilisateur(JSON.parse(user))
    }
    setChargement(false)
  }, [])

  async function connexion(email, motDePasse) {
    const response = await api.post("/connexion", {
      email,
      mot_de_passe: motDePasse,
    })
    const { token, user } = response.data
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
    setUtilisateur(user)
    return user
  }

  async function inscription(form) {
    const response = await api.post("/inscription", {
      prenom: form.prenom,
      nom: form.nom,
      email: form.email,
      mot_de_passe: form.motDePasse,
      role: form.role,
    })
    const { token, user } = response.data
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
    setUtilisateur(user)
    return user
  }

  function deconnexion() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUtilisateur(null)
  }

  return (
    <AuthContext.Provider value={{ utilisateur, connexion, inscription, deconnexion, chargement }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}