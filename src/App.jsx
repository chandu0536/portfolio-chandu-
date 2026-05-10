import React, { useState, useEffect, useRef } from 'react';
import './index.css';

// ── SCROLL HELPER ─────────────────────────────────────────────────────────────
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// ── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['home', 'about', 'skills', 'certifications', 'projects', 'resume', 'contact'];
  const labels = { home: 'Home', about: 'About Me', skills: 'Skills', certifications: 'Certificates', projects: 'Projects', resume: 'Resume', contact: 'Contact' };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo" onClick={() => scrollTo('home')}>
        <span>Port </span><span>Folio</span>
      </div>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {links.map(id => (
          <li key={id}>
            <a href={`#${id}`} className={activeSection === id ? 'active' : ''}
              onClick={e => { e.preventDefault(); scrollTo(id); setMenuOpen(false); }}>
              {labels[id]}
            </a>
          </li>
        ))}
      </ul>
      <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}

// ── FADE-UP ANIMATION ─────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible'); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`fade-up ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ── TYPING EFFECT ─────────────────────────────────────────────────────────────
function TypingText({ texts }) {
  const [displayed, setDisplayed] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    const delay = deleting ? 55 : 95;
    const timer = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setTimeout(() => setDeleting(true), 2000);
      } else if (deleting && charIdx > 0) {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else {
        setDeleting(false);
        setTextIdx(i => (i + 1) % texts.length);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, textIdx, texts]);

  return <span>{displayed}<span className="typing-cursor" /></span>;
}

// ── STAR RATING ───────────────────────────────────────────────────────────────
function StarRating({ rating, max = 5 }) {
  return (
    <div style={{ display: 'flex', gap: '4px', marginTop: '6px', alignItems: 'center' }}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} style={{
          fontSize: '0.95rem',
          color: i < rating ? '#f59e0b' : 'rgba(255,255,255,0.12)',
          filter: i < rating ? 'drop-shadow(0 0 4px rgba(245,158,11,0.55))' : 'none',
        }}>★</span>
      ))}
      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '5px' }}>{rating}/{max}</span>
    </div>
  );
}

// ── HOME SECTION ──────────────────────────────────────────────────────────────
function HomeSection() {
  return (
    <section id="home">
      <div className="hero-content">
        <FadeUp delay={0}><p className="hero-greeting">Hello, I'm</p></FadeUp>
        <FadeUp delay={100}><h1 className="hero-name">Chandra Kiran Gurugubelli</h1></FadeUp>
        <FadeUp delay={200}>
          <p className="hero-role-label">And I'm a</p>
          <p className="hero-role">
            <TypingText texts={['Web Developer', 'Data & AI Enthusiast', 'Frontend Developer']} />
          </p>
        </FadeUp>
        <FadeUp delay={300}>
          <p className="hero-desc">
            Passionate Frontend and Java Developer with knowledge in Java OOPs, SQL, Power BI,
            Firebase, and frontend development. Interested in building responsive web applications
            and modern software solutions.
          </p>
        </FadeUp>
        <FadeUp delay={400}>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => scrollTo('projects')}>View Projects</button>
            <button className="btn-outline" onClick={() => scrollTo('contact')}>Contact Me</button>
          </div>
        </FadeUp>
      </div>

      <div className="hero-image-wrapper">
        <div className="hero-image-blob" />
        <div className="hero-image-blob-outer" />
        <div className="hero-photo-placeholder" style={{ background: 'transparent', padding: 0 }}>
          <img src="/photo.jpeg" alt="Chandra Kiran" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
        </div>
        <div className="hero-glow-dot" />
      </div>
    </section>
  );
}

