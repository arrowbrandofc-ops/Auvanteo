import type { ReactNode } from "react";

/*
 * Molduras de dispositivo e ecrãs dos conceitos demonstrativos.
 * As marcas Atlas, Aurora e Mercado Local são fictícias (exercícios de design),
 * por isso os ecrãs usam ilustrações vetoriais em vez de fotografias de clientes.
 * Cada ecrã escala com o tamanho da moldura (unidades cqw + em).
 */

export function Laptop({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="rounded-t-[1.1rem] border border-[#2c3d52] bg-[#05080c] p-[1.6%] pb-[2.2%] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
        <div className="@container relative aspect-[16/10] overflow-hidden rounded-[0.35rem] bg-white">
          {children}
        </div>
      </div>
      <div className="relative mx-[-6%] h-[0.9rem] rounded-b-[1.2rem] bg-gradient-to-b from-[#3a4a5e] to-[#1a2532] sm:h-[1.1rem]">
        <span className="absolute left-1/2 top-0 h-[35%] w-[14%] -translate-x-1/2 rounded-b-md bg-[#101a26]" />
      </div>
    </div>
  );
}

export function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[14%/6.5%] border border-[#2c3d52] bg-[#05080c] p-[3.5%] shadow-[0_40px_70px_-30px_rgba(0,0,0,0.95)] ${className}`}
    >
      <div className="@container relative aspect-[9/19] overflow-hidden rounded-[11%/5.2%] bg-white">
        <span className="absolute left-1/2 top-[1.6%] z-10 h-[2.6%] w-[30%] -translate-x-1/2 rounded-full bg-[#05080c]" />
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ilustrações                                                          */
/* ------------------------------------------------------------------ */

function KitchenArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="k-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3f46" />
          <stop offset="1" stopColor="#24282d" />
        </linearGradient>
        <linearGradient id="k-win" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6d9b4" />
          <stop offset="1" stopColor="#e8a46a" />
        </linearGradient>
        <linearGradient id="k-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b47a4b" />
          <stop offset="1" stopColor="#8a5631" />
        </linearGradient>
        <radialGradient id="k-glow" cx="0.5" cy="0" r="0.8">
          <stop offset="0" stopColor="#ffb36b" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffb36b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#k-wall)" />
      <rect x="250" y="40" width="110" height="120" rx="2" fill="url(#k-win)" />
      <path d="M305 40v120M250 100h110" stroke="#2b2f35" strokeWidth="4" />
      {/* armários superiores */}
      <g fill="#d9cbb6">
        <rect x="30" y="40" width="58" height="80" rx="2" />
        <rect x="92" y="40" width="58" height="80" rx="2" />
        <rect x="154" y="40" width="58" height="80" rx="2" />
      </g>
      <g stroke="#bfae96" strokeWidth="2">
        <path d="M80 70v20M98 70v20M204 70v20" />
      </g>
      {/* bancada */}
      <rect x="20" y="170" width="360" height="10" fill="#e9e4dc" />
      <rect x="20" y="180" width="360" height="70" fill="#2e3238" />
      <g stroke="#3d424a" strokeWidth="2">
        <path d="M110 180v70M200 180v70M290 180v70" />
      </g>
      {/* ilha */}
      <rect x="70" y="232" width="260" height="12" fill="#f1ece4" />
      <rect x="80" y="244" width="240" height="56" fill="url(#k-wood)" />
      {/* candeeiros */}
      <g>
        <ellipse cx="200" cy="150" rx="170" ry="90" fill="url(#k-glow)" />
        {[140, 200, 260].map((x) => (
          <g key={x}>
            <path d={`M${x} 0v128`} stroke="#14171b" strokeWidth="1.5" />
            <path d={`M${x - 14} 142a14 14 0 0 1 28 0z`} fill="#14171b" />
            <circle cx={x} cy="143" r="4" fill="#ffd29c" />
          </g>
        ))}
      </g>
      {/* planta */}
      <path d="M345 170c-6-18 4-30 12-34-2 12 0 22-4 34zM352 170c4-14 16-20 24-20-6 8-10 16-18 20z" fill="#5c7a55" />
    </svg>
  );
}

function ArchArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 400" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="a-arch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9b2a4" />
          <stop offset="1" stopColor="#efe0d8" />
        </linearGradient>
      </defs>
      <rect width="300" height="400" fill="#f4ebe6" />
      <path d="M40 400V170a110 110 0 0 1 220 0v230z" fill="url(#a-arch)" />
      <circle cx="190" cy="150" r="38" fill="#f6e3d6" opacity="0.9" />
      {/* vaso e ramos */}
      <path d="M118 400c-6-40 0-70 32-80 32 10 38 40 32 80z" fill="#8a4b45" />
      <g stroke="#6f7d5a" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M150 322c-4-60-30-100-56-120" />
        <path d="M152 322c6-70 30-110 60-130" />
        <path d="M150 322c0-50 4-90 0-150" />
      </g>
      <g fill="#8c9a6e">
        <ellipse cx="100" cy="212" rx="12" ry="5" transform="rotate(-35 100 212)" />
        <ellipse cx="122" cy="246" rx="12" ry="5" transform="rotate(-50 122 246)" />
        <ellipse cx="198" cy="206" rx="12" ry="5" transform="rotate(35 198 206)" />
        <ellipse cx="180" cy="240" rx="12" ry="5" transform="rotate(50 180 240)" />
        <ellipse cx="150" cy="180" rx="5" ry="12" />
        <ellipse cx="150" cy="222" rx="5" ry="11" />
      </g>
    </svg>
  );
}

type ProductKind = "azeite" | "queijo" | "mel" | "conservas";

