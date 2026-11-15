import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import {
  Sun,
  Moon,
  ArrowUpRight,
  Menu,
  X,
  Palette,
  Code2,
  Search,
  Wrench,
  Database,
  Headphones,
  Check,
  Copy,
  Send,
  Sparkles,
  ArrowUp,
  Briefcase,
  GraduationCap,
  FileText,
  Expand,
  Award,
} from "lucide-react";
import {
  PROFILE,
  SERVICES_LIST,
  CAPABILITIES,
  PROJECTS,
  EXPERIENCES,
  EDUCATION_AND_HONORS,
} from "./data/portfolioData";
import {
  WhatsAppIcon,
  InstagramIcon,
  XIcon,
  LinkedInIcon,
} from "./components/SocialIcons";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "capabilities", label: "Services" },
  { id: "work", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const CAPABILITY_ICONS = {
  uiux: Palette,
  webdev: Code2,
  seo: Search,
  itsupport: Wrench,
  annotation: Database,
  support: Headphones,
};

const SOCIAL_ICONS = {
  whatsapp: WhatsAppIcon,
  instagram: InstagramIcon,
  x: XIcon,
  linkedin: LinkedInIcon,
};

const PROJECT_FILTERS = ["All", "UI/UX Design", "Web Development"];

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("cj-theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [activeFilter, setActiveFilter] = useState("All");
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [lightboxProject, setLightboxProject] = useState(null);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    service: SERVICES_LIST[0],
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("cj-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("cj-theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const sectionIds = ["hero", ...NAV_LINKS.map((n) => n.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PROFILE.whatsappDisplay);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const text = `Hello Confidence! 👋\n\n*Name:* ${formState.name}\n*Email:* ${formState.email}\n*Service Needed:* ${formState.service}\n\n*Message:*\n${formState.message}`;
    const encoded = encodeURIComponent(text);
    window.open(`${PROFILE.whatsappUrl}?text=${encoded}`, "_blank", "noopener,noreferrer");
    setFormStatus("Redirecting to WhatsApp with your service inquiry ready to send!");
    setTimeout(() => setFormStatus(""), 5000);
  };

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#09090B] dark:text-zinc-100 transition-colors duration-300 relative overflow-x-clip">
      {/* Scroll Progress Indicator */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 origin-left z-50"
      />

      {/* Floating Glass Navbar */}
      <header className="sticky top-4 z-40 px-4 sm:px-6">
        <nav className="mx-auto max-w-6xl rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/75 backdrop-blur-xl px-4 sm:px-6 py-3 shadow-sm flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5 group">
            <img
              src={PROFILE.profileImage}
              alt={PROFILE.shortName}
              className="h-9 w-9 rounded-xl object-cover object-top border border-zinc-200 dark:border-zinc-700 group-hover:scale-105 transition-transform"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div>
              <p className="text-sm font-semibold leading-none">{PROFILE.shortName}</p>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available for projects
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`relative px-3.5 py-2 text-sm font-medium rounded-xl transition-colors ${
                      isActive
                        ? "text-zinc-950 dark:text-white"
                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavPill"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-xl bg-zinc-100 dark:bg-zinc-800 -z-10"
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Toggle dark mode"
              className="h-9 w-9 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-800/70 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:border-emerald-500/50 transition-colors cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={darkMode ? "moon" : "sun"}
                  initial={{ rotate: -60, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 60, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  {darkMode ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            <a
              href={PROFILE.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-3.5 py-2 text-xs font-semibold hover:bg-emerald-600 dark:hover:bg-emerald-400 dark:hover:text-zinc-950 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              View CV
            </a>

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="md:hidden h-9 w-9 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mx-auto max-w-6xl mt-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl p-4 shadow-lg"
            >
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="pt-2 border-t border-zinc-200 dark:border-zinc-800 mt-1">
                  <a
                    href={PROFILE.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-emerald-600 dark:text-emerald-400"
                  >
                    <FileText className="w-4 h-4" />
                    View Full CV (Google Drive)
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10">
        {/* ================= HERO WITH PROFILE BACKGROUND & OVERLAY ================= */}
        <section
          id="hero"
          className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-10 sm:pt-14 pb-16"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl shadow-zinc-200/50 dark:shadow-black/50 min-h-[540px] sm:min-h-[600px] flex items-center">
            {/* Background Profile Image */}
            <img
              src={PROFILE.profileImage}
              alt="Confidence Joshua portrait background"
              className="absolute inset-0 w-full h-full object-cover object-top md:object-[80%_15%] scale-105"
            />

            {/* Sophisticated Layered Overlay for Crisp Contrast */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-zinc-50 via-zinc-50/92 to-zinc-50/45 dark:from-[#09090B] dark:via-[#09090B]/92 dark:to-[#09090B]/45"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-transparent to-zinc-50/30 dark:from-[#09090B] dark:via-transparent dark:to-[#09090B]/30"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-emerald-500/20 blur-[100px]"
            />

            {/* Hero Foreground Content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 max-w-2xl p-6 sm:p-12 lg:p-14 space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300/80 dark:border-zinc-700/80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono text-zinc-700 dark:text-zinc-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                {PROFILE.tagline}
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-extrabold tracking-tight leading-[1.08]">
                Good technology starts with a{" "}
                <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 bg-clip-text text-transparent">
                  well-understood problem.
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                I&apos;m <strong className="font-semibold text-zinc-950 dark:text-white">Confidence Joshua</strong>—my work sits where{" "}
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  design, development, and support
                </span>{" "}
                meet. I redesign web and mobile interfaces, build live websites, optimize SEO, and partner with IT solution teams.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 text-sm font-semibold shadow-md shadow-emerald-600/20 transition-all hover:-translate-y-0.5"
                >
                  Explore My Work
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/85 dark:bg-zinc-900/85 backdrop-blur-md px-5 py-3 text-sm font-semibold hover:border-emerald-500/60 transition-all hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-500" />
                  Hire / Message Me
                </a>
              </div>

              {/* Social Icons Strip */}
              <div className="pt-3 flex flex-wrap items-center gap-2.5">
                {PROFILE.socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.id];
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={`${social.label}: ${social.handle}`}
                      className={`h-10 px-3.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md inline-flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-200 transition-all hover:-translate-y-0.5 ${social.accent}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{social.label}</span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= MARQUEE ================= */}
        <div className="border-y border-zinc-200/80 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/40 py-3.5 overflow-hidden">
          <div className="animate-marquee flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            {[
              "UI/UX Design",
              "Web Development",
              "SEO Optimization",
              "IT Support",
              "Data Annotation",
              "Solar 3D Modeling",
              "Customer Support",
              "UI/UX Design",
              "Web Development",
              "SEO Optimization",
              "IT Support",
              "Data Annotation",
              "Solar 3D Modeling",
              "Customer Support",
            ].map((item, idx) => (
              <span key={idx} className="flex items-center gap-8 shrink-0">
                <span>{item}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
              </span>
            ))}
          </div>
        </div>

        {/* ================= ABOUT SECTION ================= */}
        <section id="about" className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-12 gap-8 items-start"
          >
            <div className="md:col-span-4">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                01 / About Me
              </span>
              <h2 className="text-3xl font-bold tracking-tight mt-2">
                Bridging users, interfaces & systems.
              </h2>
            </div>

            <div className="md:col-span-8 space-y-5">
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                As a Computer Science graduate, I believe good technology starts with a well-understood problem. My experience spans redesigning web and mobile app interfaces, building and managing live websites, optimizing SEO, and collaborating with cross-functional IT solution teams.
              </p>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Whether leading FinTech support teams, improving front-end user engagement by 25%, or building accurate 3D solar models from aerial imagery, I bring care, structure, and user empathy to every project.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                {[
                  { label: "Education", value: "HND & OND Computer Science" },
                  { label: "Impact", value: "+25% UX Engagement Lift" },
                  { label: "Recognition", value: "2× Team Leader of the Year" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 p-4"
                  >
                    <p className="text-xs font-mono text-zinc-500">{stat.label}</p>
                    <p className="text-sm font-semibold mt-1">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ================= CAPABILITIES BENTO GRID ================= */}
        <section
          id="capabilities"
          className="mx-auto max-w-6xl px-4 sm:px-6 py-20 border-t border-zinc-200/70 dark:border-zinc-800/70"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                02 / Services & Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2">
                What I Do
              </h2>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
              Where design craft, frontend engineering, and dependable support come together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {CAPABILITIES.map((cap, index) => {
              const Icon = CAPABILITY_ICONS[cap.id];
              return (
                <motion.div
                  key={cap.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className={`${cap.span} group rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 p-6 sm:p-7 transition-all hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-500/40`}
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="h-11 w-11 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[11px] text-zinc-500 border border-zinc-200 dark:border-zinc-800 rounded-full px-2.5 py-1">
                      {cap.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{cap.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">
                    {cap.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {cap.highlights.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ================= VISUAL PROJECTS SHOWCASE (UI/UX + WEB DEV) ================= */}
        <section
          id="work"
          className="mx-auto max-w-6xl px-4 sm:px-6 py-20 border-t border-zinc-200/70 dark:border-zinc-800/70"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                03 / Selected Projects
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2">
                UI/UX &amp; Web Development
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-fit">
              {PROJECT_FILTERS.map((filter) => {
                const active = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      active
                        ? "text-zinc-950 dark:text-white"
                        : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="workFilterPill"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-xl bg-white dark:bg-zinc-800 shadow-xs"
                      />
                    )}
                    <span className="relative z-10">{filter}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.article
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="group rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-900/75 overflow-hidden flex flex-col justify-between hover:border-emerald-500/50 transition-all hover:shadow-xl hover:shadow-emerald-500/5"
                >
                  <div>
                    {/* Project Image Preview */}
                    <div className="relative aspect-[16/10] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <button
                        type="button"
                        onClick={() => setLightboxProject(project)}
                        aria-label={`Preview ${project.title}`}
                        className="absolute top-3 right-3 h-8 w-8 rounded-lg bg-black/60 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-emerald-600"
                      >
                        <Expand className="w-4 h-4" />
                      </button>
                      <span className="absolute bottom-3 left-3 rounded-lg bg-black/65 text-white backdrop-blur-md px-2.5 py-1 text-[11px] font-mono">
                        {project.category}
                      </span>
                    </div>

                    {/* Text Body */}
                    <div className="p-6">
                      <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                        {project.subtitle}
                      </p>
                      <h3 className="text-lg font-bold mt-1">{project.title}</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2.5">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.link}
                      target={project.link === "#" ? undefined : "_blank"}
                      rel={project.link === "#" ? undefined : "noopener noreferrer"}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
                    >
                      {project.linkLabel}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* ================= EXPERIENCE & CV TIMELINE ================= */}
        <section
          id="experience"
          className="mx-auto max-w-6xl px-4 sm:px-6 py-20 border-t border-zinc-200/70 dark:border-zinc-800/70"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                04 / Curriculum Vitae
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2">
                Work Experience &amp; Education
              </h2>
            </div>

            <a
              href={PROFILE.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 dark:bg-emerald-500 text-white dark:text-zinc-950 px-4 py-2.5 text-xs font-semibold hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-colors w-fit"
            >
              <FileText className="w-4 h-4" />
              Open Full CV on Google Drive
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Work Timeline */}
            <div className="lg:col-span-8 space-y-5">
              {EXPERIENCES.map((exp, idx) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold">{exp.role}</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg w-fit">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2 mt-4">
                    {exp.highlights.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Education, Leadership & Awards + CV Card */}
            <div className="lg:col-span-4 space-y-5">
              <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 p-6 space-y-5">
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-lg font-bold">Education &amp; Recognitions</h3>
                </div>

                <div className="space-y-4">
                  {EDUCATION_AND_HONORS.map((item) => (
                    <div
                      key={item.title}
                      className="border-l-2 border-emerald-500/50 pl-3.5 py-0.5"
                    >
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {item.org}
                      </p>
                      <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                        {item.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prominent Google Drive CV Banner */}
              <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-indigo-500/10 p-6 space-y-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold">Want the complete resume?</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Click below to view or download my full CV directly on Google Drive.
                </p>
                <a
                  href={PROFILE.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-semibold py-3 px-4 text-sm hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Check My Full CV
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CONTACT SECTION (DIRECT TO WHATSAPP) ================= */}
        <section
          id="contact"
          className="mx-auto max-w-6xl px-4 sm:px-6 py-20 border-t border-zinc-200/70 dark:border-zinc-800/70"
        >
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  05 / Contact Me
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2">
                  Tell me what you&apos;re building.
                </h2>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed">
                  Select the service you need and send your brief—your message goes straight to my WhatsApp so I can respond quickly.
                </p>
              </div>

              {/* Direct WhatsApp Copy Card */}
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-zinc-500">WhatsApp Direct</p>
                    <p className="text-sm font-semibold">{PROFILE.whatsappDisplay}</p>
                  </div>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* Social Links with Icons */}
              <div className="space-y-2.5">
                {PROFILE.socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.id];
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/50 px-4 py-3 flex items-center justify-between transition-all ${social.accent}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500">{social.label}</p>
                          <p className="text-sm font-medium">{social.handle}</p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Interactive WhatsApp Contact Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleWhatsAppSubmit}
                className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-900/75 p-6 sm:p-8 shadow-sm space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="text-xs font-mono text-zinc-500 uppercase tracking-wider"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="e.g. Tunde Adeyemi"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-mono text-zinc-500 uppercase tracking-wider"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Service Selection Pills + Dropdown Sync */}
                <div className="space-y-2">
                  <label
                    htmlFor="service"
                    className="text-xs font-mono text-zinc-500 uppercase tracking-wider"
                  >
                    Select a Service
                  </label>
                  <select
                    id="service"
                    value={formState.service}
                    onChange={(e) =>
                      setFormState({ ...formState, service: e.target.value })
                    }
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    {SERVICES_LIST.map((srv) => (
                      <option key={srv} value={srv}>
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="text-xs font-mono text-zinc-500 uppercase tracking-wider"
                  >
                    Project or Problem Brief
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    placeholder="Share a quick overview of what you're building or how I can help..."
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 px-6 text-sm transition-colors cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Send Directly to My WhatsApp
                  <Send className="w-3.5 h-3.5" />
                </button>

                {formStatus && (
                  <p className="text-xs text-center font-mono text-emerald-600 dark:text-emerald-400">
                    {formStatus}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ================= IMAGE PREVIEW LIGHTBOX ================= */}
      <AnimatePresence>
        {lightboxProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxProject(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl"
            >
              <button
                onClick={() => setLightboxProject(null)}
                aria-label="Close preview"
                className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src={lightboxProject.image}
                alt={lightboxProject.title}
                className="w-full max-h-[75vh] object-contain bg-zinc-950"
              />
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white">
                <div>
                  <h4 className="font-bold text-base">{lightboxProject.title}</h4>
                  <p className="text-xs text-zinc-400">{lightboxProject.subtitle}</p>
                </div>
                <a
                  href={lightboxProject.link}
                  target={lightboxProject.link === "#" ? undefined : "_blank"}
                  rel={lightboxProject.link === "#" ? undefined : "noopener noreferrer"}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 text-zinc-950 px-4 py-2 text-xs font-semibold hover:bg-emerald-400 transition-colors w-fit"
                >
                  {lightboxProject.linkLabel}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-10 border-t border-zinc-200 dark:border-zinc-800/80 py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            © {new Date().getFullYear()} {PROFILE.fullName}. 
          </p>

          <div className="flex items-center gap-4">
            {PROFILE.socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.id];
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="hover:text-emerald-500 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
            <a
              href="#hero"
              className="inline-flex items-center gap-1 font-mono hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors ml-2"
            >
              Top
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}