import { useState, useEffect } from 'react'
import constate from 'constate'
import { useDataStorage } from '../hooks/use-data-storage'
import { getCityName } from '../service/get-city-name'

const USER_LOCATION_KEY = 'user_location'

const initialValue = 'Москва'

const useLocationState = () => {
    const { checkStorage, saveDataToStorage } = useDataStorage<string>(USER_LOCATION_KEY)

    const [location, setLocation] = useState(checkStorage() ?? initialValue)

    const changeLocation = (value: string) => {
        if (location.toLowerCase() === value.toLowerCase()) return

        setLocation(value)
    }

    const changeLocationToDefault = () => {
        const defaultLocation = checkStorage()

        changeLocation(defaultLocation ?? initialValue)
    }

    const getUserLocation = (): void => {
        const location = checkStorage()

        if (location) {
            setLocation(location)
            return
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            // выполняется, если пользователей дает доступ к местоположению
            const city = await getCityName(position.coords.latitude, position.coords.longitude)

            saveDataToStorage(city)

            setLocation(city)
        })
    }

    // При первом рендере пытаемся узнать местоположение пользователя
    useEffect(() => {
        getUserLocation()
        // eslint-disable-next-line
    }, [])

    return { location, changeLocation, changeLocationToDefault }
}

export const [LocationProvider, useLocationProvider] = constate(useLocationState)
