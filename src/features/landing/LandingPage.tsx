import { Link } from 'react-router-dom'
import { Paw } from '@/shared/components/ui/Paw'
import { useScrollReveal } from './useScrollReveal'
import fluffyLogo from '@/assets/fluffy-logo.png'

export function LandingPage() {
  const descripcionRef = useScrollReveal<HTMLDivElement>()
  const contactoRef = useScrollReveal<HTMLDivElement>()

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 flex flex-col justify-between selection:bg-blue-100 selection:text-blue-800">
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center flex-grow px-6 py-20 text-center overflow-hidden">
        
        {/* Subtle engineering grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" aria-hidden="true" />

        {/* Dynamic floating paws container */}
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

        {/* Hero Content Wrapper to restrict max-width layout */}
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <img src={fluffyLogo} alt="Fluffy" className="h-24 w-auto object-contain mb-8 transition-transform duration-300 hover:scale-105" />

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-5">
            Conectá<span className="text-blue-600">.</span> Rescatá<span className="text-amber-500">.</span> Adoptá<span className="text-blue-600">.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal max-w-lg mb-8 leading-relaxed">
            Fluffy conecta refugios, rescatistas y hogares de tránsito con personas dispuestas a dar una segunda oportunidad.
          </p>

          {/* Action Row */}
          <div className="flex gap-4 w-full sm:w-auto justify-center items-center">
            <Link 
              to="/register" 
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-600/10 transition-all text-sm tracking-wide active:scale-[0.98]"
            >
              Registrarme
            </Link>
            <Link 
              to="/login" 
              className="px-6 py-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold rounded-xl shadow-sm hover:bg-slate-50 transition-all text-sm tracking-wide active:scale-[0.98]"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </section>

      {/* Narrative Context Band */}
      <section className="bg-white border-y border-slate-100 py-12 px-6">
        <div ref={descripcionRef} className="max-w-xl mx-auto text-center space-y-4">
          <div className="w-10 h-1 bg-gradient-to-r from-blue-500 to-amber-400 mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Publicá animales en adopción, encontrá compañeros según su compatibilidad con tu hogar, y seguí todo el proceso en un solo lugar.
          </p>
        </div>
      </section>

      {/* Footer Block */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-6 border-t border-slate-950">
        <div ref={contactoRef} className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          
          {/* Brand Identity Segment — Fixed overlapping layout */}
          <div className="flex items-center justify-center gap-2 order-2 md:order-1 select-none">
            <div className="flex items-center justify-center w-6 h-6 relative translate-y-[-1px]">
              <Paw size={20} toeColor="#60a5fa" padColor="#fbbf24" />
            </div>
            <span className="font-bold text-white tracking-wide text-base">Fluffy</span>
            <span className="text-slate-700 hidden sm:inline ml-1">|</span>
            <span className="text-xs text-slate-500 hidden sm:inline ml-1">Rosario, Santa Fe, Argentina</span>
          </div>

          {/* Contact Directives Inline */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 order-1 md:order-2 font-medium">
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              fluffydsw@gmail.com
            </a>
            <a href="#" className="hover:text-white transition-colors">
              @fluffy.adopciones
            </a>
          </div>

        </div>
      </footer>
    </div>
  )
}
