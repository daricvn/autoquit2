import { writable } from 'svelte/store'

export const theme = writable({
    base: 'light',
    color: 'indigo',
    text: 'white',
    css: '#3f51b5'
})

export const getTextFieldClass = (theme)=> (theme.color && theme.color.indexOf(" ") >= 1) ? `text-${theme.color}-text`: `${theme.color}-text`

export const scriptList = writable({})