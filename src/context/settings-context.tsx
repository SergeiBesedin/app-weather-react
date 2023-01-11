import { createContext } from 'react'
import { useLocalStorage } from '../hooks/use-localStorage'

interface ISettingsContext {
    units: { [key: string]: string }
    changeUnit: (payload: { [key: string]: string }) => void
}

const SETTINGS_KEY = 'settings'

const initialState = {
    temp: 'celsius',
    speed: 'ms',
    pressure: 'hpa',
}

// состояние для единиц измерения
export const SettingsContext = createContext<ISettingsContext>({
    units: initialState,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    changeUnit: () => {},
})

export const SettingsState = ({ children }: { children: React.ReactNode }) => {
    const [units, setUnit] = useLocalStorage<{ [key: string]: string }>(initialState, SETTINGS_KEY)

    const changeUnit = (payload: { [key: string]: string }) => {
        setUnit({ ...units, ...payload })
    }

    return (
        <SettingsContext.Provider value={{ units, changeUnit }}>
            {children}
        </SettingsContext.Provider>
    )
}
