import { useEffect, useState } from "react";

export function useTheme(defaultTheme = "light") {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || defaultTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, setTheme];
}