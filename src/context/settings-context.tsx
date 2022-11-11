import { createContext, useState } from 'react'

interface ISettingsContext {
    units: { [key: string]: string }
    changeUnit: () => void
}

const defaultState = {
    temp: 'celsius',
    speed: 'ms',
    pressure: 'hpa',
}

// состояние для единиц измерения
export const SettingsContext = createContext<ISettingsContext>({
    units: {
        temp: 'celsius',
        speed: 'ms',
        pressure: 'hpa',
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    changeUnit: () => {},
})

export const SettingsState = ({ children }: { children: React.ReactNode }) => {
    const [units, setUnit] = useState<{ [key: string]: string }>(defaultState)
    const changeUnit = () => setUnit({})

    return (
        <SettingsContext.Provider value={{ units, changeUnit }}>
            {children}
        </SettingsContext.Provider>
    )
}