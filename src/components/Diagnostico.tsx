import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, Instagram, MessageCircle } from "lucide-react";
import { readUtmSource, trackEvent } from "@/lib/analytics";
import { buildWhatsAppLink, INSTAGRAM_DM_URL, whatsappNumber } from "@/lib/contact";
import {
  buildQuizMessage,
  OBJETIVO_LABELS,
  ORCAMENTO_LABELS,
  PRAZO_LABELS,
  recommend,
  SECTOR_LABELS,
  SITUACAO_LABELS,
  type Objetivo,
  type Orcamento,
  type Prazo,
  type QuizAnswers,
  type Sector,
  type Situacao,
} from "@/lib/recommendation";

const btn =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40";
const btnPrimary = `${btn} bg-electric text-[#0B1017] hover:bg-[#3d93ff]`;
const btnGhost = `${btn} border border-line hover:border-steel`;

type StepKey = "sector" | "situacao" | "objetivo" | "orcamento";

const STEPS: { key: StepKey; legend: string }[] = [
  { key: "sector", legend: "Qual é o setor do seu negócio?" },
  { key: "situacao", legend: "Qual é a sua situação atual?" },
  { key: "objetivo", legend: "O que quer que o website faça primeiro?" },
  { key: "orcamento", legend: "Que orçamento estima para o projeto?" },
];

function Option({
  name,
  value,
  label,
  checked,
  onSelect,
}: {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-4 text-left transition-colors ${
        checked ? "border-electric bg-electric/10" : "border-line hover:border-steel"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onSelect}
        className="size-4 shrink-0 accent-[var(--electric)]"
      />
      <span className="text-[15px] font-medium">{label}</span>
    </label>
  );
}

