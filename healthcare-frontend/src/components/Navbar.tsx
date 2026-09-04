import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import MegaMenu from "./MegaMenu";
import ThemeToggle from "./ThemeToggle";

const services = [["Hospitals","/hospitals"],["Doctors","/doctors"],["Home-care nurses","/nurses"],["Traditional medicine","/traditional-medicine"],["Pharmacies","/pharmacy"],["Laboratories","/laboratories"]];

export default function Navbar() {
  const [megaOpen,setMegaOpen]=useState(false); const [mobileOpen,setMobileOpen]=useState(false); const [servicesOpen,setServicesOpen]=useState(false); const location=useLocation();
  useEffect(()=>{setMegaOpen(false);setMobileOpen(false);setServicesOpen(false)},[location.pathname]);
  return <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
    <div className="section-shell flex h-[72px] items-center justify-between gap-3">
      <Link to="/" className="shrink-0" aria-label="HealthOpz home"><img src="/logo.png" alt="HealthOpz" className="h-14 w-auto"/></Link>
      <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
        <button onClick={()=>setMegaOpen(v=>!v)} className="inline-flex items-center gap-1.5 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-teal-800" aria-expanded={megaOpen}>Explore care <ChevronDown size={16}/></button>
        {[["Pricing","/pricing"],["About","/about"],["Contact","/contact"]].map(([label,path])=><Link key={path} to={path} className="rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-teal-800">{label}</Link>)}
      </nav>
      <div className="flex items-center gap-2"><ThemeToggle/><Link to="/hospital-login" className="hidden rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 md:block">Hospital login</Link><Link to="/get-started" className="hidden rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-teal-800 sm:block">Join HealthOpz</Link><button onClick={()=>setMobileOpen(v=>!v)} className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 text-slate-800 lg:hidden" aria-label="Toggle menu">{mobileOpen?<X/>:<Menu/>}</button></div>
    </div>
    <MegaMenu open={megaOpen} onClose={()=>setMegaOpen(false)}/>
    {mobileOpen&&<div className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-slate-200 bg-white lg:hidden"><div className="section-shell space-y-2 py-4"><button onClick={()=>setServicesOpen(v=>!v)} className="flex w-full items-center justify-between rounded-xl bg-slate-50 px-4 py-3.5 font-bold">Explore care <span>{servicesOpen?"−":"+"}</span></button>{servicesOpen&&<div className="grid grid-cols-2 gap-1 rounded-2xl border border-slate-200 p-2">{services.map(([label,path])=><Link key={path} to={path} className="rounded-xl p-3 text-sm font-semibold text-slate-700 hover:bg-teal-50">{label}</Link>)}</div>}{[["Pricing","/pricing"],["About","/about"],["Contact","/contact"],["Patient portal","/patient-dashboard"]].map(([label,path])=><Link key={path} to={path} className="block rounded-xl px-4 py-3.5 font-bold text-slate-700 hover:bg-slate-50">{label}</Link>)}<div className="grid grid-cols-2 gap-2 pt-2"><Link to="/hospital-login" className="secondary-btn text-sm">Hospital login</Link><Link to="/get-started" className="primary-btn text-sm">Join HealthOpz</Link></div></div></div>}
  </header>
}

