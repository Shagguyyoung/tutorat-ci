import {useState} from 'react'
import { Search, MapPin, BookOpen, Option } from "lucide-react"
const TUTEURS = [
  {
    id: 1,
    nom: "Ibrahim Koné",
    initiales: "IK",
    color: "from-violet-500 to-purple-700",
    matiere: "Mathématiques · Physique",
    quartier: "Cocody",
    tarif: 5000,
    note: 4.9,
    nb_avis: 47,
    niveaux: "Lycée · Université",
  },
  {
    id: 2,
    nom: "Aminata Diabaté",
    initiales: "AD",
    color: "from-rose-400 to-pink-600",
    matiere: "Français · Histoire",
    quartier: "Plateau",
    tarif: 4000,
    note: 4.8,
    nb_avis: 31,
    niveaux: "Collège · Lycée",
  },
  {
    id: 3,
    nom: "Moussa Coulibaly",
    initiales: "MC",
    color: "from-teal-400 to-emerald-600",
    matiere: "Anglais · Espagnol",
    quartier: "Yopougon",
    tarif: 3500,
    note: 4.7,
    nb_avis: 22,
    niveaux: "Collège · Lycée",
  },
]

const MATIERES = ["Mathématiques", "Physique", "Français", "Anglais", "Histoire", "Chimie", "SVT"]

export default function HomePage() {
    const [matiere, setMatiere] = useState("")
    const [quartier, setQuartier] = useState("")
  return (
    <div className='min-h-screen bg-gray-50'>

        {/* HERO */}
        <section className='bg-[#0f0e17] pt-24 pb-32 px-6 text-center'>
            <span className='inline-block bg-violet-500/20 text-violet-300 etxt-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-violet-500/30'>
               Plateforme de tutorat — Abidjan
            </span>

            <h1 className='text-5xl font-extrabold text-white leading-tight'>
                Trouver le tuteur <br />
                <span className='text-violet-400'> qu'il vous faut.</span>
            </h1>

            <p className='mt-6 text-gray-600  text-lg max-w-xl mx-auto'>
                Des tuteurs vérifiés, près de chez vous, payables par mobile money.
            </p>

            {/* barre de recherche */}
            <div className='mt-10 bg-white rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row gap-2 max-w-2xl mx-auto'>

                {/* Matière */}
                <div className='flex-1 relative'>
                    <BookOpen className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400'/>
                    <select 
                    value={matiere}
                    onChange={e => setMatiere(e.target.value)}
                    className='w-full pl-11 pr-4 py-3.5 bg-gray-50 rounded-xl text-gray-700 text-sm focus:online-none focus:ring-violet-400'
                    >
                        <option value="">Toutes les matières</option>
                        {MATIERES.map(m => <option key={m}>{m}</option>)}
                    </select>
                </div>

                {/* Quartiers */}
                <div className='flex-1 relative'>
                    <MapPin className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                    <input 
                       type="text"
                       placeholder='Votre quartier...'
                       value={quartier}
                       onChange={e => setQuartier(e.target.value)} 
                       className='w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400'
                       />
                </div>

                {/* bouton */}
                <button className='bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors '>
                    <Search className='w-4 h-4'/>
                    Rechercher
                </button>

            </div>
        </section>

        {/* TUTEURS */}
<section className="py-16 px-6">
  <div className="max-w-5xl mx-auto">

    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
      Tuteurs populaires
    </h2>
    <p className="text-gray-400 mb-10">Les mieux notés cette semaine</p>

    <div className="grid md:grid-cols-3 gap-6">
      {TUTEURS.map(t => (
        <div key={t.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">

          {/* Avatar + badge */}
          <div className="flex items-start justify-between mb-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-lg shadow`}>
              {t.initiales}
            </div>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
              Disponible
            </span>
          </div>

          {/* Infos */}
          <h3 className="font-bold text-gray-900 text-lg">{t.nom}</h3>
          <p className="text-violet-600 text-sm font-medium mt-0.5">{t.matiere}</p>
          <p className="text-gray-400 text-xs mt-1">{t.niveaux}</p>

          <div className="flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3 text-gray-400" />
            <span className="text-gray-400 text-xs">{t.quartier}</span>
          </div>

          {/* Pied de carte */}
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

        </div>
      ))}
    </div>

  </div>
</section>

{/* COMMENT ÇA MARCHE */}
<section className="py-20 px-6 bg-white">
  <div className="max-w-4xl mx-auto text-center mb-14">
    <h2 className="text-3xl font-extrabold text-gray-900">
      Comment ça marche ?
    </h2>
    <p className="text-gray-400 mt-2">Simple. Rapide. Sécurisé.</p>
  </div>

  <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
    {[
      {
        num: "01",
        titre: "Cherchez",
        desc: "Filtrez par matière, quartier et tarif pour trouver le tuteur idéal.",
      },
      {
        num: "02",
        titre: "Réservez",
        desc: "Choisissez un créneau et payez via MTN MoMo ou Orange Money.",
      },
      {
        num: "03",
        titre: "Apprenez",
        desc: "La séance a lieu, puis notez votre tuteur pour aider la communauté.",
      },
    ].map(e => (
      <div key={e.num}>
        <div className="text-6xl font-black text-gray-100 leading-none mb-2">
          {e.num}
        </div>
        <h3 className="text-xl font-bold text-gray-900 -mt-6">{e.titre}</h3>
        <p className="text-gray-500 mt-2 leading-relaxed">{e.desc}</p>
      </div>
    ))}
  </div>
</section>

{/* CTA TUTEUR */}
<section className="py-20 px-6">
  <div className="max-w-3xl mx-auto bg-gradient-to-br from-violet-600 to-violet-800 rounded-3xl p-12 text-center shadow-xl">
    <h2 className="text-3xl font-extrabold text-white">
      Vous êtes tuteur ?
    </h2>
    <p className="text-violet-200 mt-3 text-lg">
      Rejoignez notre réseau et générez des revenus en partageant vos connaissances.
    </p>
    <button className="mt-8 bg-white text-violet-700 font-bold px-8 py-4 rounded-2xl hover:bg-violet-50 transition-colors">
      Devenir tuteur →
    </button>
  </div>
</section>
      
    </div>
  )
}
