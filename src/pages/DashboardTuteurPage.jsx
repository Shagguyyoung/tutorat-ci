import { useState, useEffect } from "react"
import { useAuth } from "../AuthContext"
import { useNavigate } from "react-router-dom"
import { BookOpen, LogOut, Clock, TrendingUp, Users, CheckCircle, XCircle } from "lucide-react"
import api from "../api"
import StatCard from "../components/StatCard"
import CarteSession from "../components/CarteSession"
import { FadeUp, ListeAnimee, ItemAnimee, PageAnimee } from "../components/AnimationEntree"

export default function DashboardTuteurPage() {
  const { utilisateur, deconnexion } = useAuth()
  const navigate = useNavigate()
  const [sessions, setSessions] = useState([])
  const [chargement, setChargement] = useState(true)
  const [onglet, setOnglet] = useState("toutes")

  useEffect(() => { chargerSessions() }, [])

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
      setSessions(sessions.map(s => s.id === id ? { ...s, statut } : s))
    } catch (e) {
      console.error("Erreur mise à jour statut", e)
    }
  }

  function handleDeconnexion() {
    deconnexion()
    navigate("/")
  }

  const sessionsFiltrees = sessions.filter(s => {
    if (onglet === "toutes") return true
    return s.statut === onglet
  })

  const enAttente   = sessions.filter(s => s.statut === "en_attente")
  const nbTerminees = sessions.filter(s => s.statut === "termine").length
  const heures      = sessions.reduce((acc, s) => acc + s.duree_minutes, 0) / 60
  const revenus     = sessions
    .filter(s => s.statut === "termine")
    .reduce((acc, s) => acc + Number(s.montant), 0)

  return (
    <PageAnimee>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-10">

          {/* En-tête */}
          <FadeUp>
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Tableau de bord tuteur</p>
                <h1 className="text-3xl font-extrabold text-gray-900">
                  Bonjour, {utilisateur?.prenom} 👋
                </h1>
              </div>
              <button
                onClick={handleDeconnexion}
                className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </FadeUp>

          {/* Stats */}
          <ListeAnimee className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <ItemAnimee><StatCard icon={BookOpen} valeur={sessions.length} label="Séances totales" color="bg-violet-50 text-violet-600" /></ItemAnimee>
            <ItemAnimee><StatCard icon={Clock} valeur={`${heures.toFixed(1)}h`} label="Heures enseignées" color="bg-blue-50 text-blue-600" /></ItemAnimee>
            <ItemAnimee><StatCard icon={Users} valeur={enAttente.length} label="En attente" color="bg-amber-50 text-amber-600" /></ItemAnimee>
            <ItemAnimee><StatCard icon={TrendingUp} valeur={`${revenus.toLocaleString()} F`} label="Revenus totaux" color="bg-emerald-50 text-emerald-600" /></ItemAnimee>
          </ListeAnimee>

          {/* Demandes en attente */}
          {enAttente.length > 0 && (
            <FadeUp delay={0.1}>
              <div className="bg-amber-50 border border-amber-100 rounded-3xl p-8 mb-6">
                <h2 className="text-lg font-bold text-amber-800 mb-4">
                  ⏳ Demandes en attente ({enAttente.length})
                </h2>
                <ListeAnimee className="space-y-3">
                  {enAttente.map(s => (
                    <ItemAnimee key={s.id}>
                      <CarteSession
                        session={s}
                        nomPrincipal={`${s.eleve?.profile?.prenom || ""} ${s.eleve?.profile?.nom || ""}`}
                        actions={
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateStatut(s.id, "confirme")}
                              className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              Accepter
                            </button>
                            <button
                              onClick={() => updateStatut(s.id, "annule")}
                              className="flex items-center gap-1 bg-white hover:bg-red-50 text-red-500 text-xs font-semibold px-3 py-2 rounded-xl border border-red-100 transition-colors"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              Refuser
                            </button>
                          </div>
                        }
                      />
                    </ItemAnimee>
                  ))}
                </ListeAnimee>
              </div>
            </FadeUp>
          )}

          {/* Toutes les séances */}
          <FadeUp delay={0.2}>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

              <div className="px-8 pt-8 pb-4">
                <h2 className="text-xl font-bold text-gray-900">Mes séances</h2>
              </div>

              {/* Onglets */}
              <div className="flex gap-1 px-8 pb-4 overflow-x-auto">
                {[
                  { key: "toutes",     label: "Toutes",      count: sessions.length },
                  { key: "en_attente", label: "En attente",  count: enAttente.length },
                  { key: "confirme",   label: "Confirmées",  count: sessions.filter(s => s.statut === "confirme").length },
                  { key: "termine",    label: "Terminées",   count: nbTerminees },
                ].map(o => (
                  <button
                    key={o.key}
                    onClick={() => setOnglet(o.key)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                      onglet === o.key
                        ? "bg-violet-600 text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {o.label}
                    {o.count > 0 && (
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        onglet === o.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                      }`}>
                        {o.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Liste */}
              <div className="px-8 pb-8">
                {chargement ? (
                  <div className="text-center py-16">
                    <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-400 mt-3 text-sm">Chargement...</p>
                  </div>
                ) : sessionsFiltrees.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-4xl mb-3">📭</p>
                    <p className="text-gray-500">Aucune séance dans cette catégorie.</p>
                  </div>
                ) : (
                  <ListeAnimee className="space-y-3">
                    {sessionsFiltrees.map(s => (
                      <ItemAnimee key={s.id}>
                        <CarteSession
                          session={s}
                          nomPrincipal={`${s.eleve?.profile?.prenom || ""} ${s.eleve?.profile?.nom || ""}`}
                          actions={
                            s.statut === "en_attente" ? (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateStatut(s.id, "confirme")}
                                  className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
                                >
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  Accepter
                                </button>
                                <button
                                  onClick={() => updateStatut(s.id, "annule")}
                                  className="flex items-center gap-1 bg-white hover:bg-red-50 text-red-500 text-xs font-semibold px-3 py-2 rounded-xl border border-red-100 transition-colors"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                  Refuser
                                </button>
                              </div>
                            ) : null
                          }
                        />
                      </ItemAnimee>
                    ))}
                  </ListeAnimee>
                )}
              </div>
            </div>
          </FadeUp>

        </div>
      </div>
    </PageAnimee>
  )
}