export function Diagnostico() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState<QuizAnswers>({
    sector: null,
    situacao: null,
    objetivo: null,
    orcamento: null,
    prazo: null,
  });
  const [extras, setExtras] = useState({ nome: "", contacto: "" });
  const [copied, setCopied] = useState(false);
  const started = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const markStarted = () => {
    if (!started.current) {
      started.current = true;
      trackEvent("quiz_started");
    }
  };

  const select = <K extends StepKey>(key: K, value: NonNullable<QuizAnswers[K]>) => {
    markStarted();
    setAnswers((a) => ({ ...a, [key]: value }));
  };

  const currentStep = STEPS[step] ?? STEPS[0]!;
  const currentKey = currentStep.key;
  const canNext = answers[currentKey] !== null;
  const isLast = step === STEPS.length - 1;

  const goTo = (n: number) => {
    setStep(n);
    panelRef.current?.focus();
  };

  const finish = () => {
    setDone(true);
    trackEvent("quiz_completed", {
      sector: answers.sector ?? "",
      objetivo: answers.objetivo ?? "",
      orcamento: answers.orcamento ?? "",
    });
    panelRef.current?.focus();
  };

  const rec = recommend(answers);
  const message = buildQuizMessage(answers, rec, {
    nome: extras.nome,
    contacto: extras.contacto,
    utmSource: readUtmSource(),
  });
  const waLink = buildWhatsAppLink(whatsappNumber, message);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Sem permissão de clipboard: o texto continua visível e selecionável no resumo.
    }
  };

  const input =
    "mt-1.5 w-full rounded-lg border border-line bg-secondary px-3.5 py-3 text-base text-ice sm:text-sm placeholder:text-steel focus:border-electric focus:outline-none";

  return (
    <div className="rounded-[1.5rem] border border-line bg-background p-6 sm:p-10">
      {!done ? (
        <div ref={panelRef} tabIndex={-1} className="outline-none">
          <div className="flex items-center justify-between gap-6">
            <p className="text-sm text-steel" aria-live="polite">
              Pergunta {step + 1} de {STEPS.length}
            </p>
            <div className="flex w-40 items-center gap-1.5" aria-hidden>
              {STEPS.map((s, i) => (
                <span
                  key={s.key}
                  className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-electric" : "bg-line"}`}
                />
              ))}
            </div>
          </div>

          <fieldset className="mt-6">
            <legend className="font-display text-2xl leading-tight sm:text-3xl">{currentStep.legend}</legend>
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {currentKey === "sector" &&
                (Object.entries(SECTOR_LABELS) as [Sector, string][]).map(([v, l]) => (
                  <Option
                    key={v}
                    name="sector"
                    value={v}
                    label={l}
                    checked={answers.sector === v}
                    onSelect={() => select("sector", v)}
                  />
                ))}
              {currentKey === "situacao" &&
                (Object.entries(SITUACAO_LABELS) as [Situacao, string][]).map(([v, l]) => (
                  <Option
                    key={v}
                    name="situacao"
                    value={v}
                    label={l}
                    checked={answers.situacao === v}
                    onSelect={() => select("situacao", v)}
                  />
                ))}
              {currentKey === "objetivo" &&
                (Object.entries(OBJETIVO_LABELS) as [Objetivo, string][]).map(([v, l]) => (
                  <Option
                    key={v}
                    name="objetivo"
                    value={v}
                    label={l}
                    checked={answers.objetivo === v}
                    onSelect={() => select("objetivo", v)}
                  />
                ))}
              {currentKey === "orcamento" && (
                <>
                  {(Object.entries(ORCAMENTO_LABELS) as [Orcamento, string][]).map(([v, l]) => (
                    <Option
                      key={v}
                      name="orcamento"
                      value={v}
                      label={l}
                      checked={answers.orcamento === v}
                      onSelect={() => select("orcamento", v)}
                    />
                  ))}
                  <div className="sm:col-span-2">
                    <p className="mt-4 text-sm text-steel">Prazo ideal (opcional)</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(Object.entries(PRAZO_LABELS) as [Prazo, string][]).map(([v, l]) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setAnswers((a) => ({ ...a, prazo: v }))}
                          aria-pressed={answers.prazo === v}
                          className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                            answers.prazo === v ? "border-electric bg-electric/10" : "border-line hover:border-steel"
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </fieldset>

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              disabled={step === 0}
              className={btnGhost}
            >
              <ArrowLeft className="size-4" /> Anterior
            </button>
            {isLast ? (
              <button type="button" onClick={finish} disabled={!canNext} className={btnPrimary}>
                Ver recomendação <ArrowRight className="size-4" />
              </button>
            ) : (
              <button type="button" onClick={() => goTo(step + 1)} disabled={!canNext} className={btnPrimary}>
                Seguinte <ArrowRight className="size-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div ref={panelRef} tabIndex={-1} className="outline-none">
          <p className="kicker">A nossa recomendação</p>
          <h3 className="mt-3 font-display text-4xl sm:text-5xl">
            Plano {rec.planName} <span className="text-electric">· {rec.priceNote}</span>
          </h3>
          <p className="mt-4 max-w-2xl leading-relaxed text-steel">{rec.reason}</p>

          <dl className="mt-8 grid gap-4 rounded-xl border border-line bg-secondary p-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-steel">Setor</dt>
              <dd className="font-medium">{answers.sector ? SECTOR_LABELS[answers.sector] : "—"}</dd>
            </div>
            <div>
              <dt className="text-steel">Situação</dt>
              <dd className="font-medium">{answers.situacao ? SITUACAO_LABELS[answers.situacao] : "—"}</dd>
            </div>
            <div>
              <dt className="text-steel">Objetivo</dt>
              <dd className="font-medium">{answers.objetivo ? OBJETIVO_LABELS[answers.objetivo] : "—"}</dd>
            </div>
            <div>
              <dt className="text-steel">Orçamento</dt>
              <dd className="font-medium">{answers.orcamento ? ORCAMENTO_LABELS[answers.orcamento] : "—"}</dd>
            </div>
          </dl>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-steel">
              Nome do negócio (opcional)
              <input
                className={input}
                value={extras.nome}
                maxLength={100}
                onChange={(e) => setExtras({ ...extras, nome: e.target.value })}
              />
            </label>
            <label className="text-sm text-steel">
              Contacto preferido (opcional)
              <input
                className={input}
                value={extras.contacto}
                maxLength={100}
                onChange={(e) => setExtras({ ...extras, contacto: e.target.value })}
              />
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            {waLink ? (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className={btnPrimary}
                onClick={() => trackEvent("lead_contact_clicked", { channel: "whatsapp", origem: "diagnostico" })}
              >
                <MessageCircle className="size-4" /> Falar sobre esta recomendação
              </a>
            ) : (
              <a
                href={INSTAGRAM_DM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={btnPrimary}
                onClick={() => trackEvent("lead_contact_clicked", { channel: "instagram", origem: "diagnostico" })}
              >
                <Instagram className="size-4" /> Falar no Instagram
              </a>
            )}
            <button type="button" onClick={copy} className={btnGhost}>
              {copied ? (
                <>
                  <Check className="size-4" /> Mensagem copiada
                </>
              ) : (
                <>
                  <Copy className="size-4" /> Copiar mensagem
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setDone(false)}
              className="px-2 text-sm text-steel underline underline-offset-4 hover:text-ice"
            >
              Rever respostas
            </button>
          </div>
          <p className="mt-4 text-xs text-steel">
            As respostas servem apenas para preparar a mensagem. Nada é guardado neste website.
          </p>
        </div>
      )}
    </div>
  );
}
