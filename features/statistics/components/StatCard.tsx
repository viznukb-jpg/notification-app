interface StatCardProps {
  value: string | number;
  label: string;
  color?: "blue" | "amber" | "red";
}

export function StatCard({ value, label, color = "blue" }: StatCardProps) {
  const colorStyles = {
    blue: "text-blue-600 dark:text-blue-500",
    amber: "text-amber-500 dark:text-amber-400",
    red: "text-red-500 dark:text-red-400",
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center text-center transform transition-transform hover:scale-105">
      <div className={`text-6xl font-black mb-3 ${colorStyles[color]}`}>
        {value}
      </div>
      <div className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}
