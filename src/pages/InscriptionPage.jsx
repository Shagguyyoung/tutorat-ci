import { useState } from "react"
import { Link } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react"

export default function InscriptionPage() {
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    motDePasse: "",
    role: "eleve",
  })
  const [afficherMdp, setAfficherMdp] = useState(false)
  const [erreur, setErreur] = useState("")

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setErreur("")

    if (!form.prenom || !form.nom || !form.email || !form.motDePasse) {
      setErreur("Veuillez remplir tous les champs.")
      return
    }
    if (form.motDePasse.length < 8) {
      setErreur("Le mot de passe doit contenir au moins 8 caractères.")
      return
    }

    // Ici on appellera l'API Laravel plus tard
    alert(`Inscription en tant que ${form.role} : ${form.email}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-extrabold text-violet-600">
            Tutorat<span className="text-gray-900">CI</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-gray-900 mt-6">
            Créer un compte
          </h1>
          <p className="text-gray-400 mt-2">Rejoignez la communauté TutoratCI</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

          {/* Choix du rôle */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => setForm({ ...form, role: "eleve" })}
              className={`py-3 rounded-xl text-sm font-semibold border-2 transition-colors ${
                form.role === "eleve"
                  ? "border-violet-600 bg-violet-50 text-violet-700"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              Je suis élève
            </button>
            <button
              onClick={() => setForm({ ...form, role: "tuteur" })}
              className={`py-3 rounded-xl text-sm font-semibold border-2 transition-colors ${
                form.role === "tuteur"
                  ? "border-violet-600 bg-violet-50 text-violet-700"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              Je suis tuteur
            </button>
          </div>

          {/* Erreur */}
          {erreur && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
              {erreur}
            </div>
          )}

          <div className="space-y-4">

            {/* Prénom + Nom */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Prénom</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="prenom"
                    placeholder="Koffi"
                    value={form.prenom}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Nom</label>
                <input
                  type="text"
                  name="nom"
                  placeholder="Yao"
                  value={form.nom}
                  onChange={handleChange}
                  className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="exemple@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={afficherMdp ? "text" : "password"}
                  name="motDePasse"
                  placeholder="8 caractères minimum"
                  value={form.motDePasse}
                  onChange={handleChange}
                  className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
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

            {/* Bouton */}
            <button
              onClick={handleSubmit}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-2xl transition-colors mt-2"
            >
              Créer mon compte
            </button>

          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            Déjà un compte ?{" "}
            <Link to="/connexion" className="text-violet-600 font-semibold hover:underline">
              Se connecter
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}