function ProductArt({ kind }: { kind: ProductKind }) {
  return (
    <svg viewBox="0 0 120 90" className="h-full w-full" aria-hidden>
      <rect width="120" height="90" fill={kind === "queijo" || kind === "conservas" ? "#e6dcc6" : "#dfe3cf"} />
      {kind === "azeite" && (
        <g>
          <rect x="52" y="12" width="16" height="10" rx="2" fill="#24402f" />
          <path d="M50 22h20l4 14v44H46V36z" fill="#5f7a3a" />
          <rect x="49" y="46" width="22" height="20" fill="#f1ede1" />
          <rect x="53" y="52" width="14" height="2" fill="#b0472c" />
          <rect x="53" y="57" width="10" height="2" fill="#24402f" />
        </g>
      )}
      {kind === "queijo" && (
        <g>
          <path d="M28 64l50-30 16 10v20z" fill="#f2cf7a" />
          <path d="M28 64h66v8H28z" fill="#d9aa45" />
          <circle cx="62" cy="54" r="4" fill="#d9aa45" />
          <circle cx="78" cy="58" r="3" fill="#d9aa45" />
        </g>
      )}
      {kind === "mel" && (
        <g>
          <rect x="44" y="18" width="32" height="10" rx="2" fill="#8a5631" />
          <rect x="40" y="28" width="40" height="48" rx="6" fill="#e3a43a" />
          <rect x="46" y="42" width="28" height="18" fill="#f1ede1" />
          <rect x="50" y="48" width="20" height="2" fill="#24402f" />
        </g>
      )}
      {kind === "conservas" && (
        <g>
          <rect x="24" y="34" width="72" height="30" rx="8" fill="#b0472c" />
          <rect x="24" y="30" width="72" height="8" rx="4" fill="#c9cfd4" />
          <path d="M40 49c8-6 20-6 28 0-8 6-20 6-28 0z" fill="#f1ede1" />
          <path d="M68 49l8-5v10z" fill="#f1ede1" />
        </g>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Atlas Remodelações (fictício)                                        */
/* ------------------------------------------------------------------ */

const ATLAS_LABEL =
  "Conceito fictício Atlas Remodelações: cabeçalho escuro, título forte, fotografia de cozinha e serviços numerados";

export function AtlasDesktop() {
  return (
    <div role="img" aria-label={ATLAS_LABEL} className="absolute inset-0 bg-atlas text-[1.45cqw] text-white">
      <div className="flex items-center justify-between px-[2.4em] py-[1.2em] text-[0.8em]">
        <span className="font-black tracking-[0.18em]">
          ATLAS<span className="text-atlas-accent">.</span>
        </span>
        <span className="flex gap-[2em] text-white/60">
          <span>Serviços</span>
          <span>Obras</span>
          <span>Sobre</span>
          <span>Contactos</span>
        </span>
        <span className="rounded-[0.3em] bg-atlas-accent px-[1em] py-[0.5em] font-bold text-atlas">
          Pedir visita
        </span>
      </div>
      <div className="grid h-[68%] grid-cols-[1fr_1.1fr] items-center gap-[2.4em] px-[2.4em]">
        <div>
          <p className="text-[0.62em] font-semibold uppercase tracking-[0.25em] text-atlas-accent">
            Remodelações · Lisboa e arredores
          </p>
          <p className="mt-[0.6em] text-[3em] font-black uppercase leading-[0.92] tracking-tight">
            Obras bem feitas, prazos cumpridos.
          </p>
          <p className="mt-[1em] max-w-[24em] text-[0.75em] leading-relaxed text-white/60">
            Cozinhas, casas de banho e remodelações completas, com orçamento detalhado antes de
            começar.
          </p>
          <div className="mt-[1.4em] flex gap-[0.6em] text-[0.72em] font-bold">
            <span className="rounded-[0.3em] bg-atlas-accent px-[1.2em] py-[0.7em] text-atlas">
              Pedir orçamento
            </span>
            <span className="rounded-[0.3em] border border-white/25 px-[1.2em] py-[0.7em]">
              Ver obras
            </span>
          </div>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-[0.4em]">
          <KitchenArt className="h-full w-full" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 grid grid-cols-4 border-t border-white/10 bg-atlas-2 text-[0.7em]">
        {["Cozinhas", "Casas de banho", "Pavimentos", "Chave na mão"].map((s, i) => (
          <div key={s} className="border-r border-white/10 px-[1.6em] py-[1.2em] last:border-0">
            <span className="text-atlas-accent">0{i + 1}</span>
            <p className="mt-[0.3em] font-bold">{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AtlasMobile() {
  return (
    <div role="img" aria-label={ATLAS_LABEL} className="absolute inset-0 bg-atlas text-[4.4cqw] text-white">
      <div className="flex items-center justify-between px-[1.3em] pb-[0.8em] pt-[2.6em] text-[0.8em]">
        <span className="font-black tracking-[0.18em]">
          ATLAS<span className="text-atlas-accent">.</span>
        </span>
        <span className="flex flex-col gap-[0.25em]">
          <i className="block h-[0.12em] w-[1.3em] bg-white" />
          <i className="block h-[0.12em] w-[1.3em] bg-white" />
        </span>
      </div>
      <div className="mx-[1.3em] aspect-[4/3] overflow-hidden rounded-[0.4em]">
        <KitchenArt className="h-full w-full" />
      </div>
      <div className="px-[1.3em] pt-[1em]">
        <p className="text-[0.55em] font-semibold uppercase tracking-[0.22em] text-atlas-accent">
          Remodelações · Lisboa
        </p>
        <p className="mt-[0.4em] text-[1.65em] font-black uppercase leading-[0.95]">
          Obras bem feitas, prazos cumpridos.
        </p>
        <p className="mt-[0.7em] text-[0.68em] leading-relaxed text-white/60">
          Orçamento detalhado antes de começar.
        </p>
        <span className="mt-[1em] block rounded-[0.3em] bg-atlas-accent py-[0.8em] text-center text-[0.75em] font-bold text-atlas">
          Pedir orçamento
        </span>
      </div>
      <div className="mt-[1.2em] grid grid-cols-2 gap-px bg-white/10 text-[0.62em]">
        {["Cozinhas", "Casas de banho", "Pavimentos", "Chave na mão"].map((s, i) => (
          <div key={s} className="bg-atlas-2 px-[1.6em] py-[1em]">
            <span className="text-atlas-accent">0{i + 1}</span>
            <p className="font-bold">{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Aurora Studio (fictício)                                             */
/* ------------------------------------------------------------------ */

const AURORA_LABEL =
  "Conceito fictício Aurora Studio: tons rosados, tipografia serifada, arco decorativo e lista de tratamentos";

const TREATMENTS = [
  ["Limpeza de pele", "60 min"],
  ["Massagem relaxante", "50 min"],
  ["Manicure", "45 min"],
] as const;

export function AuroraDesktop() {
  return (
    <div role="img" aria-label={AURORA_LABEL} className="absolute inset-0 bg-aurora text-[1.45cqw] text-aurora-accent">
      <div className="flex items-center justify-between px-[2.4em] py-[1.2em] text-[0.75em]">
        <span className="font-serif text-[1.6em] italic">Aurora</span>
        <span className="flex gap-[2em] opacity-70">
          <span>Tratamentos</span>
          <span>O espaço</span>
          <span>Contactos</span>
        </span>
        <span className="rounded-full border border-aurora-accent px-[1.1em] py-[0.45em]">Marcar</span>
      </div>
      <div className="grid h-[82%] grid-cols-[1.15fr_1fr] gap-[2em] px-[2.4em]">
        <div className="flex flex-col justify-center">
          <p className="text-[0.62em] uppercase tracking-[0.3em] opacity-70">Estética · Porto</p>
          <p className="mt-[0.4em] font-serif text-[3.3em] leading-[0.98]">
            O seu ritual <em>de calma.</em>
          </p>
          <p className="mt-[0.9em] max-w-[22em] text-[0.75em] leading-relaxed opacity-80">
            Tratamentos de rosto e corpo num espaço pensado para abrandar.
          </p>
          <div className="mt-[1.4em] space-y-[0.5em] text-[0.7em]">
            {TREATMENTS.map(([t, d]) => (
              <div key={t} className="flex justify-between border-b border-aurora-accent/25 pb-[0.5em]">
                <span>{t}</span>
                <span className="opacity-60">{d}</span>
              </div>
            ))}
          </div>
          <span className="mt-[1.4em] self-start rounded-full bg-aurora-accent px-[1.4em] py-[0.7em] text-[0.7em] text-aurora">
            Marcar tratamento
          </span>
        </div>
        <div className="overflow-hidden rounded-t-full">
          <ArchArt className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}

export function AuroraMobile() {
  return (
    <div role="img" aria-label={AURORA_LABEL} className="absolute inset-0 bg-aurora text-[4.4cqw] text-aurora-accent">
      <div className="flex items-center justify-between px-[1.3em] pb-[0.6em] pt-[2.6em]">
        <span className="font-serif text-[1.25em] italic">Aurora</span>
        <span className="text-[0.6em] tracking-[0.25em]">MENU</span>
      </div>
      <div className="mx-[1.3em] h-[34%] overflow-hidden rounded-t-full">
        <ArchArt className="h-full w-full" />
      </div>
      <div className="px-[1.3em] pt-[0.9em]">
        <p className="font-serif text-[1.9em] leading-[0.98]">
          O seu ritual <em>de calma.</em>
        </p>
        <div className="mt-[0.9em] space-y-[0.45em] text-[0.62em]">
          {TREATMENTS.map(([t, d]) => (
            <div key={t} className="flex justify-between border-b border-aurora-accent/25 pb-[0.45em]">
              <span>{t}</span>
              <span className="opacity-60">{d}</span>
            </div>
          ))}
        </div>
        <span className="mt-[1.1em] block rounded-full bg-aurora-accent py-[0.8em] text-center text-[0.7em] text-aurora">
          Marcar tratamento
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mercado Local (fictício)                                             */
/* ------------------------------------------------------------------ */

const MERCADO_LABEL =
  "Conceito fictício Mercado Local: loja de produtos portugueses com destaque, grelha de produtos e preços";

const PRODUCTS: [ProductKind, string, string][] = [
  ["azeite", "Azeite virgem extra", "12,90 €"],
  ["queijo", "Queijo curado", "8,50 €"],
  ["mel", "Mel de rosmaninho", "6,20 €"],
  ["conservas", "Sardinhas em azeite", "4,75 €"],
];

export function MercadoDesktop() {
  return (
    <div role="img" aria-label={MERCADO_LABEL} className="absolute inset-0 bg-mercado text-[1.45cqw] text-mercado-ink">
      <div className="flex items-center justify-between border-b-[0.12em] border-mercado-ink px-[2.4em] py-[1em] text-[0.75em]">
        <span className="font-serif text-[1.55em] font-semibold">Mercado Local</span>
        <span className="flex gap-[2em]">
          <span>Mercearia</span>
          <span>Queijos</span>
          <span>Cabazes</span>
        </span>
        <span className="font-bold">Cesto (2)</span>
      </div>
      <div className="mx-[2.4em] mt-[1.4em] grid grid-cols-[1.3fr_1fr] overflow-hidden rounded-[0.4em] bg-mercado-accent text-mercado">
        <div className="px-[1.8em] py-[1.6em]">
          <p className="text-[0.6em] uppercase tracking-[0.25em] opacity-80">Do produtor à sua mesa</p>
          <p className="mt-[0.4em] font-serif text-[2.2em] leading-[1.02]">
            Sabores de Portugal, entregues em casa.
          </p>
          <span className="mt-[1em] inline-block rounded-full bg-mercado px-[1.2em] py-[0.55em] text-[0.68em] font-bold text-mercado-accent">
            Ver produtos
          </span>
        </div>
        <div className="grid grid-cols-2">
          <ProductArt kind="azeite" />
          <ProductArt kind="queijo" />
        </div>
      </div>
      <div className="mx-[2.4em] mt-[1.4em] grid grid-cols-4 gap-[1em]">
        {PRODUCTS.map(([k, n, p]) => (
          <div key={n} className="text-[0.68em]">
            <div className="aspect-[4/3] overflow-hidden rounded-[0.3em]">
              <ProductArt kind={k} />
            </div>
            <p className="mt-[0.5em] font-semibold">{n}</p>
            <div className="flex justify-between">
              <span>{p}</span>
              <span className="font-bold text-mercado-accent">Adicionar</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MercadoMobile() {
  return (
    <div role="img" aria-label={MERCADO_LABEL} className="absolute inset-0 bg-mercado text-[4.4cqw] text-mercado-ink">
      <div className="flex items-center justify-between border-b-[0.1em] border-mercado-ink px-[1.3em] pb-[0.6em] pt-[2.6em] text-[0.7em]">
        <span className="font-serif text-[1.5em] font-semibold">Mercado Local</span>
        <span className="font-bold">Cesto (2)</span>
      </div>
      <div className="mx-[1.3em] mt-[1em] rounded-[0.4em] bg-mercado-accent px-[1em] py-[1em] text-mercado">
        <p className="text-[0.5em] uppercase tracking-[0.22em] opacity-80">Do produtor à sua mesa</p>
        <p className="mt-[0.3em] font-serif text-[1.3em] leading-[1.05]">
          Sabores de Portugal, entregues em casa.
        </p>
      </div>
      <div className="mx-[1.3em] mt-[1em] grid grid-cols-2 gap-[0.7em]">
        {PRODUCTS.map(([k, n, p]) => (
          <div key={n} className="text-[0.58em]">
            <div className="aspect-[4/3] overflow-hidden rounded-[0.3em]">
              <ProductArt kind={k} />
            </div>
            <p className="mt-[0.4em] font-semibold leading-tight">{n}</p>
            <p className="flex justify-between">
              <span>{p}</span>
              <span className="font-bold text-mercado-accent">+</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
