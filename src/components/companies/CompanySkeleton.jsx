const CompanySkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 animate-pulse flex flex-col justify-between h-64"
        >
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-xl bg-zinc-800" />
              <div className="w-20 h-6 rounded-full bg-zinc-800" />
            </div>
            <div className="w-3/4 h-6 rounded bg-zinc-800 mb-3" />
            <div className="w-full h-4 rounded bg-zinc-800/60 mb-2" />
            <div className="w-2/3 h-4 rounded bg-zinc-800/60 mb-5" />
            <div className="flex gap-2">
              <div className="w-20 h-6 rounded-full bg-zinc-800/60" />
              <div className="w-16 h-6 rounded-full bg-zinc-800/60" />
            </div>
          </div>
          <div>
            <div className="border-t border-zinc-800/80 my-4" />
            <div className="flex justify-between items-center">
              <div className="w-24 h-4 rounded bg-zinc-800/80" />
              <div className="w-28 h-4 rounded bg-zinc-800/80" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanySkeleton;
