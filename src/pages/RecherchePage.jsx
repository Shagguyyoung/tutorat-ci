import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, MapPin, SlidersHorizontal } from "lucide-react"


const MATIERES = ["Mathématiques", "Physique", "Français", "Anglais", "Histoire", "Chimie", "SVT"]
const QUARTIERS = ["Cocody", "Plateau", "Yopougon", "Abobo", "Marcory", "Treichville"]

const TUTEURS = [
  { id: 1, nom: "Ibrahim Koné", initiales: "IK", color: "from-violet-500 to-purple-700", matiere: "Mathématiques", quartier: "Cocody", tarif: 5000, note: 4.9, nb_avis: 47, niveaux: "Lycée · Université", disponible: true },
  { id: 2, nom: "Aminata Diabaté", initiales: "AD", color: "from-rose-400 to-pink-600", matiere: "Français", quartier: "Plateau", tarif: 4000, note: 4.8, nb_avis: 31, niveaux: "Collège · Lycée", disponible: true },
  { id: 3, nom: "Moussa Coulibaly", initiales: "MC", color: "from-teal-400 to-emerald-600", matiere: "Anglais", quartier: "Yopougon", tarif: 3500, note: 4.7, nb_avis: 22, niveaux: "Collège · Lycée", disponible: false },
  { id: 4, nom: "Fatou Traoré", initiales: "FT", color: "from-amber-400 to-orange-500", matiere: "Physique", quartier: "Cocody", tarif: 4500, note: 4.6, nb_avis: 18, niveaux: "Lycée", disponible: true },
  { id: 5, nom: "Kofi Asante", initiales: "KA", color: "from-blue-400 to-indigo-600", matiere: "Mathématiques", quartier: "Marcory", tarif: 3000, note: 4.5, nb_avis: 14, niveaux: "Collège", disponible: true },
]

export default function RecherchePage() {
  const [matiere, setMatiere] = useState("")
  const [quartier, setQuartier] = useState("")
  const [tarifMax, setTarifMax] = useState(10000)
  const [filtresOuverts, setFiltresOuverts] = useState(false)

  // Filtrage des tuteurs
  const tuteursFiltres = TUTEURS.filter(t => {
    if (matiere && t.matiere !== matiere) return false
    if (quartier && t.quartier !== quartier) return false
    if (t.tarif > tarifMax) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">

      {/* BARRE DE RECHERCHE */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-3">

          {/* Matière */}
          <select
            value={matiere}
            onChange={e => setMatiere(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            <option value="">Toutes les matières</option>
            {MATIERES.map(m => <option key={m}>{m}</option>)}
          </select>

          {/* Quartier */}
          <select
            value={quartier}
            onChange={e => setQuartier(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            <option value="">Tous les quartiers</option>
            {QUARTIERS.map(q => <option key={q}>{q}</option>)}
          </select>

          {/* Bouton filtres */}
          <button
            onClick={() => setFiltresOuverts(!filtresOuverts)}
            className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-gray-600 text-sm hover:border-violet-400 hover:text-violet-600 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtres
          </button>

        </div>

        {/* Filtre tarif (masqué par défaut) */}
        {filtresOuverts && (
          <div className="max-w-5xl mx-auto mt-4 p-4 bg-gray-50 rounded-xl">
            <label className="text-sm font-medium text-gray-700">
              Tarif maximum : <span className="text-violet-600 font-bold">{tarifMax.toLocaleString()} F/h</span>
            </label>
            <input
              type="range"
              min={1000}
              max={10000}
              step={500}
              value={tarifMax}
              onChange={e => setTarifMax(Number(e.target.value))}
              className="w-full mt-2 accent-violet-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1 000 F</span>
              <span>10 000 F</span>
            </div>
          </div>
        )}
      </div>

      {/* RÉSULTATS */}
      <div className="max-w-5xl mx-auto px-6 py-10">

        <p className="text-gray-500 text-sm mb-6">
          <span className="font-bold text-gray-900">{tuteursFiltres.length}</span> tuteur{tuteursFiltres.length > 1 ? "s" : ""} trouvé{tuteursFiltres.length > 1 ? "s" : ""}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tuteursFiltres.map(t => (
            <div key={t.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">

              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-lg shadow`}>
                  {t.initiales}
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${t.disponible ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-400"}`}>
                  {t.disponible ? "Disponible" : "Indisponible"}
                </span>
              </div>

              <h3 className="font-bold text-gray-900 text-lg">{t.nom}</h3>
              <p className="text-violet-600 text-sm font-medium mt-0.5">{t.matiere}</p>
              <p className="text-gray-400 text-xs mt-1">{t.niveaux}</p>

              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-gray-400" />
                <span className="text-gray-400 text-xs">{t.quartier}</span>
              </div>

              <div className="flex items-center justify-between mt-5 pt-5 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <span className="text-amber-400">★</span>
                  <span className="text-sm font-semibold text-gray-800">{t.note}</span>
                  <span className="text-xs text-gray-400">({t.nb_avis})</span>
                </div>
                <span className="font-bold text-gray-900 text-sm">
                  {t.tarif.toLocaleString()} F<span className="font-normal text-gray-400">/h</span>
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

        {/* Aucun résultat */}
        {tuteursFiltres.length === 0 && (
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

      </div>
    </div>
  )
}