import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Calendar, Clock, MapPin, BookOpen, ArrowLeft } from "lucide-react"
import api from "../api"

const MATIERES = ["Mathématiques", "Physique", "Français", "Anglais", "Histoire", "Chimie", "SVT"]
const DUREES = [
  { valeur: 60, label: "1 heure" },
  { valeur: 90, label: "1h30" },
  { valeur: 120, label: "2 heures" },
]

export default function ReservationPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    matiere: "",
    date: "",
    heure: "",
    duree_minutes: 60,
    lieu: "",
  })
  const [chargement, setChargement] = useState(false)
  const [erreur, setErreur] = useState("")
  const [succes, setSucces] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErreur("")

    if (!form.matiere || !form.date || !form.heure) {
      setErreur("Veuillez remplir tous les champs obligatoires.")
      return
    }

    try {
      setChargement(true)
      await api.post("/sessions", {
        tuteur_id:     id,
        matiere:       form.matiere,
        date_heure:    `${form.date} ${form.heure}:00`,
        duree_minutes: Number(form.duree_minutes),
        lieu:          form.lieu,
      })
      setSucces(true)
    } catch (e) {
      setErreur("Erreur lors de la réservation. Vérifiez que vous êtes connecté.")
    } finally {
      setChargement(false)
    }
  }

  // Page de succès
  if (succes) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 max-w-md w-full text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-2xl font-extrabold text-gray-900">Demande envoyée !</h2>
          <p className="text-gray-400 mt-3">
            Votre demande de séance a été envoyée au tuteur. Vous serez notifié dès qu'il accepte.
          </p>
          <div className="flex flex-col gap-3 mt-8">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-2xl transition-colors"
            >
              Voir mon dashboard
            </button>
            <Link
              to="/recherche"
              className="w-full border border-gray-200 text-gray-700 font-semibold py-3.5 rounded-2xl hover:border-violet-400 hover:text-violet-600 transition-colors text-center"
            >
              Chercher un autre tuteur
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Retour */}
        <Link
          to={`/tuteur/${id}`}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-violet-600 transition-colors text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au profil
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
            Réserver une séance
          </h1>
          <p className="text-gray-400 mb-8">
            Remplissez les détails de votre séance
          </p>

          {/* Erreur */}
          {erreur && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
              {erreur}
            </div>
          )}

          <div className="space-y-6">

            {/* Matière */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Matière <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  name="matiere"
                  value={form.matiere}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                >
                  <option value="">Choisir une matière</option>
                  {MATIERES.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
            </div>

            {/* Date et Heure */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Date <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Heure <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="time"
                    name="heure"
                    value={form.heure}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                  />
                </div>
              </div>
            </div>

            {/* Durée */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-3">
                Durée de la séance
              </label>
              <div className="flex gap-3">
                {DUREES.map(d => (
                  <button
                    key={d.valeur}
                    type="button"
                    onClick={() => setForm({ ...form, duree_minutes: d.valeur })}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-colors ${
                      form.duree_minutes === d.valeur
                        ? "border-violet-600 bg-violet-50 text-violet-700"
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Lieu */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Lieu (optionnel)
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="lieu"
                  placeholder="Ex: À mon domicile, En ligne..."
                  value={form.lieu}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
              </div>
            </div>

            {/* Bouton */}
            <button
              onClick={handleSubmit}
              disabled={chargement}
              className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-colors mt-2"
            >
              {chargement ? "Envoi en cours..." : "Confirmer la réservation"}
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}