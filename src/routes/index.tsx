import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, type Variants } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
  ArrowDown, ArrowUpRight, Mail, FileDown,
  Code2, Database, Sparkles, GraduationCap, Briefcase, Send,
} from "lucide-react";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 .5C5.73.5.86 5.37.86 11.64c0 4.93 3.2 9.11 7.64 10.59.56.1.76-.24.76-.54 0-.27-.01-1.16-.02-2.1-3.11.68-3.77-1.32-3.77-1.32-.51-1.3-1.25-1.64-1.25-1.64-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.08 1.14a10.7 10.7 0 0 1 5.6 0c2.14-1.44 3.08-1.14 3.08-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.29-2.61 5.23-5.1 5.51.4.34.76 1.02.76 2.06 0 1.49-.01 2.69-.01 3.05 0 .3.2.65.77.54 4.43-1.48 7.63-5.66 7.63-10.59C23.14 5.37 18.27.5 12 .5z"/></svg>
);
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z"/></svg>
);
import profileImage from "@/assets/krish-profile.jpeg";
import wattWiseImage from "@/assets/WattWise - Premium collection of Electronics.png";
import whiskAWayImage from "@/assets/Whisk-a-way-home.jpg";
import resumePDF from "@/assets/Krish_Narang_Final_Executive_Resume.pdf";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Krish Narang — Developer & Data Science Student" },
      { name: "description", content: "Cinematic portfolio of Krish Narang — BCA Applied Data Science at MIT ADT, building web apps and data-driven experiences." },
      { property: "og:title", content: "Krish Narang — Portfolio" },
      { property: "og:description", content: "BCA Applied Data Science · Web Developer · Builder" },
      { property: "og:image", content: profileImage },
      { name: "twitter:image", content: profileImage },
    ],
  }),
  component: Portfolio,
});

// --- Enhanced Components ---

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.4, y: y * 0.4 });
  };

  const onMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

function TextReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, i) => (
        <span key={i} className="relative mr-[0.25em] overflow-hidden pb-1">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function BlurReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
      <span className="font-mono text-gold">{n}</span>
      <span className="h-px w-12 bg-gold/50" />
      <span>{label}</span>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#about", label: "About" },
    { href: "#work", label: "Work" },
    { href: "#journey", label: "Journey" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : ""}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
        <a href="#top" className="flex items-baseline gap-1">
          <span className="font-script text-gold text-3xl leading-none">Narang</span>
        </a>
        <ul className="hidden gap-10 text-xs uppercase tracking-[0.25em] text-muted-foreground md:flex">
          {links.map((l, i) => (
            <li key={l.href}>
              <a href={l.href} className="group flex items-center gap-2 transition hover:text-foreground">
                <span className="font-mono text-[10px] text-gold/70">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="hidden md:inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gold transition hover:bg-gold hover:text-ink">
          Let's talk <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.nav>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden grain">
      {/* Background image */}
      <motion.div style={{ scale, y: imgY, willChange: "transform" }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent md:via-background/30" />
        <img
          src={profileImage}
          alt="Krish Narang"
          className="ml-auto h-full w-full object-cover object-center md:w-[60%]"
        />
      </motion.div>

      {/* Foreground content */}
      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between px-6 pb-12 pt-32 md:px-12 md:pt-40">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <SectionLabel n="00" label="Portfolio · 2026" />
        </motion.div>

        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-mono text-sm uppercase tracking-[0.3em] text-gold"
          >
            Krish Narang
          </motion.p>

          <h1 className="text-display mt-6 text-[clamp(3rem,11vw,9rem)] leading-[0.95] tracking-tight">
            <TextReveal text="Building the future" className="mr-4" />
            <br />
            <motion.span
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block italic text-muted-foreground"
            >
              with data &amp; code.
            </motion.span>
          </h1>

          <BlurReveal delay={1.3}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              BCA Applied Data Science at MIT ADT University, Pune.
              I design and ship clean, performant web experiences — turning raw
              ideas into products that feel inevitable.
            </p>
          </BlurReveal>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <Magnetic>
              <a href="#work" className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-medium text-ink shadow-[0_0_20px_rgba(209,180,113,0.3)] transition-shadow hover:shadow-[0_0_30px_rgba(209,180,113,0.5)]">
                View selected work <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
              </a>
            </Magnetic>
            <a href={resumePDF} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
              <FileDown className="h-4 w-4 transition group-hover:-translate-y-0.5" /> 
              <span className="relative">
                Download CV
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold/50 transition-all group-hover:w-full" />
              </span>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex items-end justify-between"
        >
          <div className="hidden gap-8 text-xs uppercase tracking-[0.25em] text-muted-foreground md:flex">
            <div><span className="block font-mono text-gold">Pune, IN</span>based</div>
            <div><span className="block font-mono text-gold">2023—26</span>BCA Hons.</div>
            <div><span className="block font-mono text-gold">Open</span>to opportunities</div>
          </div>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Scroll <ArrowDown className="h-3.5 w-3.5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const items = ["HTML", "CSS", "JavaScript", "Python", "Data Science", "React", "SQL", "Tailwind", "Figma", "Git"];
  return (
    <section className="relative border-y border-border bg-ink/40 py-6 overflow-hidden">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-16 whitespace-nowrap text-display text-3xl md:text-5xl"
      >
        {[...items, ...items, ...items].map((s, i) => (
          <span key={i} className="flex items-center gap-16 text-muted-foreground/60">
            {s}
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
        ))}
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-32 md:px-12 md:py-48">
      <SectionLabel n="01" label="About" />
      <div className="mt-12 grid gap-16 md:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-7"
        >
          <h2 className="text-display text-4xl leading-tight md:text-6xl">
            <TextReveal text="Forward-thinking BCA graduate building elegant, data-driven solutions." />
          </h2>
          <BlurReveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Forward-thinking BCA graduate with a strong foundation in computer applications, software development techniques, and programming methods. I'm excited to begin my career in tech and management, where I can apply my problem-solving skills and experience from academic projects to build efficient apps and lead teams. As a lifelong learner, I thrive on collaborating with others and growing as both a developer and a leader in the industry.
            </p>
          </BlurReveal>
          <BlurReveal delay={0.4}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              When I'm not coding, you'll find me exploring new ideas in data, sketching UI concepts, or watching films for their cinematography.
            </p>
          </BlurReveal>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5 md:pt-8"
        >
          <div className="space-y-8">
            {[
              { k: "Now", v: "BCA Applied Data Science · MIT ADT Pune" },
              { k: "Focus", v: "Web Development · Data Science · UI" },
              { k: "Stack", v: "HTML, CSS, JavaScript, Python, SQL" },
              { k: "Based", v: "Pune, India · Open globally" },
            ].map((row) => (
              <div key={row.k} className="border-b border-border pb-4">
                <div className="font-mono text-xs uppercase tracking-[0.25em] text-gold">{row.k}</div>
                <div className="mt-2 text-foreground">{row.v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const skills = [
  { name: "HTML & CSS", level: 92, icon: Code2 },
  { name: "JavaScript", level: 85, icon: Sparkles },
  { name: "Python / Data", level: 78, icon: Database },
  { name: "React / UI", level: 72, icon: Sparkles },
  { name: "SQL", level: 70, icon: Database },
  { name: "MS Office Suite", level: 95, icon: Briefcase },
];

function Skills() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
      <SectionLabel n="02" label="Capabilities" />
      <h3 className="text-display mt-8 max-w-3xl text-3xl leading-tight md:text-5xl">
        Tools I reach for to <em className="text-gold-gradient not-italic">make things real</em>.
      </h3>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {skills.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: i * 0.06 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm transition hover:border-gold/40"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gold/10 p-2 text-gold">
                  <s.icon className="h-4 w-4" />
                </div>
                <span className="font-medium">{s.name}</span>
              </div>
              <span className="font-mono text-xs text-muted-foreground">{s.level}%</span>
            </div>
            <div className="mt-5 h-[2px] w-full overflow-hidden rounded-full bg-border">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-gradient-to-r from-gold/60 to-gold"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const projects = [
  {
    n: "01",
    title: "Burger House",
    desc: "A full-experience restaurant site — order favorite burgers, reserve tables, browse upcoming events, and discover the brand story.",
    tech: ["HTML", "CSS", "JavaScript"],
    img: "https://kri832.github.io/PORFOLIO/Burger%20House.png",
    year: "2024",
  },
  {
    n: "02",
    title: "Quiz Application",
    desc: "An interactive badminton-themed quiz with 8 questions, instant scoring, and a clean reveal of correct answers at the end.",
    tech: ["HTML", "CSS", "JavaScript"],
    img: "https://kri832.github.io/PORFOLIO/Quiz%20Application.png",
    year: "2025",
  },
  {
    n: "03",
    title: "Calculator",
    desc: "A minimalist calculator with precise keyboard support and clean arithmetic — addition, subtraction, multiplication, division.",
    tech: ["HTML", "CSS", "JavaScript"],
    img: "https://kri832.github.io/PORFOLIO/Calculator.png",
    year: "2025",
  },
  {
    n: "04",
    title: "To-Do Application",
    desc: "A daily activity manager built to never let a task slip — quick capture, persistent state, and a calm, focused interface.",
    tech: ["HTML", "CSS", "JavaScript"],
    img: "https://kri832.github.io/PORFOLIO/To-Do%20App.png",
    year: "2025",
  },
  
  {
    n: "05",
    title: "WattWise",
    desc: "A premium electronic product store where all the rare products are easy to find and with original certified.",
    tech: ["HTML", "CSS", "JavaScript"],
    img: wattWiseImage,
    year: "2025",
  },

  {
    n: "06", 
    title: "Whisk-A-Way Beyond Your Plate",
    desc: "Whisk-A-Way is a restaurant application that allows users to order favorite Foods, reserve tables, browse upcoming events, and discover the brand story.",
    tech: ["Backend - Node.js, Express, JSON Web Token", "Frontend - React, React Router, Context API", "Database - MongoDB"],
    img: whiskAWayImage,
    year: "2026",
  },

];

function ProjectCard({ p, i }: { p: typeof projects[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const sy = useSpring(y, { stiffness: 60, damping: 22, mass: 0.4 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform, opacity" }}
      className={`grid items-center gap-10 md:grid-cols-12 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
    >
      <div className="md:col-span-7">
        <motion.div style={{ y: sy, willChange: "transform" }} className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-card">
          <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
          <div className="absolute bottom-6 left-6 right-6 flex translate-y-4 items-center justify-between opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold">View case</span>
            <ArrowUpRight className="h-5 w-5 text-gold" />
          </div>
        </motion.div>
      </div>
      <div className="md:col-span-5">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-gold">{p.n}</span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">{p.year}</span>
        </div>
        <h3 className="text-display mt-3 text-3xl leading-tight md:text-5xl">{p.title}</h3>
        <p className="mt-5 leading-relaxed text-muted-foreground">{p.desc}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span key={t} className="rounded-full border border-border px-3 py-1 text-xs font-mono text-muted-foreground">{t}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function Work() {
  return (
    <section id="work" className="relative mx-auto max-w-7xl px-6 py-32 md:px-12 md:py-48">
      <SectionLabel n="03" label="Selected Work" />
      <div className="mt-10 flex items-end justify-between gap-6">
        <h2 className="text-display max-w-3xl text-4xl leading-tight md:text-7xl">
          Projects, shipped.
        </h2>
        <span className="hidden font-mono text-sm text-muted-foreground md:block">{projects.length} pieces</span>
      </div>

      <div className="mt-20 space-y-32 md:space-y-48">
        {projects.map((p, i) => <ProjectCard key={p.n} p={p} i={i} />)}
      </div>
    </section>
  );
}

const journey = [
  { side: "edu", year: "2023 — 2026", title: "BCA Applied Data Science", place: "MIT ADT University, Pune", icon: GraduationCap },
  { side: "exp", year: "2025", title: "Intern · Web Development", place: "SkillCraft Technology", icon: Briefcase },
  { side: "exp", year: "2025", title: "Intern · Programming", place: "CodSoft", icon: Briefcase },
  { side: "edu", year: "2021 — 2023", title: "12th H.S.C — Commerce (65%)", place: "Narayana Vidyalayam, Chandrapur", icon: GraduationCap },
  { side: "edu", year: "2021", title: "10th S.S.C (82%)", place: "B.J.M. Carmel Academy, Chandrapur", icon: GraduationCap },
];

function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section id="journey" className="relative mx-auto max-w-7xl px-6 py-32 md:px-12 md:py-48">
      <SectionLabel n="04" label="Journey" />
      <h2 className="text-display mt-8 max-w-3xl text-4xl leading-tight md:text-6xl">
        Where I've been, <em className="text-gold-gradient not-italic">where I'm headed</em>.
      </h2>

      <div ref={ref} className="relative mt-20">
        <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2" />
        <motion.div style={{ height: lineH }} className="absolute left-4 top-0 w-px bg-gradient-to-b from-gold via-gold to-transparent md:left-1/2" />

        <div className="space-y-16">
          {journey.map((j, i) => {
            const isRight = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isRight ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`relative grid md:grid-cols-2 md:gap-12 ${isRight ? "" : "md:[&>*:first-child]:col-start-2"}`}
              >
                <div className={`pl-12 md:pl-0 ${isRight ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="font-mono text-xs uppercase tracking-[0.25em] text-gold">{j.year}</div>
                  <h4 className="text-display mt-2 text-2xl">{j.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{j.place}</p>
                </div>
                <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 bg-background text-gold md:left-1/2 md:-translate-x-1/2">
                  <j.icon className="h-3.5 w-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-32 md:px-12 md:py-48">
      <SectionLabel n="05" label="Contact" />
      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-display mt-10 text-[clamp(2.5rem,9vw,8rem)] leading-[0.95]"
      >
        Have an idea?<br />
        <em className="text-gold-gradient not-italic">Let's build it.</em>
      </motion.h2>

      <div className="mt-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            I'm currently open to internships, freelance projects and full-time
            roles where I can learn fast and contribute even faster. Drop a line —
            I read every message.
          </p>
          <a href="mailto:krishnarang832@gmail.com" className="group mt-10 inline-flex items-center gap-4 text-display text-3xl md:text-5xl">
            <span className="underline decoration-gold/40 underline-offset-8 transition group-hover:decoration-gold">krishnarang832@gmail.com</span>
            <ArrowUpRight className="h-8 w-8 text-gold transition group-hover:rotate-45" />
          </a>

          <div className="mt-12 flex flex-wrap gap-3">
            {[
              { href: "mailto:krishnarang832@gmail.com", icon: Mail, label: "Email" },
              { href: "https://github.com/kri832", icon: Github, label: "GitHub" },
              { href: "https://www.linkedin.com/", icon: Linkedin, label: "LinkedIn" },
              { href: resumePDF, icon: FileDown, label: "Resume" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition hover:border-gold hover:text-gold">
                <s.icon className="h-4 w-4" /> {s.label}
              </a>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); window.location.href = `mailto:krishnarang832@gmail.com?subject=Hello%20Krish&body=${encodeURIComponent((e.target as HTMLFormElement).message.value)}`; }}
          className="md:col-span-5 space-y-5 rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Name</span>
              <input required name="name" className="mt-2 w-full border-b border-border bg-transparent py-2 text-foreground outline-none transition focus:border-gold" />
            </label>
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Email</span>
              <input required type="email" name="email" className="mt-2 w-full border-b border-border bg-transparent py-2 text-foreground outline-none transition focus:border-gold" />
            </label>
          </div>
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Message</span>
            <textarea required name="message" rows={5} className="mt-2 w-full resize-none border-b border-border bg-transparent py-2 text-foreground outline-none transition focus:border-gold" />
          </label>
          <button type="submit" className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold py-3 text-sm font-medium text-ink transition hover:gap-4">
            Send message <Send className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center md:px-12">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="text-display text-lg text-gold">KN.</span>
          <span>© {new Date().getFullYear()} Krish Narang. Crafted in Pune.</span>
        </div>
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Designed &amp; built with care
        </div>
      </div>
    </footer>
  );
}

function Portfolio() {
  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <div className="relative selection:bg-gold selection:text-ink">
      <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gold" />
      <Nav />
      <main className="relative">
        <div className="fixed inset-0 -z-10 grain pointer-events-none opacity-50" />
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Work />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
