import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Check,
  Cloud,
  Fingerprint,
  Github,
  GraduationCap,
  Linkedin,
  MapPin,
  Network,
  ShieldCheck,
} from "lucide-react";
import {
  CloudArchitecture,
  ExternalLink,
  Footer,
  Header,
  home,
  ProjectVisual,
  projectUrl,
  Reveal,
  SectionHeading,
} from "./components";
import { projects, social, type Project } from "./data";

const skills = [
  {
    icon: Cloud,
    title: "Microsoft 365 e Cloud",
    text: "Serviços conectados para o ambiente corporativo.",
    tags: [
      "Microsoft 365",
      "Microsoft Entra ID",
      "Exchange Online",
      "Serviços cloud",
    ],
  },
  {
    icon: Network,
    title: "Infraestrutura de TI",
    text: "A base para a continuidade das operações.",
    tags: [
      "Windows Server",
      "Active Directory",
      "DNS e GPO",
      "Redes",
      "Virtualização",
    ],
  },
  {
    icon: Fingerprint,
    title: "Identidade e Endpoints",
    text: "Acesso e dispositivos sob uma gestão integrada.",
    tags: [
      "Microsoft Intune",
      "MFA",
      "Conditional Access",
      "Gestão de dispositivos",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Segurança da Informação",
    text: "Proteção aplicada a pessoas, dados e ambientes.",
    tags: [
      "Microsoft Defender",
      "Microsoft Sentinel",
      "Proteção de endpoints",
      "ISO 27001/27002",
      "LGPD",
    ],
  },
];
function HomePage() {
  return (
    <>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" /> INFRAESTRUTURA · CLOUD · SEGURANÇA
          </p>
          <h1 id="hero-title">
            Daniel Barros
            <br />
            <span>Almeida.</span>
          </h1>
          <p className="hero-role">Analista de Tecnologia da Informação</p>
          <p className="hero-description">
            Profissional de Tecnologia da Informação com experiência em
            infraestrutura corporativa, administração de ambientes Microsoft
            365, gerenciamento de identidades e dispositivos, suporte técnico e
            segurança da informação.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#projetos">
              Explorar projetos <ArrowUpRight size={18} />
            </a>
            <ExternalLink className="button secondary" href={social.linkedin}>
              <Linkedin size={17} /> Conectar no LinkedIn
            </ExternalLink>
          </div>
          <div className="hero-location">
            <MapPin size={14} /> São Paulo, Brasil <span /> Tecnologia com
            propósito.
          </div>
        </div>
        <CloudArchitecture />
        <a className="scroll-cue" href="#sobre">
          <ArrowDown size={15} /> CONHEÇA MINHA TRAJETÓRIA
        </a>
      </section>
      <div className="tech-strip">
        <div className="container">
          <span>FOCO DE ATUAÇÃO</span>
          <p>Microsoft 365</p>
          <i />
          <p>Microsoft Entra ID</p>
          <i />
          <p>Microsoft Intune</p>
          <i />
          <p>Windows Server</p>
          <i />
          <p>Segurança</p>
        </div>
      </div>
      <section className="section container about" id="sobre">
        <Reveal>
          <p className="eyebrow">
            <span>01 /</span> SOBRE MIM
          </p>
          <h2>
            Tecnologia que conecta.
            <br />
            <span className="muted-title">Infraestrutura que sustenta.</span>
          </h2>
          <div className="about-facts">
            <div>
              <strong>
                ~5<span> anos</span>
              </strong>
              <p>de experiência em TI</p>
            </div>
            <div>
              <GraduationCap size={26} />
              <p>
                Formação superior em
                <br />
                <strong className="degree-short">
                  Análise e Desenvolvimento de Sistemas
                </strong>
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal className="about-copy">
          <p>
            Minha trajetória em TI combina suporte técnico e administração de
            ambientes corporativos, com foco no ecossistema Microsoft.
          </p>
          <p>
            Atuo com infraestrutura, gerenciamento de usuários e endpoints,
            controle de acesso e troubleshooting. Busco compreender cada
            ambiente para contribuir com uma operação organizada, segura e
            alinhada às necessidades do negócio.
          </p>
          <p>
            Nos meus laboratórios, aprofundo conhecimentos em cloud, identidade
            e segurança, conectando o estudo técnico à documentação de cenários
            corporativos.
          </p>
          <a className="text-link" href="#competencias">
            Conheça minhas competências <ArrowRight size={16} />
          </a>
        </Reveal>
      </section>
      <section className="section skills-section" id="competencias">
        <div className="container">
          <Reveal>
            <SectionHeading
              index="02"
              label="COMPETÊNCIAS TÉCNICAS"
              title="Uma visão integrada de TI."
            >
              Da infraestrutura local à nuvem, com atenção à identidade, aos
              dispositivos e à proteção da informação.
            </SectionHeading>
          </Reveal>
          <div className="skills-grid">
            {skills.map(({ icon: Icon, title, text, tags }, i) => (
              <Reveal key={title} className="skill-card">
                <div className="skill-top">
                  <Icon size={28} strokeWidth={1.4} />
                  <span>0{i + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <ul>
                  {tags.map((tag) => (
                    <li key={tag}>
                      <Check size={13} />
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section container" id="projetos">
        <Reveal>
          <SectionHeading
            index="03"
            label="PROJETOS EM DESTAQUE"
            title="Conhecimento em prática."
          >
            Laboratórios e estudos de caso que exploram desafios de ambientes
            corporativos.
          </SectionHeading>
        </Reveal>
        <div className="projects-grid">
          {projects.map((project) => (
            <Reveal
              key={project.slug}
              className={`project-card${project.type === "cloud" ? " project-featured" : ""}`}
            >
              <a
                href={projectUrl(project.slug)}
                className="project-image-link"
                aria-label={`Conhecer ${project.name} — ${project.category}`}
              >
                <ProjectVisual type={project.type} />
                <span className="image-arrow">
                  <ArrowUpRight size={19} />
                </span>
              </a>
              <div className="project-body">
                {project.type === "cloud" && (
                  <p className="featured-label">PROJETO PRINCIPAL</p>
                )}
                <p className={`project-status status-${project.type}`}>
                  <span />
                  {project.status}
                </p>
                <h3>
                  {project.name}
                  <span>{project.category}</span>
                </h3>
                <p className="project-summary">{project.summary}</p>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a className="project-link" href={projectUrl(project.slug)}>
                  Ver projeto <ArrowUpRight size={17} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="projects-note">
          <BookOpen size={15} /> Cenários de laboratório e estudos de caso.
          Evidências e documentação evoluem com cada projeto.
        </p>
      </section>
      <section className="section education-section" id="formacao">
        <div className="container education-layout">
          <Reveal>
            <p className="eyebrow">
              <span>04 /</span> FORMAÇÃO E CERTIFICAÇÕES
            </p>
            <h2>
              Aprendizado contínuo.
              <br />
              <span className="muted-title">Base para evoluir.</span>
            </h2>
            <p className="education-description">
              Formação acadêmica e certificações que apoiam minha atuação em
              tecnologia.
            </p>
            <div className="degree">
              <GraduationCap size={29} strokeWidth={1.4} />
              <div>
                <span>GRADUAÇÃO</span>
                <h3>
                  Análise e Desenvolvimento
                  <br />
                  de Sistemas
                </h3>
                <p>Tecnólogo · Faculdade Impacta</p>
              </div>
            </div>
          </Reveal>
          <Reveal className="cert-list">
            {[
              ["Microsoft Certified", "Azure Fundamentals", "AZ-900"],
              ["ITIL", "ITIL 4 Foundation", "ITIL 4"],
              ["EXIN", "Information Security Foundation", "ISFS"],
              ["Aviatrix", "Multicloud Network Associate", "MCNA"],
            ].map(([issuer, name, code]) => (
              <div className="cert-row" key={code}>
                <div className="cert-icon">
                  <Award size={25} strokeWidth={1.4} />
                </div>
                <div>
                  <span>{issuer}</span>
                  <h3>{name}</h3>
                </div>
                <span className="cert-code">{code}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
      <section className="section container contact-section" id="contato">
        <Reveal className="contact-panel">
          <div className="contact-orbit" />
          <div>
            <p className="eyebrow">
              <span>05 /</span> VAMOS CONVERSAR
            </p>
            <h2>
              Boas conexões abrem
              <br />
              <span>novas possibilidades.</span>
            </h2>
            <p>
              Para conversar sobre oportunidades em TI, trocar experiências
              <br className="desktop-break" /> ou conhecer melhor meu trabalho,
              conecte-se comigo.
            </p>
            <div className="contact-actions">
              <ExternalLink href={social.linkedin} className="button primary">
                <Linkedin size={18} /> Conversar no LinkedIn{" "}
                <ArrowUpRight size={18} />
              </ExternalLink>
              <ExternalLink href={social.github} className="button secondary">
                <Github size={18} /> Explorar GitHub <ArrowUpRight size={18} />
              </ExternalLink>
            </div>
          </div>
          <div className="contact-mark" aria-hidden="true">
            <ArrowUpRight strokeWidth={0.7} />
          </div>
        </Reveal>
      </section>
    </>
  );
}
function ProjectPage({ project }: { project: Project }) {
  return (
    <>
      <section className="container project-hero">
        <a className="text-link back-link" href={`${home}#projetos`}>
          <ArrowLeft size={16} /> Todos os projetos
        </a>
        <div className="project-hero-grid">
          <div>
            <p className="eyebrow">
              PROJETO {project.number} / LABORATÓRIO & ESTUDO
            </p>
            <h1>
              {project.name}
              <span>{project.category}</span>
            </h1>
            <p className="detail-summary">{project.summary}</p>
            <p className={`project-status status-${project.type}`}>
              <span />
              {project.status}
            </p>
            <div className="tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <ProjectVisual type={project.type} large />
        </div>
      </section>
      <div className="container detail-layout">
        <aside className="detail-nav">
          <span>NESTE PROJETO</span>
          {[
            ["objetivos", "Objetivos"],
            ["arquitetura", "Arquitetura"],
            ["implementacao", "Implementação"],
            ["evidencias", "Evidências"],
            ["desafios", "Desafios"],
            ["resultados", "Resultados"],
          ].map(([id, title]) => (
            <a href={`#${id}`} key={id}>
              {title}
              <ArrowUpRight size={13} />
            </a>
          ))}
        </aside>
        <div className="detail-content">
          <section id="objetivos">
            <p className="eyebrow">01 / CONTEXTO</p>
            <h2>Objetivos do projeto</h2>
            <p>{project.objective}</p>
          </section>
          <section id="arquitetura">
            <p className="eyebrow">02 / ESTRUTURA</p>
            <h2>Arquitetura conceitual</h2>
            <p>
              Visão de referência do escopo. A topologia implementada e as
              configurações detalhadas ainda precisam ser documentadas.
            </p>
            <ol className="architecture-list">
              {project.architecture.map((item, i) => (
                <li key={item}>
                  <span>0{i + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
          </section>
          <section id="implementacao">
            <p className="eyebrow">03 / PROCESSO</p>
            <h2>Implementação e documentação</h2>
            <p>
              Etapas previstas para consolidar a apresentação técnica. Esta
              lista não comprova a execução das configurações.
            </p>
            <ul className="detail-checklist">
              {project.implementation.map((item) => (
                <li key={item}>
                  <ArrowRight size={17} />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section id="evidencias">
            <p className="eyebrow">04 / REGISTROS</p>
            <h2>Evidências técnicas</h2>
            <div className="evidence-placeholder">
              <BookOpen size={30} strokeWidth={1.3} />
              <h3>Evidências ainda não disponibilizadas</h3>
              <p>
                Espaço reservado para capturas de tela, diagramas e registros
                técnicos reais do laboratório.
              </p>
              <span>DOCUMENTAÇÃO PENDENTE</span>
            </div>
          </section>
          <section id="desafios">
            <p className="eyebrow">05 / PONTOS DE ATENÇÃO</p>
            <h2>Desafios a investigar</h2>
            <p>
              Questões orientadoras do estudo, ainda sem conclusões publicadas.
            </p>
            <ul className="detail-checklist">
              {project.challenges.map((item) => (
                <li key={item}>
                  <ArrowRight size={17} />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section id="resultados">
            <p className="eyebrow">06 / EVOLUÇÃO</p>
            <h2>Resultados e próximos passos</h2>
            <p>
              Resultados de implementação, métricas e validações ainda não foram
              disponibilizados. Esta página será atualizada à medida que a
              documentação e as evidências reais forem consolidadas.
            </p>
            <div className="result-note">
              <ShieldCheck size={22} />
              <p>
                Compromisso com a documentação: publicar somente resultados
                sustentados por evidências verificáveis.
              </p>
            </div>
          </section>
        </div>
      </div>
      <section className="container other-projects">
        <p className="eyebrow">CONTINUE EXPLORANDO</p>
        <h2>Outros projetos</h2>
        <div>
          {projects
            .filter((item) => item.slug !== project.slug)
            .map((item) => (
              <a key={item.slug} href={projectUrl(item.slug)}>
                <span>
                  {item.name}
                  <small>{item.category}</small>
                </span>
                <ArrowUpRight />
              </a>
            ))}
        </div>
      </section>
    </>
  );
}
export default function App() {
  const path = window.location.pathname;
  const relativePath = path.startsWith(home) ? path.slice(home.length) : "";
  const slug = relativePath.match(
    /^projetos\/([^/]+)(?:\/(?:index\.html)?)?$/,
  )?.[1];
  const project = projects.find((item) => item.slug === slug);
  const isHome =
    path === home || path === `${home}index.html` || path === home.slice(0, -1);
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        {project ? (
          <ProjectPage project={project} />
        ) : isHome ? (
          <HomePage />
        ) : (
          <section className="container not-found">
            <p className="eyebrow">404 / PÁGINA NÃO ENCONTRADA</p>
            <h1>Vamos voltar ao início.</h1>
            <p>
              O endereço solicitado não corresponde a uma página deste
              portfólio.
            </p>
            <a className="button primary" href={home}>
              Voltar ao portfólio <ArrowRight size={18} />
            </a>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