// ── ABOUT SECTION ─────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" style={{ background: 'transparent' }}>
      <div className="about-left">
        <FadeUp>
          <div className="about-image-wrapper">
            <div className="about-image-accent" />
            <div className="about-image-accent-br" />
            <div className="about-photo-placeholder" style={{ background: 'transparent', padding: 0 }}>
              <img src="/photo.jpeg" alt="Chandra Kiran" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px' }} />
            </div>
          </div>
        </FadeUp>
      </div>

      <div className="about-right">
        <FadeUp>
          <p className="section-label">Who I Am</p>
          <h2 className="section-title">About <span>Me</span></h2>
        </FadeUp>

        <FadeUp delay={100}>
          <div className="about-bio">
            <p>I am <strong style={{ color: '#fff' }}>Chandra Kiran Gurugubelli</strong>, a Computer Science graduate with a strong interest in frontend and Java development.</p>
            <p>I completed my B.Tech in Computer Science Engineering in 2024 from Nadimpalli Satyanarayana Raju Institute of Technology, Visakhapatnam.</p>
            <p>I have knowledge in Java OOPs, SQL, Power BI, Firebase, HTML, CSS, and JavaScript. I am passionate about software development, problem-solving, and improving my technical skills.</p>
            <p>My goal is to start my career in the IT industry and grow as a professional developer.</p>
          </div>
        </FadeUp>

        <FadeUp delay={150}>
          <div className="about-info-grid">
            <div className="about-info-item"><div className="about-info-label">Languages</div><div className="about-info-value">English, Telugu</div></div>
            <div className="about-info-item"><div className="about-info-label">Hobbies</div><div className="about-info-value">Chess, Badminton, Meditation</div></div>
            <div className="about-info-item"><div className="about-info-label">Location</div><div className="about-info-value">Visakhapatnam, India</div></div>
            <div className="about-info-item"><div className="about-info-label">Status</div><div className="about-info-value" style={{ color: '#4ade80' }}>Open to Work 🟢</div></div>
          </div>
        </FadeUp>

        <FadeUp delay={200}>
          <p className="section-label" style={{ marginBottom: '16px' }}>Education</p>
          <div className="education-list">
            <div className="edu-card">
              <div className="edu-year">2020 – 2024</div>
              <div className="edu-degree">B.Tech in Computer Science Engineering</div>
              <div className="edu-school">Nadimpalli Satyanarayana Raju Institute of Technology, Visakhapatnam</div>
            </div>
            <div className="edu-card">
              <div className="edu-year">2018 – 2020</div>
              <div className="edu-degree">Higher Secondary Education (MPC)</div>
              <div className="edu-school">NRI Junior College, Visakhapatnam</div>
            </div>
            <div className="edu-card">
              <div className="edu-year">Until 2017</div>
              <div className="edu-degree">Secondary School Education</div>
              <div className="edu-school">Bhashyam School, Visakhapatnam</div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ── SKILLS SECTION ────────────────────────────────────────────────────────────
