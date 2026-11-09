import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Cloud,
  Fingerprint,
  Github,
  Linkedin,
  Menu,
  Monitor,
  Network,
  Server,
  ShieldCheck,
  X,
} from "lucide-react";
import { social, type Project } from "./data";

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
            <a key={id} href={`${home}#${id}`} onClick={() => setOpen(false)}>
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
export function CloudArchitecture() {
  return (
    <div
      className="architecture"
      role="img"
      aria-label="Composição conceitual: Microsoft Cloud conecta identidade, dispositivos e infraestrutura. Não representa um ambiente real."
    >
      <svg
        className="architecture-scene"
        viewBox="0 0 680 620"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="platform" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#225b7c" />
            <stop offset=".55" stopColor="#133c59" />
            <stop offset="1" stopColor="#0d263c" />
          </linearGradient>
          <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#6ec6f1" stopOpacity=".25" />
            <stop offset="1" stopColor="#1686c7" stopOpacity=".03" />
          </linearGradient>
          <linearGradient id="cloud-face" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#e2f7ff" />
            <stop offset=".45" stopColor="#8ed3f4" />
            <stop offset="1" stopColor="#2683b9" />
          </linearGradient>
          <linearGradient id="signal" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#74cdfb" stopOpacity=".15" />
            <stop offset=".5" stopColor="#a9e9ff" />
            <stop offset="1" stopColor="#74cdfb" stopOpacity=".15" />
          </linearGradient>
          <radialGradient id="architecture-aura">
            <stop stopColor="#1686c7" stopOpacity=".27" />
            <stop offset="1" stopColor="#1686c7" stopOpacity="0" />
          </radialGradient>
          <pattern
            id="architecture-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M32 0H0V32"
              fill="none"
              stroke="#71b7dc"
              strokeOpacity=".09"
            />
          </pattern>
          <linearGradient id="node-face" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#193f5b" />
            <stop offset="1" stopColor="#0b2439" />
          </linearGradient>
        </defs>
        <ellipse
          cx="350"
          cy="300"
          rx="320"
          ry="290"
          fill="url(#architecture-aura)"
        />
        <circle
          cx="350"
          cy="300"
          r="263"
          fill="none"
          stroke="#568eb4"
          strokeOpacity=".16"
        />
        <circle
          cx="350"
          cy="300"
          r="224"
          fill="none"
          stroke="#568eb4"
          strokeOpacity=".12"
          strokeDasharray="3 12"
        />
        <path
          d="M105 487L378 326L642 481L371 607Z"
          fill="url(#architecture-grid)"
        />
        <g
          className="scene-registration"
          fill="none"
          stroke="#7dc3e5"
          strokeOpacity=".4"
        >
          <path d="M43 97V77H63M619 77h20v20M43 516v20h20M619 536h20v-20" />
          <path d="M329 31h22m-11-11v22M329 577h22m-11-11v22" />
        </g>
        <text x="60" y="60" className="scene-kicker">
          ECOSSISTEMA MICROSOFT
        </text>
        <text x="620" y="60" textAnchor="end" className="scene-code">
          01 / CLOUD
        </text>
        <ellipse
          cx="352"
          cy="440"
          rx="204"
          ry="43"
          fill="#020d19"
          opacity=".5"
        />
        <g className="scene-foundation">
          <path
            d="M138 364L350 245L564 364V384L350 506L138 384Z"
            fill="#0b243a"
            stroke="#2c5977"
          />
          <path
            d="M138 364L350 245L564 364L350 486Z"
            fill="url(#platform)"
            stroke="#5a94b7"
          />
          <path
            d="M350 486V506M151 378L350 491L552 378"
            fill="none"
            stroke="#4a9cc9"
            strokeOpacity=".5"
          />
          <path
            d="M175 364L350 265L526 364L350 465Z"
            fill="none"
            stroke="#6bbbe8"
            strokeOpacity=".25"
          />
          <path
            d="M211 365L350 286L490 365L350 444Z"
            fill="none"
            stroke="#6bbbe8"
            strokeOpacity=".16"
          />
          <path
            d="M188 365H256L291 345M512 365H445L408 345M350 464V420"
            fill="none"
            stroke="#75c8ed"
            strokeOpacity=".7"
          />
          <circle cx="188" cy="365" r="3" fill="#9de3ff" />
          <circle cx="512" cy="365" r="3" fill="#9de3ff" />
        </g>
        <g className="scene-glass">
          <path
            d="M171 301L350 200L530 301V312L350 415L171 312Z"
            fill="#103754"
            fillOpacity=".8"
            stroke="#3987b4"
            strokeOpacity=".7"
          />
          <path
            d="M171 301L350 200L530 301L350 404Z"
            fill="url(#glass)"
            stroke="#7ed4f7"
            strokeOpacity=".7"
          />
          <path
            d="M350 404V415M171 301L350 404L530 301"
            fill="none"
            stroke="#9ae4ff"
          />
          <path
            d="M350 200V245M171 301V345M530 301V345M350 415V470"
            stroke="#63c8fa"
            strokeOpacity=".4"
            strokeDasharray="3 5"
          />
        </g>
        <g className="scene-cloud">
          <path
            d="M285 226C260 226 248 211 248 192C248 174 263 158 282 157C284 127 307 108 333 108C362 108 381 127 387 151C412 150 431 170 431 191C431 212 415 226 393 226Z"
            fill="#17496c"
            transform="translate(8 13)"
            stroke="#4893bf"
          />
          <path
            d="M285 226C260 226 248 211 248 192C248 174 263 158 282 157C284 127 307 108 333 108C362 108 381 127 387 151C412 150 431 170 431 191C431 212 415 226 393 226Z"
            fill="url(#cloud-face)"
            stroke="#c3edff"
            strokeWidth="1.4"
          />
          <g transform="translate(318 159)" fill="#1e5678">
            <rect width="16" height="16" rx="1" />
            <rect x="20" width="16" height="16" rx="1" />
            <rect y="20" width="16" height="16" rx="1" />
            <rect x="20" y="20" width="16" height="16" rx="1" />
          </g>
          <path d="M350 244v27" stroke="#93ddfb" strokeWidth="1.5" />
          <ellipse
            cx="350"
            cy="278"
            rx="30"
            ry="11"
            fill="#57bdf2"
            fillOpacity=".16"
            stroke="#6ec6f1"
            strokeOpacity=".8"
          />
          <ellipse
            cx="350"
            cy="278"
            rx="13"
            ry="5"
            fill="#a5e5ff"
            fillOpacity=".6"
          />
        </g>
        <g
          className="scene-wires"
          fill="none"
          stroke="url(#signal)"
          strokeWidth="1.4"
        >
          <path d="M151 254H200L252 284M489 343H544V304M350 422V449" />
          <path
            d="M108 304V394L269 486M589 346V421L431 510"
            strokeDasharray="3 6"
            opacity=".6"
          />
        </g>
        <g className="scene-node" transform="translate(32 200)">
          <rect
            x="5"
            y="8"
            width="139"
            height="106"
            rx="12"
            fill="#030f1c"
            opacity=".5"
          />
          <rect
            width="139"
            height="106"
            rx="12"
            fill="url(#node-face)"
            stroke="#578eaf"
          />
          <path d="M14 1h111" stroke="#a5dcf7" strokeOpacity=".6" />
          <Fingerprint
            x="17"
            y="17"
            width="27"
            height="27"
            stroke="#a0dcfa"
            strokeWidth="1.4"
          />
          <text x="17" y="68" className="scene-node-title">
            Identidade
          </text>
          <text x="17" y="88" className="scene-node-sub">
            Entra ID
          </text>
          <circle cx="118" cy="24" r="3" fill="#7bd4ff" />
        </g>
        <g className="scene-node" transform="translate(500 244)">
          <rect
            x="5"
            y="8"
            width="148"
            height="106"
            rx="12"
            fill="#030f1c"
            opacity=".5"
          />
          <rect
            width="148"
            height="106"
            rx="12"
            fill="url(#node-face)"
            stroke="#578eaf"
          />
          <path d="M14 1h120" stroke="#a5dcf7" strokeOpacity=".6" />
          <Server
            x="17"
            y="17"
            width="27"
            height="27"
            stroke="#a0dcfa"
            strokeWidth="1.4"
          />
          <text x="17" y="68" className="scene-node-title">
            Infraestrutura
          </text>
          <text x="17" y="88" className="scene-node-sub">
            Windows Server
          </text>
          <circle cx="127" cy="24" r="3" fill="#7bd4ff" />
        </g>
        <g className="scene-node" transform="translate(271 449)">
          <rect
            x="5"
            y="8"
            width="159"
            height="88"
            rx="12"
            fill="#030f1c"
            opacity=".5"
          />
          <rect
            width="159"
            height="88"
            rx="12"
            fill="url(#node-face)"
            stroke="#578eaf"
          />
          <Monitor
            x="17"
            y="17"
            width="25"
            height="25"
            stroke="#a0dcfa"
            strokeWidth="1.4"
          />
          <text x="53" y="32" className="scene-node-title">
            Dispositivos
          </text>
          <text x="53" y="51" className="scene-node-sub">
            Intune
          </text>
          <path d="M17 69h126" stroke="#3b6580" />
          <path d="M17 69h38" stroke="#9addfa" />
        </g>
        <text x="350" y="97" textAnchor="middle" className="scene-cloud-title">
          Microsoft Cloud
        </text>
        <text x="350" y="333" textAnchor="middle" className="scene-purpose">
          Conectar. Gerenciar. Proteger.
        </text>
        <g transform="translate(199 587)">
          <ShieldCheck width="15" height="15" stroke="#8dd6f8" />
          <text x="24" y="12" className="scene-kicker">
            SEGURANÇA EM CADA CAMADA
          </text>
        </g>
        <text x="48" y="559" className="scene-code">
          ARQUITETURA CONCEITUAL
        </text>
      </svg>
    </div>
  );
}
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
      aria-hidden="true"
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
          Daniel Barros Almeida<span>.</span>
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
        © {new Date().getFullYear()} Daniel Barros Almeida.
        <span>Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
