import { useState, useEffect } from 'react'
import constate from 'constate'
import { useDataStorage } from '../hooks/use-data-storage'
import { getCityName } from '../service/city-name'

const USER_LOCATION_KEY = 'user_location'

const initialValue = 'Москва'

function useLocationState() {
    const { checkStorage, saveDataToStorage } = useDataStorage<string>(USER_LOCATION_KEY)

    const userLocation = checkStorage() ?? initialValue

    const [location, setLocation] = useState<string>(userLocation)

    const changeLocation = (value: string) => {
        if (location.toLowerCase() === value.toLowerCase()) return

        setLocation(value)
    }

    const changeLocationToDefault = () => {
        const defaultLocation = checkStorage()

        changeLocation(defaultLocation ?? initialValue)
    }

    const getUserLocation = (): void => {
        const userLocation = checkStorage()

        if (userLocation) return

        navigator.geolocation.getCurrentPosition(async (position: GeolocationPosition) => {
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
