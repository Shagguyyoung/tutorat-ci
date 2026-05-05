import { useState, useEffect } from "react"
import { MapPin, SlidersHorizontal } from "lucide-react"
import { Link } from "react-router-dom"
import api from "../api"

const MATIERES = ["Mathématiques", "Physique", "Français", "Anglais", "Histoire", "Chimie", "SVT"]
const QUARTIERS = ["Cocody", "Plateau", "Yopougon", "Abobo", "Marcory", "Treichville"]

export default function RecherchePage() {
  const [tuteurs, setTuteurs] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState("")
  const [matiere, setMatiere] = useState("")
  const [quartier, setQuartier] = useState("")
  const [tarifMax, setTarifMax] = useState(10000)
  const [filtresOuverts, setFiltresOuverts] = useState(false)

  useEffect(() => {
    chargerTuteurs()
  }, [matiere, quartier, tarifMax])

  async function chargerTuteurs() {
    try {
      setChargement(true)
      const params = {}
      if (matiere) params.matiere = matiere
      if (quartier) params.quartier = quartier
      if (tarifMax < 10000) params.tarif_max = tarifMax

      const response = await api.get("/tuteurs", { params })
      setTuteurs(response.data)
    } catch (e) {
      setErreur("Impossible de charger les tuteurs.")
    } finally {
      setChargement(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* FILTRES */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-3">

          <select
            value={matiere}
            onChange={e => setMatiere(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            <option value="">Toutes les matières</option>
            {MATIERES.map(m => <option key={m}>{m}</option>)}
          </select>

          <select
            value={quartier}
            onChange={e => setQuartier(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            <option value="">Tous les quartiers</option>
            {QUARTIERS.map(q => <option key={q}>{q}</option>)}
          </select>

          <button
            onClick={() => setFiltresOuverts(!filtresOuverts)}
            className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-gray-600 text-sm hover:border-violet-400 hover:text-violet-600 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtres
          </button>
        </div>

        {filtresOuverts && (
          <div className="max-w-5xl mx-auto mt-4 p-4 bg-gray-50 rounded-xl">
            <label className="text-sm font-medium text-gray-700">
              Tarif maximum : <span className="text-violet-600 font-bold">{tarifMax.toLocaleString()} F/h</span>
            </label>
            <input
              type="range" min={1000} max={10000} step={500}
              value={tarifMax}
              onChange={e => setTarifMax(Number(e.target.value))}
              className="w-full mt-2 accent-violet-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1 000 F</span><span>10 000 F</span>
            </div>
          </div>
        )}
      </div>

      {/* RÉSULTATS */}
      <div className="max-w-5xl mx-auto px-6 py-10">

        {chargement && (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-400 mt-4">Chargement des tuteurs...</p>
          </div>
        )}

        {erreur && (
          <div className="text-center py-20 text-red-500">{erreur}</div>
        )}

        {!chargement && !erreur && (
          <>
            <p className="text-gray-500 text-sm mb-6">
              <span className="font-bold text-gray-900">{tuteurs.length}</span> tuteur{tuteurs.length > 1 ? "s" : ""} trouvé{tuteurs.length > 1 ? "s" : ""}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tuteurs.map(t => (
                <div key={t.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white font-bold text-lg shadow">
                      {t.prenom[0]}{t.nom[0]}
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${t.disponible ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-400"}`}>
                      {t.disponible ? "Disponible" : "Indisponible"}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-900 text-lg">{t.prenom} {t.nom}</h3>
                  <p className="text-violet-600 text-sm font-medium mt-0.5">
                    {t.matieres?.join(" · ")}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">{t.niveaux?.join(" · ")}</p>

                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-400 text-xs">{t.quartier}</span>
                  </div>

                  <div className="flex items-center justify-between mt-5 pt-5 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <span className="text-amber-400">★</span>
                      <span className="text-sm font-semibold text-gray-800">{t.note_moyenne}</span>
                      <span className="text-xs text-gray-400">({t.nb_avis})</span>
                    </div>
                    <span className="font-bold text-gray-900 text-sm">
                      {Number(t.tarif_heure).toLocaleString()} F<span className="font-normal text-gray-400">/h</span>
                    </span>
                  </div>

                  <Link
                    to={`/tuteur/${t.id}`}
                    className="mt-4 block w-full bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors text-center"
                  >
                    Voir le profil
                  </Link>

                </div>
              ))}
            </div>

            {tuteurs.length === 0 && (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-gray-500 text-lg">Aucun tuteur ne correspond à vos critères.</p>
                <button
                  onClick={() => { setMatiere(""); setQuartier(""); setTarifMax(10000) }}
                  className="mt-4 text-violet-600 font-semibold hover:underline"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  )
}