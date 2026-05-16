import { useState } from "react"
import api from "../api"

export default function FormulaireNotation({ sessionId, onSuccess }) {
  const [note, setNote] = useState(0)
  const [survol, setSurvol] = useState(0)
  const [commentaire, setCommentaire] = useState("")
  const [chargement, setChargement] = useState(false)
  const [erreur, setErreur] = useState("")

  async function handleSubmit() {
    setErreur("")

    if (note === 0) {
      setErreur("Veuillez choisir une note.")
      return
    }

    try {
      setChargement(true)
      await api.post("/reviews", {
        session_id:   sessionId,
        note,
        commentaire,
      })
      onSuccess()
    } catch (e) {
      setErreur(e.response?.data?.message || "Erreur lors de l'envoi de l'avis.")
    } finally {
      setChargement(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-4">Laisser un avis</h3>

      {/* Étoiles interactives */}
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map(i => (
          <button
            key={i}
            type="button"
            onClick={() => setNote(i)}
            onMouseEnter={() => setSurvol(i)}
            onMouseLeave={() => setSurvol(0)}
            className="text-3xl transition-transform hover:scale-110"
          >
            <span className={i <= (survol || note) ? "text-amber-400" : "text-gray-200"}>
              ★
            </span>
          </button>
        ))}
        {note > 0 && (
          <span className="ml-2 text-sm text-gray-500">
            {["", "Mauvais", "Passable", "Bien", "Très bien", "Excellent"][note]}
          </span>
        )}
      </div>

      {/* Commentaire */}
      <textarea
        value={commentaire}
        onChange={e => setCommentaire(e.target.value)}
        placeholder="Partagez votre expérience avec ce tuteur... (optionnel)"
        rows={3}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 resize-none"
      />

      {/* Erreur */}
      {erreur && (
        <p className="text-red-500 text-sm mt-2">{erreur}</p>
      )}

      {/* Bouton */}
      <button
        onClick={handleSubmit}
        disabled={chargement}
        className="mt-4 w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {chargement ? "Envoi..." : "Envoyer l'avis"}
      </button>
    </div>
  )
}