import { ChartBarIcon } from "lucide-react"

export default function FloatingActionButton() {
  return (
    <button
      className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-110"
      onClick={() => alert("Book a court!")}
    >
      <ChartBarIcon className="w-6 h-6" />
    </button>
  )
}