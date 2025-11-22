export type ThemeType = {
    name: string;
    key: string;
    price: string;
    colors: {
        background: string;
        card: string;
        text: string;
        primary: string;
        secondary: string;
    }
};

export const THEMES: Record<string, ThemeType> = {
    default: {
        name: 'Padrão (Dark)',
        key: 'default',
        price: 'Grátis',
        colors: {
            background: '#121212',
            card: '#252525',
            text: '#FFFFFF',
            primary: '#00D8FF',
            secondary: '#B3B3B3',
        },
    },
    dracula: {
        name: 'Dracula',
        key: 'dracula',
        price: 'R$ 15,00',
        colors: {
            background: '#282A36',
            card: '#44475A',
            text: '#F8F8F2',
            primary: '#FF79C6',
            secondary: '#6272A4',
        },
    },
    matrix: {
        name: 'Matrix',
        key: 'matrix',
        price: 'R$ 10,00',
        colors: {
            background: '#000000',
            card: '#111111',
            text: '#00FF00',
            primary: '#008F11',
            secondary: '#003B00',
        },
    },
    victoria: {
        name: 'Victoria Housekeeping',
        key: 'victoria',
        price: 'R$ 25,00',
        colors: {
            background: '#16121A',
            card: '#25202B',
            text: '#F5EFE0',
            primary: '#CFB568',
            secondary: '#7D6B49',
        },
    },
}