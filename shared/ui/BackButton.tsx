import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
  centered?: boolean;
}

export function BackButton({ href, label, centered = false }: BackButtonProps) {
  return (
    <Link 
      href={href} 
      className={`text-sm text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block ${centered ? "mx-auto" : ""}`}
    >
      &larr; {label}
    </Link>
  );
}
