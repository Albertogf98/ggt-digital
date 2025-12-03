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
  const [darkMode, setDarkMode] = useState(false);

  // Inicializar darkMode desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored) setDarkMode(stored === 'true');
  }, []);

  // Aplicar clase y almacenar estado
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Builder dinámico según darkMode
  const builder: BuilderColors = darkMode
    ? {
        inputBg: '#1f2937', // gris oscuro
        textColor: '#f9fafb', // blanco
        border: '#374151', // gris medio
        button: '#3b82f6', // azul
        heading: '#f9fafb',
        cardBg: '#111827', // casi negro
        icon: '#f9fafb', // color para íconos en dark mode
      }
    : {
        inputBg: '#f3f4f6', // gris claro
        textColor: '#111827', // casi negro
        border: '#d1d5db', // gris
        button: '#fbfdffff', // azul
        heading: '#111827',
        cardBg: '#ffffff', // blanco
        icon: '#111827', // color para íconos en dark mode
      };

  return <ThemeContext.Provider value={{ darkMode, toggleDarkMode, builder }}>{children}</ThemeContext.Provider>;
};

// Hook para consumir el contexto
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
