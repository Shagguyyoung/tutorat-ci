import { useState } from "react"
import { CreditCard } from "lucide-react"
import api from "../api"

export default function BoutonPaiement({ sessionId, montant }) {
  const [chargement, setChargement] = useState(false)
  const [erreur, setErreur] = useState("")

  async function handlePaiement() {
    setErreur("")
    setChargement(true)

    try {
      const response = await api.post("/paiement/initier", {
        session_id: sessionId,
      })
      // Rediriger vers la page de paiement CinetPay
      window.location.href = response.data.payment_url
    } catch (e) {
      setErreur("Erreur lors de l'initialisation du paiement.")
    } finally {
      setChargement(false)
    }
  }

  return (
    <div>
      {erreur && (
        <p className="text-red-500 text-xs mb-2">{erreur}</p>
      )}
      <button
        onClick={handlePaiement}
        disabled={chargement}
        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
      >
        <CreditCard className="w-4 h-4" />
        {chargement ? "Chargement..." : `Payer ${Number(montant).toLocaleString()} F`}
      </button>
    </div>
  )
}