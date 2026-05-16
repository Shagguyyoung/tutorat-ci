import { useState } from "react"
import { Search, MapPin, BookOpen, ArrowRight, Star, Shield, Clock, Award } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

const MATIERES = ["Mathématiques", "Physique", "Français", "Anglais", "Histoire", "Chimie", "SVT"]

const TUTEURS = [
  { id: 1, nom: "Ibrahim Koné", initiales: "IK", color: "from-violet-500 to-purple-700", matiere: "Maths · Physique", quartier: "Cocody", tarif: 5000, note: 4.9, nb_avis: 47 },
  { id: 2, nom: "Aminata Diabaté", initiales: "AD", color: "from-rose-400 to-pink-600", matiere: "Français · Histoire", quartier: "Plateau", tarif: 4000, note: 4.8, nb_avis: 31 },
  { id: 3, nom: "Moussa Coulibaly", initiales: "MC", color: "from-teal-400 to-emerald-600", matiere: "Anglais · Espagnol", quartier: "Yopougon", tarif: 3500, note: 4.7, nb_avis: 22 },
]

const STATS = [
  { valeur: "320+", label: "Tuteurs vérifiés" },
  { valeur: "1 200+", label: "Séances réalisées" },
  { valeur: "4.8/5", label: "Note moyenne" },
  { valeur: "15", label: "Quartiers couverts" },
]

const AVANTAGES = [
  { icon: Shield, titre: "Tuteurs vérifiés", desc: "Chaque tuteur est vérifié et évalué par notre équipe avant d'être publié.", color: "bg-violet-50 text-violet-600" },
  { icon: Clock, titre: "Réservation rapide", desc: "Trouvez un tuteur et réservez une séance en moins de 5 minutes.", color: "bg-blue-50 text-blue-600" },
  { icon: Award, titre: "Paiement sécurisé", desc: "Payez en toute sécurité via MTN MoMo ou Orange Money.", color: "bg-emerald-50 text-emerald-600" },
]

