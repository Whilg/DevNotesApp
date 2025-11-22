import React, { createContext, useContext, useState, ReactNode } from 'react';
import { THEMES, ThemeType } from '../constants/themes';

type ThemeContextData = {
    theme: ThemeType;
    currentThemeKey: string;
    buyAndApplyTheme: (key: string) => void;
};

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [currentThemeKey, setCurrentThemeKey] = useState<string>('default');

    const buyAndApplyTheme = (key: string) => {
        setCurrentThemeKey(key);
    };

    const theme = THEMES[currentThemeKey];

    return (
        <ThemeContext.Provider value={{ theme, currentThemeKey, buyAndApplyTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);