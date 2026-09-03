import { HeartHandshake, Home, ShieldCheck, Users, Building2, Stethoscope } from "lucide-react";

const pillars = [
  { icon: Home, title: "Healthcare at your doorstep", text: "HealthOpz connects people with hospitals and independent healthcare providers so care is easier to discover and access wherever patients are." },
  { icon: Users, title: "One healthcare marketplace", text: "Public patients can discover doctors, freelance nurses, pharmacies, laboratories and traditional medicine practitioners without first registering with a hospital." },
  { icon: Building2, title: "Hospital operations", text: "Registered hospitals get tools for patients, doctors, nurses, administration, accounts, scheduling and operational reporting in one workspace." },
  { icon: ShieldCheck, title: "Trust and accountability", text: "HealthOpz is designed around clear provider profiles, structured records and auditable operational workflows that help organisations deliver more coordinated care." },
];

export default function About() {
  return <div className="min-h-screen bg-slate-50 text-slate-900">
    <section className="bg-gradient-to-br from-teal-800 via-teal-700 to-cyan-700 px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="font-semibold uppercase tracking-[.2em] text-teal-200">About HealthOpz</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">A healthcare marketplace built to bring healthcare to your doorstep.</h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-teal-50">HealthOpz brings patients, healthcare professionals and healthcare organisations into one connected digital ecosystem. Our goal is simple: reduce the distance, friction and time between a person who needs care and the right provider who can deliver it.</p>
      </div>
    </section>
    <section className="px-6 py-16"><div className="mx-auto max-w-6xl">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-700"><HeartHandshake size={30}/></div><h2 className="mt-5 text-3xl font-bold">What HealthOpz is building</h2><p className="mt-4 leading-8 text-slate-600">HealthOpz is both a public healthcare marketplace and an operations platform for registered healthcare organisations. A patient can search for care directly in the marketplace, while a hospital can use HealthOpz to coordinate its own patients, clinical workforce and financial workflow.</p><p className="mt-4 leading-8 text-slate-600">These are intentionally separate experiences. Public Patients can use marketplace providers independently. Hospital Patients belong to a registered hospital's operational environment and can be created by hospital administration or register themselves to reduce paperwork at reception.</p></div>
        <div className="rounded-3xl border border-teal-100 bg-white p-8 shadow-sm"><h3 className="text-xl font-bold text-teal-800">The HealthOpz ecosystem</h3><div className="mt-6 space-y-4">{["Hospitals & clinics", "Doctors & specialists", "Freelance nurses & home care", "Pharmacies", "Medical laboratories", "Traditional medicine practitioners", "Public and hospital-registered patients"].map(x=><div key={x} className="flex items-center gap-3 rounded-xl bg-slate-50 p-4"><Stethoscope size={18} className="text-teal-700"/><span className="font-medium">{x}</span></div>)}</div></div>
      </div>
      <div className="mt-16 grid gap-6 md:grid-cols-2">{pillars.map(({icon:Icon,title,text})=><article key={title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"><Icon className="text-teal-700" size={28}/><h3 className="mt-4 text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}</div>
    </div></section>
  </div>;
}
