type StoryKind = "hospitals" | "doctors" | "laboratories" | "pharmacy";

const stories: Record<StoryKind,{eyebrow:string;title:string;copy:string;accent:string;items:{image:string;title:string;copy:string;alt:string}[]}> = {
 hospitals:{eyebrow:"Connected hospital care",title:"Technology that helps care teams move with confidence.",copy:"See how modern hospitals combine capable people with practical, current clinical technology.",accent:"text-cyan-700",items:[
  {image:"/images/hospital-monitoring.png",title:"Connected monitoring",copy:"Real-time vital signs help clinical teams respond with better context.",alt:"African clinical team using a modern bedside monitor and connected patient technology"},
  {image:"/images/hospital-imaging.png",title:"Digital diagnostics",copy:"Current imaging systems support faster, clearer clinical decision-making.",alt:"African radiographer operating modern digital imaging equipment"},
  {image:"/images/hospital-telehealth.png",title:"Coordinated care",copy:"Telehealth and digital records connect expertise across departments and locations.",alt:"African clinicians collaborating with a mobile telehealth system"}
 ]},
 doctors:{eyebrow:"From consultation to care plan",title:"Professional care, explained clearly.",copy:"Explore doctors through a patient-first journey built around listening, careful assessment and responsible follow-up.",accent:"text-teal-700",items:[
  {image:"/images/doctor-consultation.png",title:"Listen first",copy:"A thoughtful consultation gives your doctor the context behind your concerns.",alt:"African doctor listening attentively to an adult patient"},
  {image:"/images/doctor-examination.png",title:"Assess carefully",copy:"Routine checks and clear discussion support informed clinical decisions.",alt:"African doctor checking a patient's blood pressure"},
  {image:"/images/doctor-prescription.png",title:"Explain the plan",copy:"Medication and next steps should be reviewed in language patients understand.",alt:"African doctor reviewing a prescription with a patient"}
 ]},
 laboratories:{eyebrow:"Inside the laboratory",title:"Precision at every step.",copy:"From secure sample intake to expert analysis, qualified laboratory scientists support dependable diagnostics.",accent:"text-cyan-700",items:[
  {image:"/images/lab-sample.png",title:"Secure intake",copy:"Sealed samples and barcode workflows protect traceability.",alt:"African laboratory scientist receiving and scanning a sealed sample"},
  {image:"/images/lab-analysis.png",title:"Modern analysis",copy:"Automated analysers and quality controls support consistent results.",alt:"African laboratory scientist operating a modern analyser"},
  {image:"/images/lab-microscope.png",title:"Expert review",copy:"Skilled scientists examine and document findings with care.",alt:"African laboratory scientist working with a microscope"}
 ]},
 pharmacy:{eyebrow:"Safe dispensing workflow",title:"More than a shelf of medicines.",copy:"Good pharmacy care combines organised inventory, careful prescription checks and clear patient counselling.",accent:"text-violet-700",items:[
  {image:"/images/pharmacy-sorting.png",title:"Organised inventory",copy:"Structured storage helps pharmacists find and manage sealed products safely.",alt:"African pharmacist sorting sealed medicine packages"},
  {image:"/images/pharmacy-checking.png",title:"Prescription checks",copy:"Each order is reviewed against the prescription before dispensing.",alt:"African pharmacist checking a prescription and medication package"},
  {image:"/images/pharmacy-counselling.png",title:"Clear guidance",copy:"Patients receive practical instructions for using prescribed medication.",alt:"African pharmacist counselling a customer at the pharmacy counter"}
 ]}
};

export default function ProviderStory({kind}:{kind:StoryKind}){const s=stories[kind];return <section className="bg-white py-20 lg:py-24"><div className="section-shell"><div className="max-w-3xl"><p className={`eyebrow ${s.accent}`}>{s.eyebrow}</p><h2 className="section-title mt-3">{s.title}</h2><p className="body-copy mt-4">{s.copy}</p></div><div className="mt-10 grid gap-6 md:grid-cols-3">{s.items.map((item,index)=><article key={item.title} className="premium-card group overflow-hidden"><div className="relative overflow-hidden"><img src={item.image} alt={item.alt} className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03]"/><span className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-sm font-black text-slate-900 shadow">{String(index+1).padStart(2,"0")}</span></div><div className="p-6"><h3 className="text-xl font-extrabold text-slate-950">{item.title}</h3><p className="mt-2 leading-7 text-slate-600">{item.copy}</p></div></article>)}</div></div></section>}

