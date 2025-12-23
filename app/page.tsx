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
    { 
      title: "Derecho Laboral", 
      icon: <Briefcase size={24} />, 
      desc: "Despidos, falta o mala registración, acoso laboral. Ayudamos a calcular indemnizaciones, revisamos recibos y representamos en negociaciones, telegramas y juicios para lograr lo que te corresponde." 
    },
    { 
      title: "Derecho Penal", 
      icon: <Scale size={24} />, 
      desc: "Defensa penal y asistencia para víctimas y acusados en todas las etapas: denuncias, audiencias y juicios. Intervención urgente 24 hs con un enfoque técnico y humano." 
    },
    { 
      title: "Civil y Comercial", 
      icon: <FileText size={24} />, 
      desc: "Contratos, cobros de deudas, desalojos y ejecuciones. Asesoramos en redacción y resolución de conflictos contractuales, incumplimientos y disputas entre particulares o empresas." 
    },
    { 
      title: "Sucesiones", 
      icon: <Gavel size={24} />, 
      desc: "Trámites sucesorios simples y complejos. Acompañamos desde la declaratoria de herederos e inventario hasta la partición de bienes con claridad administrativa y jurídica." 
    },
    { 
      title: "Defensa del Consumidor", 
      icon: <Shield size={24} />, 
      desc: "Reclamos ante bancos, financieras y empresas por cargos indebidos, productos defectuosos o mala atención. Exigimos reparaciones, reintegros y cumplimiento de garantías." 
    },
    { 
      title: "Derecho Informático", 
      icon: <Monitor size={24} />, 
      desc: "Expertos en estafas digitales, phishing, hackeos y fraudes bancarios/fintech. Protección de datos personales, ciberseguridad y cumplimiento normativo para empresas." 
    },
    { 
      title: "Marcas y Patentes", 
      icon: <Shield size={24} />, 
      desc: "Registro de marcas y logos, derechos de autor, software y patentes. Brindamos una estrategia integral para proteger tu propiedad intelectual y evitar copias o conflictos." 
    },
  ];

  const teamData = [
    { 
      name: "Luciano Novelli", 
      role: "Abogado", 
      image: "/lulo.png", 
      details: ["Universidad Argentina de la Empresa (UADE)", "Matriculado en CPACF"] 
    },
    { 
      name: "Constantino Lubrano", 
      role: "Abogado", 
      image: "/conty.png",
      position: 'center 20%', 
      details: ["Universidad Argentina de la Empresa (UADE)", "Matriculado en CPACF"] 
    },
    { 
      name: "Javier Roldán", 
      role: "Paralegal", 
      image: "/javi.png",
      position: '40% center', 
      details: ["Apoyo administrativo y gestión de expedientes."] 
    }
  ];

  const navLinks = [
    { name: 'Inicio', id: 'inicio' },
    { name: 'Áreas de Práctica', id: 'servicios' },
    { name: 'Nuestro Equipo', id: 'equipo' }
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement> | null, id: string) => {
    if (e) e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleSeleccionarRama = (titulo: string) => {
    setFormData(prev => ({ ...prev, rama: titulo }));
    scrollToSection(null, 'inicio');
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
          
          {/* LOGO ACTUALIZADO */}
          <a href="#inicio" onClick={(e) => scrollToSection(e, 'inicio')} className="flex items-center gap-3 select-none cursor-pointer group">
            <div className="bg-blue-950 text-white px-2 py-1 transition-transform group-hover:scale-105">
              <span className="text-2xl font-bold tracking-tighter leading-none">NLR</span>
            </div>
            <div className="flex flex-col border-l border-slate-300 pl-3">
              <span className="text-[11px] font-black tracking-tight text-blue-950 uppercase leading-none">
                Novelli & Lubrano
              </span>
              <span className="text-[9px] font-bold tracking-[0.15em] text-slate-500 uppercase leading-none mt-1">
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
                Tu consulta legal<br />
                <span className="text-blue-950 relative">
                  En manos responsables
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
                 <span className="font-semibold">Atención telefónica: 8:00 a 20.00 hs</span>
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
                      <input type="text" name="nombre" value={formData.nombre} required className="w-full px-3 py-2 bg-slate-50 border border-slate-300 focus:border-blue-900 focus:ring-0 outline-none transition text-sm rounded-sm placeholder:text-slate-400" onChange={handleChange} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Teléfono</label>
                      <input type="tel" name="telefono" value={formData.telefono} required className="w-full px-3 py-2 bg-slate-50 border border-slate-300 focus:border-blue-900 focus:ring-0 outline-none transition text-sm rounded-sm" onChange={handleChange} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Área Legal</label>
                    <select name="rama" value={formData.rama} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 focus:border-blue-900 focus:ring-0 outline-none transition text-sm text-slate-700 rounded-sm" onChange={handleChange}>
                      {ramasData.map((r) => <option key={r.title} value={r.title}>{r.title}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Detalle del caso</label>
                    <textarea name="consulta" value={formData.consulta} rows={3} required className="w-full px-3 py-2 bg-slate-50 border border-slate-300 focus:border-blue-900 focus:ring-0 outline-none transition resize-none text-sm rounded-sm" onChange={handleChange}></textarea>
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
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Especialidades Jurídicas</h2>
              <div className="w-16 h-1 bg-blue-900 mx-auto mt-4"></div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ramasData.map((rama, index) => (
              <FadeIn key={index} delay={index * 50}>
                <div className="p-8 border border-slate-100 rounded-sm hover:shadow-xl transition-all duration-300 bg-slate-50 group h-full flex flex-col border-b-4 hover:border-b-blue-900">
                  <div className="text-blue-900 mb-5 group-hover:scale-110 transition-transform duration-300">
                    {rama.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{rama.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-grow">
                    {rama.desc}
                  </p>
                  <div className="pt-4 border-t border-slate-200 mt-auto">
                    <button 
                      onClick={() => handleSeleccionarRama(rama.title)} 
                      className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:text-blue-700 flex items-center gap-2 group/btn"
                    >
                      Solicitar Asesoramiento 
                      <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </button>
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
                  
                  <div className="w-24 h-24 mb-6 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm bg-slate-100">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      style={{ objectPosition: (member as any).position || 'center' }}
                      onError={(e) => {
                        e.currentTarget.src = "https://ui-avatars.com/api/?name=" + member.name;
                      }}
                    />
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

      {/* --- FOOTER ACTUALIZADO --- */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-4 text-center md:text-left">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-sm">
            
            {/* LOGO EN FOOTER ACTUALIZADO */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <a href="#inicio" onClick={(e) => scrollToSection(e, 'inicio')} className="flex items-center gap-3 select-none cursor-pointer group">
                <div className="text-white">
                  <span className="text-3xl font-bold tracking-tighter leading-none">NLR</span>
                </div>
                <div className="h-10 w-px bg-slate-700"></div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold tracking-tight text-white uppercase leading-none">
                    Novelli & Lubrano
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase leading-none mt-1.5">
                    Estudio Jurídico
                  </span>
                </div>
              </a>
              <p className="leading-relaxed max-w-xs mx-auto md:mx-0">Defensa legal integral con estrategia y compromiso. Sede en Buenos Aires, Argentina.</p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-white font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <MessageCircle size={16} className="text-cyan-400" /> Contacto
              </h4>
              <div className="space-y-3">
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <MapPin size={16} className="text-slate-600 shrink-0" /> 
                  <span>Billinghurst 970 CABA</span>
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

            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-white font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400" /> Atención
              </h4>
              <p className="mb-4">Lunes a Viernes: 8:00 a 20.00hs</p>
              <p className="text-slate-500 text-xs">Atención con turno previo.</p>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col items-center justify-center text-xs text-slate-600 space-y-2">
            <p>© 2026 NLR Estudio Jurídico. Todos los derechos reservados.</p>
            <p>
              Hecho por <a href="https://www.instagram.com/codela.estudio/" target="_blank" rel="noreferrer" className="text-blue-500 underline hover:text-blue-400 transition-colors font-medium">Codela</a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}