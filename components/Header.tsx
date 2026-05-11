export function Header() {
  return (
    <header className="w-full border-b border-[#d3d6da]">
      <div className="max-w-lg mx-auto flex items-center justify-center px-4 h-14 relative">
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5 h-4">
            <div className="w-3 bg-[#000]" />
            <div className="w-3 bg-[#DD0000]" />
            <div className="w-3 bg-[#FFCE00]" />
          </div>
          <h1 className="text-3xl font-black tracking-tight select-none">
            WÖRTLE
          </h1>
        </div>
      </div>
    </header>
  );
}
