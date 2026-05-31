import { useState } from "react"
import { useAuth } from "../AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { FadeUp, PageAnimee } from "../components/AnimationEntree"

export default function ConnexionPage() {
    const [email, setEmail] = useState("")
    const [motDePasse, setMotDePasse] = useState("")
    const [afficherMdp, setAfficherMdp] = useState(false)
    const [erreur, setErreur] = useState("")
    const { connexion } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e) {
  e.preventDefault()
  setErreur("")

  if (!email || !motDePasse) {
    setErreur("Veuillez remplir tous les champs.")
    return
  }

  try {
    const user = await connexion(email, motDePasse)
    // Rediriger selon le rôle
    if (user.role === "tuteur") {
      navigate("/dashboard-tuteur")
    } else {
      navigate("/dashboard")
    }
  }  catch (e) {
  if (e.response?.status === 429) {
    setErreur(e.response.data.message)
  } else if (e.response?.status === 401) {
    setErreur(e.response.data.message)
  } else {
    setErreur("Une erreur est survenue. Réessayez.")
  }
}
}



  return (
  <PageAnimee>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">

        {/* Logo */}
        <FadeUp>
          <div className="text-center mb-8">
            <Link to="/" className="text-2xl font-extrabold text-violet-600">
              Tutorat<span className="text-gray-900">CI</span>
            </Link>
            <h1 className="text-2xl font-extrabold text-gray-900 mt-6">
              Content de vous revoir !
            </h1>
            <p className="text-gray-400 mt-2">Connectez-vous à votre compte</p>
          </div>
        </FadeUp>

        {/* Formulaire */}
        <FadeUp delay={0.1}>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

            {erreur && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
                {erreur}
              </div>
            )}

            <div className="space-y-5">

              <FadeUp delay={0.2}>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    Adresse email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="exemple@gmail.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
                    />
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Mot de passe
                    </label>
                    <a href="#" className="text-xs text-violet-600 hover:underline">
                      Mot de passe oublié ?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={afficherMdp ? "text" : "password"}
                      placeholder="••••••••"
                      value={motDePasse}
                      onChange={e => setMotDePasse(e.target.value)}
                      className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setAfficherMdp(!afficherMdp)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {afficherMdp ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.4}>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-2xl transition-colors mt-2"
                >
                  Se connecter
                </button>
              </FadeUp>

            </div>

            <FadeUp delay={0.5}>
              <p className="text-center text-gray-500 text-sm mt-6">
                Pas encore de compte ?{" "}
                <Link to="/inscription" className="text-violet-600 font-semibold hover:underline">
                  S'inscrire
                </Link>
              </p>
            </FadeUp>

          </div>
        </FadeUp>

      </div>
    </div>
  </PageAnimee>
)
}
