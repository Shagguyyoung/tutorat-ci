import { useState, useEffect } from "react"
import { useAuth } from "../AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { BookOpen, Calendar, LogOut, Users, Clock, TrendingUp, CheckCircle, XCircle } from "lucide-react"
import api from "../api"

const STATUT_STYLE = {
  confirme:   "bg-emerald-50 text-emerald-700",
  en_attente: "bg-amber-50 text-amber-700",
  termine:    "bg-gray-100 text-gray-500",
  annule:     "bg-red-50 text-red-500",
}

const STATUT_LABEL = {
  confirme:   "Confirmé",
  en_attente: "En attente",
  termine:    "Terminé",
  annule:     "Annulé",
}

export default function DashboardTuteurPage() {
  const { utilisateur, deconnexion } = useAuth()
  const navigate = useNavigate()
  const [sessions, setSessions] = useState([])
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    chargerSessions()
  }, [])

  async function chargerSessions() {
    try {
      const response = await api.get("/mes-sessions-tuteur")
      setSessions(response.data)
    } catch (e) {
      console.error("Erreur chargement séances", e)
    } finally {
      setChargement(false)
    }
  }

  async function updateStatut(id, statut) {
    try {
      await api.patch(`/sessions/${id}/statut`, { statut })
      // Mettre à jour localement sans recharger
      setSessions(sessions.map(s =>
        s.id === id ? { ...s, statut } : s
      ))
    } catch (e) {
      console.error("Erreur mise à jour statut", e)
    }
  }

  function handleDeconnexion() {
    deconnexion()
    navigate("/")
  }

  // Stats calculées
  const enAttente = sessions.filter(s => s.statut === "en_attente")
  const nbTerminees = sessions.filter(s => s.statut === "termine").length
  const heures = sessions.reduce((acc, s) => acc + s.duree_minutes, 0) / 60
  const revenus = sessions
    .filter(s => s.statut === "termine")
    .reduce((acc, s) => acc + Number(s.montant), 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* En-tête */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Bonjour, {utilisateur?.prenom || "Tuteur"} 👋
            </h1>
            <p className="text-gray-400 mt-1">Voici un résumé de vos activités</p>
          </div>
          <button
            onClick={handleDeconnexion}
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Séances totales", valeur: sessions.length, icon: BookOpen, color: "text-violet-600 bg-violet-50" },
            { label: "Heures enseignées", valeur: `${heures.toFixed(1)}h`, icon: Clock, color: "text-blue-600 bg-blue-50" },
            { label: "En attente", valeur: enAttente.length, icon: Users, color: "text-amber-600 bg-amber-50" },
            { label: "Revenus totaux", valeur: `${revenus.toLocaleString()} F`, icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-extrabold text-gray-900">{s.valeur}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Demandes en attente */}
        {enAttente.length > 0 && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Demandes en attente
              <span className="ml-2 bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {enAttente.length}
              </span>
            </h2>
            <div className="space-y-4">
              {enAttente.map(s => (
                <div key={s.id} className="flex items-center justify-between p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold shadow">
                      {s.eleve?.profile?.prenom?.[0] || "E"}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {s.eleve?.profile?.prenom} {s.eleve?.profile?.nom}
                      </p>
                      <p className="text-violet-600 text-sm">{s.matiere}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-400">
                          {new Date(s.date_heure).toLocaleDateString("fr-FR", {
                            day: "numeric", month: "long", year: "numeric"
                          })} à {new Date(s.date_heure).toLocaleTimeString("fr-FR", {
                            hour: "2-digit", minute: "2-digit"
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateStatut(s.id, "confirme")}
                      className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Accepter
                    </button>
                    <button
                      onClick={() => updateStatut(s.id, "annule")}
                      className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Refuser
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Toutes les séances */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Toutes mes séances</h2>

          {chargement ? (
            <div className="text-center py-10">
              <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-400 mt-3 text-sm">Chargement...</p>
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-gray-500">Vous n'avez pas encore de séance.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map(s => (
                <div key={s.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white font-bold shadow">
                      {s.eleve?.profile?.prenom?.[0] || "E"}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {s.eleve?.profile?.prenom} {s.eleve?.profile?.nom}
                      </p>
                      <p className="text-violet-600 text-sm">{s.matiere}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-400">
                          {new Date(s.date_heure).toLocaleDateString("fr-FR", {
                            day: "numeric", month: "long", year: "numeric"
                          })} à {new Date(s.date_heure).toLocaleTimeString("fr-FR", {
                            hour: "2-digit", minute: "2-digit"
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUT_STYLE[s.statut]}`}>
                      {STATUT_LABEL[s.statut]}
                    </span>
                    <span className="font-bold text-gray-900 text-sm">
                      {Number(s.montant).toLocaleString()} F
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}