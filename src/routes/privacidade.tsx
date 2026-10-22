import { createFileRoute, Link } from "@tanstack/react-router";
import { INSTAGRAM_URL } from "@/lib/contact";

const TITLE = "Política de Privacidade | AUVANTEO Digital Studio";
const DESC =
  "Como a AUVANTEO trata os dados dos visitantes: o diagnóstico é processado no seu dispositivo e nada é guardado neste website.";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_PT" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Privacidade,
});

const link = "font-semibold text-ice underline underline-offset-4 hover:text-electric";

function Privacidade() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <Link to="/" className="text-sm text-steel hover:text-ice">
        ← AUVANTEO Digital Studio
      </Link>
      <h1 className="mt-8 font-display text-4xl leading-tight sm:text-5xl">
        Política de Privacidade<span className="dot">.</span>
      </h1>
      <p className="mt-3 text-sm text-steel">Última atualização: outubro de 2026</p>

      <div className="mt-12 space-y-10 text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold">1. O que este website recolhe</h2>
          <p className="mt-3 text-steel">
            Neste momento, este website <strong className="text-ice">não guarda nem envia para servidores</strong>{" "}
            qualquer informação que introduza. O diagnóstico e o pedido de orçamento são processados
            inteiramente no seu dispositivo, apenas para gerar o texto da mensagem. Se fechar a página,
            essas respostas desaparecem.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Quando é que a AUVANTEO recebe dados seus</h2>
          <p className="mt-3 text-steel">
            Apenas se decidir enviar-nos mensagem através de um canal externo, como o WhatsApp ou o
            Instagram. Nesse caso, os dados que partilhar (nome, contacto, conteúdo da mensagem) são
            tratados por essas plataformas nos termos das respetivas políticas de privacidade, e pela
            AUVANTEO apenas para responder ao seu pedido e preparar uma proposta.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Cookies e estatísticas</h2>
          <p className="mt-3 text-steel">
            Este website não utiliza cookies de rastreio nem ferramentas de estatística. Se no futuro
            forem introduzidas ferramentas de análise, esta página será atualizada e o consentimento será
            pedido antes de qualquer recolha.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Os seus direitos</h2>
          <p className="mt-3 text-steel">
            Pode pedir a qualquer momento o acesso, a correção ou a eliminação das mensagens que nos
            enviou, contactando-nos pelo Instagram{" "}
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={link}>
              @auvanteo
            </a>
            . Responderemos ao pedido com a maior brevidade possível.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Alterações a esta política</h2>
          <p className="mt-3 text-steel">
            Se a forma como tratamos dados mudar, por exemplo se passarmos a disponibilizar um formulário
            com envio para os nossos sistemas, esta página será atualizada antes dessa alteração entrar em
            vigor.
          </p>
        </section>
      </div>

      <p className="mt-14">
        <Link to="/" className={link}>
          ← Voltar à página inicial
        </Link>
      </p>
    </div>
  );
}
