import { useState } from "react";
import { Search, MapPin, BookOpen, ArrowRight, Star, Shield, Clock, Award, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FadeUp, ListeAnimee, ItemAnimee, CarteAnimee, PageAnimee } from "../components/AnimationEntree";

const MATIERES = ["Mathématiques", "Physique", "Français", "Anglais", "Histoire", "Chimie", "SVT"];

const TUTEURS = [
  { id: 1, nom: "Ibrahim Koné", initiales: "IK", color: "from-violet-500 to-fuchsia-600", matiere: "Maths · Physique", quartier: "Cocody", tarif: 5000, note: 4.9, nb_avis: 47 },
  { id: 2, nom: "Aminata Diabaté", initiales: "AD", color: "from-pink-500 to-rose-600", matiere: "Français · Histoire", quartier: "Plateau", tarif: 4000, note: 4.8, nb_avis: 31 },
  { id: 3, nom: "Moussa Coulibaly", initiales: "MC", color: "from-teal-500 to-cyan-600", matiere: "Anglais · Espagnol", quartier: "Yopougon", tarif: 3500, note: 4.7, nb_avis: 22 },
];

const STATS = [
  { valeur: "320+", label: "Tuteurs vérifiés", icon: Users },
  { valeur: "1 200+", label: "Séances réalisées", icon: BookOpen },
  { valeur: "4.8/5", label: "Note moyenne", icon: Star },
  { valeur: "15", label: "Quartiers couverts", icon: MapPin },
];

export default function HomePage() {
  const [matiere, setMatiere] = useState("");
  const [quartier, setQuartier] = useState("");
  const navigate = useNavigate();

  function handleRecherche() {
    const params = new URLSearchParams();
    if (matiere) params.set("matiere", matiere);
    if (quartier) params.set("quartier", quartier);
    navigate(`/recherche?${params.toString()}`);
  }

  return (
    <PageAnimee>
      <div className="min-h-screen bg-zinc-50">

        {/* HERO - Plus impactant */}
        <section className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-violet-950 to-zinc-950 pt-24 pb-32 px-6">
          <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#a855f720_0%,transparent_50%)]" />
          
          <div className="relative max-w-5xl mx-auto text-center">
            <FadeUp delay={0.1}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-sm font-medium px-5 py-2.5 rounded-full mb-8 border border-white/20">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Tutorat • Abidjan, Côte d'Ivoire
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
                Le bon tuteur<br />
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400 bg-clip-text text-transparent">
                  est à côté de chez toi
                </span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
                Des milliers d'élèves progressent grâce à nos tuteurs vérifiés. 
                Réservation rapide • Paiement mobile money • Cours à domicile ou en ligne.
              </p>
            </FadeUp>

            {/* Search Bar améliorée */}
            <FadeUp delay={0.4}>
              <div className="mt-10 bg-white/10 backdrop-blur-xl rounded-3xl p-2 shadow-2xl border border-white/10 max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <BookOpen className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <select
                      value={matiere}
                      onChange={(e) => setMatiere(e.target.value)}
                      className="w-full pl-12 pr-5 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-zinc-400 focus:outline-none focus:border-violet-400 appearance-none text-base"
                    >
                      <option value="" className="text-zinc-900">Quelle matière ?</option>
                      {MATIERES.map((m) => (
                        <option key={m} value={m} className="text-zinc-900">{m}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1 relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Quartier (Cocody, Yopougon...)"
                      value={quartier}
                      onChange={(e) => setQuartier(e.target.value)}
                      className="w-full pl-12 pr-5 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-zinc-400 focus:outline-none focus:border-violet-400 text-base"
                    />
                  </div>

                  <button
                    onClick={handleRecherche}
                    className="bg-violet-600 hover:bg-violet-700 transition-all font-semibold px-10 py-4 rounded-2xl flex items-center gap-3 text-base shadow-lg shadow-violet-500/30 hover:scale-105 active:scale-95"
                  >
                    <Search className="w-5 h-5" />
                    Rechercher
                  </button>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* STATS */}
        <section className="py-16 px-6 -mt-8 relative z-10">
          <ListeAnimee className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <ItemAnimee key={i}>
                <div className="bg-white rounded-3xl p-8 text-center shadow-xl shadow-zinc-200/80 hover:shadow-2xl transition-all card-hover">
                  <stat.icon className="w-9 h-9 mx-auto mb-4 text-violet-600" />
                  <div className="text-4xl font-black text-zinc-900">{stat.valeur}</div>
                  <div className="text-zinc-500 mt-1 text-sm">{stat.label}</div>
                </div>
              </ItemAnimee>
            ))}
          </ListeAnimee>
        </section>

        {/* TUTEURS POPULAIRES */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <FadeUp>
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-4xl font-bold text-zinc-900">Tuteurs en vedette</h2>
                  <p className="text-zinc-500 mt-2">Les plus demandés cette semaine à Abidjan</p>
                </div>
                <Link to="/recherche" className="hidden md:flex items-center gap-2 text-violet-600 font-semibold hover:text-violet-700 transition-all">
                  Tous les tuteurs <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </FadeUp>

            <ListeAnimee className="grid md:grid-cols-3 gap-8">
              {TUTEURS.map((t) => (
                <ItemAnimee key={t.id}>
                  <CarteAnimee>
                    <Link to={`/tuteur/${t.id}`} className="block group">
                      <div className="bg-white border border-zinc-100 rounded-3xl overflow-hidden hover:border-violet-200 transition-all duration-300 card-hover">
                        <div className="h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                        
                        <div className="p-8">
                          <div className="flex justify-between items-start mb-6">
                            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-3xl shadow-inner`}>
                              {t.initiales}
                            </div>
                            <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">Disponible aujourd'hui</span>
                          </div>

                          <h3 className="font-bold text-2xl text-zinc-900">{t.nom}</h3>
                          <p className="text-violet-600 font-medium">{t.matiere}</p>

                          <div className="flex items-center gap-1 mt-3 text-sm text-zinc-500">
                            <MapPin className="w-4 h-4" /> {t.quartier}
                          </div>

                          <div className="mt-8 flex justify-between items-end">
                            <div>
                              <div className="flex items-center gap-1">
                                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                                <span className="font-bold text-lg">{t.note}</span>
                                <span className="text-xs text-zinc-400">({t.nb_avis} avis)</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-2xl font-bold text-zinc-900">{t.tarif.toLocaleString()}</span>
                              <span className="text-xs text-zinc-400"> FCFA/h</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CarteAnimee>
                </ItemAnimee>
              ))}
            </ListeAnimee>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 px-6 bg-gradient-to-br from-violet-600 to-fuchsia-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <FadeUp>
              <h2 className="text-4xl md:text-5xl font-bold">Prêt à progresser ?</h2>
              <p className="mt-6 text-xl text-violet-100">Rejoins des milliers d’élèves qui ont déjà trouvé leur tuteur idéal.</p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/recherche" className="bg-white text-violet-700 font-bold text-lg px-10 py-4 rounded-2xl hover:bg-violet-50 transition-all">
                  Trouver un tuteur maintenant
                </Link>
                <Link to="/inscription" className="border-2 border-white/70 hover:border-white font-bold text-lg px-10 py-4 rounded-2xl transition-all">
                  Devenir tuteur
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

      </div>
    </PageAnimee>
  );
}