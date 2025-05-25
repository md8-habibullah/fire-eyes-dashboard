import { useEffect, useState } from "react";

const themes = ["light", "dark", "cupcake", "bumblebee", "corporate"];

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="flex items-center gap-2">
      <select
        className="select select-bordered select-sm"
        value={theme}
        onChange={e => setTheme(e.target.value)}
      >
        {themes.map(t => (
          <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
        ))}
      </select>
    </div>
  );
}