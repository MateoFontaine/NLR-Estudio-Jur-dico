'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, MessageCircle, Mail, Menu, Phone, Scale, Shield, Briefcase, Gavel, Users, FileText, Monitor, X, User, MapPin } from 'lucide-react';

// --- COMPONENTE DE ANIMACIÓN (Fade In Up) ---
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) observer.unobserve(domRef.current); 
        }
      });
    }, { threshold: 0.1 });

    const currentElement = domRef.current;
    if (currentElement) observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function Home() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    rama: 'Derecho Laboral', 
    consulta: '',
    metodoContacto: 'whatsapp'
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ramasData = [
    { title: "Derecho Laboral", icon: <Briefcase size={24} />, desc: "Despidos, indemnizaciones y accidentes ART." },
    { title: "Derecho Penal", icon: <Scale size={24} />, desc: "Defensa penal y asistencia en procesos judiciales." },
    { title: "Civil y Comercial", icon: <FileText size={24} />, desc: "Contratos, sucesiones y ejecuciones." },
    { title: "Daños y Perjuicios", icon: <Gavel size={24} />, desc: "Reclamos por accidentes de tránsito y mala praxis." },
    { title: "Defensa al Consumidor", icon: <Shield size={24} />, desc: "Protección ante abusos de empresas." },
    { title: "Derecho de Familia", icon: <Users size={24} />, desc: "Divorcios, alimentos y régimen de visitas." },
    { title: "Derecho Informático", icon: <Monitor size={24} />, desc: "Estafas digitales y protección de datos." },
  ];

  const teamData = [
    { name: "Luciano Novelli", role: "Abogado", details: ["Universidad Argentina de la Empresa (UADE)", "Matriculado en CPACF"] },
    { name: "Constantino Lubrano", role: "Abogado", details: ["Universidad Argentina de la Empresa (UADE)", "Matriculado en CPACF"] },
    { name: "Javier Roldán", role: "Paralegal", details: ["Apoyo administrativo y gestión de expedientes."] }
  ];

  const navLinks = [
    { name: 'Inicio', id: 'inicio' },
    { name: 'Áreas de Práctica', id: 'servicios' },
    { name: 'Nuestro Equipo', id: 'equipo' }
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.metodoContacto === 'whatsapp') {
      const telefonoEstudio = "5491112345678"; 
      const mensaje = `Hola, mi nombre es *${formData.nombre}*. Quisiera consultar por un tema de *${formData.rama}*.%0A%0AConsulta: ${formData.consulta}%0A%0A(Prefiero contacto por WhatsApp)`;
      window.open(`https://wa.me/${telefonoEstudio}?text=${mensaje}`, '_blank');
    } else {
      alert("Aquí se enviaría el correo.");
    }
  };

  return (
    <main className="min-h-screen w-full font-sans text-slate-900 bg-slate-50 flex flex-col">
      
      {/* --- HEADER --- */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 shadow-sm transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-full flex justify-between items-center relative">
          
          <a href="#inicio" onClick={(e) => scrollToSection(e, 'inicio')} className="flex items-center gap-3 select-none cursor-pointer group">
            <div className="bg-blue-950 text-white px-2 py-1 transition-transform group-hover:scale-105">
              <span className="text-2xl font-bold tracking-tighter leading-none">NLR</span>
            </div>
            <div className="flex flex-col border-l border-slate-300 pl-3">
              <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase leading-none">
                Estudio Jurídico
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={`#${link.id}`} 
                onClick={(e) => scrollToSection(e, link.id)}
                className="text-xs font-bold uppercase tracking-wide text-slate-600 hover:text-blue-900 transition-colors relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.open('https://wa.me/5491112345678', '_blank')}
              className="hidden sm:flex bg-blue-950 text-white px-5 py-2 rounded-sm text-xs font-bold uppercase tracking-wide hover:bg-blue-900 transition-all hover:-translate-y-0.5 shadow-sm items-center gap-2"
            >
              <MessageCircle size={16} />
              <span>Consulta Express</span>
            </button>
            <button className="md:hidden text-slate-700 p-2 active:bg-slate-100 rounded-md transition" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-xl py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-2 fade-in duration-300">
            {navLinks.map((link) => (
              <a key={link.name} href={`#${link.id}`} onClick={(e) => scrollToSection(e, link.id)} className="text-sm font-bold uppercase tracking-wide text-slate-700 hover:text-blue-900 py-2 border-b border-slate-50 transition-colors">
                {link.name}
              </a>
            ))}
            <button onClick={() => { window.open('https://wa.me/5491112345678', '_blank'); setIsMenuOpen(false); }} className="mt-2 bg-blue-950 text-white w-full py-3 rounded-sm text-xs font-bold uppercase tracking-wide hover:bg-blue-900 flex justify-center items-center gap-2">
              <MessageCircle size={16} />
              <span>Consulta Express</span>
            </button>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section id="inicio" className="scroll-mt-16 relative w-full flex items-center justify-center px-4 pt-28 pb-20 md:pt-32 md:min-h-screen bg-slate-100">
        <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop" alt="Fondo" className="absolute inset-0 w-full h-full object-cover z-0 grayscale opacity-40" />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-50/90 via-slate-50/70 to-slate-100/40"></div>

        <div className="max-w-5xl mx-auto w-full grid lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left pr-0">
            <FadeIn delay={100}>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                Defensa legal con <br />
                <span className="text-blue-950 relative">
                  integridad y resultados.
                  <span className="absolute bottom-1 left-0 w-full h-1 bg-blue-200/50 -z-10"></span>
                </span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={300}>
              <p className="text-base md:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Representación jurídica especializada. Protegemos sus intereses con una estrategia clara, directa y profesional.
              </p>
            </FadeIn>

            <FadeIn delay={500}>
              <div className="pt-2 flex flex-col sm:flex-row items-center lg:items-start gap-4 sm:gap-8 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-blue-900 h-5 w-5" />
                  <span className="text-sm font-semibold text-slate-700">Atención Inmediata</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-blue-900 h-5 w-5" />
                  <span className="text-sm font-semibold text-slate-700">Gestión Transparente</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={700}>
              <div className="hidden lg:flex pt-4 items-center gap-2 text-slate-500 text-sm">
                 <Phone size={16} /> 
                 <span className="font-semibold">Atención telefónica: 09:00 a 18:00 hs</span>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-5 w-full max-w-md mx-auto">
            <FadeIn delay={400}>
              <div className="bg-white/95 backdrop-blur-sm p-5 lg:p-6 shadow-xl border-t-4 border-blue-950 rounded-sm">
                <div className="mb-4 text-center lg:text-left">
                  <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Iniciar Consulta</h3>
                  <p className="text-xs text-slate-500 mt-1">Complete el formulario para recibir asesoramiento.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Nombre Completo</label>
                      <input type="text" name="nombre" required className="w-full px-3 py-2 bg-slate-50 border border-slate-300 focus:border-blue-900 focus:ring-0 outline-none transition text-sm rounded-sm placeholder:text-slate-400" onChange={handleChange} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Teléfono</label>
                      <input type="tel" name="telefono" required className="w-full px-3 py-2 bg-slate-50 border border-slate-300 focus:border-blue-900 focus:ring-0 outline-none transition text-sm rounded-sm" onChange={handleChange} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Área Legal</label>
                    <select name="rama" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 focus:border-blue-900 focus:ring-0 outline-none transition text-sm text-slate-700 rounded-sm" onChange={handleChange}>
                      {ramasData.map((r) => <option key={r.title} value={r.title}>{r.title}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Detalle del caso</label>
                    <textarea name="consulta" rows={3} required className="w-full px-3 py-2 bg-slate-50 border border-slate-300 focus:border-blue-900 focus:ring-0 outline-none transition resize-none text-sm rounded-sm" onChange={handleChange}></textarea>
                  </div>

                  <div className="pt-1">
                    <span className="block text-[10px] font-bold text-slate-600 uppercase mb-1.5">Preferencia de contacto:</span>
                    <div className="flex gap-3">
                      <label className={`flex-1 cursor-pointer border py-1.5 px-2 flex items-center justify-center gap-2 transition text-xs rounded-sm ${formData.metodoContacto === 'whatsapp' ? 'bg-blue-50 border-blue-900 text-blue-900 font-bold' : 'border-slate-300 text-slate-500 hover:bg-slate-50'}`}>
                        <input type="radio" name="metodoContacto" value="whatsapp" checked={formData.metodoContacto === 'whatsapp'} onChange={handleChange} className="hidden" />
                        <MessageCircle size={14} /> WhatsApp
                      </label>
                      <label className={`flex-1 cursor-pointer border py-1.5 px-2 flex items-center justify-center gap-2 transition text-xs rounded-sm ${formData.metodoContacto === 'email' ? 'bg-blue-50 border-blue-900 text-blue-900 font-bold' : 'border-slate-300 text-slate-500 hover:bg-slate-50'}`}>
                        <input type="radio" name="metodoContacto" value="email" checked={formData.metodoContacto === 'email'} onChange={handleChange} className="hidden" />
                        <Mail size={14} /> Email
                      </label>
                    </div>
                  </div>

                  <button type="submit" className={`w-full py-3 mt-1 rounded-sm font-bold text-white uppercase tracking-wider text-xs shadow-sm transition hover:brightness-110 ${formData.metodoContacto === 'whatsapp' ? 'bg-green-700' : 'bg-blue-950'}`}>
                    {formData.metodoContacto === 'whatsapp' ? 'Contactar Abogado' : 'Enviar Consulta'}
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 2: ÁREAS DE PRÁCTICA --- */}
      <section id="servicios" className="scroll-mt-20 py-20 px-4 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-blue-900 font-bold tracking-widest text-xs uppercase">Nuestros Servicios</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Áreas de Práctica</h2>
              <div className="w-16 h-1 bg-blue-900 mx-auto mt-4"></div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ramasData.map((rama, index) => (
              <FadeIn key={index} delay={index * 100}>
                <div className="p-6 border border-slate-100 rounded-sm hover:shadow-lg transition-shadow bg-slate-50 group h-full">
                  <div className="text-blue-900 mb-4 group-hover:scale-110 transition-transform duration-300">{rama.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{rama.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{rama.desc}</p>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <button onClick={() => window.open('https://wa.me/5491112345678', '_blank')} className="text-xs font-bold text-blue-900 uppercase tracking-wide hover:underline">Consultar</button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 3: NUESTRO EQUIPO --- */}
      <section id="equipo" className="scroll-mt-20 py-20 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-blue-900 font-bold tracking-widest text-xs uppercase">Profesionales</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Nuestro Equipo</h2>
              <div className="w-16 h-1 bg-blue-900 mx-auto mt-4"></div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamData.map((member, index) => (
              <FadeIn key={index} delay={index * 150}>
                <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-200 flex flex-col items-center text-center hover:border-blue-200 transition-colors h-full">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-400">
                    <User size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-blue-900 font-bold text-xs uppercase tracking-wider mb-4">{member.role}</p>
                  <div className="space-y-1">
                    {member.details.map((detail, i) => (
                      <p key={i} className="text-sm text-slate-600 leading-relaxed">{detail}</p>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER CON LOGO OFICIAL --- */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-4 text-center md:text-left">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-sm">
          
          {/* COLUMNA 1: LOGO Y DESCRIPCIÓN */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            {/* Logo recreado en versión oscura (blanco y celeste) */}
            <a href="#inicio" onClick={(e) => scrollToSection(e, 'inicio')} className="flex items-center gap-3 select-none cursor-pointer group">
              <div className="text-white">
                <span className="text-3xl font-bold tracking-tighter leading-none">NLR</span>
              </div>
              <div className="h-8 w-px bg-slate-700"></div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold tracking-[0.1em] text-white uppercase leading-tight">
                  Estudio Jurídico
                </span>
                {/* Frase en color celeste (cyan-400) */}
                <span className="text-xs text-cyan-400 font-medium leading-tight mt-0.5">
                  Tu tranquilidad. Nuestro compromiso.
                </span>
              </div>
            </a>
            <p className="leading-relaxed max-w-xs mx-auto md:mx-0">Defensa legal integral con estrategia, compromiso y resultados. Sede en Buenos Aires, Argentina.</p>
          </div>

          {/* COLUMNA 2: CONTACTO */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <MessageCircle size={16} className="text-cyan-400" /> Contacto
            </h4>
            <div className="space-y-3">
              <p className="flex items-center justify-center md:justify-start gap-2">
                <MapPin size={16} className="text-slate-600 shrink-0" /> 
                <span>Buenos Aires, Argentina</span>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <Phone size={16} className="text-slate-600 shrink-0" /> 
                <span>Tel: 11 1234-5678</span>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <Mail size={16} className="text-slate-600 shrink-0" /> 
                <span>Email: contacto@estudionlr.com.ar</span>
              </p>
            </div>
          </div>

          {/* COLUMNA 3: HORARIOS */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-cyan-400" /> Atención
            </h4>
            <p className="mb-4">Lunes a Viernes: 09:00 - 18:00 hs</p>
            <div className="pt-4 border-t border-slate-800 w-full md:w-auto">
              <p className="text-xs text-slate-600">© 2025 NLR Estudio Jurídico. Todos los derechos reservados.</p>
            </div>
          </div>

        </div>
      </footer>

    </main>
  );
}