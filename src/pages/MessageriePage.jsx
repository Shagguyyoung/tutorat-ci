import { useState, useEffect, useRef } from "react"
import { useAuth } from "../AuthContext"
import { useParams, useNavigate } from "react-router-dom"
import { Send, ArrowLeft } from "lucide-react"
import api from "../api"

export default function MessageriePage() {
  const { userId } = useParams()
  const { utilisateur } = useAuth()
  const navigate = useNavigate()
  const messagesEndRef = useRef(null)

  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([])
  const [contenu, setContenu] = useState("")
  const [chargement, setChargement] = useState(true)
  const [envoi, setEnvoi] = useState(false)
  const [interlocuteur, setInterlocuteur] = useState(null)

  useEffect(() => {
    chargerConversations()
  }, [])

  useEffect(() => {
    if (userId) {
      chargerMessages(userId)
    }
  }, [userId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  async function chargerConversations() {
    try {
      const response = await api.get("/conversations")
      setConversations(response.data)
    } catch (e) {
      console.error("Erreur conversations", e)
    } finally {
      setChargement(false)
    }
  }

  async function chargerMessages(id) {
    try {
      const response = await api.get(`/messages/${id}`)
      setMessages(response.data)

      // Trouver l'interlocuteur
      if (response.data.length > 0) {
        const msg = response.data[0]
        setInterlocuteur(
          msg.from_id === utilisateur.id
            ? msg.destinataire
            : msg.expediteur
        )
      }
    } catch (e) {
      console.error("Erreur messages", e)
    }
  }

  async function handleEnvoyer(e) {
    e.preventDefault()
    if (!contenu.trim() || !userId) return

    try {
      setEnvoi(true)
      const response = await api.post("/messages", {
        to_id: userId,
        contenu: contenu.trim(),
      })
      setMessages([...messages, response.data])
      setContenu("")
    } catch (e) {
      console.error("Erreur envoi message", e)
    } finally {
      setEnvoi(false)
    }
  }

  function nomInterlocuteur(message) {
    const autre = message.from_id === utilisateur.id
      ? message.destinataire
      : message.expediteur
    return `${autre?.profile?.prenom || ""} ${autre?.profile?.nom || ""}`
  }

  function idInterlocuteur(message) {
    return message.from_id === utilisateur.id
      ? message.to_id
      : message.from_id
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Messages</h1>

        <div className="grid md:grid-cols-3 gap-6 h-[600px]">

          {/* LISTE DES CONVERSATIONS */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Conversations</h2>
            </div>

            <div className="flex-1 overflow-y-auto">
              {chargement ? (
                <div className="flex items-center justify-center h-32">
                  <div className="w-6 h-6 border-3 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : conversations.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <p className="text-3xl mb-2">💬</p>
                  <p className="text-gray-400 text-sm">Aucune conversation</p>
                </div>
              ) : (
                conversations.map(conv => {
                  const autreId = idInterlocuteur(conv)
                  const autreNom = nomInterlocuteur(conv)
                  const actif = userId === autreId

                  return (
                    <button
                      key={conv.id}
                      onClick={() => navigate(`/messages/${autreId}`)}
                      className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left ${actif ? "bg-violet-50" : ""}`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {autreNom[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold text-sm truncate ${actif ? "text-violet-700" : "text-gray-900"}`}>
                          {autreNom}
                        </p>
                        <p className="text-gray-400 text-xs truncate mt-0.5">
                          {conv.contenu}
                        </p>
                      </div>
                      {!conv.lu && conv.to_id === utilisateur.id && (
                        <div className="w-2 h-2 bg-violet-600 rounded-full flex-shrink-0"></div>
                      )}
                    </button>
                  )
                })
              )}
            </div>
          </div>

          {/* ZONE DE MESSAGES */}
          <div className="md:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">

            {userId ? (
              <>
                {/* Header conversation */}
                <div className="flex items-center gap-3 p-5 border-b border-gray-100">
                  <button
                    onClick={() => navigate("/messages")}
                    className="md:hidden text-gray-400 hover:text-gray-600"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white font-bold text-sm">
                    {interlocuteur?.profile?.prenom?.[0] || "?"}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {interlocuteur?.profile?.prenom} {interlocuteur?.profile?.nom}
                    </p>
                    <p className="text-xs text-gray-400">
                      {interlocuteur?.role === "tuteur" ? "Tuteur" : "Élève"}
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-5 space-y-3">
                  {messages.length === 0 ? (
                    <div className="text-center py-16">
                      <p className="text-3xl mb-2">👋</p>
                      <p className="text-gray-400 text-sm">Commencez la conversation !</p>
                    </div>
                  ) : (
                    messages.map(m => {
                      const estMoi = m.from_id === utilisateur.id
                      return (
                        <div key={m.id} className={`flex ${estMoi ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-xs md:max-w-sm px-4 py-3 rounded-2xl text-sm ${
                            estMoi
                              ? "bg-violet-600 text-white rounded-br-sm"
                              : "bg-gray-100 text-gray-800 rounded-bl-sm"
                          }`}>
                            <p>{m.contenu}</p>
                            <p className={`text-xs mt-1 ${estMoi ? "text-violet-200" : "text-gray-400"}`}>
                              {new Date(m.created_at).toLocaleTimeString("fr-FR", {
                                hour: "2-digit", minute: "2-digit"
                              })}
                            </p>
                          </div>
                        </div>
                      )
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input message */}
                <div className="p-4 border-t border-gray-100">
                  <form onSubmit={handleEnvoyer} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={contenu}
                      onChange={e => setContenu(e.target.value)}
                      placeholder="Écrivez un message..."
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                    />
                    <button
                      type="submit"
                      disabled={envoi || !contenu.trim()}
                      className="w-11 h-11 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white rounded-xl flex items-center justify-center transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-5xl mb-4">💬</p>
                  <p className="text-gray-500 font-medium">Sélectionnez une conversation</p>
                  <p className="text-gray-400 text-sm mt-1">ou démarrez-en une nouvelle</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}