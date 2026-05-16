export default function StatCard({ icon: Icon, valeur, label, color }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-3xl font-extrabold text-gray-900">{valeur}</div>
      <div className="text-sm text-gray-400 mt-1">{label}</div>
    </div>
  )
}