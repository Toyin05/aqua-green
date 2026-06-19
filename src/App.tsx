import { useState, useEffect, useRef } from 'react'
import './index.css'

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ fullName: '', phone: '', email: '', interest: '', goal: '' })
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [progress, setProgress] = useState(50)
  const [counters, setCounters] = useState({ trained: 0, farms: 0, retention: 0, communities: 0 })
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 30) {
          navRef.current.classList.add('nav-scrolled', 'shadow-sm')
        } else {
          navRef.current.classList.remove('nav-scrolled', 'shadow-sm')
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const targets = [1500, 42, 92, 8]
    const duration = 1400
    const start = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - start
      const prog = Math.min(elapsed / duration, 1)
      
      setCounters({
        trained: Math.floor(targets[0] * prog),
        farms: Math.floor(targets[1] * prog),
        retention: Math.floor(targets[2] * prog),
        communities: Math.floor(targets[3] * prog),
      })
      
      if (prog < 1) requestAnimationFrame(animate)
    }
    animate()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    const targets = document.querySelectorAll('.stagger-item, .section-reveal')
    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    const updated = { ...formData, [id]: value }
    setFormData(updated)
    const filled = Object.values(updated).filter(Boolean).length
    setProgress(Math.max(50, Math.round((filled / 5) * 100)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setShowSuccess(true)
  }

  const resetForm = () => {
    setFormData({ fullName: '', phone: '', email: '', interest: '', goal: '' })
    setShowSuccess(false)
    setIsSubmitted(false)
    setProgress(50)
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <div className="bg-[#F9FAFB] text-[#111827] overflow-x-hidden">
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-[#064E3B]">
                <i className="fa-solid fa-seedling text-white text-2xl"></i>
              </div>
              <div>
                <div className="font-semibold text-2xl tracking-tighter heading-font">Aqua-Green</div>
                <div className="text-[10px] text-[#064E3B] -mt-1.5 font-medium tracking-[2px]">INTEGRATED FARMING</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-x-9 text-sm font-medium">
              <a href="#system" className="nav-link text-[#111827] cursor-pointer">The System</a>
              <a href="#hubs" className="nav-link text-[#111827] cursor-pointer">Our Hubs</a>
              <a href="#verify" className="nav-link text-[#111827] cursor-pointer">Transparency</a>
              <a href="#register" className="nav-link text-[#111827] cursor-pointer">Join Program</a>
            </div>
            <div className="flex items-center gap-x-3">
              <button onClick={() => scrollToSection('register')} className="hidden md:block px-5 py-2.5 text-sm font-semibold rounded-2xl border border-[#064E3B] text-[#111827] hover:bg-[#064E3B] hover:text-white transition-colors cursor-pointer">
                Partner With Us
              </button>
              <button onClick={() => scrollToSection('register')} className="magnetic-btn px-6 py-2.5 text-sm font-semibold rounded-2xl bg-[#10B981] text-white hover:bg-[#059669] shadow-md cursor-pointer">
                Register Now
              </button>
              <button className="md:hidden w-10 h-10 flex items-center justify-center text-[#064E3B] cursor-pointer" onClick={() => setIsMenuOpen(true)}>
                <i className="fa-solid fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white md:hidden">
          <div className="flex items-center justify-between h-20 px-6 border-b">
            <div className="flex items-center gap-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-[#064E3B]">
                <i className="fa-solid fa-seedling text-white text-2xl"></i>
              </div>
              <div className="font-semibold text-2xl tracking-tighter heading-font">Aqua-Green</div>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 flex items-center justify-center text-[#064E3B] cursor-pointer">
              <i className="fa-solid fa-xmark text-2xl"></i>
            </button>
          </div>
          <div className="flex flex-col gap-y-6 px-6 py-10 text-lg font-medium">
            <a href="#system" onClick={() => scrollToSection('system')} className="text-[#374151] cursor-pointer">The System</a>
            <a href="#hubs" onClick={() => scrollToSection('hubs')} className="text-[#374151] cursor-pointer">Our Hubs</a>
            <a href="#verify" onClick={() => scrollToSection('verify')} className="text-[#374151] cursor-pointer">Transparency</a>
            <a href="#register" onClick={() => scrollToSection('register')} className="text-[#374151] cursor-pointer">Join Program</a>
            <button onClick={() => scrollToSection('register')} className="mt-4 px-6 py-3 rounded-2xl bg-[#10B981] text-white font-semibold text-center cursor-pointer">
              Register Now
            </button>
          </div>
        </div>
      )}

      <section className="pt-20 min-h-[100dvh] flex items-center bg-[#064E3B] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#10B981_0.8px,transparent_1px)] bg-[length:5px_5px] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20 relative z-10">
          <div className="grid md:grid-cols-12 gap-x-8 items-center">
            <div className="md:col-span-7 lg:col-span-7 max-w-3xl">
              <div className="hero-animate inline-flex items-center gap-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md mb-6">
                <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
                <span className="text-white/90 text-xs font-semibold tracking-[1.5px]">RIVERS STATE • 2026 COHORT OPEN</span>
              </div>
              <h1 className="hero-animate premium-heading text-white leading-[1.02] mb-6 delay-1">
                Cultivating the<br />Future of the<br />Niger Delta.
              </h1>
              <p className="hero-animate text-xl md:text-[21px] text-[#D1FAE5] max-w-[38ch] mb-10 leading-tight delay-2">
                Empowering youth and local farmers in Rivers State through sustainable,
                integrated agribusiness. Transform your future with world-class aquaculture and crop training.
              </p>
              <div className="hero-animate flex flex-col sm:flex-row gap-4 delay-3">
                <button onClick={() => scrollToSection('register')} className="magnetic-btn group flex items-center justify-center gap-x-3 px-9 py-4 text-lg font-semibold rounded-3xl bg-white text-[#064E3B] hover:bg-[#F9FAFB] shadow-xl transition-all active:scale-[0.985] cursor-pointer">
                  <span>Register for Next Cohort</span>
                  <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-0.5"></i>
                </button>
                <button onClick={() => scrollToSection('verify')} className="magnetic-btn flex items-center justify-center gap-x-2.5 px-8 py-4 text-lg font-semibold rounded-3xl border border-white/60 text-[#111827] hover:bg-white/10 backdrop-blur transition-colors cursor-pointer">
                  <span>Partner With Us</span>
                </button>
              </div>
            </div>
            <div className="md:col-span-5 lg:col-span-5 mt-10 md:mt-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10" style={{ aspectRatio: '1200/800' }}>
                <img src="/img10.jpg" alt="YEP Orientation Seminar, Rivers State" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent h-20"></div>
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium">
                  YEP Orientation Seminar • Rivers State
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-[#4B5563]">
            <div className="flex items-center gap-x-2">
              <i className="fa-solid fa-award text-[#F59E0B]"></i>
              <span className="font-medium">Rivers State Youth Empowerment Award 2025</span>
            </div>
            <div className="hidden md:block w-px h-3 bg-[#D1D5DB]"></div>
            <div>Supported by Rivers State Ministry of Agriculture</div>
            <div className="hidden md:block w-px h-3 bg-[#D1D5DB]"></div>
            <div className="flex items-center gap-x-1.5">
              <span className="font-medium text-[#064E3B]">92% completion rate</span>
            </div>
          </div>
        </div>
      </div>

      <section id="system" className="max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-24">
        <div className="max-w-2xl mb-12">
          <div className="uppercase text-[#10B981] text-xs tracking-[3px] font-semibold mb-3">HOW IT WORKS</div>
          <h2 className="section-heading text-[#064E3B]">The Integrated System</h2>
          <p className="mt-4 text-xl text-[#374151]">A closed-loop model where aquaculture and crop production reinforce each other — creating more food, more income, and zero waste.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 items-start mb-14">
          <div className="stagger-item premium-card bg-white rounded-3xl p-8 border border-[#E5E7EB]">
            <div className="flex items-center gap-x-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#064E3B] flex items-center justify-center">
                <i className="fa-solid fa-fish text-white text-2xl"></i>
              </div>
              <div>
                <div className="font-semibold text-[#064E3B] text-2xl tracking-tight">Aquaculture</div>
                <div className="text-sm text-[#6B7280]">Catfish • Tilapia</div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden mb-6 shadow-inner">
              <img src="/img8.jpg" alt="Aqua Green Integrated organogram and structure" className="w-full h-full object-cover" style={{ height: '280px' }} />
            </div>
            <div className="flex gap-2 text-xs">
              <div className="px-4 py-2 rounded-full bg-[#F0FDF4] text-[#166534] font-medium flex items-center gap-x-1.5">
                <i className="fa-solid fa-circle text-xs"></i> <span>Modern concrete ponds</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-[#F0FDF4] text-[#166534] font-medium flex items-center gap-x-1.5">
                <span>Bio-floc technology</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex flex-col justify-center h-full px-2">
            <div className="relative">
              <div className="absolute left-[19px] top-6 bottom-6 w-px bg-gradient-to-b from-[#10B981]/10 via-[#10B981]/40 to-[#10B981]/10"></div>

              <div className="space-y-10">
                <div className="flex gap-x-4 items-start relative">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#064E3B] flex items-center justify-center z-10 shadow-md">
                    <i className="fa-solid fa-fish text-white text-sm"></i>
                  </div>
                  <div className="pt-1.5">
                    <div className="text-[10px] uppercase tracking-widest text-[#10B981] font-semibold mb-1">Step 1</div>
                    <div className="font-semibold text-[#064E3B] text-base mb-1">Fish Pond Output</div>
                    <div className="text-xs text-[#6B7280] max-w-[200px]">Catfish and tilapia produce nutrient-rich effluent water daily.</div>
                  </div>
                </div>

                <div className="flex gap-x-4 items-start relative">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center z-10 shadow-md">
                    <i className="fa-solid fa-droplet text-white text-sm"></i>
                  </div>
                  <div className="pt-1.5">
                    <div className="text-[10px] uppercase tracking-widest text-[#10B981] font-semibold mb-1">Step 2</div>
                    <div className="font-semibold text-[#064E3B] text-base mb-1">Water → Soil</div>
                    <div className="text-xs text-[#6B7280] max-w-[200px]">Effluent-rich water is channeled directly into crop beds — no synthetic fertilizer needed.</div>
                  </div>
                </div>

                <div className="flex gap-x-4 items-start relative">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center z-10 shadow-md">
                    <i className="fa-solid fa-leaf text-white text-sm"></i>
                  </div>
                  <div className="pt-1.5">
                    <div className="text-[10px] uppercase tracking-widest text-[#F59E0B] font-semibold mb-1">Step 3</div>
                    <div className="font-semibold text-[#064E3B] text-base mb-1">Crop Growth</div>
                    <div className="text-xs text-[#6B7280] max-w-[200px]">Vegetables and grains absorb the nutrients, growing 40% faster with zero chemical runoff.</div>
                  </div>
                </div>

                <div className="flex gap-x-4 items-start relative">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#064E3B] flex items-center justify-center z-10 shadow-md">
                    <i className="fa-solid fa-sack-dollar text-white text-sm"></i>
                  </div>
                  <div className="pt-1.5">
                    <div className="text-[10px] uppercase tracking-widest text-[#10B981] font-semibold mb-1">Step 4</div>
                    <div className="font-semibold text-[#064E3B] text-base mb-1">Dual Harvest Income</div>
                    <div className="text-xs text-[#6B7280] max-w-[200px]">Farmers sell both fish and crops every cycle — two revenue streams, one system.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="stagger-item premium-card bg-white rounded-3xl p-8 border border-[#E5E7EB]">
            <div className="flex items-center gap-x-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#10B981] flex items-center justify-center">
                <i className="fa-solid fa-leaf text-white text-2xl"></i>
              </div>
              <div>
                <div className="font-semibold text-[#064E3B] text-2xl tracking-tight">Crop Production</div>
                <div className="text-sm text-[#6B7280]">Vegetables • Grains • Leafy Greens</div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden mb-6 shadow-inner">
              <img src="/img7.jpg" alt="Practical training in fish, poultry and crop farming" className="w-full h-full object-cover" style={{ height: '280px', objectPosition: 'center top' }} />
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="px-4 py-2 bg-[#ECFDF5] text-[#065F46] rounded-2xl font-medium">Higher yields, 40%</div>
              <div className="px-4 py-2 bg-[#ECFDF5] text-[#065F46] rounded-2xl font-medium">Zero chemical runoff</div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="stagger-item p-6 rounded-3xl border border-[#E5E7EB] bg-white flex gap-4">
            <i className="fa-solid fa-recycle text-2xl text-[#10B981] mt-1"></i>
            <div>
              <div className="font-semibold mb-1">Closed-Loop Efficiency</div>
              <div className="text-sm text-[#4B5563]">Up to 70% reduction in external input costs through nutrient recycling.</div>
            </div>
          </div>
          <div className="stagger-item p-6 rounded-3xl border border-[#E5E7EB] bg-white flex gap-4">
            <i className="fa-solid fa-chart-line text-2xl text-[#10B981] mt-1"></i>
            <div>
              <div className="font-semibold mb-1">Dual Revenue Streams</div>
              <div className="text-sm text-[#4B5563]">Earn from both fish harvest and premium vegetable sales every cycle.</div>
            </div>
          </div>
          <div className="stagger-item p-6 rounded-3xl border border-[#E5E7EB] bg-white flex gap-4">
            <i className="fa-solid fa-globe-africa text-2xl text-[#10B981] mt-1"></i>
            <div>
              <div className="font-semibold mb-1">Climate Resilient</div>
              <div className="text-sm text-[#4B5563]">Designed for the Niger Delta climate with low-water, high-yield techniques.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="max-w-2xl mb-10">
          <div className="uppercase text-[#10B981] text-xs tracking-[3px] font-semibold mb-3">ON THE GROUND</div>
          <h2 className="section-heading text-[#064E3B]">Life at Aqua-Green</h2>
          <p className="mt-4 text-xl text-[#374151]">Real training sessions, real farmers, real results — across Port Harcourt and Elelenwa.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stagger-item rounded-3xl overflow-hidden shadow-md row-span-2 aspect-[1/1.4]">
            <img src="/img2.jpg" alt="Program participant at Aqua-Green event" className="w-full h-full object-cover" />
          </div>
          <div className="stagger-item rounded-3xl overflow-hidden shadow-md aspect-square">
            <img src="/img5.jpg" alt="Field trainer speaking at outdoor session" className="w-full h-full object-cover" />
          </div>
          <div className="stagger-item rounded-3xl overflow-hidden shadow-md aspect-square">
            <img src="/img9.jpg" alt="Participant at YEP orientation seminar" className="w-full h-full object-cover" />
          </div>
          <div className="stagger-item rounded-3xl overflow-hidden shadow-md row-span-2 aspect-[1/1.4]">
            <img src="/img11.jpg" alt="Trainer addressing community at outdoor event" className="w-full h-full object-cover" />
          </div>
          <div className="stagger-item rounded-3xl overflow-hidden shadow-md aspect-square col-span-2 md:col-span-1">
            <img src="/img1.jpg" alt="Close up of participant at training event" className="w-full h-full object-cover" />
          </div>
          <div className="stagger-item rounded-3xl overflow-hidden shadow-md aspect-square col-span-2 md:col-span-1">
            <img src="/img4.jpg" alt="Community members at agri training session" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section id="hubs" className="bg-[#064E3B] py-20 md:py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-x-12 items-end mb-10">
            <div className="lg:col-span-7">
              <div className="uppercase tracking-[3px] text-[#A3E635] text-xs font-semibold mb-2">RIVERS STATE</div>
              <h2 className="section-heading text-white">Regional Impact & Hubs</h2>
            </div>
            <div className="lg:col-span-5 text-lg text-[#A3E635] lg:text-right mt-6 lg:mt-0">
              Training delivered where it matters most — in Port Harcourt and deep into the Elelenwa communities.
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            <div className="impact-stat bg-white/5 backdrop-blur rounded-3xl px-7 py-8 border border-white/10">
              <div className="text-[#10B981] text-5xl font-semibold tabular-nums">{counters.trained}+</div>
              <div className="text-white/80 mt-2 text-lg">Farmers & Youth Trained</div>
              <div className="text-[#10B981]/70 text-xs tracking-widest mt-1">SINCE 2023</div>
            </div>
            <div className="impact-stat bg-white/5 backdrop-blur rounded-3xl px-7 py-8 border border-white/10">
              <div className="text-[#10B981] text-5xl font-semibold tabular-nums">{counters.farms}</div>
              <div className="text-white/80 mt-2 text-lg">Active Integrated Farms</div>
              <div className="text-[#10B981]/70 text-xs tracking-widest mt-1">OPERATIONAL TODAY</div>
            </div>
            <div className="impact-stat bg-white/5 backdrop-blur rounded-3xl px-7 py-8 border border-white/10">
              <div className="text-[#10B981] text-5xl font-semibold tabular-nums">{counters.retention}%</div>
              <div className="text-white/80 mt-2 text-lg">% Youth Retention</div>
              <div className="text-[#10B981]/70 text-xs tracking-widest mt-1">AFTER 12 MONTHS</div>
            </div>
            <div className="impact-stat bg-white/5 backdrop-blur rounded-3xl px-7 py-8 border border-white/10">
              <div className="text-[#10B981] text-5xl font-semibold tabular-nums">{counters.communities}</div>
              <div className="text-white/80 mt-2 text-lg">Communities Reached</div>
              <div className="text-[#10B981]/70 text-xs tracking-widest mt-1">PORT HARCOURT + ELELENWA</div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="stagger-item premium-card bg-white rounded-3xl p-8 text-[#111827]">
              <div className="uppercase text-[#10B981] text-xs tracking-widest font-semibold mb-2">HEADQUARTERS</div>
              <div className="text-3xl font-semibold tracking-tighter text-[#064E3B]">Port Harcourt Hub</div>
              <div className="text-[#6B7280] mt-1 mb-6">Rumuokoro, Port Harcourt</div>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center gap-x-2"><i className="fa-solid fa-check text-[#10B981]"></i> Full-scale demonstration ponds & greenhouse</li>
                <li className="flex items-center gap-x-2"><i className="fa-solid fa-check text-[#10B981]"></i> 8-week cohort training programs</li>
                <li className="flex items-center gap-x-2"><i className="fa-solid fa-check text-[#10B981]"></i> Equipment access & input distribution</li>
                <li className="flex items-center gap-x-2"><i className="fa-solid fa-check text-[#10B981]"></i> Market linkage support</li>
              </ul>
            </div>
            <div className="stagger-item premium-card bg-white rounded-3xl p-8 text-[#111827]">
              <div className="uppercase text-[#F59E0B] text-xs tracking-widest font-semibold mb-2">FIELD OPERATIONS</div>
              <div className="text-3xl font-semibold tracking-tighter text-[#064E3B]">Elelenwa Mobile Centers</div>
              <div className="text-[#6B7280] mt-1 mb-6">Elelenwa & surrounding riverine communities</div>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center gap-x-2"><i className="fa-solid fa-check text-[#F59E0B]"></i> Rotating training camps every 3 weeks</li>
                <li className="flex items-center gap-x-2"><i className="fa-solid fa-check text-[#F59E0B]"></i> Pond construction technical assistance</li>
                <li className="flex items-center gap-x-2"><i className="fa-solid fa-check text-[#F59E0B]"></i> Post-training mentorship visits</li>
                <li className="flex items-center gap-x-2"><i className="fa-solid fa-check text-[#F59E0B]"></i> Women & youth cooperative formation</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
    <div className="stagger-item relative rounded-3xl overflow-hidden border border-white/10 shadow-inner aspect-[4/3]">
      <img src="/img10.jpg" alt="YEP Orientation Seminar, Port Harcourt" className="w-full h-full object-cover" />
      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[11px] font-medium">Port Harcourt HQ</div>
    </div>
    <div className="stagger-item relative rounded-3xl overflow-hidden border border-white/10 shadow-inner aspect-[4/3]">
      <img src="/img5.jpg" alt="Field trainer, Elelenwa Zone" className="w-full h-full object-cover" />
      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[11px] font-medium">Elelenwa Field Trainer</div>
    </div>
    <div className="stagger-item relative rounded-3xl overflow-hidden border border-white/10 shadow-inner aspect-[4/3]">
      <img src="/img2.jpg" alt="Program participant" className="w-full h-full object-cover" />
      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[11px] font-medium">Program Participant</div>
    </div>
  </div>
        </div>
      </section>

      <section id="verify" className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="max-w-2xl mb-10">
          <div className="text-[#10B981] text-xs tracking-[3px] font-semibold uppercase mb-3">VERIFIED. TRANSPARENT. ACCOUNTABLE.</div>
          <h2 className="section-heading text-[#064E3B]">Verified Ecosystem & Transparency</h2>
          <p className="mt-3 text-xl text-[#374151]">We operate in direct partnership with recognized government institutions to ensure credibility and access to official programs and grants.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="premium-card bg-white border border-[#E5E7EB] rounded-3xl p-8">
            <div className="w-10 h-10 bg-[#064E3B] text-white flex items-center justify-center rounded-2xl mb-6">
              <i className="fa-solid fa-landmark text-xl"></i>
            </div>
            <div className="font-semibold text-xl tracking-tighter mb-3">Rivers State Ministry of Agriculture</div>
            <div className="text-[#4B5563] mb-6 text-[15px]">Official partner for youth empowerment and integrated farming programs across the state.</div>
            <a href="https://www.riversstate.gov.ng/ministries/agriculture" target="_blank" className="inline-flex items-center gap-x-2 text-[#10B981] font-semibold text-sm group">
              CHECK YOUTH PROGRAMS
              <i className="fa-solid fa-arrow-up-right-from-square group-hover:translate-x-0.5 transition"></i>
            </a>
          </div>
          <div className="premium-card bg-white border border-[#E5E7EB] rounded-3xl p-8">
            <div className="w-10 h-10 bg-[#064E3B] text-white flex items-center justify-center rounded-2xl mb-6">
              <i className="fa-solid fa-globe text-xl"></i>
            </div>
            <div className="font-semibold text-xl tracking-tighter mb-3">Federal Ministry of Agriculture and Food Security</div>
            <div className="text-[#4B5563] mb-6 text-[15px]">Access to nationwide agricultural grants, value-chain development, and youth-focused initiatives.</div>
            <a href="https://fmard.gov.ng" target="_blank" className="inline-flex items-center gap-x-2 text-[#10B981] font-semibold text-sm group">
              VIEW GRANT OPPORTUNITIES
              <i className="fa-solid fa-arrow-up-right-from-square group-hover:translate-x-0.5 transition"></i>
            </a>
          </div>
          <div className="premium-card bg-white border border-[#E5E7EB] rounded-3xl p-8">
            <div className="w-10 h-10 bg-[#064E3B] text-white flex items-center justify-center rounded-2xl mb-6">
              <i className="fa-solid fa-phone text-xl"></i>
            </div>
            <div className="font-semibold text-xl tracking-tighter mb-3">NAERLS — Elelenwa Zone</div>
            <div className="text-[#4B5563] mb-6 text-[15px]">National Agricultural Extension and Research Liaison Services. Extension support and advisory services for the region.</div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-x-2 text-[#374151]">
                <i className="fa-solid fa-phone text-[#10B981]"></i>
                <span className="font-medium">+234 803 123 4567</span>
              </div>
              <div className="flex items-center gap-x-2 text-[#374151]">
                <i className="fa-solid fa-phone text-[#10B981]"></i>
                <span className="font-medium">+234 802 987 6543</span>
              </div>
              <div className="text-[#6B7280] text-xs pt-2">Elelenwa Extension Officer Desk</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="premium-card bg-white rounded-3xl p-6 border border-[#E5E7EB] flex flex-col gap-3">
            <img src="/img9.jpg" alt="Chukwudi E." className="w-14 h-14 rounded-full object-cover object-top border-2 border-[#10B981]" />
            <p className="text-sm italic text-[#374151]">"This program opened my eyes to what integrated farming can really do."</p>
            <div className="text-xs font-semibold text-[#064E3B]">Chukwudi E., Participant</div>
          </div>
          <div className="premium-card bg-white rounded-3xl p-6 border border-[#E5E7EB] flex flex-col gap-3">
            <img src="/img1.jpg" alt="Ada O." className="w-14 h-14 rounded-full object-cover object-top border-2 border-[#10B981]" />
            <p className="text-sm italic text-[#374151]">"I never believed I could run my own fish pond. Now I manage two."</p>
            <div className="text-xs font-semibold text-[#064E3B]">Ada O., Graduate 2024</div>
          </div>
          <div className="premium-card bg-white rounded-3xl p-6 border border-[#E5E7EB] flex flex-col gap-3">
            <img src="/img11.jpg" alt="Pastor Mike A." className="w-14 h-14 rounded-full object-cover object-top border-2 border-[#10B981]" />
            <p className="text-sm italic text-[#374151]">"Training youth in Elelenwa — this is exactly what our communities need."</p>
            <div className="text-xs font-semibold text-[#064E3B]">Pastor Mike A., Field Trainer</div>
          </div>
        </div>
      </section>

      <section id="register" className="bg-[#F9FAFB] border-t border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-24">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-x-2 px-4 py-1 rounded-full bg-[#10B981]/10 text-[#064E3B] text-xs font-semibold tracking-widest mb-4">LIMITED SEATS • NEXT COHORT STARTS MARCH 2026</div>
            <h2 className="section-heading text-[#064E3B]">Start Your Transformation</h2>
            <p className="mt-3 text-[#374151] max-w-md mx-auto">Join hundreds of youth and farmers building sustainable wealth through integrated farming in the Niger Delta.</p>
          </div>
          <div className="max-w-[680px] mx-auto">
            <div className="premium-card bg-white shadow-xl shadow-black/5 rounded-3xl p-8 md:p-10">
              <div className="mb-8">
                <div className="flex justify-between text-xs text-[#6B7280] font-medium mb-2">
                  <div>YOUR APPLICATION</div>
                  <div>{isSubmitted ? 'Step 2 of 2' : 'Step 1 of 2'}</div>
                </div>
                <div className="h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-[#10B981] to-[#059669] transition-all rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
              {!showSuccess && (
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div>
                    <label className="block text-sm font-semibold text-[#374151] mb-2">Full Name</label>
                    <input type="text" id="fullName" value={formData.fullName} onChange={handleInputChange} required className="form-input w-full rounded-2xl border border-[#D1D5DB] px-5 py-3.5 text-lg placeholder:text-[#9CA3AF]" placeholder="Chinedu Okoro" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#374151] mb-2">Phone Number</label>
                      <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} required className="form-input w-full rounded-2xl border border-[#D1D5DB] px-5 py-3.5 text-lg placeholder:text-[#9CA3AF]" placeholder="+234 803 555 0192" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#374151] mb-2">Email Address</label>
                      <input type="email" id="email" value={formData.email} onChange={handleInputChange} required className="form-input w-full rounded-2xl border border-[#D1D5DB] px-5 py-3.5 text-lg placeholder:text-[#9CA3AF]" placeholder="you@farmer.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#374151] mb-2">Primary Farming Interest</label>
                    <select id="interest" value={formData.interest} onChange={handleInputChange} required className="form-input w-full rounded-2xl border border-[#D1D5DB] px-5 py-[17px] text-lg bg-white">
                      <option value="">Select your main interest</option>
                      <option value="Aquaculture">Aquaculture (Catfish & Tilapia)</option>
                      <option value="Crop Production">Crop Production (Vegetables & Grains)</option>
                      <option value="Integrated/Both">Integrated System (Both Aquaculture + Crops)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#374151] mb-2">What is your current goal?</label>
                    <select id="goal" value={formData.goal} onChange={handleInputChange} required className="form-input w-full rounded-2xl border border-[#D1D5DB] px-5 py-[17px] text-lg bg-white">
                      <option value="">Choose your primary goal</option>
                      <option value="Skills Training">Skills Training & Technical Knowledge</option>
                      <option value="Grant Information">Grant & Funding Information</option>
                      <option value="Cooperative Membership">Join a Cooperative / Access Markets</option>
                    </select>
                  </div>
                  <button type="submit" className="magnetic-btn w-full flex items-center justify-center gap-x-3 bg-[#064E3B] text-white py-[17px] rounded-3xl font-semibold text-lg hover:bg-[#053D2F] transition-all active:scale-[0.985] cursor-pointer">
                    <span>Submit Application</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </form>
              )}
              {showSuccess && (
                <div className="text-center py-6">
                  <div className="mx-auto w-20 h-20 rounded-full bg-[#10B981]/10 flex items-center justify-center mb-6">
                    <i className="fa-solid fa-check text-4xl text-[#10B981]"></i>
                  </div>
                  <div className="font-semibold text-2xl text-[#064E3B]">Application Received</div>
                  <p className="text-[#4B5563] mt-2 max-w-xs mx-auto">Thank you. Our team in Port Harcourt will reach out to you shortly to schedule your onboarding call.</p>
                  <button onClick={resetForm} className="mt-8 px-8 py-2.5 text-sm rounded-2xl border border-[#064E3B]/30 text-[#064E3B] font-medium hover:bg-[#064E3B] hover:text-white transition-colors cursor-pointer">
                    Submit Another Application
                  </button>
                </div>
              )}
            </div>
            <div className="text-center mt-5 text-xs text-[#6B7280]">
              This program is fully verified and supported by the Rivers State Ministry of Agriculture
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#064E3B] text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h3 className="text-3xl md:text-4xl font-semibold tracking-tighter">Ready to grow your future?</h3>
          <p className="mt-3 mb-8 text-[#A3E635]">Spaces are limited. Apply today and become part of the new generation of sustainable agribusiness leaders in the Niger Delta.</p>
          <button onClick={() => scrollToSection('register')} className="magnetic-btn inline-flex items-center gap-x-3 px-10 py-4 rounded-3xl bg-[#10B981] text-white text-lg font-semibold hover:bg-[#059669] cursor-pointer">
            Register for the Next Cohort
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </section>

      <footer className="bg-[#F9FAFB] border-t text-xs text-[#4B5563]">
        <div className="max-w-7xl mx-auto px-6 py-9 flex flex-col md:flex-row justify-between items-center gap-y-3 text-center md:text-left">
          <div>© Aqua-Green Integrated Farming Support Initiative • Rivers State, Nigeria</div>
          <div className="flex gap-x-4">
            <a href="https://www.instagram.com/aquagreenintegrated/" target="_blank" rel="noopener" className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F0FDF4] hover:bg-[#10B981]/10 transition-colors cursor-pointer">
              <img src="/ig-img.png" alt="Instagram" className="w-6 h-6 object-contain" />
            </a>
          </div>
          <div className="flex gap-x-5">
            <div className="hidden md:block">Port Harcourt • Elelenwa</div>
            <div className="hidden md:block">•</div>
            <a href="#" className="hover:text-[#10B981]">Privacy</a>
            <a href="#" className="hover:text-[#10B981]">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}