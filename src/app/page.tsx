"use client";

import { useEffect, useRef, useState } from "react";

const pages = ["home", "about", "resume", "projects", "music", "contact"] as const;
type Page = (typeof pages)[number];
const lines = ["a consultant.", "a musician.", "a runner.", "a chess addict.", "building apps.", "a problem solver."];
const isPage = (value: string): value is Page => pages.includes(value as Page);
const formatTime = (value: number) => { const seconds=Number.isFinite(value) ? Math.floor(value) : 0; return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,"0")}`; };

export default function Home() {
  const [page, setPage] = useState<Page>("home");
  const [typed, setTyped] = useState(lines[0]);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioError, setAudioError] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  function go(next: Page) {
    setPage(next);
    if (location.hash !== "#" + next) history.pushState(null,"","#"+next);
    window.scrollTo(0,0);
  }

  useEffect(() => {
    const fromHash = () => { const hash=location.hash.slice(1); setPage(isPage(hash) ? hash : "home"); window.scrollTo(0,0); };
    fromHash(); window.addEventListener("hashchange",fromHash); window.addEventListener("popstate",fromHash);
    return () => { window.removeEventListener("hashchange",fromHash); window.removeEventListener("popstate",fromHash); };
  }, []);

  useEffect(() => {
    const elements=document.querySelectorAll(".page.on .rv");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { elements.forEach(el=>el.classList.add("in")); return; }
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("in");observer.unobserve(entry.target);}}),{threshold:.08});
    elements.forEach(el=>observer.observe(el));
    return () => observer.disconnect();
  }, [page]);

  useEffect(() => {
    const media=window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout>;
    let line=0, index=lines[0].length, deleting=true;
    function tick() {
      if(media.matches) { setTyped(lines[0]); return; }
      const full=lines[line];
      index+=deleting?-1:1;
      setTyped(full.slice(0,index));
      let delay=deleting?42:78;
      if(!deleting && index===full.length){deleting=true;delay=1700;}
      else if(deleting && index===0){deleting=false;line=(line+1)%lines.length;delay=280;}
      timer=setTimeout(tick,delay);
    }
    function restart(){clearTimeout(timer);line=0;index=lines[0].length;deleting=true;setTyped(lines[0]);if(!media.matches)timer=setTimeout(tick,1700);}
    restart();media.addEventListener("change",restart);
    return () => { clearTimeout(timer);media.removeEventListener("change",restart); };
  }, []);

  useEffect(() => {
    if(!resumeOpen) return;
    const previous=document.activeElement as HTMLElement | null;
    const overflow=document.body.style.overflow;
    document.body.style.overflow="hidden";
    modalRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    function onKey(event: KeyboardEvent) {
      if(event.key==="Escape")setResumeOpen(false);
      if(event.key!=="Tab")return;
      const items=modalRef.current?.querySelectorAll<HTMLElement>("button, a, iframe");
      if(!items?.length)return;
      const first=items[0],last=items[items.length-1];
      if(event.shiftKey && document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first.focus();}
    }
    document.addEventListener("keydown",onKey);
    return () => { document.body.style.overflow=overflow;document.removeEventListener("keydown",onKey);previous?.focus(); };
  }, [resumeOpen]);

  async function toggleAudio() {
    const audio=audioRef.current; if(!audio)return;
    if(!audio.paused){audio.pause();setPlaying(false);return;}
    try { await audio.play();setPlaying(true);setAudioError(""); }
    catch {setPlaying(false);setAudioError("Playback could not start. Please try again.");}
  }

  return (<>

<nav>
<div className="nav-in">
<button className={"nav-btn" + (page === "home" ? " on" : "")} aria-current={page === "home" ? "page" : undefined} id="n-home" onClick={() => go('home')} aria-label="Home"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5"></path><path d="M5 9.5V21h14V9.5"></path><path d="M9.5 21v-6h5v6"></path></svg></button>
<button className={"nav-btn" + (page === "about" ? " on" : "")} aria-current={page === "about" ? "page" : undefined} id="n-about" onClick={() => go('about')} aria-label="About"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"></path></svg></button>
<button className={"nav-btn" + (page === "resume" ? " on" : "")} aria-current={page === "resume" ? "page" : undefined} id="n-resume" onClick={() => go('resume')} aria-label="Resume"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 3v5h5"></path><path d="M9 13h6M9 17h4"></path></svg></button>
<button className={"nav-btn" + (page === "projects" ? " on" : "")} aria-current={page === "projects" ? "page" : undefined} id="n-projects" onClick={() => go('projects')} aria-label="Projects"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg></button>
<button className={"nav-btn" + (page === "music" ? " on" : "")} aria-current={page === "music" ? "page" : undefined} id="n-music" onClick={() => go('music')} aria-label="Music"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V6l11-2v12"></path><circle cx="6" cy="18" r="3"></circle><circle cx="17" cy="16" r="3"></circle></svg></button>
<button className={"nav-btn" + (page === "contact" ? " on" : "")} aria-current={page === "contact" ? "page" : undefined} id="n-contact" onClick={() => go('contact')} aria-label="Contact"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10.5c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 0 1 16 0z"></path><circle cx="12" cy="10.5" r="3"></circle></svg></button>
</div>
</nav>

<section className={"page" + (page === "home" ? " on" : "")} id="p-home" aria-hidden={page !== "home"}>
<div className="hero">
<div className="hero-txt">
<p className="hi">{"Hi, I'm"}</p>
<h1 className="big-name">{"Matthew"}</h1>
<p className="tw">{"I'm "}<b id="twtext">{typed}</b><span className="caret"></span></p>
<div className="socials"><a href="https://www.instagram.com/mhuehne/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5.5"></rect><circle cx="12" cy="12" r="4.2"></circle><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none"></circle></svg></a><a href="https://www.linkedin.com/in/matthewhuehne/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 448 512" fill="currentColor"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg></a><a href="https://github.com/Huehnematthew8" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg viewBox="0 0 496 512" fill="currentColor"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg></a></div>
</div>
<div className="avatar"><img src="/portfolio-assets/matthew-huehne-d83022e4b3.jpg" alt="Matthew Huehne" /></div>
</div>
</section>

<section className={"page" + (page === "about" ? " on" : "")} id="p-about" aria-hidden={page !== "about"}>
<h1 className="ptitle rv">{"About Me"}</h1>
<div className="tl">
<div className="tl-row"><div className="tl-card rv">
<div className="tl-head"><svg viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path><path d="M3 12h18"></path></svg><h3>{"Consultant"}</h3></div>
<p>{"Consultant in Deloitte’s Engineering, AI and Data practice, working on cloud and infrastructure programmes. My work includes discovery interviews, financial modelling and recommendations for leadership."}</p>
</div></div>
<div className="tl-row"><div className="tl-card rv">
<div className="tl-head"><svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path><path d="m7.5 4.3 9 5.1"></path></svg><h3>{"Side Projects"}</h3></div>
<p>{"I’m currently building Candor, a personal job-search app, and this portfolio. I’ll share more about both as they develop."}</p>
</div></div>
<div className="tl-row"><div className="tl-card rv">
<div className="tl-head"><svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4h10v6a5 5 0 0 1-10 0z"></path><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"></path><path d="M10 15h4M9 20h6M12 15v5"></path></svg><h3>{"Competitor"}</h3></div>
<p>{"Represented QUT in case competitions in Los Angeles, Bangkok and Melbourne in 2025. Second overall at Marshall, third in division at Chulalongkorn and a national finalist at L’Oréal Brandstorm."}</p>
</div></div>
<div className="tl-row"><div className="tl-card rv">
<div className="tl-head"><svg viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V6l11-2v12"></path><circle cx="6" cy="18" r="3"></circle><circle cx="17" cy="16" r="3"></circle></svg><h3>{"Musician"}</h3></div>
<p>{"Producing in Ableton and slowly getting better at guitar. One track finished start to end so far, which is one more than this time last year."}</p>
</div></div>
<div className="tl-row"><div className="tl-card rv">
<div className="tl-head"><svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeLinecap="round" strokeLinejoin="round"><path d="m8 17-5-5 5-5"></path><path d="m16 7 5 5-5 5"></path></svg><h3>{"Technologist"}</h3></div>
<p>{"Python, SQL, AWS, Next.js and Supabase. A finance and computer science degree, then a habit of building the tools I wanted to use rather than waiting for them."}</p>
</div></div>
<div className="tl-row"><div className="tl-card rv">
<div className="tl-head"><svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V3l7 3.5-7 3.5"></path><circle cx="8" cy="19" r="2.5"></circle><path d="M12 19h-1.5"></path></svg><h3>{"Golfer"}</h3></div>
<p>{"Out on the course most weekends I can manage it. Still chasing a handicap I would be willing to publish on a website."}</p>
</div></div>
<div className="tl-row"><div className="tl-card rv">
<div className="tl-head"><svg viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3-8 4 16 3-8h4"></path></svg><h3>{"Runner"}</h3></div>
<p>{"Running and the gym are the two things that reliably clear my head. Neither started because I enjoyed them, which is the whole reason I trust them now."}</p>
</div></div>
<div className="tl-row"><div className="tl-card rv">
<div className="tl-head"><svg viewBox="0 0 24 24" fill="none" stroke="var(--indigo)" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5.5" r="2.5"></circle><path d="M10 8.5c0 2.5-1 3.5-1 5.5s.8 3 .5 5h5c-.3-2 .2-3.2.5-5s-1-3-1-5.5"></path><path d="M7 19h10"></path></svg><h3>{"Chess Player"}</h3></div>
<p>{"Rated around 1500 on chess.com and still grinding. Mostly rapid, mostly losing to people who saw it three moves earlier than I did."}</p>
</div></div>
</div>
</section>

<section className={"page" + (page === "resume" ? " on" : "")} id="p-resume" aria-hidden={page !== "resume"}>
<h1 className="ptitle rv">{"Resume"}</h1>
<div className="rsec rv">
<div className="rsec-h"><svg viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeLinecap="round" strokeLinejoin="round"><path d="M22 9 12 4 2 9l10 5z"></path><path d="M6 11.5V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5"></path></svg><h2>{"Education"}</h2></div>
<div className="rcard">
<div className="rtop"><div>
<div className="rtitle">{"Queensland University of Technology"}</div>
<div className="rorg">{"Bachelor of Business (Finance) and Bachelor of Information Technology (Computer Science)"}</div>
<div className="rdate">{"Brisbane, 2021 to February 2026, course completed"}</div>
</div></div>
</div>
</div>
<div className="rsec rv">
<div className="rsec-h"><svg viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="6"></circle><path d="M8.5 14.5 7 22l5-2.5L17 22l-1.5-7.5"></path></svg><h2>{"Certifications"}</h2></div>
<div className="rcard">
<div className="certrow">
<div>
<div className="rtitle">{"Claude Certified Associate, Foundations (CCAO-F)"}</div>
<div className="rorg">{"Anthropic"}</div>
<div className="rdate">{"Issued August 2026"}</div>
</div>
<a className="verify" href="https://www.credly.com/badges/5a223e9c-e609-451a-a0bb-ba3ca48d3da9/public_url" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4h6v6"></path><path d="M20 4 11 13"></path><path d="M18 14v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"></path></svg>{"Verify"}</a>
</div>
</div>
<div className="rcard">
<div className="certrow">
<div>
<div className="rtitle">{"Microsoft Certified: Azure AI Fundamentals (AI-900)"}</div>
<div className="rorg">{"Microsoft"}</div>
<div className="rdate">{"Issued May 2026"}</div>
</div>
<a className="verify" href="https://learn.microsoft.com/api/credentials/share/en-us/HuehneMatthew-7110/2717CB632F905F9B" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4h6v6"></path><path d="M20 4 11 13"></path><path d="M18 14v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"></path></svg>{"Verify"}</a>
</div>
</div>
<div className="rcard">
<div className="certrow">
<div>
<div className="rtitle">{"AWS Certified Cloud Practitioner (CLF-C02)"}</div>
<div className="rorg">{"Amazon Web Services"}</div>
<div className="rdate">{"Issued September 2025"}</div>
</div>
<a className="verify" href="https://www.credly.com/badges/9dd3fa58-8768-48c9-97ed-b87801f5950d/linked_in_profile" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4h6v6"></path><path d="M20 4 11 13"></path><path d="M18 14v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"></path></svg>{"Verify"}</a>
</div>
</div>
<div className="rcard">
<div className="certrow">
<div>
<div className="rtitle">{"STEM Connect Virtual Experience Program"}</div>
<div className="rorg">{"Deloitte"}</div>
<div className="rdate">{"Issued December 2022"}</div>
</div>
<a className="verify" href="https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Deloitte%20Australia/YPWCiGNTkr6QxcpEu_Deloitte%20Australia_rbkd4BxBjHPY42bxn_1670661040571_completion_certificate.pdf" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4h6v6"></path><path d="M20 4 11 13"></path><path d="M18 14v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"></path></svg>{"Verify"}</a>
</div>
</div>
</div>


<div className="rsec rv">
<div className="rsec-h"><svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path></svg><h2>{"Experience"}</h2></div>
<div className="rcard">
<div className="rtop">
<img className="rlogo" src="/portfolio-assets/deloitte-5eb9a871ab.png" alt="Deloitte" />
<div><div className="rtitle">{"Consultant, Engineering, AI and Data"}</div>
<div className="rorg">{"Deloitte"}</div><div className="rdate">{"Consultant: August 2026 to present · Analyst: July 2025 to August 2026"}</div></div>
</div>
<ul>
<li>{"Developed the initial AWS pricing model structure for an internal migration assessment covering more than 200 applications. Reconciled inventory data and server core counts."}</li>
<li>{"Coordinated 40+ interviews across time zones, documented findings and managed follow-ups. Built application tracking and Jira structures across 12 work packages."}</li>
<li>{"Consolidated 400+ workshop initiatives into 103 for a major bank and helped build their three-year costing model. Supported roadmap sequencing and produced visualisations for executive review."}</li>
<li>{"Co-led a separate internal platform assessment that changed the recommendation from replacing six modules to one capability after discovery showed only one was meaningfully used."}</li>
</ul>
</div>
<div className="rcard">
<div className="rtop">
<img className="rlogo" src="/portfolio-assets/ey-67f34aee4a.png" alt="EY" />
<div><div className="rtitle">{"Technology Strategy and Transformation Intern"}</div>
<div className="rorg">{"Ernst & Young"}</div><div className="rdate">{"January 2025 to February 2025"}</div></div>
</div>
<ul><li>{"Wrote and refined bid content for government technology projects, matching each response to what the buyer had actually asked for in the tender."}</li></ul>
</div>
<div className="rcard">
<div className="rtop">
<img className="rlogo" src="/portfolio-assets/moonward-apps-4b6660f48b.png" alt="Moonward Apps" />
<div><div className="rtitle">{"Quality Assurance Tester"}</div>
<div className="rorg">{"Moonward Apps"}</div><div className="rdate">{"June 2024 to January 2025"}</div></div>
</div>
<ul><li>{"Joined as a manual tester, taught myself Cypress in my own time and automated the regression suite the team had been running by hand. Worked with developers, project managers and clients."}</li></ul>
</div>
<div className="rcard">
<div className="rtop">
<img className="rlogo" src="/portfolio-assets/deloitte-5eb9a871ab.png" alt="Deloitte" />
<div><div className="rtitle">{"Intern, Cloud and Engineering Advisory · Technology Strategy and Transformation"}</div>
<div className="rorg">{"Deloitte"}</div><div className="rdate">{"November 2023 to February 2024"}</div></div>
</div>
<ul><li>{"Turned client interviews and workshop notes into technology roadmaps and service models, and iterated the technology radar visualisations against stakeholder feedback."}</li></ul>
</div>
<div className="rcard">
<div className="rtop">
<img className="rlogo" src="/portfolio-assets/180-degrees-consulting-6e4f5b127a.png" alt="180 Degrees Consulting" />
<div><div className="rtitle">{"Consultant, then Consulting Director, then Treasurer"}</div>
<div className="rorg">{"180 Degrees Consulting QUT"}</div><div className="rdate">{"February to November 2023; February to November 2024"}</div></div>
</div>
<ul>
<li>{"Led five consultants on a hiring guide for a veteran-employment charity, mentored by KPMG."}</li>
<li>{"Recommended software for a 250 member transport organisation and presented the case to their executive team."}</li>
</ul>
</div>
<div className="rcard">
<div className="rtop">
<img className="rlogo" src="/portfolio-assets/paedix-33ba92c875.png" alt="Paedix" />
<div><div className="rtitle">{"Digital Marketing and Data Intern"}</div>
<div className="rorg">{"Paedix Paediatrics"}</div><div className="rdate">{"March 2023 to October 2023"}</div></div>
</div>
<ul><li>{"Developed a database of medical practitioners using Python and automated email and fax outreach."}</li></ul>
</div>
<div className="rcard">
<div className="rtop">
<img className="rlogo" src="/portfolio-assets/code-camp-41cc260802.png" alt="Code Camp" />
<div><div className="rtitle">{"Head Teacher"}</div>
<div className="rorg">{"Code Camp"}</div><div className="rdate">{"December 2021 to October 2023"}</div></div>
</div>
<ul><li>{"Taught coding and computational thinking to primary school students."}</li></ul>
</div>
<div className="rcard">
<div className="rtop">
<img className="rlogo" src="/portfolio-assets/lifeshape-clinic-a57a8ad30d.png" alt="LifeShape Clinic" />
<div><div className="rtitle">{"Client Services Representative"}</div>
<div className="rorg">{"LifeShape Clinic"}</div><div className="rdate">{"February 2022 to September 2023"}</div></div>
</div>
<ul><li>{"Handled enquiries, appointments and records at a clinic while studying full time."}</li></ul>
</div>
</div>
<div className="rsec rv">
<div className="rsec-h"><svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4h10v6a5 5 0 0 1-10 0z"></path><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"></path><path d="M10 15h4M9 20h6M12 15v5"></path></svg><h2>{"Case Competitions"}</h2></div>
<div className="rcard">
<div className="rtop"><div><div className="rtitle">{"2nd place, Marshall International Case Competition"}</div>
<div className="rorg">{"University of Southern California, Los Angeles"}</div><div className="rdate">{"February 2025"}</div></div></div>
<div className="rmeta">{"Represented QUT against 20 international universities. Built the budget allocation and three-year revenue model for our proposed sports-media content series. Helped write the marketing and go-to-market strategy for our proposed wealth platform."}</div>
</div>
<div className="rcard">
<div className="rtop"><div><div className="rtitle">{"3rd in division, Chulalongkorn International Business Case Competition"}</div>
<div className="rorg">{"Chulalongkorn Business School, Bangkok"}</div><div className="rdate">{"May 2025"}</div></div></div>
<div className="rmeta">{"Mainly handled go-to-market strategy across team proposals for a hospital group and a paint manufacturer, in eight-hour and twenty-four-hour cases."}</div>
</div>
<div className="rcard">
<div className="rtop"><div><div className="rtitle">{"National finalist, L'Oreal Brandstorm Australia and New Zealand"}</div>
<div className="rorg">{"L'Oreal, Melbourne"}</div><div className="rdate">{"May 2025"}</div></div></div>
<div className="rmeta">{"One of five finalist teams from 155 submissions. I originated HairPress, a styling-device concept for men with thick, outward-growing hair. Presented our financial model and go-to-market proposal to five L’Oréal ANZ executives, including the CEO, and defended it in Q&A."}</div>
</div>
</div>
<div className="rsec rv" style={{"textAlign": "center", "paddingBottom": "4rem"}}>
<button className="dl" onClick={() => setResumeOpen(true)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12"></path><path d="m7 11 5 5 5-5"></path><path d="M5 21h14"></path></svg>{"View full resume"}</button>
</div>
</section>

<section className={"page" + (page === "projects" ? " on" : "")} id="p-projects" aria-hidden={page !== "projects"}>
<h1 className="ptitle rv">{"Projects"}</h1>
<p className="plead rv">{"What I’m working on. More details to come."}</p>
<div className="pgrid">
<article className="pcard rv">
<div className="pshot project-preview"><img src="/portfolio-assets/candor-role-tracking-interface-with-sample-roles-46b3ddfb8f.png" alt="Candor role-tracking interface with sample roles" loading="lazy" /></div>
<div className="pbody">
<div className="ptag build">{"In progress"}</div>
<h2 className="pname">{"Candor"}</h2>
<p className="pdesc">{"A personal job-search app for tracking roles, contacts and next steps, with a master résumé and story bank."}</p>
<p style={{"marginTop": "1rem", "color": "var(--muted)", "fontSize": ".88rem"}}>{"Interface preview with sample data. Write-up coming soon."}</p>
</div>
</article>
<article className="pcard rv">
<div className="pshot project-preview"><img src="/portfolio-assets/personal-portfolio-homepage-with-introduction-and-portrait-91ec3d51b4.png" alt="Personal portfolio homepage with introduction and portrait" loading="lazy" /></div>
<div className="pbody">
<div className="ptag build">{"In progress"}</div>
<h2 className="pname">{"Personal portfolio"}</h2>
<p className="pdesc">{"This website: a place for my background, experience, projects and music."}</p>
<p style={{"marginTop": "1rem", "color": "var(--muted)", "fontSize": ".88rem"}}>{"Project write-up coming soon."}</p>
</div>
</article>
</div>
</section>

<section className={"page" + (page === "music" ? " on" : "")} id="p-music" aria-hidden={page !== "music"}>
<h1 className="ptitle rv">{"Music"}</h1>
<div className="mus">
<p className="rv">{"I produce in Ableton and I’m slowly getting better at guitar. Making music and building apps give me a similar kind of satisfaction. In both, I get to be creative and experiment with an idea until I’ve made something I’m happy with."}</p>
<p className="rv"><b>{"Alone with You"}</b>{" is the first track I finished start to end. It is not going to trouble the charts, but every part of it is mine, which was the point. Working on the next one."}</p>
<div className="player rv">
<div className="pl-top">
<button className="pl-play" onClick={toggleAudio} aria-label={playing ? "Pause music" : "Play music"} aria-pressed={playing}>
<svg id="ic-play" viewBox="0 0 24 24" style={{display: playing ? "none" : undefined}}><polygon points="6,4 20,12 6,20"></polygon></svg>
<svg id="ic-pause" viewBox="0 0 24 24" style={{...{},display: playing ? undefined : "none"}}><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
</button>
<div><div className="pl-name">{"Alone with You"}</div><div className="pl-by">{"Matthew Huehne"}</div></div>
</div>
<div className="wave" id="wave" aria-hidden="true">{Array.from({length:64}, (_, i) => <span key={i} className={i < (duration ? currentTime / duration * 64 : 0) ? "on" : ""} style={{height: `${22 + Math.abs(Math.sin(i * .7)) * 70}%`}} />)}</div><input className="music-seek" type="range" aria-label="Track position" min={0} max={duration || 1} step={0.1} value={currentTime} onChange={(event) => { const time = Number(event.target.value); if(audioRef.current) audioRef.current.currentTime=time; setCurrentTime(time); }} />{audioError && <p role="status">{audioError}</p>}
<div className="pl-time"><span id="t-now">{formatTime(currentTime)}</span><span id="t-end">{formatTime(duration)}</span></div>
<audio id="aud" src="/portfolio-assets/alone-with-you-a61400c9dc.mp3" preload="metadata" ref={audioRef} onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)} onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)} onEnded={() => setPlaying(false)}></audio>
</div>
</div>
</section>

<section className={"page" + (page === "contact" ? " on" : "")} id="p-contact" aria-hidden={page !== "contact"}>
<h1 className="ptitle rv">{"Contact"}</h1>
<div className="ct">
<div className="divlbl rv">{"Connect with me"}</div>
<div className="big-socials rv"><a href="https://www.instagram.com/mhuehne/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5.5"></rect><circle cx="12" cy="12" r="4.2"></circle><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none"></circle></svg></a><a href="https://www.linkedin.com/in/matthewhuehne/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 448 512" fill="currentColor"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg></a><a href="https://github.com/Huehnematthew8" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg viewBox="0 0 496 512" fill="currentColor"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg></a></div>
<div className="divlbl rv">{"Or send me an email"}</div>
<a className="mailto rv" href="mailto:huehnematthew8@gmail.com">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg>
<span>{"huehnematthew8@gmail.com"}</span>
</a>
<p className="rv" style={{"marginTop": "2.5rem", "color": "var(--muted)", "fontSize": ".98rem", "lineHeight": "1.7"}}>{"Based in Brisbane. Australian citizen with full working rights."}</p>
</div>
<footer>{"© 2026 Matthew Huehne"}</footer>
</section>

<div role="dialog" aria-modal="true" aria-label="Full resume" id="ov" style={{...{"position": "fixed", "inset": "0", "background": "rgba(10,10,10,.72)", "zIndex": "500", "alignItems": "center", "justifyContent": "center", "padding": "2rem"}, display: resumeOpen ? "flex" : "none"}} onClick={(event) => { if (event.target === event.currentTarget) setResumeOpen(false); }} ref={modalRef}>
<div style={{"width": "100%", "maxWidth": "900px", "height": "88vh", "background": "#fff", "borderRadius": "14px", "overflow": "hidden", "display": "flex", "flexDirection": "column"}}>
<div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center", "padding": ".9rem 1.2rem", "borderBottom": "1px solid var(--line)"}}>
<strong style={{"fontSize": ".95rem"}}>{"Matthew Huehne, resume"}</strong>
<button aria-label="Close resume" onClick={() => setResumeOpen(false)} style={{"background": "none", "border": "none", "fontSize": "1.2rem", "cursor": "pointer", "lineHeight": "1", "color": "#6b7280"}}>{"✕"}</button>
</div>
<iframe title="Matthew Huehne resume" src="/resume.pdf" style={{"flex": "1", "border": "none", "width": "100%"}}></iframe>
</div>
</div>


</>);
}
