export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(10,92,255,0.35),transparent_70%)] blur-3xl animate-drift" />
      <div className="absolute top-1/3 -right-32 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(120,160,255,0.35),transparent_70%)] blur-3xl animate-drift [animation-delay:-6s]" />
      <div className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle_at_center,rgba(10,92,255,0.2),transparent_70%)] blur-3xl animate-drift [animation-delay:-3s]" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(20,30,60,0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
    </div>
  );
}