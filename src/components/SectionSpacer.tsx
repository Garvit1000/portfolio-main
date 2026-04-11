export function SectionSpacer() {
  return (
    <div className="relative overflow-hidden mt-10 lg:mt-14">
      <div className="container-xl mx-auto">
        <div className="max-w-6xl mx-auto border-x border-border h-14 lg:h-20 relative">
          {/* Top horizontal line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-border"></div>
          {/* Bottom horizontal line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-border"></div>
          {/* Crosshatch fill inside */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="bg-[repeating-linear-gradient(315deg,hsl(var(--border))_0,hsl(var(--border))_1px,transparent_0,transparent_50%)] bg-[size:10px_10px] opacity-25 h-full w-full"></div>
          </div>
          {/* Crosshatch pattern — left overflow */}
          <div className="absolute top-0 right-full w-[50vw] h-full pointer-events-none">
            <div className="bg-[repeating-linear-gradient(315deg,hsl(var(--border))_0,hsl(var(--border))_1px,transparent_0,transparent_50%)] bg-[size:10px_10px] opacity-40 h-full w-full absolute inset-0"></div>
          </div>
          {/* Crosshatch pattern — right overflow */}
          <div className="absolute top-0 left-full w-[50vw] h-full pointer-events-none">
            <div className="bg-[repeating-linear-gradient(315deg,hsl(var(--border))_0,hsl(var(--border))_1px,transparent_0,transparent_50%)] bg-[size:10px_10px] opacity-40 h-full w-full absolute inset-0"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
