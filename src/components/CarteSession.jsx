import { Calendar, MapPin } from "lucide-react"

const STATUT_STYLE = {
  confirme:   "bg-emerald-50 text-emerald-700 border border-emerald-100",
  en_attente: "bg-amber-50 text-amber-700 border border-amber-100",
  termine:    "bg-gray-100 text-gray-500 border border-gray-200",
  annule:     "bg-red-50 text-red-500 border border-red-100",
}

const STATUT_LABEL = {
  confirme:   "✓ Confirmé",
  en_attente: "⏳ En attente",
  termine:    "✅ Terminé",
  annule:     "✗ Annulé",
}

const STATUT_COLOR = {
  confirme:   "from-emerald-400 to-teal-500",
  en_attente: "from-amber-400 to-orange-500",
  termine:    "from-gray-400 to-gray-500",
  annule:     "from-red-400 to-rose-500",
}

export default function CarteSession({ session, nomPrincipal, actions }) {
  return (
    <div className="group flex flex-col md:flex-row md:items-center justify-between p-5 bg-gray-50 hover:bg-white rounded-2xl border border-transparent hover:border-gray-100 hover:shadow-md transition-all duration-200 gap-4">

      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${STATUT_COLOR[session.statut]} flex items-center justify-center text-white font-bold text-lg shadow flex-shrink-0`}>
          {nomPrincipal?.[0] || "?"}
        </div>

        {/* Infos */}
        <div>
          <p className="font-bold text-gray-900">{nomPrincipal}</p>
          <p className="text-violet-600 text-sm font-medium">{session.matiere}</p>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <Calendar className="w-3 h-3" />
              {new Date(session.date_heure).toLocaleDateString("fr-FR", {
                day: "numeric", month: "short", year: "numeric"
              })} à {new Date(session.date_heure).toLocaleTimeString("fr-FR", {
                hour: "2-digit", minute: "2-digit"
              })}
            </div>
            {session.lieu && (
              <div className="flex items-center gap-1 text-gray-400 text-xs">
                <MapPin className="w-3 h-3" />
                {session.lieu}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Droite */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${STATUT_STYLE[session.statut]}`}>
          {STATUT_LABEL[session.statut]}
        </span>
        <span className="font-extrabold text-gray-900">
          {Number(session.montant).toLocaleString()} <span className="text-gray-400 font-normal text-sm">F</span>
        </span>
        {actions}
      </div>

    </div>
  )
}