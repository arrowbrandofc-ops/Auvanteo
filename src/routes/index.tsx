import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check, Copy, Instagram, Menu, MessageCircle, Plus, X } from "lucide-react";
import {
  AtlasDesktop,
  AtlasMobile,
  AuroraDesktop,
  AuroraMobile,
  Laptop,
  MercadoDesktop,
  MercadoMobile,
  Phone,
} from "@/components/Mockups";
import { BrandLockup } from "@/components/BrandMark";
import { Diagnostico } from "@/components/Diagnostico";
import { trackEvent } from "@/lib/analytics";
import {
  buildQuoteMessage,
  buildWhatsAppLink,
  INSTAGRAM_DM_URL,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY_NUMBER,
  whatsappLink,
  whatsappNumber,
} from "@/lib/contact";

const TITLE = "AUVANTEO Digital Studio | Websites profissionais para empresas em Portugal";
const DESC =
  "Criamos websites profissionais para empresas e profissionais em Portugal: design cuidado, adaptados ao telemóvel e pensados para receber contactos. Planos desde 279 €.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_PT" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "AUVANTEO Digital Studio",
          description:
            "Estúdio de criação de websites para pequenas empresas e profissionais em Portugal. Atendimento remoto.",
          sameAs: [INSTAGRAM_URL],
          areaServed: { "@type": "Country", name: "Portugal" },
        }),
      },
    ],
  }),
  component: Index,
});

const NAV = [
  ["servicos", "Serviços"],
  ["portfolio", "Portfólio"],
  ["processo", "Processo"],
  ["planos", "Planos"],
  ["faq", "Perguntas"],
] as const;

const btn =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-center text-[15px] font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";
const btnPrimary = `${btn} bg-electric text-[#0B1017] hover:bg-[#3d93ff]`;
const btnGhost = `${btn} border border-line text-ice hover:border-steel hover:bg-white/[0.03]`;

const wrap = "mx-auto w-full max-w-[1200px] px-5 sm:px-8";

function waFor(message: string) {
  return buildWhatsAppLink(whatsappNumber, message) ?? whatsappLink ?? INSTAGRAM_DM_URL;
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-background/80 backdrop-blur-md">
      <div className={`${wrap} flex h-16 items-center justify-between`}>
        <a href="#topo" className="inline-flex" aria-label="AUVANTEO, voltar ao início">
          <BrandLockup />
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-8 text-sm lg:flex">
          {NAV.map(([id, l]) => (
            <a key={id} href={`#${id}`} className="text-steel transition-colors hover:text-ice">
              {l}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <a href="#contactos" className={`${btnPrimary} min-h-10 px-5 text-sm`}>
            Pedir orçamento
          </a>
        </div>
        <button
          className="-mr-2 grid size-11 place-items-center lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav aria-label="Menu móvel" className="border-t border-line bg-background px-5 pb-6 lg:hidden">
          {NAV.map(([id, l]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className="block border-b border-line/70 py-4 font-display text-2xl"
            >
              {l}
            </a>
          ))}
          <a href="#contactos" onClick={() => setOpen(false)} className={`${btnPrimary} mt-6 w-full`}>
            Pedir orçamento
          </a>
        </nav>
      )}
    </header>
  );
}

