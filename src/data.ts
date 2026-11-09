export const social = {
  github: "https://github.com/dalmeidait",
  linkedin: "https://www.linkedin.com/in/danielbarrosalmeida/",
};
export interface Project {
  slug: string;
  number: string;
  name: string;
  category: string;
  status: string;
  summary: string;
  tags: string[];
  type: "cloud" | "server" | "migration";
  objective: string;
  architecture: string[];
  implementation: string[];
  challenges: string[];
}
export const projects: Project[] = [
  {
    slug: "avanceos-microsoft-365",
    number: "01",
    name: "AvanceOS",
    category: "Microsoft 365",
    status: "Em desenvolvimento",
    type: "cloud",
    summary:
      "Um laboratório corporativo para explorar identidade, acesso e gerenciamento de dispositivos na nuvem Microsoft.",
    tags: ["Microsoft 365", "Entra ID", "Intune"],
    objective:
      "Estruturar um laboratório corporativo fictício para estudar a administração e a proteção de ambientes Microsoft 365, conectando identidade, acesso, dispositivos e serviços cloud. Este projeto é independente do ERP chamado AvanceOS.",
    architecture: [
      "Identidade e acesso · Microsoft Entra ID",
      "Gerenciamento de dispositivos · Microsoft Intune",
      "Serviços corporativos · Microsoft 365",
    ],
    implementation: [
      "Documentar a estrutura do ambiente de laboratório e seus requisitos.",
      "Detalhar o gerenciamento de usuários, grupos e permissões.",
      "Registrar políticas de acesso e gerenciamento de dispositivos, com evidências verificáveis.",
    ],
    challenges: [
      "Organizar controles de identidade e acesso de forma coerente com o cenário fictício.",
      "Equilibrar proteção e experiência de uso nas políticas do laboratório.",
    ],
  },
  {
    slug: "oficina-avance-on-premises",
    number: "02",
    name: "Oficina Avance",
    category: "On-Premises",
    status: "Projeto de laboratório",
    type: "server",
    summary:
      "Infraestrutura local com Windows Server e Active Directory, organizada para um cenário empresarial fictício.",
    tags: ["Windows Server", "Active Directory", "GPO"],
    objective:
      "Estudar uma infraestrutura corporativa local baseada em Windows Server e Active Directory, com foco em administração de usuários, grupos, recursos e serviços internos.",
    architecture: [
      "Serviços de diretório · Active Directory",
      "Infraestrutura local · Windows Server e DNS",
      "Administração de recursos · Usuários, grupos e GPO",
    ],
    implementation: [
      "Consolidar a documentação da topologia e dos serviços do laboratório.",
      "Descrever a organização de usuários, grupos e recursos internos.",
      "Adicionar os procedimentos e as evidências das configurações realizadas.",
    ],
    challenges: [
      "Definir uma organização de diretório compatível com o cenário empresarial.",
      "Documentar dependências entre serviços e procedimentos de troubleshooting.",
    ],
  },
  {
    slug: "oficina-avance-migracao",
    number: "03",
    name: "Oficina Avance",
    category: "Migração Microsoft 365",
    status: "Documentação em consolidação",
    type: "migration",
    summary:
      "Um estudo de caso sobre a transição de serviços e recursos locais para o ecossistema Microsoft 365.",
    tags: ["Microsoft 365", "Cloud", "Migração"],
    objective:
      "Documentar um estudo de caso sobre a migração de serviços e recursos de uma infraestrutura tradicional para Microsoft 365, considerando dependências e continuidade dos serviços.",
    architecture: [
      "Origem · Infraestrutura tradicional",
      "Transição · Planejamento e dependências",
      "Destino · Serviços Microsoft 365",
    ],
    implementation: [
      "Consolidar o inventário e o escopo do estudo de caso.",
      "Descrever as etapas previstas de transição e suas dependências.",
      "Registrar critérios de validação e evidências quando disponíveis.",
    ],
    challenges: [
      "Mapear dependências dos serviços antes da transição.",
      "Planejar a continuidade e documentar critérios de validação.",
    ],
  },
];
