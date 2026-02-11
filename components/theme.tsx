"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // This only runs on the client after the page loads
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="py-2 px-4 mt-2 rounded-md border border-border bg-card opacity-0">
        Loading...
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="py-2 px-4 mt-2 rounded-md border border-border bg-card text-foreground transition-transform hover:scale-110"
    >
      {theme === "light" ? "🌙 " : "☀️"}
    </button>
  );
}
