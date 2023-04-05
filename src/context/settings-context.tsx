import { useLocalStorage } from '../hooks/use-localStorage'
import constate from 'constate'
import { AllUnitsType, TemperatureUnits, PressureUnits, SpeedUnits } from '../utils/utils'

const SETTINGS_KEY = 'settings'

export type SettingsType = {
    temp: TemperatureUnits
    speed: SpeedUnits
    pressure: PressureUnits
}

const initialState: SettingsType = {
    temp: TemperatureUnits.CELSIUS,
    speed: SpeedUnits.MS,
    pressure: PressureUnits.HPA,
}

function useSettingsState() {
    const [units, setUnit] = useLocalStorage<SettingsType>(initialState, SETTINGS_KEY)

    const changeUnit = (payload: Record<string, AllUnitsType>) => {
        setUnit({ ...units, ...payload })
    }

    return { units, changeUnit }
}

export const [SettingsProvider, useSettingsProvider] = constate(useSettingsState)
