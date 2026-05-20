import { useState, useEffect } from "react"
import { MapPin, Star, Clock, BookOpen, ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import api from "../api"
import { useAuth } from "../AuthContext"
import { useNavigate } from "react-router-dom"

function Etoiles({ note }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= Math.round(note) ? "text-amber-400" : "text-gray-200"}>★</span>
      ))}
    </div>
  )
}

export default function ProfilPage() {
  const { id } = useParams()
  const { utilisateur } = useAuth()
  const [tuteur, setTuteur] = useState(null)
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    chargerTuteur()
  }, [id])

  async function chargerTuteur() {
    try {
      const response = await api.get(`/tuteurs/${id}`)
      setTuteur(response.data)
    } catch (e) {
      setErreur("Tuteur introuvable.")
    } finally {
      setChargement(false)
    }
  }

  if (chargement) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (erreur || !tuteur) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">😕</p>
          <p className="text-gray-500 text-lg">{erreur || "Tuteur introuvable."}</p>
          <Link to="/recherche" className="mt-4 inline-block text-violet-600 font-semibold hover:underline">
            Retour à la recherche
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Retour */}
        <Link to="/recherche" className="inline-flex items-center gap-2 text-gray-500 hover:text-violet-600 transition-colors text-sm mb-8">
          <ArrowLeft className="w-4 h-4" />
          Retour à la recherche
        </Link>

        <div className="grid md:grid-cols-3 gap-8">

          {/* COLONNE GAUCHE */}
          <div className="md:col-span-2 space-y-6">

            {/* Carte identité */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white font-bold text-2xl shadow-lg flex-shrink-0">
                  {tuteur.prenom?.[0]}{tuteur.nom?.[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-2xl font-extrabold text-gray-900">
                        {tuteur.prenom} {tuteur.nom}
                      </h1>
                      <p className="text-violet-600 font-medium mt-0.5">
                        {tuteur.matieres?.join(" · ")}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      tuteur.disponible
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-gray-100 text-gray-400"
                    }`}>
                      {tuteur.disponible ? "Disponible" : "Indisponible"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-gray-800">{tuteur.note_moyenne}</span>
                      <span className="text-gray-400 text-sm">({tuteur.nb_avis} avis)</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <MapPin className="w-4 h-4" />
                      {tuteur.quartier}, {tuteur.ville}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">À propos</h2>
              <p className="text-gray-600 leading-relaxed">
                {tuteur.bio || "Ce tuteur n'a pas encore renseigné sa biographie."}
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {tuteur.niveaux?.map(n => (
                  <span key={n} className="bg-violet-50 text-violet-700 text-sm font-medium px-3 py-1 rounded-full">
                    {n}
                  </span>
                ))}
                {tuteur.matieres?.map(m => (
                  <span key={m} className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Avis */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Avis des élèves
                <span className="ml-2 text-gray-400 text-sm font-normal">({tuteur.reviews?.length || 0})</span>
              </h2>

              {tuteur.reviews?.length === 0 || !tuteur.reviews ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">Pas encore d'avis pour ce tuteur.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {tuteur.reviews.map(a => (
                    <div key={a.id} className="border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-sm">
                            {a.eleve?.email?.[0]?.toUpperCase()}
                          </div>
                          <span className="font-semibold text-gray-800">
                            {a.eleve?.profile?.prenom || "Élève anonyme"}
                          </span>
                        </div>
                        <span className="text-gray-400 text-xs">
                          {new Date(a.created_at).toLocaleDateString("fr-FR", {
                            month: "long", year: "numeric"
                          })}
                        </span>
                      </div>
                      <Etoiles note={a.note} />
                      <p className="text-gray-600 text-sm mt-2">{a.commentaire}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* COLONNE DROITE — Réservation */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-6">
              <div className="text-center mb-6">
                <span className="text-3xl font-extrabold text-gray-900">
                  {Number(tuteur.tarif_heure).toLocaleString()} F
                </span>
                <span className="text-gray-400 text-sm"> / heure</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-violet-400" />
                  Séance d'1h minimum
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-violet-400" />
                  {tuteur.quartier || "Lieu à définir"}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <BookOpen className="w-4 h-4 text-violet-400" />
                  Paiement mobile money
                </div>
              </div>

              {utilisateur ? (
  utilisateur.role === "eleve" ? (
    <>
      <Link
        to={`/reserver/${tuteur.id}`}
        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-2xl transition-colors text-center block"
      >
        Réserver une séance
      </Link>
      <button
        onClick={() => navigate(`/messages/${tuteur.user_id}`)}
        className="w-full mt-3 border border-gray-200 text-gray-700 font-semibold py-3.5 rounded-2xl hover:border-violet-400 hover:text-violet-600 transition-colors"
      >
        Envoyer un message
      </button>
    </>
  ) : (
    <p className="text-center text-gray-400 text-sm">
      Seuls les élèves peuvent réserver.
    </p>
  )
) : (
                <Link
                  to="/connexion"
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-2xl transition-colors text-center block"
                >
                  Connectez-vous pour réserver
                </Link>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-gray-900">{tuteur.nb_seances}</div>
                  <div className="text-xs text-gray-400">séances</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-gray-900">{tuteur.nb_avis}</div>
                  <div className="text-xs text-gray-400">avis</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}