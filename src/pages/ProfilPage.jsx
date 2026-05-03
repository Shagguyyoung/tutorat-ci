import { MapPin, Star, Clock, BookOpen, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

const TUTEUR = {
  id: 1,
  nom: "Ibrahim Koné",
  initiales: "IK",
  color: "from-violet-500 to-purple-700",
  matiere: "Mathématiques · Physique",
  quartier: "Cocody",
  ville: "Abidjan",
  tarif: 5000,
  note: 4.9,
  nb_avis: 47,
  nb_seances: 120,
  niveaux: ["Lycée", "Université"],
  bio: "Ingénieur de formation avec 5 ans d'expérience en tutorat. Je propose des cours adaptés à chaque élève, avec une pédagogie bienveillante et structurée. Spécialiste prépa CPGE et concours grandes écoles.",
  disponible: true,
  avis: [
    { id: 1, nom: "Koffi Y.", note: 5, commentaire: "Excellent tuteur, très pédagogue et patient !", date: "Avril 2026" },
    { id: 2, nom: "Marie A.", note: 5, commentaire: "Mes notes ont vraiment progressé grâce à lui.", date: "Mars 2026" },
    { id: 3, nom: "Jean P.", note: 4, commentaire: "Très bon, explications claires et précises.", date: "Mars 2026" },
  ]
}

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
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${TUTEUR.color} flex items-center justify-center text-white font-bold text-2xl shadow-lg flex-shrink-0`}>
                  {TUTEUR.initiales}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-2xl font-extrabold text-gray-900">{TUTEUR.nom}</h1>
                      <p className="text-violet-600 font-medium mt-0.5">{TUTEUR.matiere}</p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                      Disponible
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-gray-800">{TUTEUR.note}</span>
                      <span className="text-gray-400 text-sm">({TUTEUR.nb_avis} avis)</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <MapPin className="w-4 h-4" />
                      {TUTEUR.quartier}, {TUTEUR.ville}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">À propos</h2>
              <p className="text-gray-600 leading-relaxed">{TUTEUR.bio}</p>

              <div className="flex flex-wrap gap-2 mt-6">
                {TUTEUR.niveaux.map(n => (
                  <span key={n} className="bg-violet-50 text-violet-700 text-sm font-medium px-3 py-1 rounded-full">
                    {n}
                  </span>
                ))}
              </div>
            </div>

            {/* Avis */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Avis des élèves</h2>
              <div className="space-y-6">
                {TUTEUR.avis.map(a => (
                  <div key={a.id} className="border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-sm">
                          {a.nom[0]}
                        </div>
                        <span className="font-semibold text-gray-800">{a.nom}</span>
                      </div>
                      <span className="text-gray-400 text-xs">{a.date}</span>
                    </div>
                    <Etoiles note={a.note} />
                    <p className="text-gray-600 text-sm mt-2">{a.commentaire}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* COLONNE DROITE — Réservation */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-6">
              <div className="text-center mb-6">
                <span className="text-3xl font-extrabold text-gray-900">
                  {TUTEUR.tarif.toLocaleString()} F
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
                  À domicile ou en ligne
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <BookOpen className="w-4 h-4 text-violet-400" />
                  Paiement mobile money
                </div>
              </div>

              <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-2xl transition-colors">
                Réserver une séance
              </button>
              <button className="w-full mt-3 border border-gray-200 text-gray-700 font-semibold py-3.5 rounded-2xl hover:border-violet-400 hover:text-violet-600 transition-colors">
                Envoyer un message
              </button>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-gray-900">{TUTEUR.nb_seances}</div>
                  <div className="text-xs text-gray-400">séances</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-gray-900">{TUTEUR.nb_avis}</div>
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