import { useState, useEffect, useLayoutEffect, useRef } from 'react';

declare const gsap: any;
declare const ScrollTrigger: any;

import { Link } from 'react-router-dom';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const mockupRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // General Reveal Animations
      gsap.from(".hero-title", { y: 40, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out" });
      gsap.from(".hero-subtitle", { y: 30, opacity: 0, duration: 1, delay: 0.4, ease: "power3.out" });
      gsap.from(".hero-cta", { y: 20, opacity: 0, duration: 1, delay: 0.6, ease: "power3.out" });
      gsap.from("#mockup", { x: -40, opacity: 0, duration: 1.2, delay: 0.3, ease: "power3.out" });

      document.querySelectorAll('.scroll-reveal').forEach((el: any) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%" },
          y: 30, opacity: 0, duration: 0.8, ease: "power2.out"
        });
      });

      document.querySelectorAll('.scroll-reveal-item').forEach((el: any, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%" },
          y: 40, opacity: 0, duration: 0.8, delay: i * 0.1, ease: "power2.out"
        });
      });

      gsap.to(".floating-mockup", {
        y: -15, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut"
      });

      // Chat Loop Animation inside Mockup
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 3
      });

      tl.set(['#anim-msg-1', '#anim-msg-3'], { opacity: 0, y: 15 })
        .set(['#anim-msg-2', '#anim-msg-4'], { scale: 0, opacity: 0, transformOrigin: 'top left' })
        .to('#anim-msg-1', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, "+=1")
        .set('#anim-typing', { display: 'flex' })
        .fromTo('#anim-typing', { opacity: 0 }, { duration: 0.3, opacity: 1 })
        .to('#anim-typing', { duration: 0.8, opacity: 1 })
        .to('#anim-typing', { duration: 0.3, opacity: 0 })
        .set('#anim-typing', { display: 'none' })
        .to('#anim-msg-2', { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' })
        .to({}, { duration: 1.5 })
        .to('#anim-msg-3', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
        .set('#anim-typing', { display: 'flex' })
        .fromTo('#anim-typing', { opacity: 0 }, { duration: 0.3, opacity: 1 })
        .to('#anim-typing', { duration: 0.8, opacity: 1 })
        .to('#anim-typing', { duration: 0.3, opacity: 0 })
        .set('#anim-typing', { display: 'none' })
        .to('#anim-msg-4', { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' })
        .to({}, { duration: 4 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    if (isModalOpen) {
      gsap.fromTo(
        '#leadModal > div',
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' }
      );
    }
  }, [isModalOpen]);

  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const toggleTheme = () => setIsDark((prev) => !prev);

  const handleLeadSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const text = `Olá, meu nome é ${data.nome} (CRM: ${data.crm}). Gostaria de testar o AssistMed!`;
    window.location.href = `https://wa.me/55000000000?text=${encodeURIComponent(text)}`;
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef}>
      {/* Lead Modal */}
      <div
        id="leadModal"
        className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300 ${
          isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none hidden'
        }`}
      >
        <div className="bg-white dark:bg-brand-dark w-full max-w-md rounded-4xl overflow-hidden shadow-2xl p-10 frosted-card">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-3xl font-bold text-brand-dark dark:text-white mb-2">Bem-vindo ao AssistMed</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Junte-se a 20.000+ consultas já realizadas.</p>
            </div>
            <button
              className="text-slate-400 hover:text-brand-dark transition-colors"
              onClick={toggleModal}
            >
              <i className="fa-solid fa-xmark text-2xl"></i>
            </button>
          </div>
          <form className="space-y-6" id="leadForm" onSubmit={handleLeadSubmit}>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-slate-600 dark:text-slate-400 mb-3">Nome Completo</label>
              <input
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 text-brand-dark dark:text-white focus:ring-2 focus:ring-brand-blue/50 outline-none transition-all"
                name="nome"
                placeholder="Dr. Felipe Andrade"
                required
                type="text"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-slate-600 dark:text-slate-400 mb-3">CRM / Estado</label>
              <input
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 text-brand-dark dark:text-white focus:ring-2 focus:ring-brand-blue/50 outline-none transition-all"
                name="crm"
                placeholder="123456/SP"
                required
                type="text"
              />
            </div>
            <button
              className="w-full py-5 bg-brand-blue rounded-2xl text-white font-bold text-lg gel-button mt-6"
              type="submit"
            >
              <span>Acessar WhatsApp Agora</span>
            </button>
          </form>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[60] px-6 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between bg-[var(--glass-bg)] backdrop-blur-2xl rounded-full px-8 py-3 shadow-xl shadow-black/5 border border-white/40 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-brand-blue rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-blue/20">
              <i className="fa-solid fa-heart-pulse text-base"></i>
            </div>
            <span className="text-xl font-bold tracking-tight text-brand-dark dark:text-white">
              Assist<span className="text-brand-blue font-light">Med</span>
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-600 dark:text-slate-400">
            <a className="hover:text-brand-blue transition-colors cursor-pointer" onClick={(e) => handleScrollTo(e, 'beneficios')}>Funcionalidades</a>
            <a className="hover:text-brand-blue transition-colors cursor-pointer" onClick={(e) => handleScrollTo(e, 'produto')}>Sobre</a>
            <a className="hover:text-brand-blue transition-colors cursor-pointer" onClick={(e) => handleScrollTo(e, 'planos')}>Planos</a>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300"
              onClick={toggleTheme}
            >
              {isDark ? <i className="fa-solid fa-sun block text-sm"></i> : <i className="fa-solid fa-moon block text-sm"></i>}
            </button>
            <button
              className="px-6 py-2.5 rounded-full bg-brand-dark dark:bg-white text-white dark:text-brand-dark font-bold text-[11px] uppercase tracking-widest hover:bg-brand-blue hover:text-white transition-all shadow-lg"
              onClick={toggleModal}
            >
              Testar Grátis
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-16 px-6 min-h-[90vh] flex items-center">
        <div className="bg-blob top-0 left-0"></div>
        <div className="max-w-7xl mx-auto w-full pt-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
            
            {/* Mockup using iPhone Layout from previous response but with new classes */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start relative z-20 order-2 lg:order-1 lg:pl-10">
                <div id="mockup" className="relative w-[320px] md:w-[360px] floating-mockup transition-transform duration-1000">
                    <div className="w-full h-full relative z-10 p-2 md:p-3 bg-[#e5e5e5] dark:bg-neutral-800 rounded-[52px] shadow-[0_35px_80px_-15px_rgba(0,0,0,0.5)] border-[6px] border-black dark:border-neutral-900 mx-auto lg:ml-0" ref={mockupRef}>
                        
                        {/* Dynamic Island / Notch */}
                        <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-full z-30 flex items-center justify-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-neutral-700/50"></div>
                            <div className="w-2 h-2 rounded-full bg-brand-teal shadow-[0_0_8px_rgba(88,166,166,0.8)]"></div>
                        </div>

                        {/* Side Buttons */}
                        <div className="absolute -left-2 top-28 w-1 h-10 bg-black dark:bg-neutral-800 rounded-l-md"></div>
                        <div className="absolute -left-2 top-44 w-1 h-14 bg-black dark:bg-neutral-800 rounded-l-md"></div>
                        <div className="absolute -left-2 top-60 w-1 h-14 bg-black dark:bg-neutral-800 rounded-l-md"></div>
                        <div className="absolute -right-2 top-36 w-1 h-20 bg-black dark:bg-neutral-800 rounded-r-md"></div>

                        <div className="bg-[#E5DDD5] dark:bg-[#0B141A] rounded-[40px] overflow-hidden aspect-[9/19.5] flex flex-col relative w-full h-full border border-slate-200/50 dark:border-white/5">
                            
                            {/* Status Bar */}
                            <div className="h-12 w-full bg-white dark:bg-[#1A1C21] flex items-center justify-between px-7 pt-2 text-[11px] font-bold text-neutral-800 dark:text-white">
                                <span>9:41</span>
                                <div className="flex items-center gap-1.5 opacity-80">
                                <i className="fa-solid fa-signal"></i>
                                <i className="fa-solid fa-wifi"></i>
                                <i className="fa-solid fa-battery-full"></i>
                                </div>
                            </div>

                            {/* WhatsApp Header */}
                            <div className="bg-white dark:bg-[#1A1C21] px-4 pb-4 flex items-center gap-3 border-b border-slate-100 dark:border-white/5 relative z-20 shadow-sm">
                                <i className="fa-solid fa-chevron-left text-brand-blue text-lg"></i>
                                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center relative shadow-lg">
                                    <i className="fa-solid fa-user-doctor"></i>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-brand-teal rounded-full border-2 border-white dark:border-[#1A1C21]"></div>
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-brand-dark dark:text-white leading-tight text-sm">AssistMed IA</div>
                                    <div className="text-[10px] text-brand-teal font-bold uppercase tracking-widest">Online</div>
                                </div>
                                <div className="flex gap-3 text-brand-blue/80 text-sm">
                                    <i className="fa-solid fa-video"></i>
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div id="chatContainer" className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto relative bg-[#e5ddd5] dark:bg-[#0B141A] !bg-transparent font-sans">
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-[0.05] dark:opacity-10 bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-repeat bg-[length:50%] dark:mix-blend-overlay"></div>
                                
                                {/* Date Badge */}
                                <div className="bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-lg px-3 py-1 text-[10px] font-bold text-center mx-auto text-slate-500 dark:text-slate-400 mb-2 relative z-10 uppercase tracking-wider shadow-sm">
                                    Hoje
                                </div>

                                <div className="wa-chat-bubble wa-msg-out opacity-0 relative z-10 shadow-sm self-end rounded-tr-sm bg-[#d9fdd3] dark:bg-[#005c4b] text-neutral-800 dark:text-white max-w-[85%]" id="anim-msg-1">
                                    Protocolo para sepse? Paciente 65a, DRC.
                                    <div className="text-[9px] text-right mt-1 opacity-60 flex justify-end items-center gap-1">09:42 <i className="fa-solid fa-check-double text-blue-500"></i></div>
                                </div>
                                
                                <div className="msg relative z-10 self-start bg-white dark:bg-[#202C33] px-3 py-2 rounded-full rounded-tl-sm shadow-sm gap-1 items-center" id="anim-typing" style={{ display: 'none' }}>
                                    <span className="typing-dot"></span>
                                    <span className="typing-dot"></span>
                                    <span className="typing-dot"></span>
                                </div>
                                
                                <div className="wa-chat-bubble wa-msg-in scale-0 relative z-10 shadow-sm self-start rounded-tl-sm bg-white dark:bg-[#202C33] text-neutral-800 dark:text-white max-w-[90%]" id="anim-msg-2">
                                    <p className="text-[13px] leading-relaxed mb-1 font-sans">
                                        <b className="text-brand-blue">1. Ringer Lactato:</b> 15-20ml/kg.<br />
                                        <b className="text-brand-blue">2. ATB:</b> Ceftriaxona + Vancomicina.
                                    </p>
                                    <div className="text-[9px] text-right opacity-60">09:42</div>
                                </div>
                                
                                <div className="wa-chat-bubble wa-msg-out opacity-0 relative z-10 shadow-sm self-end rounded-tr-sm bg-[#d9fdd3] dark:bg-[#005c4b] text-neutral-800 dark:text-white max-w-[85%]" id="anim-msg-3">
                                    Dose de Noradrenalina?
                                    <div className="text-[9px] text-right mt-1 opacity-60 flex justify-end items-center gap-1">09:43 <i className="fa-solid fa-check-double text-blue-500"></i></div>
                                </div>
                                
                                <div className="wa-chat-bubble wa-msg-in scale-0 relative z-10 shadow-sm self-start rounded-tl-sm bg-white dark:bg-[#202C33] text-neutral-800 dark:text-white max-w-[90%]" id="anim-msg-4">
                                    <p className="text-[13px] mb-1 font-sans">0.05 a 0.5 mcg/kg/min. Titular para PAM &gt; 65.</p>
                                    <div className="text-[9px] text-right opacity-60">09:43</div>
                                </div>
                            </div>

                            {/* Input Bar */}
                            <div className="p-3 bg-[#f0f2f5] dark:bg-[#202C33] flex items-center gap-2 relative z-20">
                                <button className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-brand-blue transition-colors">
                                <i className="fa-solid fa-plus text-xl"></i>
                                </button>
                                <div className="flex-1 bg-white dark:bg-[#2A3942] rounded-full px-4 py-2.5 text-sm text-slate-400 shadow-sm flex items-center gap-3">
                                <i className="fa-regular fa-face-smile text-lg"></i>
                                Mensagem
                                </div>
                                <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform cursor-pointer">
                                <i className="fa-solid fa-microphone"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-3/5 lg:-mt-12 text-center lg:text-left relative z-30 order-1 lg:order-2">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-[10px] font-bold uppercase tracking-[0.25em] mb-8 shadow-sm">
                <span>IA Médica de Alta Precisão</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-7xl font-bold leading-[1.0] mb-8 text-brand-dark dark:text-white hero-title">
                O futuro da medicina no seu <span className="text-brand-blue font-light">WhatsApp.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 font-medium mb-12 max-w-xl lg:mx-0 mx-auto leading-relaxed hero-subtitle">
                Pare de perder horas com prontuários, prescrições ou diagnósticos confusos. Automatize diretamente no WhatsApp com segurança, precisão e em segundos.
              </p>
              <div className="flex flex-col lg:items-start items-center gap-8 hero-cta">
                <button
                  className="px-12 py-5 bg-brand-blue rounded-full text-white font-bold text-lg gel-button"
                  onClick={toggleModal}
                >
                  <span>Testar Grátis Agora</span>
                </button>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-bold text-[11px] uppercase tracking-[0.15em] opacity-90">
                  <i className="fa-solid fa-shield-halved text-brand-teal"></i>
                  <span>100% Conforme LGPD & Ética Médica</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Trust Scrolling Bar */}
      <section className="py-14 border-y border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-brand-dark/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden">
          <div className="flex whitespace-nowrap gap-20 md:justify-center items-center opacity-70 animate-marquee md:animate-none">
            <div className="flex items-center gap-3 font-bold text-slate-700 dark:text-slate-300 tracking-[0.2em] text-[10px]">TOTALMENTE LGPD</div>
            <div className="flex items-center gap-3 font-bold text-slate-700 dark:text-slate-300 tracking-[0.2em] text-[10px]">20.000+ CONSULTAS APOIADAS</div>
            <div className="flex items-center gap-3 font-bold text-slate-700 dark:text-slate-300 tracking-[0.2em] text-[10px]">98% DE SATISFAÇÃO</div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-spacing px-6 relative" id="beneficios">
        <div className="bg-blob top-1/4 -right-40 opacity-30"></div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-brand-dark dark:text-white">Pare de correr contra o tempo, <span className="text-brand-blue font-light">use a IA a seu favor.</span></h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-lg font-medium leading-relaxed">Ferramentas avançadas integradas no seu aplicativo de mensagens favorito.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="frosted-card p-10 rounded-4xl group scroll-reveal-item">
              <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue text-2xl mb-8 group-hover:bg-brand-blue group-hover:text-white transition-all">
                <i className="fa-solid fa-clock"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-dark dark:text-white">Disponível 24/7</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-sm">Esqueça a burocracia de logins e senhas. Tenha respostas rápidas a qualquer hora, diretamente no seu WhatsApp.</p>
            </div>
            <div className="frosted-card p-10 rounded-4xl group scroll-reveal-item">
              <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 flex items-center justify-center text-brand-teal text-2xl mb-8 group-hover:bg-brand-teal group-hover:text-white transition-all">
                <i className="fa-solid fa-stethoscope"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-dark dark:text-white">Diagnóstico Rápido e Confiável</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-sm">Respostas precisas para diagnósticos diferenciais, considerando sintomas, histórico e exames em segundos.</p>
            </div>
            <div className="frosted-card p-10 rounded-4xl group scroll-reveal-item">
              <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue text-2xl mb-8 group-hover:bg-brand-blue group-hover:text-white transition-all">
                <i className="fa-solid fa-pills"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-dark dark:text-white">Interação Medicamentosa</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-sm">Informações sobre doses, efeitos adversos e alertas automáticos de interações medicamentosas críticas.</p>
            </div>
            <div className="frosted-card p-10 rounded-4xl group scroll-reveal-item">
              <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 flex items-center justify-center text-brand-teal text-2xl mb-8 group-hover:bg-brand-teal group-hover:text-white transition-all">
                <i className="fa-solid fa-file-medical"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-dark dark:text-white">Prontuário e Histórico</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-sm">Gere resumos médicos e evoluções estruturadas baseadas nos dados do paciente, otimizando seu tempo clínico.</p>
            </div>
            <div className="frosted-card p-10 rounded-4xl group scroll-reveal-item">
              <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue text-2xl mb-8 group-hover:bg-brand-blue group-hover:text-white transition-all">
                <i className="fa-solid fa-lock"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-dark dark:text-white">Segurança de Dados (LGPD)</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-sm">Totalmente protegido por criptografia e em conformidade com a LGPD. Seus dados e os do paciente estão seguros.</p>
            </div>
            <div className="frosted-card p-10 rounded-4xl group scroll-reveal-item">
              <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 flex items-center justify-center text-brand-teal text-2xl mb-8 group-hover:bg-brand-teal group-hover:text-white transition-all">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-dark dark:text-white">Redução de Custos</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-sm">Automatize tarefas manuais e burocráticas, permitindo mais tempo focado no que realmente importa: o cuidado ao paciente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section-spacing px-6 bg-slate-50/50 dark:bg-brand-dark/40" id="produto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-dark dark:text-white">Para quem é o <span className="text-brand-blue font-light">AssistMed?</span></h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">Desenvolvemos soluções específicas para cada etapa da jornada médica.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center">
            <div className="w-full md:w-1/2 flex flex-col p-10 md:p-14 rounded-[48px] bg-gradient-to-b from-blue-50 to-white dark:from-brand-blue/10 dark:to-[#172033] shadow-[0_30px_70px_-15px_rgba(93,137,225,0.2)] dark:shadow-none transition-all">
              <div className="mb-10">
                <span className="material-symbols-outlined text-[80px] leading-none text-brand-blue">medical_services</span>
              </div>
              <h3 className="text-3xl font-bold text-brand-dark dark:text-white mb-8">Profissionais de Saúde</h3>
              <div className="space-y-6 mb-8 flex-grow">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center">
                    <i className="fa-solid fa-check text-white text-[10px]"></i>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-semibold text-base">Autonomia e agilidade clínica completa em segundos.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center">
                    <i className="fa-solid fa-check text-white text-[10px]"></i>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-semibold text-base">Mais tempo livre para focar no paciente e na sua família.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center">
                    <i className="fa-solid fa-check text-white text-[10px]"></i>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-semibold text-base">Segurança total com dados criptografados e LGPD.</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col p-10 md:p-14 rounded-[48px] bg-gradient-to-b from-teal-50 to-white dark:from-brand-teal/10 dark:to-[#172033] shadow-[0_30px_70px_-15px_rgba(88,166,166,0.2)] dark:shadow-none transition-all">
              <div className="mb-10">
                <span className="material-symbols-outlined text-[80px] leading-none text-brand-teal">school</span>
              </div>
              <h3 className="text-3xl font-bold text-brand-dark dark:text-white mb-8">Estudantes de Medicina</h3>
              <div className="space-y-6 mb-8 flex-grow">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-teal flex items-center justify-center">
                    <i className="fa-solid fa-check text-white text-[10px]"></i>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-semibold text-base">Suporte avançado para estudo de casos clínicos complexos.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-teal flex items-center justify-center">
                    <i className="fa-solid fa-check text-white text-[10px]"></i>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-semibold text-base">Preparação intensiva para residência e provas práticas.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-teal flex items-center justify-center">
                    <i className="fa-solid fa-check text-white text-[10px]"></i>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-semibold text-base">Acesso imediato às diretrizes do SUS e protocolos internacionais.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-spacing px-6" id="planos">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="text-4xl font-bold mb-6 text-brand-dark dark:text-white">Planos feitos para profissionais</h2>
            <p className="text-slate-600 dark:text-slate-400 font-medium">Escolha a inteligência certa para a sua fase de carreira.</p>
          </div>
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-8">
            <div className="frosted-card p-10 rounded-4xl w-full max-w-sm flex flex-col scroll-reveal-item">
              <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-1">Residente</h3>
              <p className="text-slate-600 dark:text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-8">Médicos em formação</p>
              <div className="text-4xl font-bold text-brand-dark dark:text-white mb-10">R$ 79<span className="text-sm font-light text-slate-500">/mês</span></div>
              <div className="mt-auto">
                <button className="w-full py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px] uppercase tracking-widest hover:border-brand-blue hover:text-brand-blue transition-all">Assinar Residente</button>
              </div>
            </div>
            <div className="frosted-card p-10 rounded-4xl w-full max-w-sm border-brand-blue/50 relative z-20 flex flex-col md:-translate-y-6 shadow-2xl scroll-reveal-item bg-white/95 dark:bg-brand-dark/95">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-[9px] font-bold uppercase px-6 py-1.5 rounded-full tracking-widest shadow-lg shadow-brand-blue/30">Mais Popular</div>
              <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-1">Clínico Pro</h3>
              <p className="text-slate-600 dark:text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-8">Médicos em consultório</p>
              <div className="text-5xl font-bold text-brand-blue mb-10">R$ 149<span className="text-sm font-light text-slate-500">/mês</span></div>
              <div className="mt-auto">
                <button className="w-full py-5 rounded-2xl bg-brand-blue text-white font-bold text-[10px] uppercase tracking-widest gel-button" onClick={toggleModal}>Começar Agora</button>
              </div>
            </div>
            <div className="frosted-card p-10 rounded-4xl w-full max-w-sm flex flex-col scroll-reveal-item">
              <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-1">Institucional</h3>
              <p className="text-slate-600 dark:text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-8">Hospitais e redes</p>
              <div className="text-3xl font-bold text-brand-dark dark:text-white mb-10">Sob Consulta</div>
              <div className="mt-auto">
                <button className="w-full py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px] uppercase tracking-widest hover:border-brand-teal hover:text-brand-teal transition-all">Falar com Consultor</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-spacing px-6 bg-slate-50/50 dark:bg-brand-dark/20 overflow-hidden" id="depoimentos">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold text-brand-dark dark:text-white mb-4">Vozes da linha de frente</h2>
            <p className="text-slate-600 dark:text-slate-400 font-medium">Relatos reais de quem transformou a conduta médica com nossa IA.</p>
          </div>
          <div className="carousel-track pb-12">
            <div className="carousel-item">
              <div className="frosted-card p-10 rounded-4xl h-full flex flex-col justify-between border-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all bg-white/95 dark:bg-brand-dark/95">
                <div className="relative">
                  <div className="flex flex-col items-center mb-12 text-center relative z-10">
                    <div className="w-28 h-28 mb-8 relative flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/10 to-transparent rounded-full scale-125 blur-sm"></div>
                      <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl relative z-10">
                        <img alt="Dr. Roberto" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoJqhKWa3_HB-uNgu60doShN-b-LmYR7fvtLY41gG6XXXLmr0sGs765Su3fXWQW06unXgT83AJZ2fp2DJSnR6QiqCFp_aq1ta51Uf8ppWzO0xDfR86vK_ZJiOmD2RQkAU1qGVoFAhrWRZKRT3QmC3eONYHJRze-Hht296FKao_LTop5rJk0IZ6cOk08-GiHwdCZQm_ispZDW3n7MHmg5CaeYk9VsiyiDowOlL6Hl1UTI1zJWC_YOwg6DBrXKi9cRDGXWgyWehwwII" />
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold text-brand-dark dark:text-white mb-1">Dr. Roberto Paiva</h4>
                    <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-blue/70 dark:text-brand-blue/50">Psiquiatra</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -top-10 left-0 testimonial-quotes text-brand-blue/5 dark:text-brand-blue/10">“</span>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic text-center px-4 relative z-10">
                        "O AssistMed transformou minha prática clínica. Com respostas rápidas sobre diagnósticos e tratamentos, ganhei muito tempo com os pacientes."
                    </p>
                    <span className="absolute -bottom-16 right-0 testimonial-quotes text-brand-blue/5 dark:text-brand-blue/10">”</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="frosted-card p-10 rounded-4xl h-full flex flex-col justify-between border-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all bg-white/95 dark:bg-brand-dark/95">
                <div className="relative">
                  <div className="flex flex-col items-center mb-12 text-center relative z-10">
                    <div className="w-28 h-28 mb-8 relative flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-tr from-brand-teal/10 to-transparent rounded-full scale-125 blur-sm"></div>
                      <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl relative z-10">
                        <img alt="Dra. Cristine" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIULFBrzxqkkIeGirZ7LPtXf8KEgGP65n0aMxZLew4C0C_CwuG9WOTQfTavxv9q941JbPvbB7k4mgBPH_XP3mq-53qhgCNQcThgDyfTrjOFG6qISFKvS7KlF5sQum3P6eXMLZG3o2hAOJN_bZmUGLeKk83UeeRyAImXybEErmJEB67T36b5_2lHtSX63pdzIR0Y8csR9F9LSWT6yq4QS-P8W794hE2Mi2RUmC0ir-3wxNrYpK8BrGqMwQchfxdCMLy5bfScC1n_Wk" />
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold text-brand-dark dark:text-white mb-1">Dra. Cristine Mendes</h4>
                    <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-teal/70 dark:text-brand-teal/50">Clínica Geral</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -top-10 left-0 testimonial-quotes text-brand-teal/5 dark:text-brand-teal/10">“</span>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic text-center px-4 relative z-10">
                        "Me ajudou a economizar tempo em cada consulta, permitindo que eu foque mais no cuidado ao paciente e menos na papelada. É indispensável."
                    </p>
                    <span className="absolute -bottom-16 right-0 testimonial-quotes text-brand-teal/5 dark:text-brand-teal/10">”</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="frosted-card p-10 rounded-4xl h-full flex flex-col justify-between border-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all bg-white/95 dark:bg-brand-dark/95">
                <div className="relative">
                  <div className="flex flex-col items-center mb-12 text-center relative z-10">
                    <div className="w-28 h-28 mb-8 relative flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/10 to-transparent rounded-full scale-125 blur-sm"></div>
                      <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl relative z-10">
                        <img alt="Dr. Lucas" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3fq95hhzH0r4qC3nQPT-y7cTRVfTuBVy1RCa_PuG3x8z7zTmnyusg91eBlW18K0_6Sn49ZKmRdOWkCeDLk8zE5qlRJvwVft1SLNRCoyX3UDC_BXsBrcDlC_olzv2SonQbL4ZcRzixzZ4wHMzIoHD7tv8msNKUfE8PFL63cCvqmvU26PF9126EMSkzHnON6wRY9hSRV1nZWcjheu-RoIdJaeK9U-X-xCiG2Y8Bi9eRs-P5PbWjvRbwQatzyrXS7UuJRj2v0wHAb_g" />
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold text-brand-dark dark:text-white mb-1">Dr. Lucas Ferreira</h4>
                    <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-blue/70 dark:text-brand-blue/50">Cardiologista</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -top-10 left-0 testimonial-quotes text-brand-blue/5 dark:text-brand-blue/10">“</span>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic text-center px-4 relative z-10">
                        "A precisão nas interações medicamentosas é o que mais me impressionou. É como ter um consultor sênior disponível 24 horas por dia."
                    </p>
                    <span className="absolute -bottom-16 right-0 testimonial-quotes text-brand-blue/5 dark:text-brand-blue/10">”</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-blue"></div>
            <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
          </div>
        </div>
      </section>

      <section className="section-spacing px-6 text-center relative overflow-hidden">
        <div className="bg-blob top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 opacity-20"></div>
        <div className="max-w-3xl mx-auto relative z-10 scroll-reveal">
          <h2 className="text-5xl md:text-6xl font-bold mb-14 text-brand-dark dark:text-white leading-[1.1]">Comece agora mesmo a transformar sua rotina.</h2>
          <button
            className="px-14 py-7 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-full font-bold text-xl hover:bg-brand-blue hover:text-white transition-all shadow-2xl transform hover:scale-105 mb-12 gel-button"
            onClick={toggleModal}
          >
            TESTAR GRÁTIS NO WHATSAPP
          </button>
          <p className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">Sem cartão de crédito. Sem compromisso.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-32 pb-16 px-6 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-brand-dark/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-24">
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center text-white shadow-md"><i className="fa-solid fa-heart-pulse"></i></div>
                <span className="text-2xl font-bold text-brand-dark dark:text-white">Assist<span className="text-brand-blue font-light">Med</span></span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed text-sm font-medium">O futuro da medicina no seu WhatsApp. Automatize prontuários, prescrições e diagnósticos com segurança e precisão.</p>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-brand-dark dark:text-white text-[11px] uppercase tracking-widest">Navegação</h4>
              <ul className="space-y-4 text-slate-600 dark:text-slate-400 text-sm font-medium">
                <li><a className="hover:text-brand-blue transition-colors cursor-pointer" onClick={(e) => handleScrollTo(e, 'beneficios')}>Funcionalidades</a></li>
                <li><a className="hover:text-brand-blue transition-colors cursor-pointer" onClick={(e) => handleScrollTo(e, 'produto')}>Sobre</a></li>
                <li><a className="hover:text-brand-blue transition-colors cursor-pointer" onClick={(e) => handleScrollTo(e, 'depoimentos')}>Depoimentos</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-brand-dark dark:text-white text-[11px] uppercase tracking-widest">Legal</h4>
              <ul className="space-y-4 text-slate-600 dark:text-slate-400 text-sm font-medium">
                <li><Link className="hover:text-brand-blue transition-colors" to="/termos">Termos de Uso</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase tracking-[0.2em]">
            <p>© 2026 AssistMed AI. Todos os direitos reservados.</p>
            <div className="flex gap-10">
              <a className="hover:text-brand-blue transition-colors" href="#">Instagram</a>
              <a className="hover:text-brand-blue transition-colors" href="#">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
