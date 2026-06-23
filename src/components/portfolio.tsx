"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Reveal, TextReveal, Magnetic, Counter, ParallaxY } from "@/components/motion-primitives";

const SECTIONS = [
  { id: "home", label: "/home" },
  { id: "aboutme", label: "/home/aboutme" },
  { id: "experience", label: "/home/experience" },
  { id: "certificate", label: "/home/certificate" },
  { id: "projects", label: "/home/projects" },
  { id: "mykills", label: "/home/mykills" },
  { id: "contact", label: "/home/contact" },
];

/* ---------------- NAVBAR ---------------- */
function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const current = SECTIONS.find((s) => s.id === active)?.label ?? "/home";

  return (
    <header className="fixed left-0 right-0 top-0 z-[120] px-4 pt-4 md:px-6 md:pt-6">
      <nav className="brutal-border brutal-shadow mx-auto flex max-w-6xl items-center justify-between bg-background px-4 py-3 md:px-6">
        <a href="#home" className="font-display text-xl md:text-2xl">
          wikidotexe<span className="text-muted-foreground">.</span>
        </a>
        <div className="hidden items-center gap-2 font-mono-x text-xs md:flex">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-foreground" />
          <span className="opacity-70">{current}</span>
        </div>
        <div className="hidden items-center gap-5 text-sm font-medium md:flex">
          {SECTIONS.slice(1).map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="relative capitalize transition-opacity hover:opacity-60"
            >
              {s.id}
              {active === s.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-foreground"
                />
              )}
            </a>
          ))}
        </div>
        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="brutal-border flex h-9 w-9 items-center justify-center md:hidden"
        >
          <div className="space-y-1">
            <span className="block h-0.5 w-4 bg-foreground" />
            <span className="block h-0.5 w-4 bg-foreground" />
          </div>
        </button>
      </nav>
      {open && (
        <div className="brutal-border brutal-shadow mx-auto mt-2 max-w-6xl bg-background p-4 md:hidden">
          {SECTIONS.slice(1).map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className="block border-b border-foreground/10 py-3 font-mono-x text-sm capitalize last:border-0"
            >
              {s.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function PathTag({ path }: { path: string }) {
  return (
    <div className="mb-6 inline-flex items-center gap-2 font-mono-x text-xs uppercase tracking-widest text-muted-foreground">
      <span className="h-px w-8 bg-foreground/40" />
      <span>{path}</span>
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const wrap = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const ok = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!ok) return;
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX - w / 2) / w);
      my.set((e.clientY - h / 2) / h);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const tx1 = useTransform(smx, (v) => v * 30);
  const ty1 = useTransform(smy, (v) => v * 30);
  const tx2 = useTransform(smx, (v) => v * -60);
  const ty2 = useTransform(smy, (v) => v * -60);

  return (
    <section id="home" ref={wrap} className="relative min-h-screen overflow-hidden pt-32 md:pt-40">
      {/* Floating shapes */}
      <motion.div
        style={{ x: tx2, y: ty2 }}
        className="pointer-events-none absolute left-[8%] top-[28%] hidden md:block"
      >
        <div className="brutal-border h-16 w-16 rotate-12 bg-foreground" />
      </motion.div>
      <motion.div
        style={{ x: tx1, y: ty1 }}
        className="pointer-events-none absolute right-[10%] top-[22%] hidden md:block"
      >
        <div className="brutal-border h-24 w-24 rounded-full bg-background brutal-shadow" />
      </motion.div>
      <motion.div
        style={{ x: tx2, y: ty1 }}
        className="pointer-events-none absolute bottom-[18%] right-[16%] hidden md:block"
      >
        <div className="font-display text-6xl">★</div>
      </motion.div>

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <PathTag path="/home — currently online" />

        <ParallaxY range={40}>
          <h1 className="font-display text-[18vw] leading-[1.1] md:text-[10vw] md:leading-[0.9]">
            <span className="block">
              <TextReveal text="Dwiki" />
            </span>
            <ParallaxY range={-30} className="md:ml-[6vw]">
              <span className="block text-outline">
                <TextReveal text="Arlian" />
              </span>
            </ParallaxY>
            <ParallaxY range={20} className="md:ml-[14vw]">
              <span className="block">
                <TextReveal text="Maulana." />
              </span>
            </ParallaxY>
          </h1>
        </ParallaxY>

        <div className="mt-10 grid gap-8 md:mt-16 md:grid-cols-[1.2fr_1fr] md:items-end">
          <Reveal delay={0.3}>
            <p className="max-w-xl text-lg md:text-xl">
              <span className="brutal-border bg-foreground px-2 py-0.5 text-background">
                IT Support
              </span>{" "}
              & <span className="font-display italic">System Engineer</span> with 6 years untangling
              networks, servers, and the occasional cursed printer.
            </p>
          </Reveal>

          <Reveal delay={0.5} className="flex flex-wrap items-center gap-4 md:justify-end">
            <Magnetic strength={0.4}>
              <a
                href="#projects"
                className="brutal-border brutal-shadow inline-flex items-center gap-2 bg-foreground px-6 py-4 font-display text-lg text-background transition-transform hover:translate-x-1 hover:translate-y-1 hover:[box-shadow:none]"
              >
                See What I Do <span aria-hidden>→</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href="#contact"
                className="brutal-border inline-flex items-center gap-2 bg-background px-6 py-4 font-display text-lg transition-colors hover:bg-foreground hover:text-background"
              >
                Say Hi
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal delay={0.8} className="mt-20 grid grid-cols-3 gap-4 md:mt-28">
          {[
            { n: 5, s: "+", l: "Years in IT" },
            { n: 30, s: "+", l: "Systems shipped" },
            { n: 99, s: "%", l: "Uptime obsession" },
          ].map((it) => (
            <div key={it.l} className="brutal-border bg-background p-4 md:p-6">
              <div className="font-display text-4xl md:text-6xl">
                <Counter to={it.n} suffix={it.s} />
              </div>
              <div className="mt-2 font-mono-x text-xs uppercase tracking-wider text-muted-foreground">
                {it.l}
              </div>
            </div>
          ))}
        </Reveal>

        <div className="mt-20 flex items-center gap-3 font-mono-x text-xs uppercase tracking-widest text-muted-foreground">
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            ↓
          </motion.span>
          scroll
        </div>
      </div>
    </section>
  );
}

/* ---------------- MARQUEE ---------------- */
function Marquee({ items }: { items: string[] }) {
  const row = (
    <div className="marquee-track">
      {items.map((it, i) => (
        <span key={i} className="font-display text-6xl md:text-8xl">
          {it} <span className="text-outline">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee border-y-2 border-foreground bg-background py-6">
      {row}
      {row}
    </div>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  return (
    <section id="aboutme" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <PathTag path="/home/aboutme" />
        <Reveal>
          <h2 className="font-display text-6xl leading-[0.9] md:text-8xl">
            About <span className="text-outline italic">me</span>.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 md:mt-20 md:grid-cols-[1fr_1.3fr] md:gap-16">
          <Reveal>
            <ParallaxY range={30}>
              <div className="brutal-border brutal-shadow-lg relative overflow-hidden bg-background">
                <img
                  src="/portrait.jpg"
                  alt="Dwiki Arlian Maulana"
                  className="aspect-[4/5] w-full object-cover grayscale"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-foreground px-4 py-2 font-mono-x text-xs text-background">
                  <span>dwiki.jpg</span>
                  <span>2026</span>
                </div>
              </div>
            </ParallaxY>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="space-y-6 text-lg md:text-xl">
              <p>
                Hey, I'm <span className="font-display font-bold">Dwiki</span> — based in Indonesia,
                fluent in blinking router lights and stubborn Linux servers.
              </p>
              <p className="text-muted-foreground">
                For the last 6 years I've been the person teams call when nothing works. I plan,
                build, and babysit infrastructure so the rest of the company can pretend IT is
                magic. Bash scripts at sunrise, ticket triage at noon, network diagrams at midnight.
              </p>
              <p className="text-muted-foreground">
                Currently obsessed with automating boring things, observability stacks, and that
                satisfying
                <span className="brutal-border mx-1 inline-block bg-foreground px-2 py-0.5 text-sm text-background">
                  green dashboard
                </span>
                feeling.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Jakarta, ID", "Available", "Open to remote"].map((t) => (
                  <span key={t} className="brutal-border px-3 py-1 font-mono-x text-xs uppercase">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- EXPERIENCE ---------------- */
const EXPERIENCE = [
  {
    role: "IT Support & System",
    company: "Saff & Co.",
    time: "2025 — Now",
    desc: "Managed network infrastructure, server configurations, and end-user systems across multiple locations. Deployed VPN and firewall solutions, maintained private cloud environments, and provided on-site and remote technical support for business operations.",
    tags: [
      "Synology",
      "Linux",
      "Rustdesk",
      "Network",
      "OpenVPN",
      "Docker",
      "Shopify",
      "Cloudflare",
      "Nginx",
      "Unifi",
      "Laravel",
      "Mysql",
      "Policy Based Route",
      "Port Forwarding",
      "CI/CD",
      "NextJS",
      "SSL/TLS",
    ],
  },
  {
    role: "IT Support",
    company: "BLP Beauty",
    time: "2021 — 2025",
    desc: "Managed network infrastructure, server configurations, and end-user systems across multiple locations. Deployed VPN and firewall solutions, maintained private cloud environments, and provided on-site and remote technical support for business operations.",
    tags: [
      "MikroTik",
      "Synology NAS",
      "Linux",
      "Rustdesk",
      "Network",
      "OpenVPN",
      "WSL",
      "Docker",
      "Shopify",
      "Cloudflare",
      "Grafana",
    ],
  },
  {
    role: "IT Technician",
    company: "PT. Smartindo Integrasi System",
    time: "2020 — 2021",
    desc: "Performed hardware and software troubleshooting, handled pre-shipment quality checks, configured operating systems, and ensured data integrity through backups and recovery operations.",
    tags: ["Windows", "Linux", "Hardware", "Software", "Network"],
  },
  {
    role: "IT Support Technician",
    company: "Digital Alliance ID",
    time: "2018 — 2018",
    desc: "Troubleshot and repaired computer hardware, diagnosed network issues, and ensured all refurbished devices met performance and quality standards.",
    tags: ["Windows", "Mikrotik", "Remote Desktop", "Software", "Hardware"],
  },
];

function Experience() {
  return (
    <section id="experience" className="relative bg-foreground py-24 text-background md:py-36">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-6 inline-flex items-center gap-2 font-mono-x text-xs uppercase tracking-widest opacity-70">
          <span className="h-px w-8 bg-background/40" />
          <span>/home/experience</span>
        </div>
        <Reveal>
          <h2 className="font-display text-6xl leading-[0.9] md:text-8xl">
            Professional <br />
            <span
              className="italic"
              style={{ WebkitTextStroke: "2px var(--paper)", color: "transparent" }}
            >
              Journey
            </span>
            .
          </h2>
        </Reveal>

        <div className="mt-16 space-y-0">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="group grid grid-cols-[auto_1fr] gap-4 border-t-2 border-background/40 py-8 transition-colors hover:bg-background hover:text-foreground md:grid-cols-[120px_1fr_auto] md:gap-8 md:py-10">
                <div className="font-mono-x text-sm opacity-70">{e.time}</div>
                <div>
                  <h3 className="font-display text-3xl md:text-5xl">{e.role}</h3>
                  <div className="mt-1 text-sm opacity-70">{e.company}</div>
                  <p className="mt-3 max-w-xl text-base md:text-lg">{e.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="border border-current px-2 py-0.5 font-mono-x text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1 md:flex md:items-center">
                  <motion.span
                    className="font-display text-4xl md:text-6xl"
                    initial={{ x: 0 }}
                    whileHover={{ x: 8 }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CERTIFICATES ---------------- */
const CERTS = [
  {
    name: "Technical Support Basics",
    org: "Google",
    img: "/certificate/google.webp",
    url: "https://coursera.org/verify/K6K3V3QEE5NT",
  },
  {
    name: "Introduction to Technical Support",
    org: "IBM",
    img: "/certificate/ibm.webp",
    url: "https://coursera.org/verify/4QWG2T2DD3BY",
  },
  {
    name: "Learn Computer Networks for Beginners",
    org: "Dicoding",
    img: "/certificate/dicoding.webp",
    url: "https://www.dicoding.com/certificates/0LZ0QEW60Z65",
  },
  {
    name: "Learn DevOps Fundamentals",
    org: "Dicoding",
    img: "/certificate/dicoding2.webp",
    url: "https://www.dicoding.com/certificates/4EXG4O60DPRL",
  },
  {
    name: "Desktop IT Support Level 1 & 2 in Real Life",
    org: "Udemy",
    img: "/certificate/udemy.webp",
    url: "https://www.udemy.com/certificate/UC-2e95edd4-f26c-4941-a9df-f5d79d86404e/",
  },
  {
    name: "Mastering Docker from Basics to Practice",
    org: "BuildWithAngga",
    img: "/certificate/docker.webp",
    url: "https://buildwithangga.com/",
  },
];

function CertModal({
  cert,
  onClose,
}: {
  cert: (typeof CERTS)[0] | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!cert) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cert, onClose]);

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-foreground/80 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="brutal-border brutal-shadow-lg relative z-10 w-full max-w-3xl bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b-2 border-foreground px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="brutal-border bg-foreground px-2 py-0.5 font-mono-x text-xs text-background">
                  CERT
                </span>
                <span className="font-display text-lg">{cert.name}</span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="brutal-border flex h-8 w-8 items-center justify-center font-mono-x text-sm transition-colors hover:bg-foreground hover:text-background"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <img
                src={cert.img}
                alt={cert.name}
                className="w-full object-contain"
              />
            </div>
            <div className="flex items-center justify-between border-t-2 border-foreground px-5 py-3">
              <span className="font-mono-x text-xs text-muted-foreground">{cert.org}</span>
              <a
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                className="brutal-border inline-flex items-center gap-2 bg-foreground px-4 py-2 font-mono-x text-xs text-background transition-transform hover:-translate-y-0.5"
              >
                View Credential →
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Certificates() {
  const [selected, setSelected] = useState<(typeof CERTS)[0] | null>(null);

  return (
    <section id="certificate" className="relative py-24 md:py-36">
      <CertModal cert={selected} onClose={() => setSelected(null)} />
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <PathTag path="/home/certificate" />
        <Reveal>
          <h2 className="font-display text-6xl leading-[0.9] md:text-8xl">
            Certificate <br />
            <span className="text-outline">Finishup</span>.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CERTS.map((c, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <ParallaxY range={20}>
                <motion.div
                  whileHover={{ rotate: -1.5, y: -4 }}
                  onClick={() => setSelected(c)}
                  className="brutal-border brutal-shadow flex h-full cursor-pointer flex-col bg-background p-5"
                >
                  <div className="flex items-center justify-between font-mono-x text-xs">
                    <span className="brutal-border bg-foreground px-2 py-0.5 text-background">
                      CERT
                    </span>
                    <span>#{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="my-4 overflow-hidden brutal-border">
                    <img
                      src={c.img}
                      alt={c.name}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-display text-xl leading-tight">{c.name}</h3>
                  <div className="mt-2 font-mono-x text-xs text-muted-foreground">{c.org}</div>
                </motion.div>
              </ParallaxY>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */
const PROJECTS = [
  {
    name: "Office Network Overhaul",
    tag: "Infrastructure",
    desc: "Redesigned a 200-user office network with MikroTik core + Unifi access.",
  },
  {
    name: "Automated Onboarding",
    tag: "Scripting",
    desc: "PowerShell + Graph API pipeline to provision M365 accounts in 30 seconds.",
  },
  {
    name: "Self-hosted Monitoring",
    tag: "Observability",
    desc: "Grafana + Prometheus + Loki stack covering 40 servers and edge devices.",
  },
  {
    name: "Backup-as-Code",
    tag: "Sysadmin",
    desc: "Ansible-driven offsite backups with weekly restore drills. Zero data loss in 18 months.",
  },
];

function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <PathTag path="/home/projects" />
        <Reveal>
          <h2 className="font-display text-6xl leading-[0.9] md:text-8xl">
            Featured <span className="italic">Work</span>.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <ParallaxY range={i % 2 ? 30 : -30}>
                <motion.a
                  href="#contact"
                  whileHover={{ y: -6 }}
                  className="brutal-border brutal-shadow-lg group block overflow-hidden bg-background"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-foreground text-background">
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 20% 30%, var(--paper) 1px, transparent 1.5px)",
                        backgroundSize: "18px 18px",
                      }}
                    />
                    <div className="absolute inset-0 flex items-end justify-between p-6">
                      <span className="font-display text-7xl leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono-x text-xs uppercase tracking-widest opacity-80">
                        {p.tag}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-4 p-6">
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl">{p.name}</h3>
                      <p className="mt-2 max-w-md text-muted-foreground">{p.desc}</p>
                    </div>
                    <motion.span className="font-display text-3xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </motion.span>
                  </div>
                </motion.a>
              </ParallaxY>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SKILLS ---------------- */
const SKILL_GROUPS = [
  { title: "Networking", items: ["MikroTik", "Portforwarding", "Unifi", "VLAN", "VPN", "Firewall", "Load Balancing"] },
  {
    title: "System Admin",
    items: ["Linux", "Windows Server", "Active Directory", "Google Workspace", "Microsoft 365", "Synology NAS"],
  },
  { title: "Infrastructure", items: ["Virtualization", "Proxmox", "Docker", "Nginx/Apache", "CI/CD", "Cloudflare"] },
  { title: "Scripting", items: ["Bash", "PowerShell", "Terminal", "VIM/Nano", "Cron"] },
  { title: "Development", items: ["Laravel", "Next.js", "Tailwind", "Python", "PHP", "JavaScript"] }
];

function Skills() {
  return (
    <section id="mykills" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <PathTag path="/home/mykills" />
        <Reveal>
          <h2 className="font-display text-6xl leading-[0.9] md:text-8xl">
            My <span className="text-outline">Skills</span>.
          </h2>
        </Reveal>
      </div>

      <div className="mt-12 md:mt-16">
        <Marquee
          items={[
            "NETWORKING",
            "SYSTEM ADMIN",
            "INFRASTRUCTURE",
            "AUTOMATION",
            "SECURITY",
            "OBSERVABILITY",
            "TROUBLESHOOTING",
          ]}
        />
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-4 md:mt-16 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        {SKILL_GROUPS.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.08}>
            <motion.div
              whileHover={{ rotate: 1, y: -4 }}
              className="brutal-border brutal-shadow flex h-full flex-col bg-background p-5"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-2xl">{g.title}</h3>
                <span className="font-mono-x text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <ul className="mt-4 space-y-2">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-center gap-2 border-b border-foreground/15 py-1.5 text-sm"
                  >
                    <span className="h-1.5 w-1.5 bg-foreground" /> {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative bg-foreground py-24 text-background md:py-36">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-6 inline-flex items-center gap-2 font-mono-x text-xs uppercase tracking-widest opacity-70">
          <span className="h-px w-8 bg-background/40" />
          <span>/home/contact</span>
        </div>
        <Reveal>
          <h2 className="font-display text-6xl leading-[0.9] md:text-8xl">
            Send Me <br />
            <span
              className="italic"
              style={{ WebkitTextStroke: "2px var(--paper)", color: "transparent" }}
            >
              a Message
            </span>
            .
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-6">
              <p className="text-xl">
                Got a network on fire? A server with trust issues? Or just want to chat about
                homelab setups — slide into my inbox.
              </p>
              <div className="space-y-3 font-mono-x text-sm">
                <a
                  href="https://github.com/wikidotexe"
                  target="_blank"
                  rel="noreferrer"
                  className="block underline-offset-4 hover:underline"
                >
                  → github.com/wikidotexe
                </a>
                <a
                  href="https://linkedin.com/in/dwiki-arlian-maulana-852b14209"
                  target="_blank"
                  rel="noreferrer"
                  className="block underline-offset-4 hover:underline"
                >
                  → linkedin.com/in/dwiki-arlian-maulana
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-5"
            >
              {[
                { id: "name", label: "Name", type: "text" },
                { id: "email", label: "Email", type: "email" },
              ].map((f) => (
                <div key={f.id}>
                  <label
                    htmlFor={f.id}
                    className="block font-mono-x text-xs uppercase tracking-widest opacity-70"
                  >
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    type={f.type}
                    required
                    className="mt-2 w-full border-b-2 border-background/60 bg-transparent py-3 text-lg outline-none placeholder:opacity-40 focus:border-background"
                    placeholder={f.label.toLowerCase()}
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="msg"
                  className="block font-mono-x text-xs uppercase tracking-widest opacity-70"
                >
                  Message
                </label>
                <textarea
                  id="msg"
                  required
                  rows={4}
                  className="mt-2 w-full resize-none border-b-2 border-background/60 bg-transparent py-3 text-lg outline-none placeholder:opacity-40 focus:border-background"
                  placeholder="tell me everything..."
                />
              </div>
              <Magnetic strength={0.3}>
                <button
                  type="submit"
                  className="brutal-border inline-flex items-center gap-2 bg-background px-6 py-4 font-display text-lg text-foreground transition-transform hover:-translate-y-1"
                >
                  {sent ? "Sent ✓" : "Send Message →"}
                </button>
              </Magnetic>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-2 border-foreground bg-background">
      <ParallaxY range={20}>
        <div className="select-none whitespace-nowrap py-10 text-center font-display text-[22vw] leading-none text-outline md:text-[18vw]">
          wikidotexe.
        </div>
      </ParallaxY>
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 border-t-2 border-foreground px-4 py-8 md:flex-row md:items-center md:px-6">
        <div className="font-display text-xl">wikidotexe.</div>
        <div className="flex flex-wrap gap-5 font-mono-x text-sm">
          {SECTIONS.slice(1).map((s) => (
            <a key={s.id} href={`#${s.id}`} className="hover:underline">
              {s.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4 font-mono-x text-sm">
          <a
            href="https://github.com/wikidotexe"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/dwiki-arlian-maulana-852b14209"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
          <span className="text-muted-foreground">© 2025</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- PAGE ---------------- */
export function Portfolio() {
  return (
    <div className="grain relative">
      <Navbar />
      <main>
        <Hero />

        <About />
        <Experience />
        <Certificates />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
