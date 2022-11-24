import { createContext, useState, useEffect } from 'react'

interface ISettingsContext {
    units: { [key: string]: string }
    changeUnit: (payload: { [key: string]: string }) => void
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
    const changeUnit = (payload: { [key: string]: string }) => {
        setUnit({ ...units, ...payload })
        localStorage.setItem('settings', JSON.stringify({ ...units, ...payload }))
    }

    useEffect(() => {
        const settings = localStorage.getItem('settings')
        settings
            ? setUnit(JSON.parse(settings))
            : localStorage.setItem('settings', JSON.stringify(units))
    }, [])

    return (
        <SettingsContext.Provider value={{ units, changeUnit }}>
            {children}
        </SettingsContext.Provider>
    )
}
