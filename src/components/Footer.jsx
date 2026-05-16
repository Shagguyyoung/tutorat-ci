import { Link } from "react-router-dom"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#0f0e17] text-gray-400 pt-16 pb-8 px-6 mt-20">
      <div className="max-w-5xl mx-auto">

        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* Logo + description */}
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-extrabold text-white">
              Tutorat<span className="text-violet-400">CI</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              La plateforme de mise en relation entre tuteurs et élèves en Côte d'Ivoire. Apprenez mieux, près de chez vous.
            </p>
            <div className="flex flex-col gap-2 mt-6">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-violet-400" />
                jeankonan2294@gmail.com
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-violet-400" />
                +225 07 47 76 16 34
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-violet-400" />
                Abidjan, Côte d'Ivoire
              </div>
            </div>
          </div>

          {/* Liens plateforme */}
          <div>
            <h4 className="text-white font-bold mb-4">Plateforme</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/recherche" className="hover:text-violet-400 transition-colors">Trouver un tuteur</Link></li>
              <li><Link to="/inscription" className="hover:text-violet-400 transition-colors">Devenir tuteur</Link></li>
              <li><Link to="/connexion" className="hover:text-violet-400 transition-colors">Se connecter</Link></li>
              <li><Link to="/inscription" className="hover:text-violet-400 transition-colors">S'inscrire</Link></li>
            </ul>
          </div>

          {/* Matières */}
          <div>
            <h4 className="text-white font-bold mb-4">Matières populaires</h4>
            <ul className="space-y-3 text-sm">
              {["Mathématiques", "Physique", "Français", "Anglais", "Histoire", "Chimie"].map(m => (
                <li key={m}>
                  <Link
                    to={`/recherche?matiere=${m}`}
                    className="hover:text-violet-400 transition-colors"
                  >
                    {m}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Séparateur */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} JK-DEV. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-violet-400 transition-colors">Conditions d'utilisation</a>
            <a href="#" className="hover:text-violet-400 transition-colors">Politique de confidentialité</a>
          </div>
        </div>

      </div>
    </footer>
  )
}