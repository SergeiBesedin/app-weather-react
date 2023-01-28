import { useLocalStorage } from '../hooks/use-localStorage'
import constate from 'constate'

const SETTINGS_KEY = 'settings'

const initialState = {
    temp: 'celsius',
    speed: 'ms',
    pressure: 'hpa',
}

const useSettingsState = () => {
    const [units, setUnit] = useLocalStorage<{ [key: string]: string }>(initialState, SETTINGS_KEY)

    const changeUnit = (payload: { [key: string]: string }) => {
        setUnit({ ...units, ...payload })
    }

    return { units, changeUnit }
}

export const [SettingsProvider, useSettingsProvider] = constate(useSettingsState)
