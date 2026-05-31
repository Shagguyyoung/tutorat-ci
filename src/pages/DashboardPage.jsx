import { useState, useEffect } from "react"
import { useAuth } from "../AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { BookOpen, LogOut, Clock, Star, Search } from "lucide-react"
import api from "../api"
import StatCard from "../components/StatCard"
import CarteSession from "../components/CarteSession"
import FormulaireNotation from "../components/FormulaireNotation"
import BoutonPaiement from "../components/BoutonPaiement"
import { FadeUp, ListeAnimee, ItemAnimee, PageAnimee } from "../components/AnimationEntree"

export default function DashboardPage() {
  const { utilisateur, deconnexion } = useAuth()
  const navigate = useNavigate()
  const [sessions, setSessions] = useState([])
  const [chargement, setChargement] = useState(true)
  const [notationSession, setNotationSession] = useState(null)
  const [onglet, setOnglet] = useState("toutes")

  useEffect(() => { chargerSessions() }, [])

  async function chargerSessions() {
    try {
      const response = await api.get("/mes-sessions")
      setSessions(response.data)
    } catch (e) {
      console.error("Erreur chargement séances", e)
    } finally {
      setChargement(false)
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

  const nbTerminees  = sessions.filter(s => s.statut === "termine").length
  const nbConfirmees = sessions.filter(s => s.statut === "confirme").length
  const heures = sessions.reduce((acc, s) => acc + s.duree_minutes, 0) / 60

  return (
    <PageAnimee>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-10">

          {/* En-tête */}
          <FadeUp>
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Tableau de bord</p>
                <h1 className="text-3xl font-extrabold text-gray-900">
                  Bonjour, {utilisateur?.prenom} 👋
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/recherche"
                  className="hidden md:flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Trouver un tuteur
                </Link>
                <button
                  onClick={handleDeconnexion}
                  className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </FadeUp>

          {/* Stats */}
          <ListeAnimee className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <ItemAnimee><StatCard icon={BookOpen} valeur={sessions.length} label="Séances totales" color="bg-violet-50 text-violet-600" /></ItemAnimee>
            <ItemAnimee><StatCard icon={Clock} valeur={`${heures.toFixed(1)}h`} label="Heures apprises" color="bg-blue-50 text-blue-600" /></ItemAnimee>
            <ItemAnimee><StatCard icon={Star} valeur={nbConfirmees} label="Confirmées" color="bg-emerald-50 text-emerald-600" /></ItemAnimee>
            <ItemAnimee><StatCard icon={BookOpen} valeur={nbTerminees} label="Terminées" color="bg-amber-50 text-amber-600" /></ItemAnimee>
          </ListeAnimee>

          {/* Séances */}
          <FadeUp delay={0.2}>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

              <div className="flex items-center justify-between px-8 pt-8 pb-4">
                <h2 className="text-xl font-bold text-gray-900">Mes séances</h2>
                <Link to="/recherche" className="text-violet-600 text-sm font-semibold hover:underline md:hidden">
                  + Nouvelle
                </Link>
              </div>

              {/* Onglets */}
              <div className="flex gap-1 px-8 pb-4 overflow-x-auto">
                {[
                  { key: "toutes", label: "Toutes", count: sessions.length },
                  { key: "en_attente", label: "En attente", count: sessions.filter(s => s.statut === "en_attente").length },
                  { key: "confirme", label: "Confirmées", count: nbConfirmees },
                  { key: "termine", label: "Terminées", count: nbTerminees },
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
                    <p className="text-4xl mb-3">📚</p>
                    <p className="text-gray-500">Aucune séance dans cette catégorie.</p>
                    <Link to="/recherche" className="mt-4 inline-block text-violet-600 font-semibold hover:underline">
                      Trouver un tuteur →
                    </Link>
                  </div>
                ) : (
                  <ListeAnimee className="space-y-3">
                    {sessionsFiltrees.map(s => (
                      <ItemAnimee key={s.id}>
                        <CarteSession
                          session={s}
                          nomPrincipal={`${s.tuteur?.prenom || ""} ${s.tuteur?.nom || ""}`}
                          actions={
                            <div className="flex items-center gap-2">
                              {s.statut === "confirme" && (
                                <BoutonPaiement sessionId={s.id} montant={s.montant} />
                              )}
                              {s.statut === "termine" && (
                                <button
                                  onClick={() => setNotationSession(notationSession === s.id ? null : s.id)}
                                  className="text-xs font-semibold text-amber-500 hover:text-amber-600 whitespace-nowrap"
                                >
                                  {notationSession === s.id ? "Annuler" : "⭐ Noter"}
                                </button>
                              )}
                            </div>
                          }
                        />
                        {notationSession === s.id && (
                          <div className="mt-2 ml-16">
                            <FormulaireNotation
                              sessionId={s.id}
                              onSuccess={() => { setNotationSession(null); chargerSessions() }}
                            />
                          </div>
                        )}
                      </ItemAnimee>
                    ))}
                  </ListeAnimee>
                )}
              </div>
            </div>
          </FadeUp>

          {/* CTA bas */}
          <FadeUp delay={0.3}>
            <div className="mt-6 bg-gradient-to-br from-violet-600 to-violet-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-white">Besoin d'un tuteur ?</h3>
                <p className="text-violet-200 mt-1 text-sm">Trouvez le tuteur idéal près de chez vous.</p>
              </div>
              <Link
                to="/recherche"
                className="bg-white text-violet-700 font-bold px-8 py-3.5 rounded-2xl hover:bg-violet-50 transition-colors whitespace-nowrap"
              >
                Chercher un tuteur →
              </Link>
            </div>
          </FadeUp>

        </div>
      </div>
    </PageAnimee>
  )
}