function SkillsSection() {
  const skills = [
    { icon: '🗄️', name: 'SQL', category: 'Database', rating: 5 },
    { icon: '📊', name: 'Power BI', category: 'Data & Analytics', rating: 5 },
    { icon: '☕', name: 'Java OOPs', category: 'Backend', rating: 4 },
    { icon: '🔥', name: 'Firebase', category: 'Cloud & Backend', rating: 4 },
    { icon: '☁️', name: 'AWS', category: 'Cloud', rating: 4 },
    { icon: '🐙', name: 'Git & GitHub', category: 'Tools', rating: 4 },
    { icon: '⚛️', name: 'React.js', category: 'Frontend', rating: 4 },
    { icon: '🤖', name: 'AI Prompt Engineering', category: 'AI', rating: 4 },
  ];

  return (
    <section id="skills">
      <FadeUp>
        <p className="section-label">What I Know</p>
        <h2 className="section-title">My <span>Skills</span></h2>
      </FadeUp>
      <div className="skills-rated-grid">
        {skills.map((s, i) => (
          <FadeUp key={s.name} delay={i * 60}>
            <div className="skill-rated-card">
              <div className="skill-rated-top">
                <div className="skill-rated-icon">{s.icon}</div>
                <div>
                  <div className="skill-rated-name">{s.name}</div>
                  <div className="skill-rated-category">{s.category}</div>
                </div>
              </div>
              <StarRating rating={s.rating} />
              <div className="skill-bar-bg">
                <div className="skill-bar-fill" style={{
                  width: `${(s.rating / 5) * 100}%`,
                  background: s.rating === 5
                    ? 'linear-gradient(90deg,#f59e0b,#fbbf24)'
                    : 'linear-gradient(90deg,var(--accent-blue),var(--accent-blue-light))'
                }} />
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ── CERTIFICATE MODAL ─────────────────────────────────────────────────────────
function CertModal({ cert, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div className="lightbox-overlay" onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <div className="cert-modal-box" onClick={e => e.stopPropagation()} style={{
        position: 'relative', maxWidth: '900px', width: '100%',
        background: 'transparent', border: 'none', boxShadow: 'none'
      }}>
        <button className="lightbox-close" onClick={onClose} style={{
          position: 'absolute', top: '-40px', right: '0', background: 'transparent',
          border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer', zIndex: 10000
        }}>✕</button>
        {cert.img ? (
          <img src={cert.img} alt={cert.title} style={{ width: '100%', maxHeight: '85vh', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} />
        ) : (
          <div style={{ padding: '40px', background: '#222', color: '#fff', textAlign: 'center', borderRadius: '8px' }}>
            <h3>{cert.title}</h3>
            <p>Certificate image not available.</p>
          </div>
        )}
      </div>
    </div>
  );
}


// ── CERTIFICATIONS SECTION ────────────────────────────────────────────────────
function CertificationsSection() {
  const [lightbox, setLightbox] = useState(null);

  const certs = [
    { icon: '☁️', title: 'AMAZON WEB SERVICES INTERNSHIP', org: 'AWS Academy', desc: 'Successfully completed AWS Internship', date: '2023', color: '#f59e0b', img: '/certificates/aws.jpg' },
    { icon: '🗄️', title: 'SQL Server Course Completion Certificate', org: 'NareshIT — Naresh i Technologies (ISO 9001:2015)', desc: 'Successfully completed a course on SQL Server', date: 'Sep 2025 – Oct 2025', color: '#3b82f6', img: '/certificates/sql.jpeg' },
    { icon: '🌐', title: 'Industrial Internship – Full Stack Web Development Using Java', org: 'HMI Engineering Services (ID: HMES2023FSJ4480)', desc: 'Successfully completed with A+ Grade', date: '01 Aug – 10 Nov 2023', color: '#10b981', img: '/certificates/fullstack.jpeg' },
    { icon: '📊', title: 'Industrial Internship – Data Analytics & Snowflake', org: 'HMI Engineering Services (ID: HMIES2023DAS6691)', desc: 'Successfully completed with A+ Grade', date: '15 May – 08 Jul 2023', color: '#10b981', img: '/certificates/dataanalytics.jpeg' },
    { icon: '🏆', title: 'Certificate of Appreciation – Hack With Vizag Hackathon', org: 'Technical Club, Dept. of CSE, NSRIT with AICTE SPICES Scheme', desc: 'Awarded for contribution to organizing HackWithVizag, a 24-hour Hackathon', date: 'Nov 27–28, 2023', color: '#f59e0b', img: '/certificates/hackathon.jpeg' },
    { icon: '🤖', title: 'Certificate of Participation – IoT Workshop "NET-2022"', org: 'TOP Engineers / TOP International Educational Trust', desc: 'Participated in Workshop on IoT "NET-2022" at IIT Madras Research Park, Chennai', date: '28 Aug 2022', color: '#8b5cf6', img: '/certificates/iot.jpeg' },
    { icon: '🔧', title: 'Certificate of Participation – Automobile & IC Engines Workshop', org: 'Dept. of Mechanical Engineering, NSRIT in collaboration with A.B.M Group', desc: 'Roll No: 20NU1A0539 — Participated in Automobile & IC Engines workshop', date: '18–20 Feb 2021', color: '#ef4444', img: '/certificates/automobile.jpeg' },
  ];

  return (
    <section id="certifications" style={{ background: 'transparent' }}>
      {lightbox && <CertModal cert={lightbox} onClose={() => setLightbox(null)} />}
      <FadeUp>
        <p className="section-label">Achievements</p>
        <h2 className="section-title">Certifications & <span>Awards</span></h2>
      </FadeUp>
      <div className="certs-list">
        {certs.map((c, i) => (
          <FadeUp key={c.title} delay={i * 70}>
            <div className="cert-card" onClick={() => c.img && setLightbox(c)} style={{ cursor: 'pointer' }}>
              <div className="cert-image-thumb" style={{ width: '140px', height: '90px', borderRadius: '8px', overflow: 'hidden', border: `1.5px solid ${c.color}55`, flexShrink: 0 }}>
                {c.img ? (
                  <img src={c.img} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className="cert-icon" style={{ background: `${c.color}22`, width: '100%', height: '100%' }}>{c.icon}</div>
                )}
              </div>
              <div className="cert-body">
                <div className="cert-title">{c.title}</div>
                <div className="cert-org">{c.org}</div>
                <div className="cert-desc">{c.desc}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
                <div className="cert-date">{c.date}</div>
                <div className="cert-view-btn">👁 View</div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ── PROJECTS SECTION ──────────────────────────────────────────────────────────
function ProjectsSection() {
  const projects = [
    {
      icon: '🌐',
      type: 'Intern | Jul 2023 – Oct 2023 | HMI Engineering Services',
      title: 'Full Stack Web Development Internship',
      desc: 'Developed secure user authentication systems, designed responsive web pages, integrated SQL database for efficient data handling, ensured secure session management, and performed client-side & server-side validation.',
      tech: ['Java', 'HTML', 'CSS', 'SQL', 'JDBC', 'Servlets', 'JSP']
    },
    {
      icon: '🧪',
      type: 'Academic Project | 2024 | Machine Learning',
      title: 'Fetal Health Prediction Using Machine Learning',
      desc: 'ML-based web app predicting fetal health as Normal, Suspect, or Pathological. Applied EDA, data preprocessing, Random Forest, Logistic Regression, KNN, AdaBoost, CatBoost, SMOTE, Cross Validation & Hyperparameter Tuning. Built with Django for real-time prediction.',
      tech: ['Python', 'Django', 'Random Forest', 'CatBoost', 'Scikit-learn', 'Pandas', 'NumPy', 'Bootstrap', 'SQLite', 'SMOTE']
    },
    {
      icon: '💼',
      type: 'Personal Project | Present | React',
      title: 'Job Portal Platform with Resume Screening',
      desc: 'Full-stack job portal connecting job seekers with HR professionals. Features JWT auth, REST APIs via Node.js/Express, Firebase Firestore real-time sync, job search, resume upload, profile management, application tracking, and animated UI.',
      tech: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'Firebase Firestore', 'JWT', 'REST API', 'Axios', 'Multer']
    }
  ];

  return (
    <section id="projects">
      <FadeUp>
        <p className="section-label">What I've Built</p>
        <h2 className="section-title">My <span>Projects</span></h2>
      </FadeUp>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <FadeUp key={p.title} delay={i * 100}>
            <div className="project-card">
              <div className="project-card-header">
                <div className="project-icon">{p.icon}</div>
                <div>
                  <div className="project-card-title">{p.title}</div>
                  <div className="project-card-type">{p.type}</div>
                </div>
              </div>
              <div className="project-card-body">
                <p className="project-card-desc">{p.desc}</p>
                <div className="project-tech-tags">
                  {p.tech.map(t => <span key={t} className="project-tech-tag">{t}</span>)}
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ── RESUME SECTION ────────────────────────────────────────────────────────────
function ResumeSection() {
  return (
    <section id="resume" style={{ background: 'transparent' }}>
      <FadeUp>
        <p className="section-label">My Resume</p>
        <h2 className="section-title">Curriculum <span>Vitae</span></h2>
      </FadeUp>

      <div className="resume-container">
        <FadeUp delay={80}>
          <a href="/resume.pdf" download="Chandra_Kiran_Resume.pdf" className="resume-download-btn" target="_blank" rel="noopener noreferrer">
            ⬇️ &nbsp;Download Resume
          </a>
        </FadeUp>

        <FadeUp delay={140}>
          <div className="resume-section">
            <div className="resume-section-title">Education</div>
            <div className="education-list">
              <div className="edu-card"><div className="edu-year">2020 – 2024</div><div className="edu-degree">B.Tech – Computer Science Engineering</div><div className="edu-school">NSRIT, Visakhapatnam</div></div>
              <div className="edu-card"><div className="edu-year">2018 – 2020</div><div className="edu-degree">Higher Secondary (MPC)</div><div className="edu-school">NRI Junior College, Visakhapatnam</div></div>
              <div className="edu-card"><div className="edu-year">Until 2017</div><div className="edu-degree">Secondary School</div><div className="edu-school">Bhashyam School, Visakhapatnam</div></div>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={180}>
          <div className="resume-section">
            <div className="resume-section-title">Core Skills</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['Java OOPs', 'HTML5', 'CSS3', 'JavaScript', 'React.js', 'SQL', 'Power BI', 'Firebase', 'AWS', 'Git & GitHub', 'Django', 'Python'].map(s => (
                <span key={s} className="skill-tag">{s}</span>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ── CONTACT SECTION ───────────────────────────────────────────────────────────
function ContactSection() {
  const contacts = [
    { icon: '📧', label: 'Email', value: 'chandrakirengurugubelli@gmail.com', href: 'mailto:chandrakirengurugubelli@gmail.com' },
    { icon: '📱', label: 'Phone', value: '+91 9491212534', href: 'tel:+919491212534' },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/chandra-kiran-gurugubelli-7073b8266', href: 'https://www.linkedin.com/in/chandra-kiran-gurugubelli-7073b8266' },
    { icon: '📍', label: 'Location', value: 'Visakhapatnam, India', href: '#' },
  ];

  return (
    <section id="contact">
      <FadeUp>
        <p className="section-label">Get In Touch</p>
        <h2 className="section-title">Contact <span>Me</span></h2>
        <p className="contact-subtitle">
          I'm currently open to new opportunities. Whether you have a question or just want to say hi,
          feel free to reach out!
        </p>
      </FadeUp>
      <FadeUp delay={100}>
        <div className="contact-grid">
          {contacts.map(c => (
            <a key={c.label} href={c.href} className="contact-card" target="_blank" rel="noreferrer">
              <div className="contact-card-icon">{c.icon}</div>
              <div className="contact-card-label">{c.label}</div>
              <div className="contact-card-value">{c.value}</div>
            </a>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}

// ── BACKGROUND ANIMATION ──────────────────────────────────────────────────────
function BackgroundAnimation() {
  const [frameIndex, setFrameIndex] = useState(1);
  const totalFrames = 25;

  useEffect(() => {
    // Preload images for smooth animation
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const numStr = i.toString().padStart(3, '0');
      img.src = `/animation/ezgif-frame-${numStr}.jpg`;
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const x = e.clientX;
          const width = window.innerWidth;
          const percent = x / width; // 0.0 to 1.0

          let nextFrame = Math.ceil(percent * totalFrames);
          if (nextFrame < 1) nextFrame = 1;
          if (nextFrame > totalFrames) nextFrame = totalFrames;

          setFrameIndex(nextFrame);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const currentFrameStr = frameIndex.toString().padStart(3, '0');

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -5,
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      <img
        src={`/animation/ezgif-frame-${currentFrameStr}.jpg`}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.45, // Increased opacity to make it more visible
          transition: 'opacity 0.3s ease'
        }}
      />
      {/* Overlay gradient to blend the animation into the dark theme */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.7) 100%)'
      }} />
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'certifications', 'projects', 'resume', 'contact'];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <>
      <BackgroundAnimation />
      <Navbar activeSection={activeSection} />
      <main>
        <HomeSection />
        <AboutSection />
        <SkillsSection />
        <CertificationsSection />
        <ProjectsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <footer className="footer">
        <p><span>Chandra Kiran Gurugubelli</span></p>
      </footer>
    </>
  );
}
