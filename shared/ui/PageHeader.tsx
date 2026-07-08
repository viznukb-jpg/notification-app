import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  centered?: boolean;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, centered = true, children }: PageHeaderProps) {
  return (
    <div className={`mb-12 flex flex-col ${centered ? "text-center items-center" : ""}`}>
      <h1 className={`${centered ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"} font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4`}>
        {title}
      </h1>
      {description && (
        <p className={`text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl ${centered ? "mx-auto mb-6" : "mb-6"}`}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
