import { createContext, useState } from 'react'

interface ISettingsContext {
    tempUnit: string
    unitSpeed: string
    changeTemperatureUnit: () => void
    changeUnitSpeed: () => void
}

export const SettingsContext = createContext<ISettingsContext>({
    tempUnit: 'celsius',
    unitSpeed: 'ms',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    changeTemperatureUnit: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    changeUnitSpeed: () => {},
})

export const SettingsState = ({ children }: { children: React.ReactNode }) => {
    const [tempUnit, setTemperatureUnit] = useState('celsius')
    const [unitSpeed, setUnitSpeed] = useState('ms')
    const changeTemperatureUnit = () =>
        setTemperatureUnit(tempUnit === 'celsius' ? 'fahrenheit' : 'celsius')
    const changeUnitSpeed = () => setUnitSpeed(unitSpeed === 'ms' ? 'kh' : 'ms')

    return (
        <SettingsContext.Provider
            value={{ tempUnit, unitSpeed, changeTemperatureUnit, changeUnitSpeed }}
        >
            {children}
        </SettingsContext.Provider>
    )
}
