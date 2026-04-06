import * as React from "react";

export type ColorThemeKey = "teal" | "sky" | "navy" | "violet" | "emerald" | "rose" | "amber";

export interface ColorThemeOption {
  key: ColorThemeKey;
  label: string;
  primary: string;
  dark: string;
  hover: string;
}

export const COLOR_THEMES: ColorThemeOption[] = [
  { key: "teal",    label: "Teal",    primary: "#0D9488", dark: "#0F766E", hover: "#14B8A6" },
  { key: "sky",     label: "Sky",     primary: "#0284C7", dark: "#0369A1", hover: "#0EA5E9" },
  { key: "navy",    label: "Navy",    primary: "#1D4ED8", dark: "#1E40AF", hover: "#2563EB" },
  { key: "violet",  label: "Violet",  primary: "#7C3AED", dark: "#6D28D9", hover: "#8B5CF6" },
  { key: "emerald", label: "Emerald", primary: "#059669", dark: "#047857", hover: "#10B981" },
  { key: "rose",    label: "Rose",    primary: "#E11D48", dark: "#BE123C", hover: "#F43F5E" },
  { key: "amber",   label: "Amber",   primary: "#D97706", dark: "#B45309", hover: "#F59E0B" },
];

const LS_KEY = "auditions_color_theme";
const DEFAULT: ColorThemeKey = "teal";

interface ColorThemeCtx {
  colorTheme: ColorThemeKey;
  setColorTheme: (k: ColorThemeKey) => void;
  currentTheme: ColorThemeOption;
}

const ColorThemeContext = React.createContext<ColorThemeCtx | null>(null);

function applyColorTheme(key: ColorThemeKey) {
  const t = COLOR_THEMES.find(c => c.key === key) ?? COLOR_THEMES[0];
  const root = document.documentElement;
  root.style.setProperty("--color-primary", t.primary);
  root.style.setProperty("--color-primary-dark", t.dark);
}

export function ColorThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorTheme, setColorThemeState] = React.useState<ColorThemeKey>(() => {
    const saved = localStorage.getItem(LS_KEY) as ColorThemeKey | null;
    return saved && COLOR_THEMES.find(c => c.key === saved) ? saved : DEFAULT;
  });

  // Apply on mount
  React.useEffect(() => {
    applyColorTheme(colorTheme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setColorTheme = (key: ColorThemeKey) => {
    setColorThemeState(key);
    localStorage.setItem(LS_KEY, key);
    applyColorTheme(key);
  };

  const currentTheme = COLOR_THEMES.find(c => c.key === colorTheme) ?? COLOR_THEMES[0];

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme, currentTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
}

export function useColorTheme() {
  const ctx = React.useContext(ColorThemeContext);
  if (!ctx) throw new Error("useColorTheme must be used within ColorThemeProvider");
  return ctx;
}
