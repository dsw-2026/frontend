import { useNavigate } from 'react-router-dom'
import { Paw } from '@/shared/components/ui/Paw'
import fluffyLogo from '@/assets/fluffy-logo.png'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 flex flex-col selection:bg-blue-100 selection:text-blue-800">
      <section className="relative flex flex-col items-center justify-center flex-grow px-6 py-20 text-center overflow-hidden">

        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 pointer-events-none"
          aria-hidden="true"
        />

        <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto" aria-hidden="true">
          <div className="absolute left-[8%] top-[22%] animate-[bounce_6s_ease-in-out_infinite] opacity-40">
            <Paw size={38} toeColor="#3b82f6" rotation={-15} />
          </div>
          <div className="absolute right-[10%] top-[28%] animate-[bounce_7s_ease-in-out_infinite] [animation-delay:-2s] opacity-50">
            <Paw size={32} toeColor="#eab308" rotation={12} />
          </div>
          <div className="absolute left-[14%] bottom-[25%] animate-[bounce_8s_ease-in-out_infinite] [animation-delay:-4s] opacity-35">
            <Paw size={26} toeColor="#3b82f6" rotation={8} />
          </div>
          <div className="absolute right-[15%] bottom-[20%] animate-[bounce_9s_ease-in-out_infinite] [animation-delay:-1.5s] opacity-45">
            <Paw size={36} toeColor="#eab308" rotation={-10} />
          </div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <img
            src={fluffyLogo}
            alt="Fluffy"
            className="h-24 w-auto object-contain mb-8 transition-transform duration-300 hover:scale-105"
          />

          <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-3">Error 404</p>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-5">
            Página no encontrada<span className="text-amber-500">.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal max-w-lg mb-8 leading-relaxed">
            Parece que esta mascota se escapó! La página que buscás no existe o fue movida.
          </p>

          <div className="flex gap-4 w-full sm:w-auto justify-center items-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-600/10 transition-all text-sm tracking-wide active:scale-[0.98]"
            >
              Volver
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}