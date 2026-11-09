import { Fingerprint, Monitor, Server, ShieldCheck } from "lucide-react";

export function CloudArchitecture() {
  return (
    <figure
      className="cloud-architecture"
      aria-labelledby="cloud-diagram-title"
      aria-describedby="cloud-diagram-note"
    >
      <div className="diagram-heading">
        <span>ECOSSISTEMA MICROSOFT</span>
        <span>01 / NUVEM</span>
      </div>
      <div className="cloud-stage">
        <svg
          className="cloud-perspective"
          viewBox="0 0 600 300"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="cloud-surface" x2=".8" y2="1">
              <stop stopColor="var(--cloud-top)" />
              <stop offset="1" stopColor="var(--cloud-bottom)" />
            </linearGradient>
            <linearGradient id="cloud-platform" x2="1" y2="1">
              <stop stopColor="var(--platform-top)" />
              <stop offset="1" stopColor="var(--platform-bottom)" />
            </linearGradient>
          </defs>
          <ellipse
            cx="300"
            cy="256"
            rx="217"
            ry="29"
            fill="var(--diagram-shadow)"
          />
          <path
            d="M70 202 300 95 530 202 530 222 300 292 70 222Z"
            fill="url(#cloud-platform)"
            stroke="var(--diagram-line)"
          />
          <path
            d="m70 202 230 71 230-71M300 273v19"
            fill="none"
            stroke="var(--diagram-line)"
          />
          <path
            d="M100 192 300 99 500 192 300 253Z"
            fill="var(--platform-glass)"
            stroke="var(--diagram-line)"
          />
          <path
            d="M300 150v52m-11-11 11 11 11-11"
            fill="none"
            stroke="var(--diagram-bright)"
            strokeWidth="2"
          />
          <ellipse
            cx="300"
            cy="208"
            rx="24"
            ry="8"
            fill="var(--platform-glass)"
            stroke="var(--diagram-line)"
          />
          <path
            d="M239 58c3-72 109-76 122-7 62-2 67 90 7 93H240c-66 0-67-79-1-86Z"
            transform="translate(5 9)"
            fill="var(--cloud-depth)"
            stroke="var(--diagram-line)"
          />
          <path
            d="M239 58c3-72 109-76 122-7 62-2 67 90 7 93H240c-66 0-67-79-1-86Z"
            fill="url(#cloud-surface)"
            stroke="var(--cloud-top)"
          />
          <path
            d="M279 65h18v18h-18zm23 0h18v18h-18zm-23 23h18v18h-18zm23 0h18v18h-18z"
            fill="#165578"
          />
        </svg>
        <div className="cloud-label">
          <strong id="cloud-diagram-title">Microsoft Cloud</strong>
          <span>Plataforma de serviços em nuvem</span>
        </div>
        <span className="cloud-service">Microsoft 365</span>
      </div>
      <div className="management-group">
        <p className="diagram-level">02 / IDENTIDADE E GERENCIAMENTO</p>
        <div className="diagram-pair">
          <div className="diagram-node">
            <Fingerprint aria-hidden="true" />
            <span className="node-category">Identidade</span>
            <strong>Microsoft Entra ID</strong>
            <span>Identidade e acesso</span>
          </div>
          <div className="diagram-node">
            <ShieldCheck aria-hidden="true" />
            <span className="node-category">Dispositivos</span>
            <strong>Microsoft Intune</strong>
            <span>Gestão e proteção</span>
          </div>
        </div>
      </div>
      <div className="diagram-connections" aria-hidden="true">
        <span className="hybrid-link">Integração híbrida opcional</span>
        <span className="managed-link">Gerenciamento ↓</span>
      </div>
      <div className="local-group">
        <p className="diagram-level">03 / INFRAESTRUTURA E DISPOSITIVOS</p>
        <div className="diagram-pair">
          <div className="diagram-node local-node">
            <Server aria-hidden="true" />
            <span className="node-category">Infraestrutura local</span>
            <strong>Windows Server</strong>
            <span>Serviços corporativos</span>
          </div>
          <div className="diagram-node local-node">
            <Monitor aria-hidden="true" />
            <span className="node-category">Endpoints</span>
            <strong>Dispositivos gerenciados</strong>
            <span>Protegidos com Intune</span>
          </div>
        </div>
      </div>
      <div className="diagram-security">
        <ShieldCheck size={16} aria-hidden="true" /> Segurança em cada camada
      </div>
      <figcaption id="cloud-diagram-note">
        Arquitetura conceitual. A integração entre identidade local e nuvem é
        opcional; o Intune gerencia os endpoints. Não representa um ambiente
        implementado.
      </figcaption>
    </figure>
  );
}