export default function HomePage() {
  const [matiere, setMatiere] = useState("")
  const [quartier, setQuartier] = useState("")
  const navigate = useNavigate()

  function handleRecherche() {
    const params = new URLSearchParams()
    if (matiere) params.set("matiere", matiere)
    if (quartier) params.set("quartier", quartier)
    navigate(`/recherche?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-[#fafaf8]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#0f0e17] pt-24 pb-36 px-6">

        {/* Décorations fond */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute top-20 left-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-violet-500/20 text-violet-300 text-sm font-medium px-4 py-2 rounded-full mb-8 border border-violet-500/30">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            Plateforme de tutorat — Abidjan, Côte d'Ivoire
          </div>

          {/* Titre */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Trouvez le tuteur<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-amber-400">
              qu'il vous faut.
            </span>
          </h1>

          <p className="mt-6 text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Des tuteurs vérifiés, près de chez vous, payables par mobile money. Réservez en quelques clics.
          </p>

          {/* Barre de recherche */}
          <div className="mt-10 bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row gap-2 max-w-2xl mx-auto border border-white/20">
            <div className="flex-1 relative">
              <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={matiere}
                onChange={e => setMatiere(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 appearance-none"
              >
                <option value="" className="text-gray-900">Toutes les matières</option>
                {MATIERES.map(m => <option key={m} className="text-gray-900">{m}</option>)}
              </select>
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Votre quartier..."
                value={quartier}
                onChange={e => setQuartier(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white/10 rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </div>
            <button
              onClick={handleRecherche}
              className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Search className="w-4 h-4" />
              Rechercher
            </button>
          </div>

          {/* Tags matières rapides */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {["Mathématiques", "Physique", "Français", "Anglais"].map(m => (
              <button
                key={m}
                onClick={() => { setMatiere(m); navigate(`/recherche?matiere=${m}`) }}
                className="bg-white/10 hover:bg-white/20 text-gray-300 text-xs font-medium px-3 py-1.5 rounded-full border border-white/20 transition-colors"
              >
                {m}
              </button>
            ))}
          </div>

        </div>

        {/* Vague bas */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 0C480 0 240 60 0 30L0 60Z" fill="#fafaf8"/>
          </svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-14 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-extrabold text-gray-900">{s.valeur}</div>
              <div className="text-gray-400 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── AVANTAGES ── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Pourquoi TutoratCI ?</h2>
            <p className="text-gray-400 mt-2">La plateforme pensée pour les familles ivoiriennes</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {AVANTAGES.map(a => (
              <div key={a.titre} className="text-center p-6">
                <div className={`w-14 h-14 rounded-2xl ${a.color} flex items-center justify-center mx-auto mb-4`}>
                  <a.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{a.titre}</h3>
                <p className="text-gray-500 mt-2 leading-relaxed text-sm">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TUTEURS VEDETTE ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Tuteurs populaires</h2>
              <p className="text-gray-400 mt-1">Les mieux notés cette semaine</p>
            </div>
            <Link
              to="/recherche"
              className="flex items-center gap-1 text-violet-600 font-semibold hover:gap-2 transition-all text-sm"
            >
              Voir tous <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TUTEURS.map(t => (
              <Link
                to={`/tuteur/${t.id}`}
                key={t.id}
                className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-lg shadow`}>
                    {t.initiales}
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                    Disponible
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{t.nom}</h3>
                <p className="text-violet-600 text-sm font-medium mt-0.5">{t.matiere}</p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-400 text-xs">{t.quartier}</span>
                </div>
                <div className="flex items-center justify-between mt-5 pt-5 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold text-gray-800">{t.note}</span>
                    <span className="text-xs text-gray-400">({t.nb_avis})</span>
                  </div>
                  <span className="font-bold text-gray-900 text-sm">
                    {t.tarif.toLocaleString()} F<span className="font-normal text-gray-400">/h</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h2 className="text-3xl font-extrabold text-gray-900">Comment ça marche ?</h2>
          <p className="text-gray-400 mt-2">Simple. Rapide. Sécurisé.</p>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 relative">
          {/* Ligne de connexion */}
          <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-violet-200 to-violet-200" />
          {[
            { num: "01", titre: "Cherchez", desc: "Filtrez par matière, quartier et tarif pour trouver le tuteur idéal.", emoji: "🔍" },
            { num: "02", titre: "Réservez", desc: "Choisissez un créneau et payez via MTN MoMo ou Orange Money.", emoji: "📅" },
            { num: "03", titre: "Apprenez", desc: "La séance a lieu, puis notez votre tuteur pour aider la communauté.", emoji: "🎓" },
          ].map(e => (
            <div key={e.num} className="text-center relative">
              <div className="w-16 h-16 bg-violet-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                {e.emoji}
              </div>
              <div className="text-xs font-bold text-violet-400 mb-1">{e.num}</div>
              <h3 className="text-xl font-bold text-gray-900">{e.titre}</h3>
              <p className="text-gray-500 mt-2 leading-relaxed text-sm">{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">

          {/* CTA Élève */}
          <div className="bg-gradient-to-br from-violet-600 to-violet-800 rounded-3xl p-10 text-center shadow-xl">
            <div className="text-4xl mb-4">📚</div>
            <h2 className="text-2xl font-extrabold text-white">Vous êtes élève ?</h2>
            <p className="text-violet-200 mt-3">Trouvez le tuteur idéal et progressez rapidement.</p>
            <Link
              to="/recherche"
              className="mt-6 inline-block bg-white text-violet-700 font-bold px-8 py-3.5 rounded-2xl hover:bg-violet-50 transition-colors"
            >
              Trouver un tuteur →
            </Link>
          </div>

          {/* CTA Tuteur */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-10 text-center shadow-xl">
            <div className="text-4xl mb-4">🎓</div>
            <h2 className="text-2xl font-extrabold text-white">Vous êtes tuteur ?</h2>
            <p className="text-orange-100 mt-3">Rejoignez notre réseau et générez des revenus supplémentaires.</p>
            <Link
              to="/inscription"
              className="mt-6 inline-block bg-white text-orange-600 font-bold px-8 py-3.5 rounded-2xl hover:bg-orange-50 transition-colors"
            >
              Devenir tuteur →
            </Link>
          </div>

        </div>
      </section>

    </div>
  )
}