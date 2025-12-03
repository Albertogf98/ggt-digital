import { createContext, useState, useEffect, useContext } from 'react';

interface BuilderColors {
  inputBg: string;
  textColor: string;
  border: string;
  button: string;
  heading: string;
  cardBg: string;
  icon: string;
}

interface ThemeContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  builder: BuilderColors;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // ✅ Inicializa darkMode desde localStorage si existe, si no, true por defecto
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored !== null ? stored === 'true' : true;
  });

  // Aplicar clase dark al root y guardar elección
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) root.classList.add('dark');
    else root.classList.remove('dark');

    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Builder dinámico según darkMode
  const builder: BuilderColors = darkMode
    ? {
        inputBg: '#1f2937',
        textColor: '#f9fafb',
        border: '#374151',
        button: '#3b82f6',
        heading: '#f9fafb',
        cardBg: '#111827',
        icon: '#f9fafb',
      }
    : {
        inputBg: '#f3f4f6',
        textColor: '#111827',
        border: '#d1d5db',
        button: '#3b82f6',
        heading: '#111827',
        cardBg: '#ffffff',
        icon: '#111827',
      };

  return <ThemeContext.Provider value={{ darkMode, toggleDarkMode, builder }}>{children}</ThemeContext.Provider>;
};

// Hook para consumir el contexto
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
