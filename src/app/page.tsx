"use client";

import { useState, useRef, useEffect, FormEvent } from "react";

/* ═══════════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════════ */
function Nav({
  onNavigate,
  onResume,
}: {
  onNavigate: (id: string) => void;
  onResume: () => void;
}) {
  const [open, setOpen] = useState(false);
  const go = (id: string) => {
    setOpen(false);
    onNavigate(id);
  };
  return (
    <nav>
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => go("hero")}>
          <svg className="nav-monstera" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="5" stroke="#6B7F5E" strokeWidth="1.2" />
            <path d="M8 5 Q7 11 9 14 Q12 16 15 14 Q17 11 16 5Z" fill="#C4653A" stroke="#C4653A" strokeWidth="0.5" />
            <line x1="8" y1="5" x2="16" y2="5" stroke="#C4653A" strokeWidth="1.2" />
            <path d="M12 9 Q8 6 5 8 Q7 5 12 7" stroke="#6B7F5E" strokeWidth="1.2" />
            <path d="M12 9 Q16 6 19 8 Q17 5 12 7" stroke="#6B7F5E" strokeWidth="1.2" />
            <path d="M12 11 Q7 10 5 13 Q8 11 12 12" stroke="#6B7F5E" strokeWidth="1.2" />
            <path d="M12 11 Q17 10 19 13 Q16 11 12 12" stroke="#6B7F5E" strokeWidth="1.2" />
          </svg>
          MATTHEW HUEHNE
        </button>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
        <div className={`nav-links${open ? " open" : ""}`}>
          <button className="nav-link" onClick={() => go("about-section")}>About</button>
          <button className="nav-link" onClick={() => go("works-section")}>Projects</button>
          <button className="nav-link" onClick={() => go("exp-section")}>Experience</button>
          <button className="nav-link" onClick={() => go("contact-section")}>Contact</button>
          <button className="nav-resume" onClick={onResume}>Resume ↗</button>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════ */
function Hero() {
  return (
    <header className="home-hero" id="hero">
      <div className="hero-top">
        <div className="hero-left">
          <p className="section-label fade-up">01 / Who I Am</p>
          <h1 className="hero-name fade-up delay-1">MATTHEW<br />HUEHNE</h1>
          <p className="hero-sub fade-up delay-2">
            Finance and CS graduate. I solve problems, ask uncomfortable questions, and care a lot about what gets built and why.
          </p>
          <p className="hero-loc fade-up delay-3">
            Brisbane, AU&nbsp;&nbsp;·&nbsp;&nbsp;
            <a href="mailto:huehnematthew8@gmail.com">huehnematthew8@gmail.com</a>
            &nbsp;&nbsp;·&nbsp;&nbsp;Finance &amp; Computer Science Graduate, QUT 2025
          </p>
        </div>
        <div className="hero-photo fade-up delay-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/headshot.png" alt="Matthew Huehne" />
        </div>
      </div>
      <div className="hero-divider" />
    </header>
  );
}

/* ═══════════════════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════════════════ */
function About() {
  return (
    <section className="about-grid" id="about-section">
      <div className="about-left">
        <p className="section-label">02 / Background</p>
        <p>Born in Indonesia, raised in the Philippines and Canada, now based in Brisbane. A global upbringing that shaped adaptability and a pattern-seeking perspective.</p>
        <div className="about-pull-quote">
          <span>&ldquo;The pursuit of becoming the best version of yourself is not a destination &mdash; it&apos;s the only direction worth moving in.&rdquo;</span>
        </div>
      </div>
      <div className="about-right">
        <p className="big-italic">
          Analyst in the Engineering, AI &amp; Data practice at{" "}
          <a href="https://www.deloitte.com/au/en.html" target="_blank" rel="noopener noreferrer">Deloitte</a>,
          working across data centre strategy and cloud migration engagements, contributing to business development and client delivery across a range of industries.
        </p>

        <p>For pretty much my entire life I carried a fixed mindset &mdash; convinced I had to work with what I was given. The shift that changed everything was choosing to do the things I least wanted to do. Joining 180 Degrees Consulting, standing up in front of rooms, competing on international stages in LA, Bangkok and Melbourne. Alongside that, compulsive reading gave me something I hadn&apos;t had before: perspective. The reps taught me that discomfort is just the feeling of growing.</p>

        <p>I am drawn to creating things &mdash; ideas, products, teams, solutions. I thrive in environments where there is a real problem to solve, room to lead, and something meaningful to make. Finance gave me the ability to think commercially. Computer science gave me the ability to build. The case competitions, the consulting work, and the projects I have shipped independently are all expressions of the same instinct: find the gap and go after it.</p>

        <p className="about-hobbies">Outside of work: music production (Ableton), getting better on guitar, reading, running, soccer, and golf. Recovering CS:GO and League of Legends addict. Now mostly single-player games when life allows.</p>

        <div className="traits">
          <div>
            <div className="trait-icon">
              <svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="white" strokeWidth="1.5" /><circle cx="7" cy="7" r="2" fill="white" /></svg>
            </div>
            <div className="trait-label">Growth Mindset</div>
            <div className="trait-sub">Reps over raw talent</div>
          </div>
          <div>
            <div className="trait-icon">
              <svg viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="10" height="10" stroke="white" strokeWidth="1.5" /><rect x="5" y="5" width="4" height="4" fill="white" /></svg>
            </div>
            <div className="trait-label">Product First</div>
            <div className="trait-sub">Ideas worth building</div>
          </div>
          <div>
            <div className="trait-icon">
              <svg viewBox="0 0 14 14" fill="none"><path d="M2 12L7 2L12 12" stroke="white" strokeWidth="1.5" /><line x1="4" y1="9" x2="10" y2="9" stroke="white" strokeWidth="1" /></svg>
            </div>
            <div className="trait-label">Global Native</div>
            <div className="trait-sub">4 Countries, 3 Continents</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SKILLS STRIP
   ═══════════════════════════════════════════════════════ */
const skills = [
  { name: "Python", hl: true }, { name: "JavaScript", hl: true }, { name: "Next.js", hl: true },
  { name: "Claude AI", hl: true }, { name: "AWS", hl: true }, { name: "Supabase", hl: true },
  { name: "C# · C · Java", hl: false }, { name: "SQL", hl: false }, { name: "Cypress", hl: false },
  { name: "Git / GitHub", hl: false }, { name: "Tailwind CSS", hl: false },
  { name: "Agile / Scrum", hl: false }, { name: "Jira · Confluence", hl: false },
  { name: "Tech Strategy", hl: false }, { name: "Business Analysis", hl: false },
  { name: "Filipino · English", hl: false }, { name: "Ableton", hl: true },
  { name: "Music Production", hl: false }, { name: "Guitar", hl: false },
];

function SkillsStrip() {
  const tags = [...skills, ...skills];
  return (
    <div className="skills-strip-outer">
      <span className="skills-label">Skills &amp; Tools</span>
      <div className="skills-strip">
        <div className="skills-inner">
          {tags.map((s, i) => (
            <span key={i} className={`skill-tag${s.hl ? " highlight" : ""}`}>{s.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PROJECTS / WORKS
   ═══════════════════════════════════════════════════════ */
function Works({ onProject }: { onProject: (id: string) => void }) {
  return (
    <section className="works-section" id="works-section">
      <div className="works-header">
        <h2 className="works-title">PROJECTS</h2>
        <span className="works-count">Candor · PH Fintech · Provenance</span>
      </div>
      <div className="works-grid">
        {/* Candor */}
        <div className="work-card" onClick={() => onProject("candor")} style={{ position: "relative" }}>
          <div className="work-thumb">
            <div style={{ height: "100%", background: "var(--charcoal)", display: "flex", flexDirection: "column", gap: 0, padding: 20 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "6px 0" }}>
                  <div style={{ width: n === 1 || n === 4 ? 34 : n === 2 ? 40 : n === 3 ? 55 : 38, height: 5, background: n === 1 ? "var(--terracotta)" : n === 4 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.1)", flex: n === 1 || n === 4 ? "none" : undefined }} />
                  <div style={{ height: 4, background: "rgba(255,255,255,0.1)", flex: 1 }} />
                  <div style={{ width: 5, height: 5, background: "rgba(255,255,255,0.18)", borderRadius: "50%" }} />
                </div>
              ))}
            </div>
            <div className="coming-soon-overlay"><span className="coming-soon-badge">Coming Soon</span></div>
          </div>
          <div className="work-info">
            <div className="work-name">Candor</div>
            <p className="work-desc">The job tracker for deliberate applicants. Built with Next.js 14, Supabase &amp; Claude AI to force intentional applications over volume.</p>
            <button className="work-link">View Project</button>
          </div>
        </div>

        {/* PH Fintech */}
        <div className="work-card" style={{ position: "relative", cursor: "default" }}>
          <div className="work-thumb">
            <div style={{ height: "100%", background: "#18181a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <rect x="8" y="20" width="48" height="30" stroke="rgba(250,248,245,0.2)" strokeWidth="1" />
                <line x1="8" y1="32" x2="56" y2="32" stroke="rgba(250,248,245,0.1)" />
                <line x1="24" y1="20" x2="24" y2="50" stroke="rgba(250,248,245,0.08)" />
                <circle cx="32" cy="11" r="6" stroke="rgba(196,101,58,0.5)" strokeWidth="1" />
                <path d="M20 42 L28 36 L32 40 L40 30 L48 34" stroke="rgba(107,127,94,0.6)" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="coming-soon-overlay"><span className="coming-soon-badge">Coming Soon</span></div>
          </div>
          <div className="work-info">
            <div className="work-name">PH Fintech</div>
            <p className="work-desc">Regional payment infrastructure design for the Philippine market &mdash; simplifying cross-border transactions with low-friction UX.</p>
            <span className="work-link" style={{ opacity: 0.4, cursor: "default" }}>In Development</span>
          </div>
        </div>

        {/* Provenance */}
        <div className="work-card" onClick={() => onProject("provenance")} style={{ position: "relative" }}>
          <div className="work-thumb">
            <div style={{ height: "100%", background: "#e6e2da", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-end", padding: 18, gap: 6 }}>
              {[68, 50, 75].map((w, i) => (
                <div key={i}>
                  {i === 2 && <div style={{ height: 1, background: "rgba(44,44,42,0.1)", width: "100%", margin: "4px 0" }} />}
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <div style={{ height: 5, background: "rgba(44,44,42,0.12)", width: `${w}%` }} />
                    <div style={{ height: 5, background: i === 2 ? "rgba(196,101,58,0.35)" : "rgba(44,44,42,0.2)", width: 36 }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="coming-soon-overlay"><span className="coming-soon-badge">Coming Soon</span></div>
          </div>
          <div className="work-info">
            <div className="work-name">Provenance</div>
            <p className="work-desc">Ethical handmade marketplace with mandatory price breakdowns. Built to restore trust and transparency to artisan commerce in Australia.</p>
            <button className="work-link">View Project</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   EXPERIENCE + ACCOLADES
   ═══════════════════════════════════════════════════════ */
const experience = [
  { logo: "/images/logo_deloitte.png", year: "Jul 2025 → Present", org: "Deloitte", role: "Engineering, AI & Data Analyst", desc: "Working across data centre strategy and cloud migration engagements, contributing to business development and practice initiatives across a range of industries." },
  { logo: "/images/logo_ey.png", year: "Jan 2025 → Feb 2025", org: "Ernst & Young (EY)", role: "Technology Strategy Intern", desc: "Developed proposal documents for government projects and assisted in bid submissions, collaborating with stakeholders to deliver high-quality client deliverables aligned with procurement standards." },
  { logo: "/images/logo_moonward.png", year: "Jun 2024 → Jan 2025", org: "Moonward Apps", role: "Quality Assurance Tester", desc: "Hired for manual testing but taught myself Cypress outside of work hours to automate the testing process on each app being deployed. Went beyond the scope of the role because I could see it would ship products faster, and it did." },
  { logo: "/images/logo_deloitte2.png", year: "Nov 2023 → Feb 2024", org: "Deloitte", role: "Cloud, AI, Data & Engineering Intern", desc: "Supported senior consultants on technology strategy, analysed client feedback to create roadmaps, and designed technology radar graphs and service delivery models based on stakeholder input." },
  { logo: "/images/logo_180dc.png", year: "Jul 2023 → Nov 2023", org: "180 Degrees Consulting QUT", role: "Consulting Director", desc: "Led a team of 5 on a strategic project for a non-profit supporting veteran employment. Collaborated with KPMG mentors to redesign a hiring guide, boosting corporate engagement." },
  { logo: "/images/logo_paedix.png", year: "Mar 2023 → Oct 2023", org: "Paedix Paediatrics", role: "Digital Marketing & Data Intern", desc: "Built a centralised database of medical practitioners using Python and automated marketing efforts, increasing online presence and streamlining clinic operations." },
  { logo: "/images/logo_codecamp.png", year: "Dec 2021 → Oct 2023", org: "Code Camp", role: "Head Teacher", desc: "Instructed primary school students in computational thinking and interactive coding. Led curriculum delivery and classroom management for classes of up to 30 students." },
  { logo: "/images/logo_lifeshape.png", year: "Feb 2021 → Sep 2023", org: "LifeShape Clinic", role: "Client Services Representative", desc: "Managed client inquiries and appointments in collaboration with clinicians, supported clinic operations and marketing, and delivered customer service excellence in a healthcare setting." },
];

const accolades = [
  { name: "Marshall Intl. Case Competition", sub: "USC Marshall School · Los Angeles, USA · Feb 2025", rank: "2ND", rankClass: "", photos: ["/images/marshall_trophy.png", "/images/marshall_finals.png"], desc: "Represented QUT among 20 top global business schools at USC Marshall. Presented strategic solutions for Omaha Productions and InvestCloud under pressure." },
  { name: "Chulalongkorn Intl. Business Case", sub: "Bangkok, Thailand · May 2025 · Division 3rd", rank: "DIV. 3RD", rankClass: "olive", photos: ["/images/chula_team.png", "/images/chula_cert.png"], desc: "Placed 3rd in division at an international competition hosted by Chulalongkorn Business School, solving 8-hour and 24-hour cases for Phyathai Hospital and TOA Paint alongside teams from across Asia and beyond." },
  { name: "L'Oréal Brandstorm AU/NZ", sub: "National Finalist · Melbourne · May 2025", rank: "FINALIST", rankClass: "finalist", photos: ["/images/loreal_finals.png", "/images/loreal_team.png", "/images/loreal_presentation.png"], desc: "One of five national finalists from 150+ AU/NZ submissions. L'Oréal flew the team to Melbourne and covered accommodation to pitch Team HairPress — a men's beauty tech concept — directly to their senior executives at Melbourne HQ.", ytId: "qoLpjN__0fY" },
  { name: "AWS Certified Cloud Practitioner", sub: "CLF-C02", rank: "CERTIFIED", rankClass: "cert", photos: [], desc: "Certified in core AWS fundamentals — cloud concepts, security, architecture, pricing, and support models." },
];

function Experience({ onYT }: { onYT: (id: string) => void }) {
  return (
    <section className="exp-section" id="exp-section">
      <div>
        <p className="exp-label">03 / Experience</p>
        {experience.map((e, i) => (
          <div key={i} className="exp-item" style={i === experience.length - 1 ? { borderBottom: "none" } : undefined}>
            <div className="exp-logo-row">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="exp-logo" src={e.logo} alt={`${e.org} logo`} />
              <div>
                <div className="exp-year">{e.year}</div>
                <div className="exp-org">{e.org}</div>
                <div className="exp-role">{e.role}</div>
              </div>
            </div>
            <div className="exp-desc"><p>{e.desc}</p></div>
          </div>
        ))}
      </div>
      <div>
        <p className="exp-label">04 / Recognition</p>
        {accolades.map((a, i) => (
          <div key={i} className="accolade-item" style={i === accolades.length - 1 ? { borderBottom: "none" } : undefined}>
            <div className="accolade-top">
              <div>
                <div className="accolade-name">{a.name}</div>
                <div className="accolade-sub">{a.sub}</div>
              </div>
              <div
                className="accolade-rank"
                style={{
                  color: a.rankClass === "olive" ? "var(--olive)" : a.rankClass === "cert" ? "var(--olive)" : a.rankClass === "finalist" ? "var(--terracotta)" : undefined,
                  fontSize: a.rankClass === "finalist" || a.rankClass === "olive" || a.rankClass === "cert" ? "0.68rem" : undefined,
                  letterSpacing: a.rankClass ? "0.06em" : undefined,
                  fontWeight: 700,
                }}
              >
                {a.rank}
              </div>
            </div>
            {a.photos.length > 0 && (
              <div className="accolade-photos">
                {a.photos.map((p, j) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={j} src={p} alt={`${a.name} photo`} />
                ))}
                {a.ytId && (
                  <div className="yt-thumb" onClick={() => onYT(a.ytId!)} title="Watch HairPress Video">
                    <div className="yt-thumb-inner">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`https://img.youtube.com/vi/${a.ytId}/mqdefault.jpg`} alt="HairPress submission video" style={{ height: 160, width: "auto", objectFit: "cover", border: "1px solid var(--outline)", display: "block" }} />
                      <div className="yt-play-overlay">
                        <svg viewBox="0 0 24 24" fill="white" width="32" height="32"><polygon points="5,3 19,12 5,21" /></svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="accolade-desc"><p>{a.desc}</p></div>
          </div>
        ))}
        <div className="testimonial-block">
          <p className="testimonial-text">&ldquo;Matthew brings a rare combination of structural thinking and technical curiosity.&rdquo;</p>
          <p className="testimonial-by">&mdash; Project Director, Deloitte AI</p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MUSIC PLAYER
   ═══════════════════════════════════════════════════════ */
function MusicSection() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    const b = Array.from({ length: 80 }, () => 20 + Math.random() * 80);
    setBars(b);
  }, []);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) { a.play(); setPlaying(true); } else { a.pause(); setPlaying(false); }
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onMeta = () => setDuration(a.duration);
    const onTime = () => setCurrentTime(a.currentTime);
    const onEnd = () => setPlaying(false);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const playedBars = duration ? Math.floor((currentTime / duration) * bars.length) : 0;

  return (
    <section className="music-section" id="music-section">
      <div className="music-inner">
        <div>
          <p className="section-label">05 / Beyond the Brief</p>
          <h2 className="music-title">Outside the 9-to-5.</h2>
          <p className="music-sub">
            The same instinct that draws me to building products pulls me toward making music. I picked up Ableton the same way I approach most things I&apos;m bad at &mdash; by putting in the reps until something clicks. <em>Alone with You</em> is the first track I finished from scratch. Guitar is still a work in progress. The creating never stops.
          </p>
          <div className="music-tags">
            <span className="music-tag">Ableton Live</span>
            <span className="music-tag">Guitar</span>
            <span className="music-tag">Running &amp; Soccer</span>
            <span className="music-tag">Reading</span>
          </div>
        </div>
        <div>
          <div className="music-player">
            <div style={{ marginBottom: "1.5rem" }}>
              <span className="player-title">Alone with You</span>
              <span className="player-artist">Matthew Huehne</span>
            </div>
            <div className="player-waveform">
              <div className="waveform-bars">
                {bars.map((h, i) => (
                  <span key={i} style={{ height: `${h}%` }} className={i < playedBars ? "played" : ""} />
                ))}
              </div>
            </div>
            <div className="player-time-row">
              <span className="player-time">{fmt(currentTime)}</span>
              <input
                type="range"
                className="player-seek"
                value={currentTime}
                min={0}
                max={duration || 100}
                step={0.1}
                onChange={(e) => {
                  if (audioRef.current) audioRef.current.currentTime = Number(e.target.value);
                }}
              />
              <span className="player-time">{fmt(duration)}</span>
            </div>
            <div className="player-btn-row">
              <button className="player-play" onClick={toggle}>
                {playing ? (
                  <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="3" width="4" height="18" /><rect x="14" y="3" width="4" height="18" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
                )}
              </button>
              <span className="player-label">{playing ? "Now playing" : "Play preview"}</span>
            </div>
            <audio ref={audioRef} src="/audio/alone_with_you.mp3" preload="metadata" />
          </div>
          <p className="music-note">More tracks in progress. Creating is the hobby that feels least like a hobby.</p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CTA + CONTACT FORM
   ═══════════════════════════════════════════════════════ */
function ContactCTA() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      // TODO: Replace with your Formspree form ID from https://formspree.io
      await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setSent(true);
      form.reset();
    } catch {
      // Fallback to mailto
      const name = data.get("name") as string;
      const email = data.get("email") as string;
      const msg = data.get("message") as string;
      window.location.href = `mailto:huehnematthew8@gmail.com?subject=${encodeURIComponent(`Portfolio enquiry from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`)}`;
    }
    setSubmitting(false);
  };

  return (
    <>
      <div className="cta-block" id="contact-section">
        <div className="cta-inner">
          <div>
            <h2 className="cta-headline">LET&apos;S<br />BUILD.</h2>
          </div>
          <div>
            <p className="cta-sub">Open to ambitious roles in AI, product, and engineering. Based in Brisbane &mdash; willing to relocate for the right opportunity.</p>
            <div className="cta-email"><a href="mailto:huehnematthew8@gmail.com">huehnematthew8@gmail.com</a></div>
            <div className="cta-socials">
              <a className="cta-social" href="https://linkedin.com/in/matthewhuehne" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="cta-social" href="https://github.com/Huehnematthew8" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="cta-social" href="https://leetcode.com/u/huehnem" target="_blank" rel="noopener noreferrer">LeetCode</a>
            </div>
          </div>
        </div>
      </div>

      <section className="contact-form-section">
        <div className="form-grid">
          <div>
            <p className="section-label">06 / Get in Touch</p>
            <h2 className="form-heading">Let&apos;s talk.</h2>
            <p className="form-sub">A role, a collab, a project, or just a good conversation &mdash; fill in the form and it goes straight to me.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label className="form-label">Your Name</label>
              <input className="form-input" type="text" name="name" placeholder="Jane Smith" required />
            </div>
            <div className="form-field">
              <label className="form-label">Your Email</label>
              <input className="form-input" type="email" name="email" placeholder="jane@example.com" required />
            </div>
            <div className="form-field">
              <label className="form-label">Message</label>
              <textarea className="form-textarea" name="message" placeholder="What's on your mind?" required />
            </div>
            <button className="form-submit" type="submit" disabled={submitting}>
              {submitting ? "Sending..." : "Send Message →"}
            </button>
            {sent && (
              <p style={{ fontFamily: "var(--nr)", fontStyle: "italic", color: "var(--olive)", marginTop: "1rem", fontSize: "0.95rem" }}>
                Message sent — I&apos;ll be in touch soon.
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div>
          <div className="footer-logo">MATTHEW HUEHNE</div>
          <div className="footer-copy">&copy; 2026</div>
        </div>
        <div className="footer-links">
          <span className="footer-built">Built with Claude &amp; Cursor</span>
          <a href="https://linkedin.com/in/matthewhuehne" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/Huehnematthew8" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   PROJECT: CANDOR
   ═══════════════════════════════════════════════════════ */
function CandorPage({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div>
      <div className="project-hero">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <span className="project-badge">Coming Soon</span>
          <span className="project-year">2024</span>
        </div>
        <div className="project-grid">
          <div>
            <h1 className="project-title fade-up">Candor</h1>
            <p className="project-tagline fade-up delay-1">&ldquo;The job tracker for people who apply with intention, not volume.&rdquo;</p>
          </div>
          <div className="project-meta fade-up delay-2">
            <p className="project-meta-label">Technologies</p>
            <p className="project-meta-value">Next.js 14, Supabase,<br />Tailwind CSS, Claude AI</p>
            <p className="project-meta-label">Type</p>
            <p className="project-meta-value">Full-stack SaaS, Solo build</p>
          </div>
        </div>
      </div>

      {/* Mockup hero image */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 3rem 5rem" }}>
        <div style={{ aspectRatio: "21/9", background: "var(--charcoal)", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "36px 56px", gap: 10 }}>
          <div style={{ display: "flex", gap: 20, marginBottom: 6 }}>
            {["Status", "Company", "Role", "Fit Score"].map((h) => (
              <div key={h} style={{ width: h === "Status" ? 64 : h === "Fit Score" ? 70 : h === "Role" ? 120 : undefined, flex: h === "Company" ? 1 : undefined, fontFamily: "var(--sg)", fontSize: "0.48rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(250,248,245,0.25)" }}>{h}</div>
            ))}
          </div>
          <div style={{ height: 1, background: "rgba(250,248,245,0.05)", marginBottom: 2 }} />
          {[
            { status: "Interviewing", bg: "var(--terracotta)", company: "Deloitte - AI Strategy", role: "Analyst, Data & AI", score: "9.4", scoreColor: "var(--terracotta)" },
            { status: "Applied", bg: "rgba(107,127,94,0.75)", company: "Atlassian - Growth", role: "Product Manager", score: "7.8", scoreColor: "var(--olive)" },
            { status: "Draft", bg: "rgba(250,248,245,0.08)", company: "Canva - Design Platform", role: "Strategy Analyst", score: "-", scoreColor: "rgba(250,248,245,0.25)" },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", gap: 20, alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(250,248,245,0.05)" }}>
              <div style={{ width: 64 }}>
                <span style={{ fontFamily: "var(--sg)", fontSize: "0.48rem", textTransform: "uppercase" as const, background: row.bg, color: row.status === "Draft" ? "rgba(250,248,245,0.45)" : "white", padding: "2px 6px", letterSpacing: "0.05em" }}>{row.status}</span>
              </div>
              <div style={{ flex: 1, fontFamily: "var(--nr)", fontStyle: "italic", fontSize: "0.68rem", color: "rgba(250,248,245,0.65)" }}>{row.company}</div>
              <div style={{ width: 120, fontFamily: "var(--sg)", fontSize: "0.6rem", color: "rgba(250,248,245,0.38)" }}>{row.role}</div>
              <div style={{ width: 70, fontFamily: "var(--sg)", fontSize: "0.68rem", color: row.scoreColor, fontWeight: 600 }}>{row.score}</div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 20, alignItems: "center", padding: "7px 0" }}>
            <div style={{ width: 64 }} />
            <div style={{ flex: 1, fontFamily: "var(--sg)", fontSize: "0.52rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "rgba(250,248,245,0.18)" }}>+ Add new application</div>
          </div>
        </div>
      </div>

      <section className="narrative-section">
        <div><p className="narrative-sticky">The Observation</p></div>
        <div className="narrative-body">
          <p>Job searching in 2024 has become a war of attrition. Most tools encourage the <em>Spray and Pray</em> method &mdash; tracking hundreds of low-quality touches. The middle of the search &mdash; the actual tracking and nurturing of real intent &mdash; is broken.</p>
          <p className="muted">I built Candor as a counter-position to tools like Teal. While they gamify application count, Candor forces a pause. It&apos;s for the deliberate professional who knows that one meaningful conversation is worth more than fifty automated &ldquo;Easy Apply&rdquo; clicks. Every entry requires you to answer: <em>&ldquo;Why this role?&rdquo;</em></p>
        </div>
      </section>

      <section className="bento-section">
        <div className="bento-grid">
          <div className="bento-card cream">
            <div className="bento-icon">
              <svg viewBox="0 0 36 36" fill="none"><rect x="4" y="6" width="28" height="24" stroke="var(--charcoal)" strokeWidth="1.5" /><line x1="4" y1="14" x2="32" y2="14" stroke="var(--charcoal)" strokeWidth="1" /><line x1="12" y1="6" x2="12" y2="30" stroke="var(--charcoal)" strokeWidth="0.75" /></svg>
            </div>
            <div>
              <h3 className="bento-card-title">&ldquo;Why this role?&rdquo;</h3>
              <p className="bento-card-body">A required field for every entry. If you can&apos;t articulate why in two sentences, it&apos;s probably not the right role. Forces clarity before a single word of cover letter is written.</p>
            </div>
          </div>
          <div className="bento-card terracotta">
            <div className="bento-icon">
              <svg viewBox="0 0 36 36" fill="none"><polyline points="4,28 12,18 18,22 26,10 32,14" stroke="white" strokeWidth="1.5" /><circle cx="32" cy="14" r="2" fill="white" /></svg>
            </div>
            <div>
              <h3 className="bento-card-title">Personalisation Scores</h3>
              <p className="bento-card-body">An algorithmic nudge that weights roles based on cultural alignment and skill-overlap &mdash; not just salary or title. Built using the Claude AI API.</p>
            </div>
          </div>
          <div className="bento-card high">
            <div className="bento-icon">
              <svg viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="12" stroke="var(--charcoal)" strokeWidth="1.5" /><circle cx="18" cy="18" r="6" stroke="var(--charcoal)" strokeWidth="1" /><circle cx="18" cy="18" r="2" fill="var(--charcoal)" /></svg>
            </div>
            <div>
              <h3 className="bento-card-title">&ldquo;My Story&rdquo; Profile</h3>
              <p className="bento-card-body">Beyond the resume. A dedicated space for personal narratives linking past experiences to future goals &mdash; fed into the AI audit as context.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="build-section">
        <div><p className="narrative-sticky">The Build</p></div>
        <div className="build-body">
          <h3 className="build-heading">Building with AI as a Peer</h3>
          <p>This project was a deep dive into the <em>Claude + Cursor</em> workflow &mdash; treating the LLM not as a code generator, but as a technical architect. The first three hours were spent debating Supabase schema design and Row Level Security policies before a single line of React was written.</p>
          <p>The biggest challenge was state management for the &ldquo;Why this role?&rdquo; modal &mdash; ensuring zero latency between the user&apos;s reflection and the database save. Solved using optimistic UI updates in Next.js 14, making every intention feel instantaneous. Cypress was used throughout for automated regression testing.</p>
          <div className="divider" />
          <div className="build-two-col">
            <div>
              <h4>Problem Solved</h4>
              <p>&ldquo;Decoupling the &lsquo;Application&rsquo; from the &lsquo;Intent&rsquo;. Most databases lock these together &mdash; I built a schema that allows you to track intent before an application even exists.&rdquo;</p>
            </div>
            <div>
              <h4>Lesson Learned</h4>
              <p>&ldquo;The speed of thought is the primary UX metric. If the tool feels slower than your brain, you&apos;ll stop using it. Performance is a feature, not a polish.&rdquo;</p>
            </div>
          </div>
        </div>
      </section>

      <section className="roadmap-section">
        <div className="roadmap-block">
          <div><p className="roadmap-label">Roadmap</p></div>
          <ul className="roadmap-items">
            <li className="roadmap-item"><span className="roadmap-check">✓</span><div><p className="roadmap-item-title">Shipped: Intentional Submission Engine</p><p className="roadmap-item-sub">Core tracker with mandatory reflection blocks and Supabase persistence.</p></div></li>
            <li className="roadmap-item"><span className="roadmap-check">✓</span><div><p className="roadmap-item-title">Shipped: Supabase Auth &amp; Multi-tenant Isolation</p><p className="roadmap-item-sub">Secure per-user data with Row Level Security policies.</p></div></li>
            <li className="roadmap-item"><span className="roadmap-pending">◷</span><div><p className="roadmap-item-title">Next: AI-Powered &ldquo;Personalisation Audit&rdquo;</p><p className="roadmap-item-sub">Using Claude to score your CV against the job description, grounded in your &ldquo;My Story&rdquo; profile.</p></div></li>
          </ul>
        </div>
      </section>

      <div className="next-project" onClick={onNext}>
        <p className="next-project-label">Next Project</p>
        <p className="next-project-name">PROVENANCE</p>
      </div>
      <Footer />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PROJECT: PROVENANCE
   ═══════════════════════════════════════════════════════ */
function ProvenancePage({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div>
      <div className="project-hero">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <span className="project-badge" style={{ color: "var(--olive)", borderColor: "var(--olive)" }}>Coming Soon</span>
          <span className="project-year">2025</span>
        </div>
        <div className="project-grid">
          <div>
            <h1 className="project-title fade-up" style={{ fontSize: "clamp(2.8rem,7.5vw,6.5rem)" }}>PROVENANCE</h1>
            <p className="project-tagline fade-up delay-1">&ldquo;The marketplace where you know exactly what you&apos;re paying for.&rdquo;</p>
          </div>
          <div className="project-meta fade-up delay-2">
            <p className="project-meta-label">Tech Stack</p>
            <p className="project-meta-value">React.js, Tailwind, Claude</p>
            <p className="project-meta-label">Focus</p>
            <p className="project-meta-value">UX/UI, Transparency, FinTech</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 3rem 5rem" }}>
        <div style={{ aspectRatio: "21/9", background: "#d9d5ce", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <ellipse cx="60" cy="45" rx="28" ry="34" stroke="rgba(44,44,42,0.18)" strokeWidth="1" />
            <ellipse cx="60" cy="88" rx="40" ry="9" stroke="rgba(44,44,42,0.12)" strokeWidth="1" />
            <line x1="32" y1="45" x2="20" y2="88" stroke="rgba(44,44,42,0.1)" />
            <line x1="88" y1="45" x2="100" y2="88" stroke="rgba(44,44,42,0.1)" />
            <ellipse cx="60" cy="45" rx="12" ry="16" stroke="rgba(44,44,42,0.08)" strokeWidth="0.75" />
          </svg>
          <p style={{ fontFamily: "var(--nr)", fontStyle: "italic", fontSize: "0.7rem", color: "rgba(44,44,42,0.3)", letterSpacing: "0.04em" }}>Photography of Australian Ceramics / Place II</p>
        </div>
      </div>

      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "0 3rem 6rem", display: "grid", gridTemplateColumns: "4fr 7fr", gap: "4rem", columnGap: "6rem" }}>
        <div>
          <p className="section-label">01 / The Insight</p>
          <h3 style={{ fontFamily: "var(--sg)", fontWeight: 700, fontSize: "1.4rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}>The Friction<br />of Fairness.</h3>
        </div>
        <div>
          <p style={{ fontSize: "1.02rem", lineHeight: 1.72, marginBottom: "1.75rem" }}>
            The biggest barrier to purchasing high-end handmade goods isn&apos;t the price &mdash; it&apos;s the lack of context. In a world of mass-market dropshipping masquerading as &lsquo;handmade&rsquo; on platforms like Etsy, consumers have lost their price-value compass. The &lsquo;expensive&rsquo; just looks expensive, without explanation.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "0 0 5rem" }}>
        <div className="solution-bento">
          <div className="solution-main">
            <div style={{ fontFamily: "var(--sg)", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>02 / The Solution</div>
            <h3 style={{ fontFamily: "var(--sg)", fontWeight: 700, fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.65rem" }}>Mandatory Price Breakdowns</h3>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "var(--muted)", marginBottom: "1.5rem" }}>Every listing requires a verifiable breakdown. This shifts the narrative from &ldquo;Why is this expensive?&rdquo; to &ldquo;This is what quality costs.&rdquo;</p>
            <div className="mandate-list">
              {[
                { label: "Materials (Stoneware)", value: "$22.50" },
                { label: "Kiln Firing (3 Hours)", value: "$12.50" },
                { label: "Artisan Labour (4 hrs)", value: "$48.00" },
              ].map((r, i) => (
                <div key={i} className="mandate-row"><span className="mandate-label">{r.label}</span><span className="mandate-value">{r.value}</span></div>
              ))}
              <div className="mandate-row" style={{ borderBottom: "none" }}><span className="mandate-label" style={{ fontWeight: 600, color: "var(--charcoal)" }}>Total</span><span className="mandate-value" style={{ color: "var(--terracotta)" }}>$83.00</span></div>
            </div>
          </div>
          <div className="solution-right">
            <div className="solution-right-top">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" style={{ marginBottom: "auto", display: "block" }}><circle cx="15" cy="15" r="11" stroke="rgba(250,248,245,0.65)" strokeWidth="1.5" /><path d="M9 15l4 4 8-8" stroke="rgba(250,248,245,0.85)" strokeWidth="1.5" /></svg>
              <div style={{ marginTop: "2.5rem" }}><div className="bento-card-title">Handmade Verification</div><p className="bento-card-body" style={{ fontSize: "0.85rem" }}>Rigorous certification for Australian makers. No reselling, no bulk factory imports. Ever.</p></div>
            </div>
            <div className="solution-right-bottom">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" style={{ marginBottom: "auto", display: "block" }}><path d="M7 26L15 4L23 26" stroke="rgba(250,248,245,0.7)" strokeWidth="1.5" /><circle cx="15" cy="4" r="2.5" fill="rgba(250,248,245,0.5)" /></svg>
              <div style={{ marginTop: "2.5rem" }}><div className="bento-card-title">Australia First</div><p className="bento-card-body" style={{ fontSize: "0.85rem" }}>Initial focus on Victorian and NSW ceramic and jewellery makers.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "0 3rem 5rem" }}>
        <p className="section-label" style={{ marginBottom: "2.5rem" }}>04 / The Roadmap</p>
        <div className="prov-roadmap-grid">
          {[
            { num: "01", title: "UX Design & Discovery", sub: "Refining the taxonomy of material costs and interviewing local makers in Melbourne and Sydney." },
            { num: "02", title: "Alpha Testing", sub: "Closed beta with 30 select ceramicists to test the breakdown transparency module and seller onboarding." },
            { num: "03", title: "Marketplace Launch", sub: "Full public rollout of the buyer marketplace across Australia." },
          ].map((r, i) => (
            <div key={i}>
              <div className="prov-roadmap-num">{r.num}</div>
              <div className="prov-roadmap-title">{r.title}</div>
              <p className="prov-roadmap-sub">{r.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="next-project" onClick={onNext}>
        <p className="next-project-label">Next Project</p>
        <p className="next-project-name">CANDOR</p>
      </div>
      <Footer />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   RESUME MODAL
   ═══════════════════════════════════════════════════════ */
function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="resume-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="resume-modal">
        <div className="resume-modal-header">
          <span className="resume-modal-title">Resume</span>
          <button className="resume-close" onClick={onClose}>&times;</button>
        </div>
        <iframe src="/resume.pdf" title="Resume" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   YOUTUBE MODAL
   ═══════════════════════════════════════════════════════ */
function YouTubeModal({ videoId, onClose }: { videoId: string | null; onClose: () => void }) {
  if (!videoId) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(44,44,42,0.9)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ width: "90vw", maxWidth: 800, aspectRatio: "16/9" }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          style={{ width: "100%", height: "100%", border: "none" }}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Video"
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════ */
export default function Home() {
  const [page, setPage] = useState<"home" | "candor" | "provenance">("home");
  const [resumeOpen, setResumeOpen] = useState(false);
  const [ytId, setYtId] = useState<string | null>(null);

  const showPage = (p: "home" | "candor" | "provenance") => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateTo = (id: string) => {
    if (page !== "home") setPage("home");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, page !== "home" ? 100 : 0);
  };

  return (
    <>
      <Nav onNavigate={navigateTo} onResume={() => setResumeOpen(true)} />

      {page === "home" && (
        <div>
          <Hero />
          <About />
          <SkillsStrip />
          <Works onProject={(id) => showPage(id as "candor" | "provenance")} />
          <Experience onYT={(id) => setYtId(id)} />
          <MusicSection />
          <ContactCTA />
          <Footer />
        </div>
      )}

      {page === "candor" && (
        <CandorPage onBack={() => showPage("home")} onNext={() => showPage("provenance")} />
      )}

      {page === "provenance" && (
        <ProvenancePage onBack={() => showPage("home")} onNext={() => showPage("candor")} />
      )}

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
      <YouTubeModal videoId={ytId} onClose={() => setYtId(null)} />
    </>
  );
}
