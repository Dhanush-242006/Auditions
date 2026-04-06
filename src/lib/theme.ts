import * as React from "react";

type Theme = "dark" | "light";

interface ThemeCtx {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeCtx>({
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return React.useContext(ThemeContext);
}

function applyTheme(t: Theme) {
  document.documentElement.setAttribute("data-theme", t);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>(() => {
    // Force light as the new site default — clears any old dark preference
    localStorage.setItem("auditions_theme", "light");
    return "light";
  });

  React.useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("auditions_theme", theme);
  }, [theme]);

  // Apply on first render
  React.useLayoutEffect(() => { applyTheme(theme); }, []);

  const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"));

  return React.createElement(ThemeContext.Provider, { value: { theme, toggleTheme } }, children);
}
