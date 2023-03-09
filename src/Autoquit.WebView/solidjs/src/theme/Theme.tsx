type ICssAccent = { [key: symbol | string ]: string }

interface IAccentPreset {
    name: string;
    css: ICssAccent;
}


export const themePreset = {
    bg_dark: 'bg-gray-800',
    bg_dark_hover: 'bg-gray-600',
    bg_light: 'bg-gray-50',
    bg_light_hover: 'bg-gray-200',
    txt_dark: 'white',
    txt_light: 'black'
}

export const accentPreset : IAccentPreset[] = [
    {
        name: 'ocean',
        css: {
            light: 'blue-500',
            dark: 'blue-500',
            base: 'dodgerblue'
        }
    },
    {
        name: 'romance',
        css: {
            light: 'pink-400',
            dark: 'pink-500',
            base: 'pink'
        }
    },
    {
        name: 'emerald',
        css: {
            light: 'green-600',
            dark: 'green-600',
            base: 'green'
        }
    },
    {
        name: 'gold',
        css: {
            light: 'yellow-500',
            dark: 'yellow-600',
            base: 'gold'
        }
    },
    {
        name: 'mysterious',
        css: {
            light: 'purple-500',
            dark: 'purple-600',
            base: 'purple'
        }
    },
    {
        name: 'crimson',
        css: {
            light: 'red-700',
            dark: 'red-400',
            base: 'red'
        }
    },
    {
        name: 'silver',
        css: {
            light: 'gray-500',
            dark: 'gray-400',
            base: 'gray'
        }
    }
]
