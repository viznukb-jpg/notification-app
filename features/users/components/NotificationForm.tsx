"use client";

interface NotificationFormProps {
  onSubmit: (title: string) => void;
  isPending: boolean;
  isError: boolean;
}

export function NotificationForm({
  onSubmit,
  isPending,
  isError,
}: NotificationFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = (formData.get("title") as string)?.trim();
    if (title && !isPending) {
      onSubmit(title);
      form.reset();
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Send a new notification</h3>
      <form className="flex gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="e.g., Your transfer has been completed"
          className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-transparent text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? "Sending..." : "Send"}
        </button>
      </form>
      {isError && (
        <p className="mt-3 text-red-500 text-sm">
          Failed to send notification. Please try again.
        </p>
      )}
    </div>
  );
}
