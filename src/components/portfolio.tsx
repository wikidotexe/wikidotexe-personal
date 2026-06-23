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

        <Reveal delay={0.8} className="mt-20 grid grid-cols-3 gap-3 md:mt-28 md:gap-4">
          {[
            { n: 5, s: "+", l: "Years in IT" },
            { n: 30, s: "+", l: "Systems shipped" },
            { n: 99, s: "%", l: "Uptime obsession" },
          ].map((it) => (
            <div key={it.l} className="brutal-border bg-background p-3 md:p-6">
              <div className="font-display text-2xl sm:text-4xl md:text-6xl">
                <Counter to={it.n} suffix={it.s} />
              </div>
              <div className="mt-1 font-mono-x text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs md:mt-2">
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
              <div className="group border-t-2 border-background/40 py-8 transition-colors hover:bg-background hover:text-foreground md:grid md:grid-cols-[120px_1fr_auto] md:gap-8 md:py-10">
                <div className="mb-2 font-mono-x text-sm opacity-70 md:mb-0">{e.time}</div>
                <div>
                  <h3 className="font-display text-2xl md:text-5xl">{e.role}</h3>
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
                <div className="hidden md:flex md:items-center">
                  <motion.span
                    className="font-display text-6xl"
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

function CertModal({ cert, onClose }: { cert: (typeof CERTS)[0] | null; onClose: () => void }) {
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
              <img src={cert.img} alt={cert.name} className="w-full object-contain" />
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
    name: "Setup Server, Synology Server",
    tag: "Infrastructure",
    img: "/projects/Tombrok Project.webp",
    desc: "A well-integrated storage and network system provides optimal data security, flexible accessibility, and high infrastructure reliability. PT Tombrok Jaya Permai's internal team can manage data more efficiently, and a structured backup strategy ensures business continuity.",
    tags: [
      "Synology",
      "Winbox",
      "DDNS",
      "Nginx Reverse Proxy",
      "Mikortik",
      "Proxmox",
      "Cloudflare",
      "OpenVPN",
      "Dell Workstation",
      "Virtualization",
    ],
    url: "",
  },
  {
    name: "Web App System Internal Application",
    tag: "Web App",
    img: "/projects/saffnco project.webp",
    desc: "Internal web application platform for SAFF & Co. featuring 6 integrated modules (Meeting Room Booking, Legal Request, Car Booking, Asset Request, Creative Asset, Digital Library) to centralize and streamline internal operations. Built with Next.js, Laravel, and Docker, with automated Cloudflare cache purging and Cloudflare Turnstile for bot protection.",
    tags: [
      "React JS",
      "Laravel",
      "Cloudflare",
      "Nginx",
      "CI/CD",
      "Github Action",
      "Mysql",
      "PHP",
      "Tailwind",
      "Cloudflare Turnstile",
      "Radix UI",
      "Docker",
      "Reverse Proxy",
      "Linux",
      "DDNS",
    ],
    url: "",
  },
  {
    name: "Rustdesk, Setup self hosted",
    tag: "Remote Access",
    img: "/projects/rustdesk.webp",
    desc: "Implemented and configured a self-hosted Rustdesk setup on Synology NAS at PT Lizzie Parra Kreasi (BLP Beauty) and providing secure remote access.",
    tags: [
      "Docker",
      "Port-forwarding",
      "Rest-API",
      "Winbox",
      "Nginx Reverse Proxy",
      "Remote desktop",
      "DDNS",
    ],
    url: "",
  },
  {
    name: "CasaOS, Setup dashboard server for VPS CLI",
    tag: "Server",
    img: "/projects/casaos.webp",
    desc: "Configured CasaOS at PT Lizzie Parra Kreasi (BLP Beauty) as a web-based dashboard to manage VPS via CLI, integrating Docker, Nginx reverse proxy, and secure remote access with DDNS.",
    tags: [
      "Docker",
      "Port-forwarding",
      "casaos",
      "linux",
      "Nginx Reverse Proxy",
      "Remote desktop",
      "DDNS",
    ],
    url: "",
  },
  {
    name: "Grafana, Network & Server Monitoring",
    tag: "Monitoring",
    img: "/projects/grafana.webp",
    desc: "Deployed Grafana with Prometheus, Node Exporter, and SNMP to monitor MikroTik networks and servers in real-time, ensuring optimal performance.",
    tags: [
      "Mikrotik",
      "Winbox",
      "Docker",
      "Linux",
      "SNMP",
      "Synology",
      "Nginx Reverse Proxy",
      "Grafana",
      "Prometheus",
      "Node Exporter",
    ],
    url: "",
  },
  {
    name: "Mikrotik Hotspot Monitoring",
    tag: "Network",
    img: "/projects/hostpot.webp",
    desc: "We installed a hotspot system at PT Lizzie Parra Kreasi (BLP Beauty) for 100+ employees, with a user-friendly login page for easy access.",
    tags: [
      "Mikrotik",
      "Winbox",
      "Rest-API",
      "Webserver",
      "Nginx Reverse Proxy",
      "SSL/TLS",
      "Certificate",
      "DHCP Server",
      "Port-forwarding",
    ],
    url: "",
    github: "",
  },
  {
    name: "Installation Device Server",
    tag: "Infrastructure",
    img: "/projects/installation.webp",
    desc: "Deployed Mikrotik RB1100 HX2 at PT Smartec Teknologi Indonesia with 1Gbps speed, supporting 100+ users and seamless file sharing.",
    tags: ["Mikrotik", "Winbox", "TP-Link", "Cisco Packet Tracer", "Wireshark"],
    url: "",
  },
  {
    name: "Setup New Device Server",
    tag: "Infrastructure",
    img: "/projects/setupnewdevice.webp",
    desc: "Deployed Mikrotik RB1100 HX2 at PT BON CAFE INDONESIA with 1Gbps speed and support for 50+ users, enabling smooth collaboration and file sharing.",
    tags: [
      "Mikrotik",
      "Winbox",
      "Ruijie",
      "TP-Link",
      "Cisco Packet Tracer",
      "Windows Sever",
      "WHM",
      "Mail Server",
    ],
    url: "",
  },
  {
    name: "Landing Page",
    tag: "Web Dev",
    img: "/projects/landingpage.webp",
    desc: "I created a responsive landing page for CV Berkah Teknik Mandiri, an engineering and construction services company.",
    tags: ["PHP", "CSS", "Javascript", "Bootstrap", "Mysql"],
    url: "",
    github: "",
  },
  {
    name: "Nextcloud, Cloud Computing",
    tag: "Cloud",
    img: "/projects/nextcloud.webp",
    desc: "Setting Up a Home Server self-hosted Using NextCloud with the Linux Ubuntu Server Operating System.",
    tags: ["Nextcloud", "Docker", "Mysql", "Nginx", "Linux", "Cloudflare", "Redis", "DDNS"],
    url: "",
  },
  {
    name: "Web App Landing page",
    tag: "Web Dev",
    img: "/projects/webapp.webp",
    desc: "Creating a WebApp-Based Company Profile for NoFileExistsHere, with content accessible through an admin panel and customizable as needed.",
    tags: ["PHP", "Laravel", "Filament", "Livewire", "Mysql", "Redis", "Tailwind", "Bootstrap"],
    url: "",
  },
  {
    name: "Personal Portfolio",
    tag: "Web Dev",
    img: "/projects/portfolio.webp",
    desc: "Creating and updating a personal portfolio to be more modern and minimalist, with eye-catching animations.",
    tags: ["React", "NextJS", "Tailwind", "NodeJS"],
    url: "",
    github: "",
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

        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-10">
          {PROJECTS.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <ParallaxY range={i % 2 ? 30 : -30}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="brutal-border brutal-shadow-lg group block overflow-hidden bg-background"
                >
                  <div className="relative overflow-hidden bg-foreground/5">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-foreground/10" />
                    <span className="absolute right-4 top-4 brutal-border bg-foreground px-2 py-0.5 font-mono-x text-xs uppercase tracking-widest text-background">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-2xl md:text-3xl">{p.name}</h3>
                      <span className="font-display text-3xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                        ↗
                      </span>
                    </div>
                    <p className="mt-3 text-muted-foreground">{p.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="brutal-border px-2 py-0.5 font-mono-x text-xs">
                          {t}
                        </span>
                      ))}
                    </div>
                    {(p.url || ("github" in p && p.github)) && (
                      <div className="mt-5 flex flex-wrap gap-3">
                        {p.url && (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="brutal-border brutal-shadow inline-flex items-center gap-2 bg-background px-5 py-2.5 font-mono-x text-sm transition-transform hover:-translate-y-0.5"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                            Live Demo
                          </a>
                        )}
                        {"github" in p && p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="brutal-border brutal-shadow inline-flex items-center gap-2 bg-background px-5 py-2.5 font-mono-x text-sm transition-transform hover:-translate-y-0.5"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            Code/Docs
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
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
  {
    title: "Networking",
    items: ["MikroTik", "Portforwarding", "Unifi", "VLAN", "VPN", "Firewall", "Load Balancing"],
  },
  {
    title: "System Admin",
    items: [
      "Linux",
      "Windows Server",
      "Active Directory",
      "Google Workspace",
      "Microsoft 365",
      "Synology NAS",
    ],
  },
  {
    title: "Infrastructure",
    items: ["Virtualization", "Proxmox", "Docker", "Nginx/Apache", "CI/CD", "Cloudflare"],
  },
  { title: "Scripting", items: ["Bash", "PowerShell", "Terminal", "VIM/Nano", "Cron"] },
  {
    title: "Development",
    items: ["Laravel", "Next.js", "Tailwind", "Python", "PHP", "JavaScript"],
  },
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

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-4 px-4 md:mt-16 md:grid-cols-3 md:gap-6 md:px-6 lg:grid-cols-5">
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
                homelab setups - slide into my inbox.
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
      <ParallaxY range={20} className="w-full">
        <div className="select-none whitespace-nowrap py-10 text-center font-display text-[22vw] leading-none text-outline md:text-[18vw]">
          wikidotexe.
        </div>
      </ParallaxY>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 md:px-6">
        <span className="font-mono-x text-sm text-muted-foreground">
          © 2026 Wikidotexe. All rights reserved.
        </span>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/wikidotexe"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="opacity-70 transition-opacity hover:opacity-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/dwiki-arlian-maulana-852b14209"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="opacity-70 transition-opacity hover:opacity-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
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