/** Barra fixa no fundo, apenas em telemóvel: o WhatsApp é o canal principal. */
function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-background/95 px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="flex gap-2">
        <a
          href={waFor("Olá! Gostava de pedir um orçamento para um website.")}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnPrimary} min-w-0 flex-1 px-4`}
          onClick={() => trackEvent("lead_contact_clicked", { channel: "whatsapp", origem: "cta_fixo" })}
        >
          <MessageCircle className="size-4" /> Pedir orçamento
        </a>
        <a
          href={INSTAGRAM_DM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Enviar mensagem no Instagram"
          className={`${btnGhost} w-12 shrink-0 !px-0`}
          onClick={() => trackEvent("lead_contact_clicked", { channel: "instagram", origem: "cta_fixo" })}
        >
          <Instagram className="size-4" />
        </a>
      </div>
    </div>
  );
}

function SectionHead({ kicker, title, children }: { kicker: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <p className="kicker">{kicker}</p>
        <h2 className="mt-4 font-display text-[2.25rem] leading-[1.05] sm:text-5xl">{title}</h2>
      </div>
      {children && <div className="text-lg leading-relaxed text-steel lg:col-span-5">{children}</div>}
    </div>
  );
}

const FACTS = [
  ["Desde 279 €", "Planos com preço de partida claro."],
  ["Telemóvel primeiro", "Cada página é desenhada para o ecrã pequeno."],
  ["Proposta escrita", "Âmbito, prazo e valor definidos antes de começar."],
  ["Atendimento remoto", "Por WhatsApp, Instagram ou videochamada."],
];

const SERVICES = [
  {
    t: "Website de página única",
    d: "Uma página bem organizada que explica o que faz, mostra os seus serviços e leva o visitante ao contacto.",
    plan: "Start",
  },
  {
    t: "Website empresarial",
    d: "Até cinco páginas, com espaço para apresentar a empresa, detalhar serviços e receber pedidos.",
    plan: "Business",
  },
  {
    t: "Redesign de website",
    d: "Renovamos um website antigo: nova imagem, textos mais claros e uma navegação que funciona no telemóvel.",
    plan: "Business ou Premium",
  },
  {
    t: "Projetos à medida",
    d: "Secções e componentes personalizados, integrações viáveis e revisão de desempenho e SEO.",
    plan: "Premium",
  },
];

const CONCEPTS = [
  {
    name: "Atlas Remodelações",
    sector: "Remodelações e construção",
    notes:
      "Para uma empresa de obras, o visitante quer saber se trabalham na sua zona e como pedir um orçamento. O título diz isso logo, e o botão de visita está sempre à mão.",
    points: ["Título direto com a zona de atuação", "Serviços numerados e fáceis de ler", "Pedido de visita fixo no topo"],
    Desktop: AtlasDesktop,
    Mobile: AtlasMobile,
  },
  {
    name: "Aurora Studio",
    sector: "Estética e bem-estar",
    notes:
      "Num espaço de estética, o tom conta tanto como a informação. Tipografia serifada, tons suaves e uma lista de tratamentos com duração e marcação num toque.",
    points: ["Identidade calma e reconhecível", "Tratamentos com duração visível", "Marcação em destaque no telemóvel"],
    Desktop: AuroraDesktop,
    Mobile: AuroraMobile,
  },
  {
    name: "Mercado Local",
    sector: "Comércio local",
    notes:
      "Uma mercearia de produtos portugueses precisa de mostrar o produto e o preço sem rodeios. Grelha limpa, preços claros e o cesto sempre visível.",
    points: ["Produtos e preços sem distrações", "Destaque para a origem portuguesa", "Cesto acessível em qualquer página"],
    Desktop: MercadoDesktop,
    Mobile: MercadoMobile,
  },
];

const STEPS = [
  ["Contacto e necessidades", "Conversamos sobre o seu negócio, o público e o que o website tem de fazer."],
  ["Proposta e estrutura", "Recebe uma proposta escrita com páginas, prazo, valor e número de revisões."],
  ["Design e desenvolvimento", "Desenhamos e construímos o website, e vai acompanhando a evolução."],
  ["Revisão e entrega", "Aplicamos os ajustes acordados, testamos em vários dispositivos e publicamos."],
];

const PLANS = [
  {
    name: "Start",
    price: "279",
    desc: "Para começar com uma presença profissional.",
    items: [
      "Website de página única",
      "Design adaptado à sua marca",
      "Adaptado a telemóvel e computador",
      "Secção de serviços e de contacto",
      "Botão de WhatsApp",
      "Configuração inicial de SEO",
    ],
  },
  {
    name: "Business",
    price: "499",
    desc: "Para empresas que precisam de explicar melhor o que fazem.",
    featured: true,
    items: [
      "Até cinco páginas",
      "Página de apresentação da empresa",
      "Serviços organizados por página",
      "Contactos e formulário",
      "Estrutura básica de SEO",
      "Navegação pensada para o visitante",
    ],
  },
  {
    name: "Premium",
    price: "799",
    desc: "Para projetos com necessidades próprias.",
    items: [
      "Estrutura de website mais avançada",
      "Design e componentes personalizados",
      "Páginas e secções adicionais",
      "Integrações tecnicamente viáveis",
      "Experiência mobile detalhada",
      "Revisão de desempenho e SEO",
    ],
  },
];

const FAQ = [
  [
    "Quanto custa um website?",
    "Os planos começam em 279 € (Start), 499 € (Business) e 799 € (Premium). São valores de partida: o valor final depende do âmbito e fica fechado na proposta, antes de qualquer compromisso.",
  ],
  [
    "Quanto tempo demora?",
    "Depende do plano e de quando os conteúdos ficam prontos. O prazo estimado está sempre escrito na proposta.",
  ],
  [
    "O domínio e o alojamento estão incluídos?",
    "Não. Domínio, alojamento, integrações pagas e manutenção são orçamentados à parte. Ajudamos a escolher e tratamos da configuração, se preferir.",
  ],
  [
    "Que conteúdos tenho de enviar?",
    "Textos sobre o negócio, logótipo, fotografias e contactos. Se ainda não tiver tudo, dizemos exatamente o que falta e ajudamos a organizar.",
  ],
  [
    "Posso pedir alterações ao design?",
    "Sim. A proposta indica quantas rondas de revisão estão incluídas, e vai vendo o website antes de ser publicado.",
  ],
  [
    "Como funciona o pagamento?",
    "As condições de pagamento ficam definidas na proposta, antes de o trabalho começar.",
  ],
  [
    "E depois de o website estar publicado?",
    "Entregamos as instruções acordadas. Manutenção, atualizações e melhorias podem ser contratadas à parte, se fizer sentido para si.",
  ],
  [
    "Trabalham presencialmente?",
    "Não. Todo o atendimento é remoto, por WhatsApp, Instagram ou videochamada, para negócios de qualquer ponto do país.",
  ],
];

function QuoteBuilder() {
  const [f, setF] = useState({ nome: "", negocio: "", plano: "Ainda não sei", detalhes: "" });
  const [copied, setCopied] = useState(false);
  const text = buildQuoteMessage(f);
  const waLink = buildWhatsAppLink(whatsappNumber, text);
  const input =
    "mt-1.5 block w-full rounded-lg border border-line bg-background/60 px-3.5 py-3 text-base text-ice placeholder:text-steel/70 focus:border-electric focus:outline-none sm:text-sm";
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Sem permissão de clipboard: o texto continua visível e selecionável.
    }
  };
  return (
    <div className="min-w-0 rounded-2xl border border-line bg-background/70 p-5 sm:p-7">
      <p className="font-semibold">Pedido de orçamento</p>
      <p className="mt-1 text-sm text-steel">
        Preencha o que quiser. A mensagem abre no seu WhatsApp e só é enviada quando carregar em enviar.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-steel">
          Nome
          <input
            className={input}
            maxLength={100}
            autoComplete="name"
            value={f.nome}
            onChange={(e) => setF({ ...f, nome: e.target.value })}
          />
        </label>
        <label className="text-sm text-steel">
          Negócio ou atividade
          <input
            className={input}
            maxLength={100}
            value={f.negocio}
            onChange={(e) => setF({ ...f, negocio: e.target.value })}
          />
        </label>
        <label className="text-sm text-steel sm:col-span-2">
          Plano
          <select className={input} value={f.plano} onChange={(e) => setF({ ...f, plano: e.target.value })}>
            {["Ainda não sei", "Start", "Business", "Premium", "Redesign"].map((o) => (
              <option key={o} className="bg-background text-ice">
                {o}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm text-steel sm:col-span-2">
          O que precisa?
          <textarea
            rows={3}
            maxLength={1000}
            className={input}
            placeholder="Ex.: website com 3 páginas para uma empresa de limpezas em Braga"
            value={f.detalhes}
            onChange={(e) => setF({ ...f, detalhes: e.target.value })}
          />
        </label>
      </div>
      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row lg:flex-col xl:flex-row">
        {waLink && (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnPrimary} flex-1 whitespace-nowrap px-5`}
            onClick={() => trackEvent("lead_contact_clicked", { channel: "whatsapp", origem: "formulario" })}
          >
            <MessageCircle className="size-4" /> Enviar pelo WhatsApp
          </a>
        )}
        <button type="button" onClick={copy} className={`${btnGhost} whitespace-nowrap px-5`}>
          {copied ? (
            <>
              <Check className="size-4" /> Copiada
            </>
          ) : (
            <>
              <Copy className="size-4" /> Copiar mensagem
            </>
          )}
        </button>
      </div>
      <p className="mt-3 text-xs text-steel">
        Prefere o Instagram? Copie a mensagem e cole-a numa conversa com{" "}
        <a
          href={INSTAGRAM_DM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ice underline underline-offset-2"
          onClick={() => trackEvent("lead_contact_clicked", { channel: "instagram", origem: "formulario" })}
        >
          @auvanteo
        </a>
        .
      </p>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
      <div className={`${wrap} relative grid items-center gap-14 pb-20 pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-24`}>
        <div className="fade-up lg:col-span-6">
          <p className="kicker">Estúdio de websites para empresas em Portugal</p>
          <h1 className="mt-6 font-display text-[2.85rem] leading-[1.02] sm:text-6xl xl:text-[4.6rem]">
            O seu negócio merece um website à altura<span className="dot">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel sm:text-xl">
            Criamos websites profissionais para empresas em Portugal. Design cuidado, textos claros e um
            caminho curto até ao seu contacto.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contactos" className={btnPrimary}>
              Pedir orçamento <ArrowRight className="size-4" />
            </a>
            <a href="#portfolio" className={btnGhost}>
              Ver portfólio
            </a>
          </div>
          <p className="mt-6 text-sm text-steel">
            Planos desde <span className="text-ice">279 €</span> · Resposta por WhatsApp ou Instagram
          </p>
        </div>
        <figure className="fade-up relative lg:col-span-6 [animation-delay:150ms]">
          <Laptop className="mr-[12%] lg:mr-[10%]">
            <AtlasDesktop />
          </Laptop>
          <Phone className="absolute -bottom-[10%] right-0 w-[29%]">
            <AuroraMobile />
          </Phone>
          <figcaption className="mt-8 max-w-[62%] text-xs leading-relaxed text-steel">
            Conceitos demonstrativos criados pela AUVANTEO, com marcas fictícias.
          </figcaption>
        </figure>
      </div>
      <div className="relative border-y border-line/70 bg-secondary/60">
        <dl className={`${wrap} grid grid-cols-2 lg:grid-cols-4`}>
          {FACTS.map(([t, d], i) => (
            <div
              key={t}
              className={`py-6 pr-4 sm:py-8 ${i % 2 ? "pl-4 sm:pl-6" : ""} ${i > 0 ? "lg:border-l lg:border-line/70 lg:pl-6" : ""} ${i < 2 ? "border-b border-line/70 lg:border-b-0" : ""} ${i % 2 ? "border-l border-line/70" : ""}`}
            >
              <dt className="font-display text-lg sm:text-xl">{t}</dt>
              <dd className="mt-1 text-sm text-steel">{d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicos" className={`${wrap} py-24 lg:py-32`}>
      <SectionHead
        kicker="Serviços"
        title={
          <>
            Websites feitos para o seu negócio, não para um modelo<span className="dot">.</span>
          </>
        }
      >
        Cada website começa por perceber o que faz, para quem, e o que o visitante precisa de encontrar
        para o contactar.
      </SectionHead>
      <ul className="mt-14 border-t border-line">
        {SERVICES.map(({ t, d, plan }, i) => (
          <li
            key={t}
            className="group grid gap-3 border-b border-line py-8 transition-colors md:grid-cols-12 md:items-baseline md:gap-6"
          >
            <span className="text-sm tabular-nums text-steel md:col-span-1">0{i + 1}</span>
            <h3 className="font-display text-2xl transition-colors group-hover:text-electric sm:text-[1.7rem] md:col-span-4">
              {t}
            </h3>
            <p className="leading-relaxed text-steel md:col-span-5">{d}</p>
            <p className="text-sm text-steel md:col-span-2 md:text-right">
              Plano <span className="text-ice">{plan}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Portfolio() {
  return (
    <section id="portfolio" className="border-t border-line/70 bg-secondary/50 py-24 lg:py-32">
      <div className={wrap}>
        <SectionHead
          kicker="Portfólio"
          title={
            <>
              Conceitos que mostram como pensamos<span className="dot">.</span>
            </>
          }
        >
          Três exercícios de design para setores diferentes. São conceitos internos com marcas fictícias,
          não trabalhos para clientes.
        </SectionHead>
        <div className="mt-16 space-y-8">
          {CONCEPTS.map(({ name, sector, notes, points, Desktop, Mobile }) => (
            <article
              key={name}
              className="grid gap-12 overflow-hidden rounded-[1.5rem] border border-line bg-background p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-10"
            >
              <div className="lg:col-span-5">
                <span className="inline-flex rounded-full border border-line px-3 py-1 text-xs text-steel">
                  Conceito · {sector}
                </span>
                <h3 className="mt-5 font-display text-3xl sm:text-4xl">{name}</h3>
                <p className="mt-4 leading-relaxed text-steel">{notes}</p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-electric" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative pb-[6%] lg:col-span-7">
                <Laptop className="mr-[14%]">
                  <Desktop />
                </Laptop>
                <Phone className="absolute bottom-0 right-0 w-[26%]">
                  <Mobile />
                </Phone>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[1.5rem] border border-line p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="font-display text-2xl sm:text-3xl">Quer ver como ficaria o seu?</p>
            <p className="mt-2 text-steel">Conte-nos o que faz e preparamos uma proposta sem compromisso.</p>
          </div>
          <a href="#contactos" className={`${btnPrimary} shrink-0`}>
            Pedir orçamento <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="processo" className={`${wrap} py-24 lg:py-32`}>
      <SectionHead
        kicker="Processo"
        title={
          <>
            Quatro etapas, sem surpresas<span className="dot">.</span>
          </>
        }
      >
        Sabe sempre em que fase está o seu website e o que vem a seguir.
      </SectionHead>
      <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <span className="absolute left-0 right-0 top-[7px] hidden h-px bg-line lg:block" aria-hidden />
        {STEPS.map(([t, d], i) => (
          <li key={t} className="relative">
            <span className="relative block size-[15px] rounded-full border-[3px] border-background bg-electric ring-1 ring-electric/40" />
            <p className="mt-6 text-sm tabular-nums text-steel">Etapa {i + 1}</p>
            <h3 className="mt-1 text-xl font-semibold">{t}</h3>
            <p className="mt-2 leading-relaxed text-steel">{d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Plans() {
  return (
    <section id="planos" className="border-t border-line/70 py-24 lg:py-32">
      <div className={wrap}>
        <SectionHead
          kicker="Planos"
          title={
            <>
              Preços claros desde o início<span className="dot">.</span>
            </>
          }
        >
          Valores de partida. O preço final depende do âmbito e fica fechado na proposta.
        </SectionHead>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {PLANS.map((p) => (
            <article
              key={p.name}
              className={`relative flex flex-col rounded-[1.5rem] border p-8 ${p.featured ? "border-electric bg-surface" : "border-line bg-secondary/50"}`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-electric px-3 py-1 text-xs font-semibold text-[#0B1017]">
                  Recomendado
                </span>
              )}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 min-h-12 text-sm text-steel">{p.desc}</p>
              <p className="mt-6 flex items-baseline gap-2">
                <span className="text-sm text-steel">desde</span>
                <span className="font-display text-5xl">{p.price} €</span>
              </p>
              <ul className="mt-8 flex-1 space-y-3 border-t border-line pt-6 text-[15px]">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-electric" />
                    {it}
                  </li>
                ))}
              </ul>
              <a
                href={waFor(`Olá! Gostava de pedir um orçamento para o plano ${p.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${p.featured ? btnPrimary : btnGhost} mt-8`}
                onClick={() => trackEvent("plan_selected", { plano: p.name })}
              >
                Pedir orçamento {p.name}
              </a>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-steel">
          Domínio, alojamento, integrações pagas, ferramentas externas e manutenção são orçamentados à
          parte. Não sabe qual escolher?{" "}
          <a href="#diagnostico" className="text-ice underline underline-offset-4 hover:text-electric">
            Faça o diagnóstico
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function Diagnosis() {
  return (
    <section id="diagnostico" className="border-t border-line/70 bg-secondary/50 py-24 lg:py-32">
      <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
        <div className="lg:col-span-4">
          <p className="kicker">Diagnóstico</p>
          <h2 className="mt-4 font-display text-[2.25rem] leading-[1.05] sm:text-5xl">
            Que website faz sentido para si<span className="dot">?</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-steel">
            Quatro perguntas rápidas e uma recomendação de plano. É uma orientação: a proposta final
            depende da conversa consigo.
          </p>
        </div>
        <div className="lg:col-span-8">
          <Diagnostico />
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className={`${wrap} grid gap-12 py-24 lg:grid-cols-12 lg:py-32`}>
      <div className="lg:col-span-4">
        <p className="kicker">Perguntas frequentes</p>
        <h2 className="mt-4 font-display text-[2.25rem] leading-[1.05] sm:text-5xl">
          Antes de pedir orçamento<span className="dot">.</span>
        </h2>
      </div>
      <div className="divide-y divide-line border-y border-line lg:col-span-8">
        {FAQ.map(([q, a]) => (
          <details key={q} className="group py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
              {q}
              <Plus className="size-5 shrink-0 text-electric transition-transform group-open:rotate-45" aria-hidden />
            </summary>
            <p className="mt-3 max-w-2xl leading-relaxed text-steel">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contactos" className={`${wrap} pb-24 lg:pb-32`}>
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-70" aria-hidden />
        <div className="relative grid gap-10 p-6 sm:p-12 lg:grid-cols-2 lg:gap-14 lg:p-16">
          <div className="min-w-0">
            <p className="kicker">Contactos</p>
            <h2 className="mt-4 font-display text-[2.5rem] leading-[1.02] sm:text-6xl">
              Pronto para dar o próximo passo<span className="dot">?</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-steel">
              Diga-nos o que precisa. Respondemos com perguntas certas e, depois, com uma proposta escrita.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnPrimary}
                  onClick={() => trackEvent("lead_contact_clicked", { channel: "whatsapp", origem: "botao" })}
                >
                  <MessageCircle className="size-4" /> Falar no WhatsApp
                </a>
              )}
              <a
                href={INSTAGRAM_DM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={btnGhost}
                onClick={() => trackEvent("lead_contact_clicked", { channel: "instagram", origem: "botao" })}
              >
                <Instagram className="size-4" /> Mensagem no Instagram
              </a>
            </div>
            <dl className="mt-10 grid gap-5 border-t border-line pt-8 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-steel">WhatsApp</dt>
                <dd className="mt-1 text-base">{WHATSAPP_DISPLAY_NUMBER}</dd>
              </div>
              <div>
                <dt className="text-steel">Instagram</dt>
                <dd className="mt-1 text-base">
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-electric">
                    @auvanteo
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <QuoteBuilder />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line/70">
      <div className={`${wrap} flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between`}>
        <div>
          <BrandLockup />
          <p className="mt-4 max-w-xs text-sm text-steel">
            Websites profissionais para empresas e profissionais em Portugal. Atendimento remoto.
          </p>
        </div>
        <nav aria-label="Rodapé" className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm text-steel">
          {NAV.slice(0, 4).map(([id, l]) => (
            <a key={id} href={`#${id}`} className="hover:text-ice">
              {l}
            </a>
          ))}
          <Link to="/privacidade" className="hover:text-ice">
            Privacidade
          </Link>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-ice"
          >
            Instagram <ArrowUpRight className="size-3.5" />
          </a>
        </nav>
      </div>
      <div className={wrap}>
        <p className="border-t border-line/70 py-6 text-xs text-steel">
          © {new Date().getFullYear()} AUVANTEO Digital Studio
        </p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div id="topo" className="pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-surface focus:px-4 focus:py-2"
      >
        Saltar para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Services />
        <Portfolio />
        <Process />
        <Plans />
        <Diagnosis />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <StickyMobileCta />
    </div>
  );
}
