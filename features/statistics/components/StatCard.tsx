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
    <div className="flex flex-col justify-center items-center bg-white dark:bg-zinc-900 shadow-sm p-8 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-center hover:scale-105 transition-transform transform">
      <div className={`text-6xl font-black mb-3 ${colorStyles[color]}`}>
        {value}
      </div>
      <div className="font-bold text-zinc-500 dark:text-zinc-400 text-sm uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}
