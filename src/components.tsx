import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Cloud,
  Github,
  Linkedin,
  Menu,
  Monitor,
  Network,
  Server,
  Fingerprint,
  X,
} from "lucide-react";
import { social, type Project } from "./data";
import { ThemeToggle, useActiveSection } from "./theme";

export const home = import.meta.env.BASE_URL;
export const projectUrl = (slug: string) => `${home}projetos/${slug}/`;
export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        button.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="header">
      <div className="container header-inner">
        <a className="brand" href={home}>
          <span className="monogram" aria-hidden="true">
            d<span>a</span>
            <i />
          </span>
          <span>
            Daniel Almeida
            <span className="brand-sub">TECNOLOGIA DA INFORMAÇÃO</span>
            <span className="sr-only"> — início</span>
          </span>
        </a>
        <ThemeToggle />
        <button
          ref={button}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="navigation"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="navigation"
          className={open ? "navigation is-open" : "navigation"}
          aria-label="Navegação principal"
        >
          {[
            ["Sobre", "sobre"],
            ["Competências", "competencias"],
            ["Projetos", "projetos"],
            ["Formação", "formacao"],
          ].map(([label, id]) => (
            <a
              key={id}
              href={`${home}#${id}`}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href={`${home}#contato`}
            className="nav-contact"
            onClick={() => setOpen(false)}
          >
            Vamos conversar <ArrowUpRight size={16} />
          </a>
        </nav>
      </div>
    </header>
  );
}
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (
      !element ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    element.classList.add("reveal-ready");
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
export function SectionHeading({
  index,
  label,
  title,
  children,
}: {
  index: string;
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{index} /</span> {label}
        </p>
        <h2>{title}</h2>
      </div>
      {children && <p className="section-intro">{children}</p>}
    </div>
  );
}
export { CloudArchitecture } from "./CloudArchitecture";
export function ProjectVisual({
  type,
  large = false,
}: {
  type: Project["type"];
  large?: boolean;
}) {
  return (
    <div
      className={`project-visual visual-${type} ${large ? "visual-large" : ""}`}
    >
      <span className="visual-topline">
        {type === "cloud"
          ? "AMBIENTE EM NUVEM"
          : type === "server"
            ? "INFRAESTRUTURA LOCAL"
            : "TRANSIÇÃO PARA A NUVEM"}
      </span>
      <div className="visual-grid" />
      <div className="visual-orbits" />
      <span className="visual-index">
        {type === "cloud" ? "01" : type === "server" ? "02" : "03"}
      </span>
      {type === "cloud" ? (
        <div className="mini-cloud">
          <div className="mini-node">
            <Fingerprint size={22} />
          </div>
          <div className="mini-main">
            <Cloud size={43} strokeWidth={1.2} />
            <span>Microsoft 365</span>
          </div>
          <div className="mini-node">
            <Monitor size={22} />
          </div>
        </div>
      ) : type === "server" ? (
        <div className="server-rack">
          {[0, 1, 2].map((n) => (
            <div key={n}>
              <Server size={24} />
              <span />
              <i />
              <i />
            </div>
          ))}
          <Network className="rack-network" size={28} />
        </div>
      ) : (
        <div className="migration-diagram">
          <div>
            <Server size={33} />
            <span>On-Premises</span>
          </div>
          <span className="migration-path">
            ····
            <ArrowUpRight size={21} />
            ····
          </span>
          <div>
            <Cloud size={40} />
            <span>Microsoft 365</span>
          </div>
        </div>
      )}
      <span className="visual-bottomline">
        {type === "cloud"
          ? "IDENTIDADE / ACESSO / ENDPOINTS"
          : type === "server"
            ? "DIRETÓRIO / REDE / RECURSOS"
            : "PLANEJAMENTO / TRANSIÇÃO / CLOUD"}
      </span>
    </div>
  );
}
export function Footer() {
  return (
    <footer className="footer container">
      <div>
        <a href={home} className="footer-name">
          Daniel Almeida<span>.</span>
        </a>
        <p>Infraestrutura. Cloud. Segurança.</p>
      </div>
      <nav aria-label="Navegação do rodapé">
        <a href={`${home}#sobre`}>Sobre</a>
        <a href={`${home}#projetos`}>Projetos</a>
        <ExternalLink href={social.github}>
          <Github size={18} />
          <span className="sr-only">GitHub</span>
        </ExternalLink>
        <ExternalLink href={social.linkedin}>
          <Linkedin size={18} />
          <span className="sr-only">LinkedIn</span>
        </ExternalLink>
      </nav>
      <div className="copyright">
        © {new Date().getFullYear()} Daniel Almeida.
        <span>Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
