/** Monograma AV. traçado do logótipo original aprovado — não alterar os paths. */
export function BrandMark({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 245" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className}>
      <path fill="var(--ice)" fillRule="evenodd" d="M214 14L291 223L356 224L434 14L380 14L324 169L267 14ZM87 14L9 224L62 224L76 185L161 185L175 224L229 224L151 14ZM119 63L148 146L90 147L97 122Z" />
      <path fill="var(--electric)" fillRule="evenodd" d="M442 93L437 95L430 102L428 115L430 120L437 127L450 129L455 127L462 120L464 107L462 102L455 95Z" />
    </svg>
  );
}

export function BrandLockup({ tagline = true }: { tagline?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <BrandMark className="h-7 w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-extrabold tracking-[0.14em] text-foreground">AUVANTEO</span>
        {tagline && <span className="mt-1 text-[9px] font-semibold tracking-[0.32em] text-muted-foreground">DIGITAL STUDIO</span>}
      </span>
    </span>
  );
}
